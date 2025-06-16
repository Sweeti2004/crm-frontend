import React from "react";
import {
  Form,
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";
export const AddTicketForm = ({ handleOnSubmit, handleOnChange, frmDt,frmDataErro}) => {
  console.log(frmDt)
  return (
    <Container fluid className="p-5 mb-4 bg-light rounded-3">
      <h1 className="text-info text-center">Add New Ticket</h1>
      <hr/>
      <Form autoComplete="off" onSubmit={handleOnSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>
            Subject
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              name="subject"
              onChange={handleOnChange}
              value={frmDt.subject}
              placeholder="Subject"
              required
            />
            <Form.Text className="text-danger">
              {frmDataErro.subject && "subject length must be more than three!"}
            </Form.Text>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>
            Issue Found
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="date"
              name="issueDate"
              onChange={handleOnChange}
              value={frmDt.issueDate}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="detail"
            rows="5"
            value={frmDt.detail}
            onChange={handleOnChange}
            required
          />
        </Form.Group>

        <Button type="submit" variant="info" className="w-100">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default AddTicketForm;
