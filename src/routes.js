import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import UploadSingle from "./views/admin/uploadSingle";
import Results from "views/admin/results";
import DataTables from "views/admin/dataTables";

// Auth Imports
import SignInCentered from "views/auth/signIn";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Subir Audio",
    layout: "/admin",
    path: "/UploadSingle",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: UploadSingle,
    secondary: true,
  },
  {
    name: "Subir Audios por Lotes",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/data-tables",
    component: DataTables,
  },
  {
    name: "Resultados",
    layout: "/admin",
    path: "/results",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: Results,
  },
];

export default routes;
