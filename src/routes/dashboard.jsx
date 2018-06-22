import Dashboard from "views/Dashboard/Dashboard";
import MyWebsites from "views/MyWebsites/MyWebsites";
import Importer from "views/Importer/Importer";
import UserLog from "views/UserLog/UserLog";
import Scheduler from "views/Scheduler/Scheduler";
import Dataset from "views/Dataset/Dataset";
import Notifications from "views/Notifications/Notifications";
import Upgrade from "views/Upgrade/Upgrade";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard
  },  
  {
    path: "/importer",
    name: "Importer",
    icon: "pe-7s-rocket",
    component: Importer
  },
  {
    path: "/my-websites",
    name: "My Websites",
    icon: "pe-7s-user",
    component: MyWebsites
  },
  {
    path: "/scheduler",
    name: "Scheduler",
    icon: "pe-7s-clock",
    component: Scheduler
  },
  {
    path: "/userlog",
    name: "User Log",
    icon: "pe-7s-note2",
    component: UserLog
  },
  { 
    path: "/dataset", 
    name: "Dataset", 
    icon: "pe-7s-server", 
    component: Dataset 
  },
  {
    upgrade: true,
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "pe-7s-rocket",
    component: Upgrade
  },
  { redirect: true, path: "/", to: "/dashboard", name: "Dashboard" }
];

export default dashboardRoutes;
