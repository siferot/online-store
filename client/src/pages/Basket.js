import React, { useContext, useEffect, useState } from "react";
import { Container, ListGroup, Spinner } from "react-bootstrap";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

import BasketDevice from "../components/BasketItem/BasketDevice";

const Basket = observer(() => {
  const { user } = useContext(Context);

  // useEffect(() => {
  //   user.basket.forEach(function (busketDevice, index) {
  //     fetchOneDevice(busketDevice.deviceId)
  //       .then((data) => {
  //         setDeviceArray((existingItems) => {
  //           console.log(existingItems, data);
  //           return [
  //             ...existingItems.slice(0, index),
  //             data,
  //             ...existingItems.slice(index + 1),
  //           ];
  //         });
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   });
  //   console.log(deviceArray);
  // }, []);

  // if (loading) {
  //   return <Spinner animation={"grow"} />;
  // }

  return (
    <Container>
      <ListGroup className="mt-4">
        {user.basket.map((busketDevice) => (
          <ListGroup.Item key={busketDevice.id}>
            <BasketDevice device={busketDevice}></BasketDevice>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
});

export default Basket;
