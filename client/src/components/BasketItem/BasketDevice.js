import React, { useEffect, useState } from "react";
import { fetchOneDevice } from "../../http/deviceAPI";
import { Row, Spinner, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./BasketDevice.css";
import CounterItem from "./CounterItem";

const BasketDevice = ({ device }) => {
  const [loading, setLoading] = useState(true);
  const [refreshingDevice, setDevice] = useState();

  useEffect(() => {
    fetchOneDevice(device.deviceId)
      .then((data) => {
        setDevice(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner animation={"grow"} />;
  }

  return (
    <div
      className="d-flex align-items-center justify-content-between"
      fontSize="20px"
    >
      <div className="d-flex align-items-center">
        <Image
          height="60px"
          src={process.env.REACT_APP_API_URL + refreshingDevice.img}
        />
        <div className="ms-3">
          {refreshingDevice.brandName} {refreshingDevice.name}
        </div>
      </div>
      <div className="d-flex align-items-center">
        <CounterItem device={device} />
        <div className="ms-3 price-container" width="100px">
          {refreshingDevice.price}
        </div>
        <div className="ms-1">
          <FontAwesomeIcon icon={faTrashAlt} className="trash-icon" />
        </div>
      </div>
    </div>
  );
};

export default BasketDevice;
