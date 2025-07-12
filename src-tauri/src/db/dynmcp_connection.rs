use anyhow::{anyhow, Result};
use tauri::AppHandle;

use crate::{db::rusqlite::DB, model::DyncmcpConnection};

pub fn save(apisix_connection: &DyncmcpConnection, handle: &AppHandle) -> Result<()> {
    let db = DB.lock().map_err(|e| anyhow!("failed to lock DB: {e}"))?;
    db.insert(apisix_connection, handle)?;
    Ok(())
}

pub fn query_all(handle: &AppHandle) -> Result<Vec<DyncmcpConnection>> {
    let db = DB.lock().map_err(|e| anyhow!("failed to lock DB: {e}"))?;
    db.query_all(handle)
}
