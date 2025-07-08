import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "./passwordAction";
import {
	Container,
	Row,
	Col,
	Form,
	Button,
	Spinner,
	Alert,
} from "react-bootstrap";

const initialState = {
	pin: "",
	password: "",
	confirmPass: "",
};

const passVerificationError = {
	isLenthy: false,
	hasUpper: false,
	hasLower: false,
	hasNumber: false,
	hasSpclChr: false,
	confirmPass: false,
};

const UpdatePasswordForm = () => {
	const dispatch = useDispatch();
	const [newPassword, setNewPassword] = useState(initialState);
	const [passwordError, setPasswordError] = useState(passVerificationError);

	const { isLoading, status, message, email } = useSelector(
		(state) => state.password
	);

	// Reset form when password update is successful
	useEffect(() => {
		if (status === "success") {
			setNewPassword(initialState);
			setPasswordError(passVerificationError);
		}
	}, [status]);

	const handleOnChange = (e) => {
		const { name, value } = e.target;
		const updatedPassword = { ...newPassword, [name]: value };
		setNewPassword(updatedPassword);

		let updatedError = { ...passwordError };

		if (name === "password") {
			updatedError = {
				...updatedError,
				isLenthy: value.length >= 8,
				hasUpper: /[A-Z]/.test(value),
				hasLower: /[a-z]/.test(value),
				hasNumber: /[0-9]/.test(value),
				hasSpclChr: /[@#$%&]/.test(value),
			};
		}

		if (name === "confirmPass") {
			updatedError.confirmPass = updatedPassword.password === value;
		}

		setPasswordError(updatedError);
	};

	const handleOnSubmit = (e) => {
		e.preventDefault();
		const { pin, password } = newPassword;

		const newPassObj = {
			pin,
			newPassword: password,
			email,
		};

		dispatch(updatePassword(newPassObj));
	};

	return (
		<Container>
			<Row>
				<Col>
					<h1 className="text-info">Update Password</h1>
				</Col>
			</Row>
			<hr />
			<Row>
				<Col>
					{message && (
						<Alert variant={status === "success" ? "success" : "danger"}>
							{message}
						</Alert>
					)}
					{isLoading && <Spinner variant="primary" animation="border" />}
				</Col>
			</Row>

			<Row>
				<Col>
					<Form onSubmit={handleOnSubmit}>
						<Form.Group>
							<Form.Label>OTP</Form.Label>
							<Form.Control
								type="number"
								name="pin"
								value={newPassword.pin}
								onChange={handleOnChange}
								placeholder="Enter OTP"
								required
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label>New Password</Form.Label>
							<Form.Control
								type="password"
								name="password"
								value={newPassword.password}
								onChange={handleOnChange}
								placeholder="Enter New Password"
								required
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control
								type="password"
								name="confirmPass"
								value={newPassword.confirmPass}
								onChange={handleOnChange}
								placeholder="Confirm Password"
								required
							/>
						</Form.Group>

						<Form.Text>
							{!passwordError.confirmPass && (
								<div className="text-danger mb-3">
									Password doesn't match!
								</div>
							)}
						</Form.Text>

						<ul className="mb-4">
							<li className={passwordError.isLenthy ? "text-success" : "text-danger"}>
								Min 8 characters
							</li>
							<li className={passwordError.hasUpper ? "text-success" : "text-danger"}>
								At least one uppercase letter
							</li>
							<li className={passwordError.hasLower ? "text-success" : "text-danger"}>
								At least one lowercase letter
							</li>
							<li className={passwordError.hasNumber ? "text-success" : "text-danger"}>
								At least one number
							</li>
							<li className={passwordError.hasSpclChr ? "text-success" : "text-danger"}>
								At least one special character: @ # $ % &
							</li>
						</ul>

						<Button
							variant="primary"
							type="submit"
							disabled={Object.values(passwordError).includes(false)}
						>
							Submit
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default UpdatePasswordForm;
