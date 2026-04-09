const {TicketSchema}=require('./Ticket.schema')

const insertTicket = (ticketObj) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema(ticketObj)
        .save()
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const getTickets = (clientId) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.find({ clientId })
        .sort({ createdAt: -1 })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Get all tickets (for support/admin - with pagination)
 */
const getAllTickets = (page = 1, limit = 20) => {
  return new Promise((resolve, reject) => {
    try {
      const skip = (page - 1) * limit;
      TicketSchema.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Get ticket by ID (without client restriction)
 */
const getTicketById = (_id) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.findById(_id)
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Legacy version - get ticket by ID with client verification
 */
const getTicketByIdForClient = (_id, clientId) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.find({ _id, clientId })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const updateClientReply = ({ _id, message, senderId, sender, role = 'client' }) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.findOneAndUpdate(
        { _id },
        {
          updatedAt: new Date(),
          $push: {
            conversations: { 
              senderId,
              sender, 
              role,
              message
            },
          },
        },
        { new: true }
      )
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Update ticket status
 */
const updateTicketStatus = ({ _id, status }) => {
  return new Promise((resolve, reject) => {
    try {
      const updateObj = { 
        status, 
        updatedAt: new Date()
      };

      // If closing ticket, set closedAt
      if (status === 'Closed') {
        updateObj.closedAt = new Date();
      }

      TicketSchema.findOneAndUpdate(
        { _id },
        updateObj,
        { new: true }
      )
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Assign ticket to support staff
 */
const assignTicket = ({ _id, assignToUserId }) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.findOneAndUpdate(
        { _id },
        { 
          assignedTo: assignToUserId,
          status: 'In Progress',
          updatedAt: new Date(),
        },
        { new: true }
      )
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const updateStatusClose = ({ _id, clientId, status = 'Closed', closedAt = new Date() }) => {
  return new Promise((resolve, reject) => {
    try {
      // Support both old and new query style
      const query = clientId ? { _id, clientId } : { _id };
      
      TicketSchema.findOneAndUpdate(
        query,
        {
          status,
          closedAt,
          updatedAt: new Date(),
        },
        { new: true }
      )
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
}

const deleteTicket = ({ _id, clientId }) => {
  return new Promise((resolve, reject) => {
    try {
      // Support both old and new query style
      const query = clientId ? { _id, clientId } : { _id };
      
      TicketSchema.findOneAndDelete(query)
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

module.exports={
    insertTicket,
    getTickets,
    getTicketById,
    getTicketByIdForClient,
    updateClientReply,
    updateStatusClose,
    updateTicketStatus,
    assignTicket,
    getAllTickets,
    deleteTicket,
}