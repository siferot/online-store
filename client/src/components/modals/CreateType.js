import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button, Form } from 'react-bootstrap'
import { createType } from '../../http/deviceAPI'


const CreateType = ({show, onHide}) => {
  const [value, setValue] = useState('')

  const addType = () => {
    createType({name: value}).then(data => {
      setValue('')
      onHide()
    })
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
          Add type
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={"Input type name"}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={addType}>Add type</Button>
        <Button variant="outline-danger" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateType