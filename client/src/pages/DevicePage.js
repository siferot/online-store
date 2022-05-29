import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import star from '../assets/fill-star.svg'
import activeStar from '../assets/fill-star-active.svg'
import { useParams } from 'react-router-dom';
import { fetchOneDevice } from '../http/deviceAPI';

const DevicePage = () => {
  const [device, setDevice] = useState({info: []})
  const {id} = useParams()
  const ratings = [1, 2, 3, 4, 5]

  useEffect(() => {
    fetchOneDevice(id).then(data => setDevice(data))
  }, [])

    return (
      <Container className="mt-4" width={1000}>
        <div className='border rounded p-2 shadow-1-strong'>
          <Row>
            <Col md={6}>
              <div className='ratio ratio-1x1'>
                <Image className='image-fluid d-block mx-auto' src={process.env.REACT_APP_API_URL + device.img}/>
              </div>
            </Col>
            <Col md={6}>
              <h1>Apple {device.name}</h1>
              <Row className='d-flex w-75 mt-5 justify-content-between align-items-center'>
                <h2 className='mb-0 w-auto'>{device.price} ₽</h2>
                <Button className='w-50' variant='outline-dark'>Add to bucket</Button>
              </Row>
              {ratings.map(rating =>
                <Image 
                  width={22} 
                  height={22} 
                  src={rating <= device.rating ? activeStar : star}
                  className='mt-3 me-1'
                  style={{cursor: 'pointer'}}
                  key={rating}
                  onClick={() => {
                    device.rating = rating;
                  }}
                />
              )}
            </Col>
          </Row>
        </div>
        <div className='border rounded p-2 mt-2 shadow-1-strong'>
          <Row className='d-flex flex-column m-3'>
            <h1 className='mb-2'>Характеристики</h1>
            {device.info.map(info => 
              <Row key={info.id}>
                {info.title}: {info.description}
              </Row>
            )}
          </Row>
        </div>
      </Container>
    );
};

export default DevicePage;