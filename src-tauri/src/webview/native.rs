use tauri::{App, AppHandle, LogicalSize};
use tauri::{WebviewUrl, WebviewWindow, WebviewWindowBuilder};

#[cfg(target_os = "macos")]
pub fn native_windows(window: &WebviewWindow) {
    use cocoa::{
        appkit::{NSWindow, NSWindowToolbarStyle},
        base::id,
    };
    use objc::{class, msg_send, sel, sel_impl};
    let ns_window = window.ns_window().unwrap() as id;

    use window_vibrancy::{apply_vibrancy, NSVisualEffectMaterial};
    apply_vibrancy(window, NSVisualEffectMaterial::Sidebar, None, None)
        .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

    unsafe {
        ns_window.setToolbar_(msg_send![class!(NSToolbar), new]);
        ns_window.setToolbarStyle_(NSWindowToolbarStyle::NSWindowToolbarStyleUnified);
    }
}

#[cfg(target_os = "macos")]
pub fn create_main_window(app: &AppHandle) -> WebviewWindow {
    use tauri::LogicalPosition;

    #[cfg(target_os = "macos")]
    let style = tauri::TitleBarStyle::Overlay;

    #[cfg(target_os = "windows")]
    let style = tauri::TitleBarStyle::Visible;

    let main_window = WebviewWindowBuilder::new(
        app,
        "main", // the unique window label
        WebviewUrl::App("/".parse().unwrap()),
    )
    .decorations(true)
    .resizable(true)
    .visible(true)
    // .accept_first_mouse(true)
    .hidden_title(true)
    .title("Dynmcp Lens")
    .title_bar_style(style)
    .traffic_light_position(LogicalPosition::new(12.0, 28.0))
    .build()
    .expect("failed to build window");

    main_window
        .set_size(LogicalSize::new(1280, 800))
        .expect("failed to set size");

    main_window.center().unwrap();

    main_window
        .set_min_size(Some(LogicalSize::new(1280, 800)))
        .expect("failed to set min size");

    #[cfg(target_os = "macos")]
    native_windows(&main_window);

    return main_window;
}

pub fn window_design(app: &mut App) -> Result<(), Box<dyn std::error::Error>> {
    let _window = create_main_window(&app.handle());
    Ok(())
}
