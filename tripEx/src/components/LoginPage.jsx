import { useState } from "react";
//Utils
import facade from "../util/apiFacade";

//Components
import Login from "./Login";
import LoggedIn from "./LoggedIn";

function LoginPage() {
  const [loggedIn, setLoggedIn] = useState(false);

  const logout = () => {
    /*TODO*/
    facade.logout();
    setLoggedIn(false);
  };
  const login = (user, pass) => {
    facade.login(user, pass).then(() => setLoggedIn(true));
    console.log(user, pass);
  };

  return (
    <div>
      {!loggedIn ? (
        <Login login={login} />
      ) : (
        <div>
          <LoggedIn />
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}
export default LoginPage;
