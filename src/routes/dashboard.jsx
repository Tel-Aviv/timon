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
import DataVis from '../DataVis';
import Predictions from "../views/Predictions/Predictions";

const dashboardRoutes = [
  {
    path: "/home",
    sidebarName: "Tel-Aviv City",
    navbarName: "City",
    icon: Dashboard,
    component: Home
  }, {
    path: "/region/1",
    sidebarName: "Ibn Gvirol Area",
    navbarName: "Ibn Gvirol Area",
    icon: LocationOn,
    component: Region
  }, {
    path: '/region/2',
    sidebarName: "Kaplan Area",
    navbarName: "Kaplan Area",
    icon: LocationOn,
    component: Region
  }, {
    path: "/vis",
    sidebarName: "Visualization",
    navbarName: "Visualization",
    icon: BubbleChart,
    component: DataVis
  },{
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
