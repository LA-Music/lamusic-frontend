import Dashboard from "views/Dashboard.jsx"
import Credito from "views/admin/Credito"
import Marca from "views/admin/Marca"
import Musica from "views/admin/Musica"
import Contato from "views/admin/Contato"
import UserPage from "views/User.jsx";


var routes = [
  {
    path: "/dashboard",
    name: "Home",
    icon: "nc-icon nc-chart-bar-32",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/credito-retido",
    name: "Credito Retido",
    icon: "nc-icon nc-credit-card",
    component: Credito,
    layout: "/admin"
  },
  {
    path: "/marca",
    name: "Marcas",
    icon: "nc-icon nc-money-coins",
    component: Marca,
    layout: "/admin"
  },
  {
    path: "/musica",
    name: "Musicas",
    icon: "nc-icon nc-note-03",
    component: Musica,
    layout: "/admin"
  },
  {
    path: "/contato",
    name: "Contatos",
    icon: "nc-icon nc-chat-33",
    component: Contato,
    layout: "/admin"
  },
  {
    path: "/user-page",
    name: "Perfil",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin"
  }
];
export default routes;
