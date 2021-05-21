import "./App.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { authSelector } from "./slices/auth";

//components
import NavbarComponent from "./component/NavbarComponent";
import RegisterPage from "./pages/register/RegisterPage";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import RoomPage from "./pages/room/RoomPage";

const App = () => {
  const userToken = localStorage.getItem("cosmicUser");

  const { loading } = useSelector(authSelector);

  return (
    <div className="App">
      <NavbarComponent />

      <Router>
        <Switch>
          {loading && <h1>Loading</h1>}
          <Route path="/" exact>
            {userToken ? <HomePage /> : <Redirect to="/register" />}
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/room/:roomName">
            <RoomPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
