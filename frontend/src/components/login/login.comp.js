import React, {useState,useEffect} from 'react';
import { Row,Col ,Container,Form , Button,Spinner,Alert} from 'react-bootstrap'
import {loginPending, loginSuccess, loginFail} from "./loginSlice"
import { useDispatch,useSelector } from 'react-redux';
import {userLogin} from "../../api/userApi"
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../../page/dashboard/userAction';
const Login = ({formSwitcher}) => {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const dispatch=useDispatch()
 const navigate = useNavigate(); 
  const {isLoading,isAuth,error}=useSelector(state=>state.login)

  useEffect(()=>{
   (sessionStorage.getItem('accessJWT')) &&  navigate("/dashboard")
  },[navigate,isAuth])
  const handleOnchange = e =>{
    const {name,value}=e.target
    switch(name){
      case 'email':
        setEmail(value)
        break
      case 'password':
        setPassword(value)
        break
        default:
          break

    }
    
  };
  const handleOnSubmit= async (e)=>{
    e.preventDefault()
    if(!email || !password){
       return alert("fill up all form")
    }
    dispatch(loginPending())
    //ToDo call api to submit the form
    try {
			const isAuth = await userLogin({ email, password });
      if(isAuth.status==='error'){
       return dispatch(loginFail(isAuth.message))
      }
			

			dispatch(loginSuccess());
			dispatch(getUserProfile());
		 navigate("/dashboard");
      console.log(isAuth)
		} catch (error) {
			dispatch(loginFail(error.message));
		}
  }
  return (

    <Container>
      <Row>
        <Col>
            <h1 className='text-info text-center'>Client Login </h1>
            
            <hr/>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form autoComplete='off' onSubmit={handleOnSubmit}>
                <Form.Group>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" name="email" value={email} onChange={handleOnchange} placeholder="Enter Email" required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" value={password} onChange={handleOnchange} placeholder="Enter Password" required />
                </Form.Group>
                <Button type="submit">Login</Button>
                {isLoading && <Spinner variant='primary' animation='border'/>}
            </Form>
            <hr/>
        </Col>
      </Row>
      <div className="text-center mt-3">
  <a href="/password-reset"  className="btn btn-outline-info btn-sm rounded-pill px-4 shadow-sm">
 Forgot Password?
  </a>
</div>

    </Container>
  )
}

export default Login
