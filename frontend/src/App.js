import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Entry from './page/entry/Entry.page';
import DefaultLayout from './layout/DefaultLayout';
import Dashboard from './page/dashboard/Dashboard.page';
import AddTicket from './page/new-ticket/AddTicket.page';
import TicketLists from './page/ticket-list/TicketLists.page';
import Ticket from './page/ticket/Ticket.page';
import PrivateRoute from './components/private-route/PrivateRoute.comp';
import { PasswordOtpForm } from './page/password-reset/PasswordOtpForm.page';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Entry />} />
           <Route path="/password-reset" element={<PasswordOtpForm />} />

          {/* Protected Routes inside layout */}
          <Route path="/" element={<DefaultLayout />}>
            <Route
              path="dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="add-ticket"
              element={
                <PrivateRoute>
                  <AddTicket />
                </PrivateRoute>
              }
            />
            <Route
              path="tickets"
              element={
                <PrivateRoute>
                  <TicketLists />
                </PrivateRoute>
              }
            />
            <Route
              path="ticket/:tid"
              element={
                <PrivateRoute>
                  <Ticket />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
