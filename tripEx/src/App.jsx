import { Outlet, NavLink } from "react-router-dom";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <div className="root-layout">
      <header>
        <LoginPage />
        <nav>
          <h1>Routes</h1>
          <NavLink to="/">Home </NavLink>
          <NavLink to="trips">trips </NavLink>
          <NavLink to="guides">guides </NavLink>
          <NavLink to="trip">trip </NavLink>
        </nav>
      </header>
      <h2>Other content</h2>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
