use serde::{Deserialize, Serialize};
use tauri::AppHandle;

use crate::db::DB;

#[derive(Debug, Serialize, Deserialize)]
pub struct ApisixConnection {
    #[serde(skip_deserializing)]
    pub id: Option<i32>,
    pub name: String,
    pub host: String,
    pub admin_key: String,
}

pub fn save(apisix_connection: &ApisixConnection, handle: &AppHandle) -> Result<(), String> {
    let db = DB.lock().map_err(|err| err.to_string())?;
    db.insert(&apisix_connection, &handle)?;
    Ok(())
}

pub fn query_all(handle: &AppHandle) -> Result<Vec<ApisixConnection>, String> {
    let db = DB.lock().map_err(|err| err.to_string())?;
    return db.query_all(&handle);
}
