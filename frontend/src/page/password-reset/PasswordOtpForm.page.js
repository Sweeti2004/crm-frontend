import React from "react";
import { useSelector } from "react-redux";

import ResetPassword from "../../components/password-reset/PasswordReset.comp.js"; 
import "./passwordOtpForm.style.css";

//Workflow

// [x] Create password reset page
// [] Add request OTP form
// [] Add redux store with Redux-toolkit to handle the network status
// [] sent OTP to email from API (API Already created)
// [] Load form to input OTP and new password
// [] New password must match confirm password, form validation
// [] Connect to API Endpoint (API Already created)
// [] Add reducer through Redux-toolkit to handle the network status and provide the feedback to the user
// [] Send email, OTP and new password to update the password.

import { Card } from "react-bootstrap";
import UpdatePasswordForm from "../../components/password-reset/updatePasswordForm.comp.js";

export const PasswordOtpForm = () => {
	const {showUpdatePassForm}=useSelector(state=>state.password)
	return (
		<div className="entry-page bg-info min-vh-100 d-flex justify-content-center align-items-center">
			<Card className="form-box p-4 shadow-lg" style={{ maxWidth: "500px", width: "100%" }}>
				<Card.Body>
					{showUpdatePassForm?<UpdatePasswordForm/>:<ResetPassword /> }
					 <div className="text-center mt-3">
        <a href="/">
          Login Now
        </a>
      </div>
				</Card.Body>
			</Card>
			
		</div>
	);
};
