import axios from 'axios';

const rootUrl = 'http://localhost:5000/v1';
const ticketUrl = `${rootUrl}/ticket`;

export const getAllTickets = async () => {
  try {
    const result = await axios.get(ticketUrl, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessJWT"),
      },
    });
    return result;
  } catch (error) {
    console.error("getAllTickets Error:", error.response?.data || error.message);
    throw error;
  }
};

export const getSingleTicket = async (_id) => {
  try {
    const result = await axios.get(`${ticketUrl}/${_id}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessJWT"),
      },
    });
    return result;
  } catch (error) {
    console.error("getSingleTicket Error:", error.response?.data || error.message);
    throw error;
  }
};
