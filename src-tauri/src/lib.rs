pub mod apisix_connection;
pub mod db;
pub mod native;

use std::sync::atomic::AtomicBool;

use apisix_connection::ApisixConnection;
use db::SqlState;
use native::window_design;
use reqwest::Client;
use serde::Deserialize;
use tauri::AppHandle;

#[tauri::command]
fn save_apisix_connection(
    name: String,
    host: String,
    admin_key: String,
    handle: AppHandle,
) -> Result<(), String> {
    let apisix_connection = ApisixConnection {
        id: None,
        name,
        host,
        admin_key,
    };
    apisix_connection::save(&apisix_connection, &handle)?;
    Ok(())
}

#[tauri::command]
fn query_all(handle: tauri::AppHandle) -> Result<Vec<ApisixConnection>, String> {
    let list = apisix_connection::query_all(&handle)?;
    Ok(list)
}

#[derive(Debug, Deserialize)]
pub struct PingConParams {
    url: String,
    api_key: Option<String>,
}

#[tauri::command]
async fn ping(params: PingConParams) -> Result<String, String> {
    let client = Client::new();

    let mut req = client.get(&params.url);

    if let Some(api_key) = params.api_key {
        req = req.header("api_key", api_key);
    }

    let resp = req
        .send()
        .await
        .map_err(|e| e.to_string())?
        .text()
        .await
        .map_err(|e| e.to_string())?;

    println!("Response:\n{resp}");
    Ok(resp)
}
// Make sure this function is not duplicated elsewhere in your project.
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .manage(SqlState(AtomicBool::new(false)))
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            window_design(app)?;
            db::init_db_conn(&app.handle()).unwrap();
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            save_apisix_connection,
            query_all,
            ping
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
