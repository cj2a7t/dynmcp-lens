use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct DyncmcpConnection {
    #[serde(skip_deserializing)]
    pub id: Option<i32>,
    pub name: String,
    pub url: String,
    pub api_key: String,
    pub starred: bool,
}

#[derive(Debug, Deserialize)]
pub struct PingConParams {
    pub url: String,
    pub api_key: Option<String>,
}

#[derive(Serialize)]
pub struct InvokeResponse<T> {
    pub code: i32,
    pub message: String,
    pub data: Option<T>,
}

impl<T> InvokeResponse<T> {
    pub fn success(data: T) -> Self {
        Self {
            code: 0,
            message: "ok".into(),
            data: Some(data),
        }
    }

    pub fn fail(message: impl Into<String>) -> Self {
        Self {
            code: 1,
            message: message.into(),
            data: None,
        }
    }
}

pub fn to_invoke_response<T>(err: anyhow::Error) -> InvokeResponse<T> {
    InvokeResponse::fail(err.to_string())
}

impl From<&DyncmcpConnection> for PingConParams {
    fn from(conn: &DyncmcpConnection) -> Self {
        PingConParams {
            url: conn.url.clone(),
            api_key: Some(conn.api_key.clone()),
        }
    }
}
