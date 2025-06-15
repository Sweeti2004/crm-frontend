import React  from 'react';
import { Row,Col ,Container,Form , Button} from 'react-bootstrap'

const ResetPassword = ({handleOnchange,handleOnResetSubmit,formSwitcher,email}) => {
  return (

    <Container>
      <Row>
        <Col>
            <h1 className='text-info text-center'>Reset Password</h1>
            
            <hr/>
            <Form autoComplete='off' onSubmit={handleOnResetSubmit}>
                <Form.Group>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" name="email" value={email} onChange={handleOnchange} placeholder="Enter Email" required />
                </Form.Group>
              <br/>
                <Button type="submit">Reset Password</Button>
            </Form>
            <hr/>
        </Col>
      </Row>
      <div className="text-center mt-3">
  <a href="#!" onClick={()=>formSwitcher('login')} className="btn btn-outline-info btn-sm rounded-pill px-4 shadow-sm">
 Loging Now
  </a>
</div>

    </Container>
  )
}

export default ResetPassword
