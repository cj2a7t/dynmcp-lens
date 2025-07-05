use std::{
    fs,
    path::PathBuf,
    sync::{atomic::AtomicBool, Arc, Mutex},
};

use lazy_static::lazy_static;
use log::info;
use rusqlite::{Connection, Row};
use tauri::{AppHandle, Manager};

use crate::apisix_connection::ApisixConnection;

#[derive(Debug)]
pub struct DbManager {
    pub name: String,
    pub connection: Connection,
}
#[derive(Default)]
pub struct SqlState(pub AtomicBool);

unsafe impl Sync for DbManager {}

lazy_static! {
    pub static ref DB: Arc<Mutex<DbManager>> = Arc::new(Mutex::new(DbManager::default()));
}

impl Default for DbManager {
    fn default() -> Self {
        let connect = Connection::open_in_memory()
            .map_err(|err| err.to_string())
            .unwrap();

        Self {
            name: Default::default(),
            connection: connect,
        }
    }
}

pub fn init_db_conn(handle: &AppHandle) -> Result<(), String> {
    let mut db_manager = DB.lock().map_err(|err| err.to_string())?;
    let mut app_data_dir = handle
        .path()
        .app_data_dir()
        .map_err(|err| err.to_string())?;
    if !app_data_dir.exists() {
        fs::create_dir(&app_data_dir).map_err(|err| err.to_string())?;
    }
    info!("App data directory: {:?}", app_data_dir);
    let app_data_dir_string = app_data_dir.as_mut_os_string();
    app_data_dir_string.push("/db");
    let index_path_str = app_data_dir_string.to_str().unwrap();
    let mut index_path = PathBuf::from(index_path_str);
    if !index_path.exists() {
        info!("try create index file");
        fs::create_dir(&index_path).map_err(|err| err.to_string())?;
    }
    info!("create index dir success");
    let sql_data_file_string = index_path.as_mut_os_string();
    sql_data_file_string.push("/index.db");
    let sql_data_file_str = sql_data_file_string.to_str().unwrap();
    let sql_data_file_path = PathBuf::from(sql_data_file_str);
    if !sql_data_file_path.exists() {
        fs::File::create_new(sql_data_file_path.as_path()).map_err(|err| err.to_string())?;
    }
    info!("create index file success");
    db_manager.connection = Connection::open(&index_path)
        .map_err(|err| err.to_string())
        .unwrap();
    Ok(())
}

impl DbManager {
    fn init(self: &Self, handler: &AppHandle) -> Result<(), String> {
        let state = handler.state::<SqlState>();
        if !state.0.load(std::sync::atomic::Ordering::Relaxed) {
            for sql in vec![
                "CREATE TABLE IF NOT EXISTS tb_apisix_connection (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL UNIQUE,
                host TEXT NOT NULL,
                admin_key TEXT NOT NULL
                );",
            ] {
                self.connection
                    .execute(&sql, ())
                    .map_err(|err| err.to_string())?;
            }
            state
                .0
                .fetch_and(true, std::sync::atomic::Ordering::Relaxed);
        }
        Ok(())
    }

    pub fn insert(self: &Self, ac: &ApisixConnection, handler: &AppHandle) -> Result<(), String> {
        self.init(&handler)?;
        self.connection.execute(
            "INSERT OR REPLACE INTO tb_apisix_connection ( name, host, admin_key) VALUES (?1, ?2, ?3)",
            (&ac.name, &ac.host, &ac.admin_key),
        ).map_err(|err| err.to_string())?;
        Ok(())
    }
    pub fn query_all(self: &Self, handle: &AppHandle) -> Result<Vec<ApisixConnection>, String> {
        self.init(&handle)?;
        let mut stmt = self
            .connection
            .prepare("SELECT * FROM tb_apisix_connection ORDER BY id DESC")
            .map_err(|err| err.to_string())?;
        let rows = stmt
            .query_map([], Self::extrace_conns_row)
            .map_err(|err| err.to_string())?;
        let mut conns = vec![];
        for conn in rows {
            if conn.is_ok() {
                let conn = conn.unwrap();
                conns.push(conn);
            } else {
                let err = conn.unwrap_err();
                info!("source error {err}")
            }
        }
        Ok(conns)
    }
    pub fn extrace_conns_row(row: &Row) -> rusqlite::Result<ApisixConnection> {
        Ok(ApisixConnection {
            id: row.get(0)?,
            name: row.get(1)?,
            host: row.get(2)?,
            admin_key: row.get(3)?,
        })
    }
}
