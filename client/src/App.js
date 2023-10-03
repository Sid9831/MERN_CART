import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/home";
import "bootstrap/dist/css/bootstrap.css";
import RequiresUnAuth from "./components/RequiresUnAuth";
import RequiresAuth from "./components/RequiresAuth";
import Cart from "./components/cart/cart";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          exact
          element={
            <RequiresUnAuth>
              <Login />
            </RequiresUnAuth>
          }
        />
        <Route
          path="/register"
          exact
          element={
            <RequiresUnAuth>
              <Register />
            </RequiresUnAuth>
          }
        />
        <Route
          path="/"
          exact
          element={
            <RequiresAuth>
              <Home />
            </RequiresAuth>
          }
        />
        <Route
          path="/cart"
          exact
          element={
            <RequiresAuth>
              <Cart />
            </RequiresAuth>
          }
        />
      </Routes>
    </>
  );
}

export default App;
