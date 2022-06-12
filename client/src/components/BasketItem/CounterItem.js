import React, { useState } from "react";
import {
  deleteBasketDevice,
  updateBasketDeviceQuantity,
} from "../../http/deviceAPI";
import "./CounterItem.css";

const CounterItem = ({ device }) => {
  console.log(device);
  const [refreshingDevice, setDevice] = useState(device);

  const changeQuantity = (isIncrease) => {
    const newQuantity = isIncrease
      ? refreshingDevice.quantity + 1
      : refreshingDevice.quantity - 1;

    console.log(newQuantity);
    if (newQuantity) {
      console.log("yes");
      updateBasketDeviceQuantity(device.id, newQuantity).then((data) => {
        if (Boolean(data[0])) {
          console.log("done");
          if (isIncrease) {
            let copiedRefreshingDevice = { ...refreshingDevice };
            copiedRefreshingDevice.quantity += 1;
            setDevice(copiedRefreshingDevice);
          } else {
            let copiedRefreshingDevice = { ...refreshingDevice };
            copiedRefreshingDevice.quantity -= 1;
            setDevice(copiedRefreshingDevice);
          }
        }
      });
    } else {
      console.log("del");
      deleteBasketDevice(device.id);
    }
  };

  return (
    <div className="counter-container w-50">
      <div
        className="counter-button counter-minus"
        onClick={() => changeQuantity(false)}
      >
        <p>-</p>
      </div>
      <div className="counter-number">
        <p>{refreshingDevice.quantity || 1}</p>
      </div>
      <div
        className="counter-button counter-plus"
        onClick={() => changeQuantity(true)}
      >
        <p>+</p>
      </div>
    </div>
  );
};

export default CounterItem;
