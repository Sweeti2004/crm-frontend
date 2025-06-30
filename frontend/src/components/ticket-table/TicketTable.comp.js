import React from 'react'
import { Table } from "react-bootstrap";
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

const TicketTable = () => {
 const { searchTicketList, isLoading, error } = useSelector((state) => state.tickets);
if(isLoading) return <h1>Loading...</h1>
if(error) return <h3>{error}</h3>
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Subjects</th>
          <th>Status</th>
          <th>Opened Date</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(searchTicketList) && searchTicketList.length > 0 ? (
          searchTicketList.map((row) => (
            <tr key={row._id}>
              <td>{row._id}</td>
              <td>
                <Link to={`/ticket/${row._id}`}>
                  {row.subject}
                </Link>
              </td>
              <td>{row.status}</td>
              <td>{row.openAt}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center">
              No ticket to show
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

export default TicketTable;
