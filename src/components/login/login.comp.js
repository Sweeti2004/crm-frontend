import React  from 'react';
import { Row,Col ,Container,Form , Button} from 'react-bootstrap'

const Login = ({handleOnchange,handleOnSubmit,formSwitcher,email,pass}) => {
  return (

    <Container>
      <Row>
        <Col>
            <h1 className='text-info text-center'>Client Login </h1>
            
            <hr/>
            <Form autoComplete='off' onSubmit={handleOnSubmit}>
                <Form.Group>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" name="email" value={email} onChange={handleOnchange} placeholder="Enter Email" required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" value={pass} onChange={handleOnchange} placeholder="Enter Password" required />
                </Form.Group>
                <Button type="submit">Login</Button>
            </Form>
            <hr/>
        </Col>
      </Row>
      <div className="text-center mt-3">
  <a href="#!" onClick={()=> formSwitcher('reset')} className="btn btn-outline-info btn-sm rounded-pill px-4 shadow-sm">
 Forgot Password?
  </a>
</div>

    </Container>
  )
}

export default Login
