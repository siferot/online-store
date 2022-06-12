import React, { useContext } from "react";
import { Card, Col, Image } from "react-bootstrap";
import star from "../../assets/star.svg";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../../utils/consts";
import "./DeviceItem.css";

const DeviceItem = ({ device }) => {
  const navigate = useNavigate();
  return (
    <div
      className="card-container"
      md={3}
      onClick={() => navigate(DEVICE_ROUTE + "/" + device.id)}
    >
      <Card style={{ cursor: "pointer" }} className="mb-3 p-1">
        <img src={process.env.REACT_APP_API_URL + device.img} />
        <div className="p-1">
          <div className="price">{device.price} ₽</div>
          <div className="d-flex justify-content-between align-items-center mt-1">
            <div className="text-black-50">{device.brandName}</div>
            <div className="d-flex align-items-center">
              <div>{device.rating}</div>
              <Image width={18} height={18} src={star} />
            </div>
          </div>
          <div>{device.name}</div>
        </div>
      </Card>
    </div>
  );
};

export default DeviceItem;
