import React from 'react'
import { useState } from 'react';
import { Container } from 'react-bootstrap'
import './entry.style.css'
import Login from '../../components/login/login.comp'
import ResetPassword from '../../components/password-reset/PasswordReset.comp.js';
const Entry = () => {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [frmLoad,setFrmLoad]=useState("login");
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
  const handleOnSubmit= e=>{
    e.preventDefault()
    if(!email || !password){
       return alert("fill up all form")
    }
    //ToDo call api to submit the form
  }
  const handleOnResetSubmit= e=>{
    e.preventDefault()
    if(!email ){
       return alert("please enter the email")
    }
    console.log(email)
  }
  const formSwitcher=frmType=>{
    setFrmLoad(frmType)
  }
  return (
    <div className='entry-page bg-info'>
      <Container className="form-box p-5 w-25 mb-4 bg-light rounded-3">
        {frmLoad==='login' &&         <h1><Login handleOnchange={handleOnchange} formSwitcher={formSwitcher} email={email} pass={password} handleOnSubmit={handleOnSubmit}/></h1>
}

       {frmLoad==='reset' && <ResetPassword handleOnchange={handleOnchange} formSwitcher={formSwitcher} email={email} handleOnResetSubmit={handleOnResetSubmit}/>}
      </Container>
    </div>
  )
}

export default Entry
