import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import PageBreadcrumb from '../../components/breadcrumb/Breadcrumb.comp';
import MessageHistory from '../../components/message-history/MessageHistory.comp';
import UpdateTicket from '../../components/update-ticket/UpdateTicket.comp';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleTicket,closeTicket } from '../ticket-list/ticketsAction';

const Ticket = () => {
  const { tid } = useParams();
  const dispatch = useDispatch();
  const {replyMsg}=useSelector(state=>state.tickets)

  const {
    isLoading,
    error,
    selectedTicket,
  } = useSelector(state => state.tickets);

  // ✅ Safely get ticket data from array
  const ticket = Array.isArray(selectedTicket) ? selectedTicket[0] : selectedTicket;

  useEffect(() => {
    dispatch(fetchSingleTicket(tid));
  }, [tid, dispatch]);

 

  return (
    <Container>
      <Row>
        <Col>
          <PageBreadcrumb page="Ticket" />
        </Col>
      </Row>

      <Row>
        <Col>
          {isLoading && <Spinner variant="primary" animation="border" />}
          {error && <Alert variant="danger">{error}</Alert>}
          {replyMsg && <Alert variant='success'>{replyMsg}</Alert>}
        </Col>
      </Row>

      <Row>
        <Col className="text-weight-bolder text-secondary">
          <div className="subject">Subject: {ticket?.subject}</div>
          <div className="date">
            Ticket Opened:{ticket.openAt && new Date(ticket.openAt).toLocaleString()}
          </div>
          <div className="status">Status: {ticket?.status}</div>
        </Col>
        <Col className="text-right">
          <Button
            variant="outline-info"
            onClick={() => dispatch(closeTicket(tid))}
            disabled={ticket?.status === "Closed"}
          >
            Close Ticket
          </Button>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          {ticket?.conversations && (
            <MessageHistory msg={ticket.conversations} />
          )}
        </Col>
      </Row>

      <hr />

      <Row className="mt-4">
        <Col>
          <UpdateTicket _id={tid}/>
        </Col>
      </Row>
    </Container>
  );
};

export default Ticket;
