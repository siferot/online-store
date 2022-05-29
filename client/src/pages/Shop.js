import React, { useContext, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchTypes, fetchBrands, fetchDevices } from '../http/deviceAPI';

const Shop = observer(() => {
  const {device} = useContext(Context)

  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data))
    fetchBrands().then(data => device.setBrands(data))
    fetchDevices().then(data => device.setDevices(data.rows))
  }, [])

    return (
      <Container>
        <Row className="mt-2">
          <Col md={3}>
            <TypeBar/>  
          </Col>
          <Col md={9}>
            <BrandBar/>
            <div className="mt-4"><DeviceList/></div>
          </Col>
        </Row>
      </Container>
    );
});

export default Shop;