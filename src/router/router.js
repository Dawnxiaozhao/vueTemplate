
const routes = [{
        path: '/',
        redirect: "/login",
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/login.vue')
    },  
    {
        path: '/home',
        name: 'home',
        component: () =>
            import ('../views/home.vue')
    },    
]
export default routes;