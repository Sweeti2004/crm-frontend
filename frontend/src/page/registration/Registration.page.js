import React from "react";
import { Container, Card } from "react-bootstrap";

import RegistrationForm from "../../components/registration-form/Registration.comp";
import "./registration.style.css";

const Registration = () => {
  return (
    <div className="registration-page bg-info">
      <Container className="mt-5 d-flex justify-content-center">
        <Card className="form-box p-4 shadow">
          <RegistrationForm />
        </Card>
      </Container>
    </div>
  );
};

export default Registration;
