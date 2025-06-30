
import {fetchTicketLoading,fetchTicketSuccess,fetchTicketFail,searchTickets} from "./ticketsSlice"
import {getAllTickets} from '../../api/ticketApi'
export const fetchAllTickets = () => async (dispatch) => {
  dispatch(fetchTicketLoading());
  try {
    // const result = await getAllTickets();
    // result.data.result.length &&
    //   dispatch(fetchTicketSuccess(result.data.result));
    const result= await getAllTickets()
    console.log(result)
    dispatch(fetchTicketSuccess(result.data.result));
  } catch (error) {
    dispatch(fetchTicketFail(error.message));
  }
};

export const filterSerachTicket = (str) => (dispatch) => {
  dispatch(searchTickets(str));
};

