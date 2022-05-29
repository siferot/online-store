import React, {useContext, useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button, Col, Dropdown, Form, Row } from 'react-bootstrap'
import { Context } from '../..'

const CreateDevice = ({show, onHide}) => {
  const {device} = useContext(Context)
  const [info, setInfo] = useState([])

  const addInfo = () => {
    setInfo([...info, {title: '', description: '', number: Date.now()}])
  }

  const removeInfo = (number) => {
    setInfo(info.filter(i => i.number !== number))
  }

  return (
    <Modal
      size="lg"
      show = {show}
      onHide = {onHide}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add device
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className='mt-2 mb-2'>
            <Dropdown.Toggle>Choose type</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map(type =>
                <Dropdown.Item key={type.id}>{type.name}</Dropdown.Item>  
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className='mt-2 mb-2'>
            <Dropdown.Toggle>Choose brand</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map(brand =>
                <Dropdown.Item key={brand.id}>{brand.name}</Dropdown.Item>  
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            className='mt-3'
            placeholder='Input device name'
          />
          <Form.Control
            className='mt-3'
            placeholder='Input device price'
            type='number'
          />
          <Form.Control
            className='mt-3'
            type='file'
          />
          <hr/>
          <Button
            variant={"outline-dark"}
            onClick={addInfo}
          >
            Add new property
          </Button>
          {
            info.map(i =>
              <Row className="mt-2" key={i.number}>
                <Col md={4}>
                  <Form.Control
                    placeholder='Input property name'
                  />
                </Col>
                <Col md={4}>
                  <Form.Control
                    placeholder='Input property description'
                  />
                </Col>
                <Col md={4}>
                  <Button
                    onClick={() => removeInfo(i.number)}
                    variant='outline-danger'
                  >
                    Delete property
                  </Button>
                </Col>
              </Row>
            )
          }
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={onHide}>Add device</Button>
        <Button variant="outline-danger" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateDevice