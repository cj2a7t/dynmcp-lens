use reqwest::Client;
use tauri::AppHandle;

use crate::{
    db::dynmcp_connection,
    model::{to_invoke_response, DyncmcpConnection, InvokeResponse, PingConParams},
};

#[tauri::command]
pub async fn save_dynmcp_connection(
    conn: DyncmcpConnection,
    handle: AppHandle,
) -> InvokeResponse<i64> {
    // ping first to test the connection
    let ping_params: PingConParams = (&conn).into();
    let ping_result = ping(ping_params).await;
    if ping_result.code != 0 {
        return InvokeResponse::fail(format!("Connection test failed: {}", ping_result.message));
    }
    // save the connection
    dynmcp_connection::upsert(&conn, &handle)
        .map(|res| InvokeResponse::success(res))
        .unwrap_or_else(|e| to_invoke_response(e))
}

#[tauri::command]
pub async fn query_all(handle: AppHandle) -> InvokeResponse<Vec<DyncmcpConnection>> {
    dynmcp_connection::query_all(&handle)
        .map(InvokeResponse::success)
        .unwrap_or_else(|e| to_invoke_response(e))
}

#[tauri::command]
pub async fn ping(params: PingConParams) -> InvokeResponse<String> {
    let client = Client::new();
    let mut req = client.get(format!("{}/healthz", &params.url));

    if let Some(api_key) = params.api_key {
        req = req.header("api_key", api_key);
    }

    let response = req.send().await;
    let result = match response {
        Ok(resp) => {
            let status = resp.status();
            log::info!("HTTP status: {}", status);
            log::info!("Headers: {:#?}", resp.headers());

            let body = resp.text().await;
            match body {
                Ok(text) => {
                    log::info!("Response body: {}", text);
                    if status.is_success() {
                        Ok(text)
                    } else {
                        Err(format!("Request failed with status {}: {}", status, text))
                    }
                }
                Err(e) => {
                    log::error!("Failed to read response body: {}", e);
                    Err(format!("Failed to read response body: {}", e))
                }
            }
        }
        Err(e) => {
            log::error!("Failed to send request: {}", e);
            Err(format!("Failed to connect: {}", e))
        }
    };

    result
        .map(InvokeResponse::success)
        .unwrap_or_else(InvokeResponse::fail)
}
