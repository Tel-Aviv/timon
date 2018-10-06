// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// import ContentPaste from "@material-ui/icons/ContentPaste";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
// core components/views
import DashboardPage from "../views/Dashboard/Dashboard.jsx";
import TableList from "../views/TableList/TableList.jsx";
import Icons from "../views/Icons/Icons.jsx";
import Maps from "../views/Maps/Maps.jsx";
import NotificationsPage from "../views/Notifications/Notifications.jsx";
import UserProfile from "../views/UserProfile/UserProfile.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "City",
    navbarName: "City",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/region/1",
    sidebarName: "Region 1",
    navbarName: "Region 1",
    icon: LocationOn,
    component: TableList
  },
  {
    path: '/region/2',
    sidebarName: "Region 2",
    navbarName: "Region 2",
    icon: BubbleChart,
    component: Icons
  },
  {
    path: "/cameras",
    sidebarName: "Cameras",
    navbarName: "Cameras",
    icon: LocationOn,
    component: Maps
  },
  { redirect: true,
    path: "/",
    to: "/dashboard",
    navbarName: "City" }
];

export default dashboardRoutes;
