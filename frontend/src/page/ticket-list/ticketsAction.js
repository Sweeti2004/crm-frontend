import {
  fetchTicketLoading,
  fetchTicketSuccess,
  fetchTicketFail,
  searchTickets,
  fetchSingleTicketLoading,
  fetchSingleTicketSuccess,
  fetchSingleTicketFail,
} from "./ticketsSlice";

import { getAllTickets, getSingleTicket } from '../../api/ticketApi';

export const fetchAllTickets = () => async (dispatch) => {
  dispatch(fetchTicketLoading());
  try {
    const result = await getAllTickets();

    if (result.data.status === "success") {
      dispatch(fetchTicketSuccess(result.data.result));
    } else {
      dispatch(fetchTicketFail(result.data.message));
    }

  } catch (error) {
    dispatch(fetchTicketFail(error.message));
  }
};

export const filterSerachTicket = (str) => (dispatch) => {
  dispatch(searchTickets(str));
};

// Actions for single ticket only
export const fetchSingleTicket = (_id) => async (dispatch) => {
  dispatch(fetchSingleTicketLoading());
  try {
    const result = await getSingleTicket(_id);

    if (result.data.status === "success") {
      dispatch(fetchSingleTicketSuccess(result.data.result));
    } else {
      dispatch(fetchSingleTicketFail(result.data.message));
    }

  } catch (error) {
    dispatch(fetchSingleTicketFail(error.message));
  }
};
