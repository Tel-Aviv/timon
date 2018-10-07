// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Camera from "@material-ui/icons/CameraFrontSharp";
import BubbleChart from "@material-ui/icons/BubbleChartSharp";
import LocationOn from "@material-ui/icons/LocationOn";
import PredictionsIcon from "@material-ui/icons/FlipSharp";
// core components/views
import Region from '../Region';
import Home from '../Home';
import Cameras from "../Cameras";
import Predictions from "../views/Predictions/Predictions";

const dashboardRoutes = [
  {
    path: "/home",
    sidebarName: "City",
    navbarName: "City",
    icon: Dashboard,
    component: Home
  }, {
    path: "/region/1",
    sidebarName: "Region 1",
    navbarName: "Region 1",
    icon: LocationOn,
    component: Region
  }, {
    path: '/region/2',
    sidebarName: "Region 2",
    navbarName: "Region 2",
    icon: LocationOn,
    component: Region
  }, {
    path: "/cameras",
    sidebarName: "Cameras",
    navbarName: "Cameras",
    icon: Camera,
    component: Cameras
  },{
    path: "/predictions",
    sidebarName: "Predictions",
    navbarName: "Predictions",
    icon: PredictionsIcon,
    component: Predictions
  }, { redirect: true,
    path: "/",
    to: "/home",
    navbarName: "City" }
];

export default dashboardRoutes;
