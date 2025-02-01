import App from './App'
import Login from './components/auth/Login.vue';
import Register from './components/auth/Register.vue';
import About from './components/marketing/About.vue';
import LandingPage from './components/marketing/LandingPage.vue';
import ShowTodo from './components/marketing/ShowTodo.vue';

const routes = [
  {
    path: "/",
    name: 'home',
    component: LandingPage,
  },
  {
    path: "/todo",
    name: 'todo',
    component: App,
  },
  {
    path: "/about",
    name: 'about',
    component: About,
  },
  {
    path: "/login",
    name: 'login',
    component: Login,
  },
  {
    path: "/register",
    name: 'register',
    component: Register,
  },
  {
    path: "/todo/:id",
    name: 'todo.show',
    component: ShowTodo,
  },
];

export default routes;