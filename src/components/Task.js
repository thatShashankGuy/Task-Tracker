import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const Task = ({ addTask }) => {
  const [desc, setDesc] = useState('')
  const [author, setAuthor] = useState('')
  const [priority, setPriority] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    addTask({ desc, author, priority })

    setDesc('')
    setAuthor('')
    setPriority('')
  }

  const taskStyle = {
    color: 'blue',

  };

  return (
    <Card className='mt-5 mb-3' style ={{backgroundColor: 'rgba(245, 245, 245, 0.0)'}}>
      <Card.Body>
        <Form onSubmit={onSubmit}>
          <Row className='my-3'>
            <Col>
              <Form.Control
                placeholder='Task Description'
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                placeholder='Author'
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Control
                as='select'
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value='0'>Priority</option>
                <option value='low'>Low</option>
                <option value='moderate'>Moderate</option>
                <option value='high'>High</option>
              </Form.Control>
            </Col>
          </Row>
          <Row className='my-3'>
            <Col>
              <Button type='submit' variant='secondary' block>
                Add Task
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default Task
