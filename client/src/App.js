import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import { Context } from "./index";
import { check } from "./http/userAPI";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { fetchBasket } from "./http/deviceAPI";

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check()
      .then((data) => {
        if (data) {
          user.setUser(true);
          user.setIsAuth(true);
          user.setUserId(data.id);
        }
      })
      .finally(() => {
        if (user.isAuth) {
          fetchBasket(user.userId).then((basketArr) => {
            user.setBasket(basketArr);
          });
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner animation={"grow"} />;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
