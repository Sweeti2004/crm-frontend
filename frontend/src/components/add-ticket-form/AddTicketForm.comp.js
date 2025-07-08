import React from "react";
import { useEffect, useState } from "react"
import {
  Form,
  Container,
  Row,
  Col,
  Button,Spinner,Alert
} from "react-bootstrap";
import  { useDispatch,useSelector } from "react-redux"
import { shortText } from "../../utils/validation";
import { openNewTicket } from "./addTicketAction";
import { restSuccessMSg } from "./addTicketSlicer";
const initialFrmDt={
  subject:"",
  issueDate: "",
  message:"",
};
const initialFrmError={
  subject:false,
  issueDate: false,
  message:false,
};
export const AddTicketForm = () => {
  const dispatch=useDispatch()
  const {user:{name}}=useSelector(state=> state.user)
  const {isLoading,error,successMsg}=useSelector(state=> state.openTicket)
  const [frmData, setFrmData] = useState(initialFrmDt);
  const [frmDataErro, setFrmDataErro] = useState(initialFrmError);

  useEffect((
    
  ) => {return ()=>{
    successMsg && dispatch(restSuccessMSg())
    } }, [dispatch,frmData, frmDataErro])
  const handleOnChange = e => {
    const { name, value } = e.target

    setFrmData({
      ...frmData,
      [name]: value
    })

  }
  const handleOnSubmit = async e => {
    e.preventDefault();
    setFrmDataErro(initialFrmError)

    const isSubjectValid = await shortText(frmData.subject)
    setFrmDataErro({
      ...initialFrmError,
      subject: !isSubjectValid,
    })
    dispatch(openNewTicket({...frmData,sender:name}))
  }
  return (
    <Container fluid className="p-5 mb-4 bg-light rounded-3">
      <h1 className="text-info text-center">Add New Ticket</h1>
      <hr />
      <div>
        {error && <Alert variant="danger">{error}</Alert>}
        {successMsg && <Alert variant="primary">{successMsg}</Alert>}
        {isLoading && <Spinner variant="primary" animation="border"/>}
      </div>
      <Form autoComplete="off" onSubmit={handleOnSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>
            Subject
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              name="subject"
              onChange={handleOnChange}
              value={frmData.subject}
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
              value={frmData.issueDate}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="message"
            rows="5"
            value={frmData.message}
            onChange={handleOnChange}
            required
          />
        </Form.Group>

        <Button type="submit" variant="info" className="w-100">
          Create Ticket
        </Button>
      </Form>
    </Container>
  );
};

export default AddTicketForm;
