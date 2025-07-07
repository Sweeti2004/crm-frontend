import React,{useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { Container, Row, Col, Button, Breadcrumb } from "react-bootstrap";
import TicketTable from '../../components/ticket-table/TicketTable.comp';
import tickets from '../../assets/data/dummy-tickets.json'
import PageBreadcrumb from '../../components/breadcrumb/Breadcrumb.comp';
import {Link} from 'react-router-dom'
import {fetchAllTickets} from "../ticket-list/ticketsAction"
const Dashboard = () => {
  const {tickets}=useSelector(state=>state.tickets)
  const dispatch=useDispatch()
  useEffect(()=>{
    if(!tickets.length){
      dispatch(fetchAllTickets())
    }
  },[tickets,dispatch])
  const pendingTickets=tickets.filter(row=>row.status !=="Closed")
  const totalTickets=tickets.length;
  return (
   <Container>
    <Row>
      <Col>
        <PageBreadcrumb page={"Dashboard"}/>
      </Col>
    </Row>
      <Row>
        <Col className="text-center mt-5 mb-2">
          <Link to="/add-ticket">
            <Button
              variant="info"
              style={{ fontSize: "2rem", padding: "10px 30px" }}
            >
              Add New Ticket
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col className="text-center mt-5 mb-2">
          
            <div>Total Tickets:{totalTickets}</div>
            <div>Pending Tickets:{pendingTickets.length}</div>
        </Col>
      </Row>
      <Row>
        <Col className="mt-2">
          Recently Added tickets
        </Col>
      </Row>
      <hr/>
      <Row>
        <Col className="recent-tickets">
         <TicketTable tickets={tickets}/>
        </Col>
      </Row>
    </Container>
  )
}

export default Dashboard
