export default [
    {
        path: "/",
        component: "@/layouts/TabLayout",
        isMenu: false,
        routes: [
            {
                path: "/",
                redirect: "/new_connection",
            },
            {
                name: "New Connection",
                path: "/new_connection",
                component: "connection",
            },
            {
                name: "xDS",
                path: "/xds",
                component: "xds",
            },
        ],
    },
];
