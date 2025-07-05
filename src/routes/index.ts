export default [
    {
        path: "/",
        component: '@/layouts/NewTab',
        isMenu: false,
        routes: [
            {
                path: "/",
                redirect: '/quick_con',
            },
            {
                name: "New Connect",
                icon: "ThunderboltOutlined",
                path: "/quick_con",
                component: "connection/QuickCon",
            },
            {
                name: "Favorites",
                icon: "HeartOutlined",
                path: "/favorites/newTab:tabId",
                component: "connection/Favorites",
            },
            {
                name: "APISIX",
                icon: "HeartOutlined",
                path: "/apisix",
                component: "apisix",
            }
        ]
    },
    {
        path: "/login",
        component: "login",
        isMenu: false,
    }
]