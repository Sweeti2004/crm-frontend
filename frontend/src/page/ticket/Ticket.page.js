import React, {useState, useEffect } from 'react'
import { Container, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import PageBreadcrumb from '../../components/breadcrumb/Breadcrumb.comp'
import tickets from '../../assets/data/dummy-tickets.json'
import MessageHistory from '../../components/message-history/MessageHistory.comp';
import UpdateTicket from '../../components/update-ticket/UpdateTicket.comp';
import { useParams } from 'react-router-dom';
// const ticket= tickets[0]
const Ticket = () => {
	const {tid}=useParams()
    const [message,setMessage]= useState('')
    const [ticket,setTicket]= useState('')
    useEffect(()=>{
		for(let i=0;i<tickets.length;i++){
			if(tickets[i].id==tid){
				setTicket(tickets[i])
				continue
			}
		}
	},[message,tid])
    const handleOnChange = e =>{
        setMessage(e.target.value)
        
    }
    const handleOnSubmit=()=>{
        alert("Form Submitted!")
    }
  return (
    <Container>
			<Row>
				<Col>
					<PageBreadcrumb page="Ticket" />
				</Col>
			</Row>

			{/* <Row>
				<Col>
					{isLoading && <Spinner variant="primary" animation="border" />}
					{error && <Alert variant="danger">{error}</Alert>}
					{replyTicketError && (
						<Alert variant="danger">{replyTicketError}</Alert>
					)}
					{replyMsg && <Alert variant="success">{replyMsg}</Alert>}
				</Col>
			</Row> */}
			<Row>
				<Col className="text-weight-bolder text-secondary">
				{tid}
					<div className="subject">Subject: {ticket.subject}</div>
					<div className="date">
                        Ticket Opened: {ticket.addedAt}
						{/* Ticket Opened:{" "}
						{selectedTicket.openAt &&
							new Date(selectedTicket.openAt).toLocaleString()} */}
					</div>
					<div className="status">Status: {ticket.status}</div>
				</Col>
				<Col className="text-right">
					<Button
						variant="outline-info"
						// onClick={() => dispatch(closeTicket(tId))}
						// disabled={selectedTicket.status === "Closed"}
					>
						Close Ticket
					</Button>
				</Col>
			</Row>
			<Row className="mt-4">
				<Col>
				{ticket.history&&<MessageHistory msg={ticket.history}/>}
				</Col>
			</Row>
			<hr />

			<Row className="mt-4">
				<Col>
					<UpdateTicket msg={message}  handleOnChange={ handleOnChange} handleOnSubmit={handleOnSubmit}/>
				</Col>
			</Row>

		</Container>
  )
}

export default Ticket
