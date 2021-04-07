import Dashboard from "views/Dashboard.jsx"
import Credito from "views/admin/Credito"
import Marca from "views/admin/Marca"
import Musica from "views/admin/Musica"
import Contato from "views/admin/Contato"
import Perfil from "views/admin/Perfis"
import Notificacao from "views/admin/Emails"
import UserPage from "views/User.jsx";

import Solicitacao from "views/user/Solicitacoes"
import GestaoRepo from "views/user/Gestao_Repositorio"
import CreditoForm from "views/user/Credito.jsx"
import ContatoForm from "views/user/Contato.jsx"
import MusicaForm from "views/user/Musica.jsx"
import MarcaForm from "views/user/Marca.jsx"

var routes = [
  {
    path: "/dashboard",
    name: "Home",
    icon: "nc-icon nc-chart-bar-32",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/notificacoes",
    name: "Notificações",
    icon: "nc-icon nc-send",
    component: Notificacao,
    layout: "/admin"
  },
  {
    path: "/user-page",
    name: "Contas",
    icon: "nc-icon nc-single-02",
    component: Perfil,
    layout: "/admin"
  },
  {
    path: "/credito-retido",
    name: "Credito Retido",
    icon: "nc-icon nc-credit-card",
    component: Credito,
    layout: "/admin"
  },
  // {
  //   path: "/marca",
  //   name: "Marcas",
  //   icon: "nc-icon nc-money-coins",
  //   component: Marca,
  //   layout: "/admin"
  // },
  // {
  //   path: "/musica",
  //   name: "Musicas",
  //   icon: "nc-icon nc-note-03",
  //   component: Musica,
  //   layout: "/admin"
  // },
  {
    path: "/contato",
    name: "Contatos",
    icon: "nc-icon nc-chat-33",
    component: Contato,
    layout: "/admin"
  }
];

var routes_user = [
  {
    path: "/gestao-repositorio",
    name: "Gestão do Repositório",
    icon: "nc-icon nc-chart-bar-32",
    component: GestaoRepo,
    layout: "/user"
  },
  {
    path: "/solicitacao",
    name: "Solicitações",
    icon: "nc-icon nc-chart-bar-32",
    component: Solicitacao,
    layout: "/user"
  },
  {
    path: "/credito-retido",
    name: "Credito Retido",
    icon: "nc-icon nc-chart-bar-32",
    component: CreditoForm,
    layout: "/user"
  },
  {
    path: "/marca",
    name: "Marcas",
    icon: "nc-icon nc-chart-bar-32",
    component: MarcaForm,
    layout: "/user"
  },
  {
    path: "/musica",
    name: "Musicas",
    icon: "nc-icon nc-chart-bar-32",
    component: MusicaForm,
    layout: "/user"
  },
  {
    path: "/contato-user",
    name: "Contato",
    icon: "nc-icon nc-chart-bar-32",
    component: ContatoForm,
    layout: "/user"
  }
]
export default routes;
export const routesUser = routes_user;

