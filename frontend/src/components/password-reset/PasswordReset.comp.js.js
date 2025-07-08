import React, { useState } from 'react';
import { Row, Col, Container, Form, Button, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { sendPasswordResetOtp } from './passwordAction';
const ResetPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("")
  const { isLoading, status, message } = useSelector(state => state.password)
  const handleOnResetSubmit = e => {
    e.preventDefault();
    dispatch(sendPasswordResetOtp(email))
  }
  const handleOnChange = e => {
    const { name, value } = e.target
    setEmail(value)
  }

  return (

    <Container>
      <Row>
        <Col>
          <h1 className='text-info text-center'>Reset Password</h1>

          <hr />
          {message && (<Alert variant={status === "success" ? "success" : "danger"} > {message}</Alert>)}
          <Form autoComplete='off' onSubmit={handleOnResetSubmit}>
            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" name="email" value={email} onChange={handleOnChange} placeholder="Enter Email" required />
            </Form.Group>
            <br />
            <Button type="submit">Reset Password</Button>
          </Form>
          <hr />
        </Col>
      </Row>
     

    </Container >
  )
}

export default ResetPassword
