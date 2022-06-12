import React, { useContext } from "react";
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE,
  BASKET_ROUTE,
} from "../utils/consts";
import { observer } from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink
          style={{ color: "white" }}
          className="text-decoration-none"
          to={SHOP_ROUTE}
        >
          BuyDevice
        </NavLink>
        {user.isAuth ? (
          <Nav className="ms-auto" style={{ color: "white" }}>
            <Button
              variant={"outline-light"}
              onClick={() => navigate(BASKET_ROUTE)}
            >
              Busket {user.basket.length}
            </Button>
            <Button
              variant={"outline-light"}
              className="ms-4"
              onClick={() => navigate(ADMIN_ROUTE)}
            >
              Admin panel
            </Button>
            <Button
              variant={"outline-light"}
              className="ms-4"
              onClick={() => logOut()}
            >
              Logout
            </Button>
          </Nav>
        ) : (
          <Nav className="ms-auto" style={{ color: "white" }}>
            <Button
              variant={"outline-light"}
              onClick={() => navigate(LOGIN_ROUTE)}
            >
              Login
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
