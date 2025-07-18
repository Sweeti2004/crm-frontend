import axios from 'axios';

const rootUrl = process.env.REACT_APP_API_URL;

const ticketUrl = `${rootUrl}/ticket`;
const closeTicketUrl = `${rootUrl}/ticket/close-ticket/`; // trailing slash is fine here


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

export const updateReplyTicket = (_id, msgObj) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.put(`${ticketUrl}/${_id}`,msgObj, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessJWT"),
      },
    });
      resolve(result.data);
    } catch (error) {
      console.log(error.message);
      reject(error);
    }
  });
};

export const updateTicketStatusClosed = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.patch(
        closeTicketUrl + _id,
         {},
        {
          headers: {
            Authorization: "Bearer "+sessionStorage.getItem("accessJWT"),
          },
        }
      );

      resolve(result.data);
    } catch (error) {
      console.log(error.message);
      reject(error);
    }
  });
};

export const createNewTicket = (frmData) => {
  console.log("from api", frmData);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.post(ticketUrl, frmData, {
        headers: {
          Authorization: "Bearer "+ sessionStorage.getItem("accessJWT"),
        },
      });

      resolve(result.data);
    } catch (error) {
      console.log(error.message);
      reject(error);
    }
  });
};