import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  fetchOneDevice,
  fetchBrands,
  addBasketDevice,
} from "../http/deviceAPI";
import { Spinner, Card } from "react-bootstrap";
import { Context } from "..";
import RatingItemLoginned from "../components/RatingItemLoginned";
import RatingItemUnloginned from "../components/RatingItemUnloginned";
import CounterItem from "../components/BasketItem/CounterItem";

const DevicePage = () => {
  const [selectedDevice, setDevice] = useState({ info: [] });
  const [loading, setLoading] = useState(true);
  // const [rate, setRate] = useState(2);
  // const [ratingTemp, setRatingTemp] = useState(2)
  const { id } = useParams();
  const { user } = useContext(Context);
  const { device } = useContext(Context);
  // const ratings = [1, 2, 3, 4, 5];
  // console.log(device);

  // const changeRate = (newRate) => {
  //   console.log(user.userId)
  //   createRate(newRate, user.userId, id).then(data => {
  //     console.log(data)
  //   })
  // }

  const addToBasket = () => {
    addBasketDevice(user.userId, Number(id)).then((data) => {
      console.log(data);
    });
  };

  useEffect(() => {
    fetchBrands().then((data) => {
      device.setBrands(data);
    });
    fetchOneDevice(id)
      .then((data) => {
        setDevice(data);
      })
      .finally(() => {
        // selectedDevice.brandName = device.brands.filter(
        //   (brand) => brand.id === selectedDevice.brandId
        // )[0]?.name;

        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner animation={"grow"} />;
  }

  return (
    <Container className="mt-4" width={1000}>
      <div className="border rounded p-2 shadow-1-strong">
        <Row>
          <Col md={6}>
            <div className="ratio ratio-1x1">
              <Image
                className="image-fluid d-block mx-auto"
                src={process.env.REACT_APP_API_URL + selectedDevice.img}
              />
            </div>
          </Col>
          <Col md={6}>
            <h1>
              {selectedDevice.brandName} {selectedDevice.name}
            </h1>
            <Row className="d-flex w-75 mt-5 mb-3 justify-content-between align-items-stretch">
              <h2 className="mb-0 w-auto">{selectedDevice.price} ₽</h2>
              {user.basket.filter((elem) => elem.deviceId === Number(id))
                .length ? (
                <CounterItem
                  device={
                    user.basket.filter(
                      (elem) => elem.deviceId === Number(id)
                    )[0]
                  }
                />
              ) : (
                <Button
                  className="w-50"
                  variant="outline-dark"
                  onClick={addToBasket}
                >
                  Add to bucket
                </Button>
              )}
              {/* <Button
                className="w-50"
                variant="outline-dark"
                onClick={addToBasket}
              >

                Add to bucket
              </Button> */}
            </Row>
            {user.userId ? <RatingItemLoginned /> : <RatingItemUnloginned />}
          </Col>
        </Row>
      </div>
      <div className="border rounded p-2 mt-2 shadow-1-strong">
        <Row className="d-flex flex-column m-3">
          <h1 className="mb-2">Характеристики</h1>
          {selectedDevice.info.map((info) => (
            <Row key={info.id}>
              {info.title}: {info.description}
            </Row>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default DevicePage;
