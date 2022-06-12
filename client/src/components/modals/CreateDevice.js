import React, {useContext, useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button, Col, Dropdown, Form, Row } from 'react-bootstrap'
import { Context } from '../..'
import { fetchTypes, fetchBrands, createDevice} from '../../http/deviceAPI';
import { observer } from 'mobx-react-lite';

const CreateDevice = observer(({show, onHide}) => {
  const {device} = useContext(Context)
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [file, setFile] = useState(null)
  const [brand, setBrands] = useState(null)
  const [type, setType] = useState(null)
  const [info, setInfo] = useState([])

  const addInfo = () => {
    setInfo([...info, {title: '', description: '', number: Date.now()}])
  }

  const removeInfo = (number) => {
    setInfo(info.filter(i => i.number !== number))
  }

  const changeInfo = (key, value, number) => {
    setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
  }

  const selectFile = e => {
    setFile(e.target.files[0])
    console.log(e)
  }

  const addDevice = () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', `${price}`)
    formData.append('img', file)
    formData.append('brandId', device.selectedBrand.id)
    formData.append('typeId', device.selectedType.id)
    formData.append('info', JSON.stringify(info))
    createDevice(formData).then(data => onHide())
  }

  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data))
    fetchBrands().then(data => device.setBrands(data))
  }, [])

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
            <Dropdown.Toggle>{device.selectedType.name || "Choose type"}</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map(type =>
                <Dropdown.Item 
                  key={type.id}
                  onClick={() => device.setSelectedType(type)}
                >
                  {type.name}
                </Dropdown.Item>  
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className='mt-2 mb-2'>
            <Dropdown.Toggle>{device.selectedBrand.name || "Choose brand"}</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map(brand =>
                <Dropdown.Item 
                  key={brand.id}
                  onClick={() => device.setSelectedBrand(brand)}
                >
                  {brand.name}
                </Dropdown.Item>  
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            value={name}
            onChange={e => setName(e.target.value)}
            className='mt-3'
            placeholder='Input device name'
          />
          <Form.Control
            value={price}
            onChange={e => setPrice(Number(e.target.value))}
            className='mt-3'
            placeholder='Input device price'
            type='number'
          />
          <Form.Control
            className='mt-3'
            type='file'
            onChange={selectFile}
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
                    value={i.title}
                    placeholder='Input property name'
                    onChange={e => changeInfo('title', e.target.value, i.number)}
                  />
                </Col>
                <Col md={4}>
                  <Form.Control
                    value={i.description}
                    placeholder='Input property description'
                    onChange={e => changeInfo('description', e.target.value, i.number)}
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
        <Button variant="outline-success" onClick={addDevice}>Add device</Button>
        <Button variant="outline-danger" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
})

export default CreateDevice