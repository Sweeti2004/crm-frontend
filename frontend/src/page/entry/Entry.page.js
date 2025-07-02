import React from 'react'
import { useState } from 'react';
import { Container } from 'react-bootstrap'
import './entry.style.css'
import Login from '../../components/login/login.comp'
import ResetPassword from '../../components/password-reset/PasswordReset.comp.js';
const Entry = () => {
  const [frmLoad,setFrmLoad]=useState("login");
  
  const handleOnResetSubmit= e=>{
    e.preventDefault()

  }
  const formSwitcher=frmType=>{
    setFrmLoad(frmType)
  }
  return (
    <div className='entry-page bg-info'>
      <Container className="form-box p-5 w-25 mb-4 bg-light rounded-3">
        {frmLoad==='login' && <h1><Login  formSwitcher={formSwitcher} /></h1>
}

       {frmLoad==='reset' && <ResetPassword //handleOnchange={handleOnchange}
        formSwitcher={formSwitcher} 
       // email={email}
         handleOnResetSubmit={handleOnResetSubmit}
         />}
      </Container>
    </div>
  )
}

export default Entry
