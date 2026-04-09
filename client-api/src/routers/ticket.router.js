const express=require("express")
const router=express.Router()
const {insertTicket,getTickets,getTicketById,updateClientReply,updateStatusClose,deleteTicket,getAllTickets,updateTicketStatus,assignTicket}=require("../model/ticket/Ticket.Model")
const{ userAuthorization, roleAuthorization, clientOnly, supportOnly, adminOnly }=require("../middlewares/roleAuthorization.middleware")
const {createNewTicketValidation,replyTicketMessageValidation}=require("../middlewares/formValidation.middleware")

router.all('/',(req,res,next)=>{
    next();
})

/**
 * POST /ticket
 * Create new ticket (Clients only)
 */
router.post("/", createNewTicketValidation, clientOnly, async (req, res) => {
    try {
      const { subject, message } = req.body;
      const userId = req.userId;
      const userEmail = req.userEmail;

      const ticketObj = {
        clientId: userId,
        subject,
        conversations: [
          {
            senderId: userId,
            sender: userEmail,
            role: 'client',
            message,
          },
        ],
      };

     const result = await insertTicket(ticketObj);

      if (result._id) {
        return res.json({
          status: "success",
          message: "New ticket has been created!",
          ticketId: result._id,
        });
      }

      res.json({
        status: "error",
        message: "Unable to create the ticket , please try again later",
      });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  }
);

/**
 * GET /ticket
 * Get tickets - Clients see their own, Support/Admin see all or assigned
 */
router.get("/", userAuthorization, async (req, res) => {
  try {
    const userId = req.userId;
    const userRole = req.userRole;
    let result;

    if (userRole === 'client') {
      // Clients can only see their own tickets
      result = await getTickets(userId);
    } else {
      // Support and Admin can see all tickets
      result = await getAllTickets();
    }

    return res.json({
      status: "success",
      result,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

/**
 * GET /ticket/:_id
 * Get specific ticket - Clients see only theirs, Support/Admin see all
 */
router.get("/:_id", userAuthorization, async (req, res) => {
  try {
    const { _id } = req.params;
    const userId = req.userId;
    const userRole = req.userRole;

    const result = await getTicketById(_id);

    if (!result) {
      return res.json({ status: "error", message: "Ticket not found" });
    }

    // Check permissions
    const isOwner = result.clientId.toString() === userId;
    const isAssigned = result.assignedTo && result.assignedTo.toString() === userId;
    const isAdmin = userRole === 'admin';

    if (!isOwner && !isAssigned && !isAdmin && userRole !== 'support') {
      return res.status(403).json({ message: "Unauthorized to view this ticket" });
    }

    return res.json({
      status: "success",
      result,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

/**
 * PUT /ticket/:_id
 * Reply to ticket (Both clients and support can reply)
 */
router.put("/:_id", replyTicketMessageValidation, userAuthorization, async (req, res) => {
    try {
      const { message } = req.body;
      const { _id } = req.params;
      const userId = req.userId;
      const userRole = req.userRole;
      const userEmail = req.userEmail;

      // Get ticket to verify permissions
      const ticket = await getTicketById(_id);
      if (!ticket) {
        return res.json({ status: "error", message: "Ticket not found" });
      }

      const isOwner = ticket.clientId.toString() === userId;
      const isAssigned = ticket.assignedTo && ticket.assignedTo.toString() === userId;
      const isAdmin = userRole === 'admin';

      if (!isOwner && !isAssigned && !isAdmin && userRole !== 'support') {
        return res.status(403).json({ message: "Unauthorized to reply to this ticket" });
      }

      const result = await updateClientReply({
        _id,
        message,
        senderId: userId,
        sender: userEmail,
        role: userRole === 'client' ? 'client' : 'support'
      });

      if (result._id) {
        return res.json({
          status: "success",
          message: "your message added",
        });
      }
      res.json({
        status: "error",
        message: "Unable to update your message please try again later",
      });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  }
);

/**
 * PATCH /ticket/:_id/status
 * Update ticket status (Support and Admin only)
 */
router.patch("/:_id/status", supportOnly, async (req, res) => {
  try {
    const { _id } = req.params;
    const { status } = req.body;
    const validStatuses = ['Open', 'In Progress', 'Pending Info', 'Closed', 'Reopened'];

    if (!validStatuses.includes(status)) {
      return res.json({ status: "error", message: "Invalid status" });
    }

    const result = await updateTicketStatus({ _id, status });

    if (result._id) {
      return res.json({
        status: "success",
        message: "Ticket status updated",
      });
    }

    res.json({
      status: "error",
      message: "Unable to update ticket status",
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

/**
 * PATCH /ticket/:_id/assign
 * Assign ticket to support staff (Admin only)
 */
router.patch("/:_id/assign", adminOnly, async (req, res) => {
  try {
    const { _id } = req.params;
    const { assignToUserId } = req.body;

    if (!assignToUserId) {
      return res.json({ status: "error", message: "assignToUserId is required" });
    }

    const result = await assignTicket({ _id, assignToUserId });

    if (result._id) {
      return res.json({
        status: "success",
        message: "Ticket assigned successfully",
      });
    }

    res.json({
      status: "error",
      message: "Unable to assign ticket",
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

/**
 * PATCH /ticket/:_id/close
 * Close ticket (Clients and Support can close)
 */
router.patch("/:_id/close", userAuthorization, async (req, res) => {
  try {
    const { _id } = req.params;
    const userId = req.userId;
    const userRole = req.userRole;

    const ticket = await getTicketById(_id);
    if (!ticket) {
      return res.json({ status: "error", message: "Ticket not found" });
    }

    const isOwner = ticket.clientId.toString() === userId;
    const isAssigned = ticket.assignedTo && ticket.assignedTo.toString() === userId;
    const isAdmin = userRole === 'admin';

    if (!isOwner && !isAssigned && !isAdmin && userRole !== 'support') {
      return res.status(403).json({ message: "Unauthorized to close this ticket" });
    }

    const result = await updateStatusClose({ _id, status: 'Closed', closedAt: new Date() });

    if (result._id) {
      return res.json({
        status: "success",
        message: "The ticket has been closed",
      });
    }
    res.json({
      status: "error",
      message: "Unable to update the ticket",
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

/**
 * DELETE /ticket/:_id
 * Delete ticket (Admin only)
 */
router.delete("/:_id", adminOnly, async (req, res) => {
  try {
    const { _id } = req.params;

    const result = await deleteTicket({ _id });

    return res.json({
      status: "success",
      message: "The ticket has been deleted",
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

// Old endpoint for backward compatibility  
router.patch("/close-ticket/:_id", userAuthorization, async (req, res) => {
  try {
    const { _id } = req.params;
    const userId = req.userId;
    const userRole = req.userRole;

    const ticket = await getTicketById(_id);
    if (!ticket) {
      return res.json({ status: "error", message: "Ticket not found" });
    }

    const isOwner = ticket.clientId.toString() === userId;
    const isAssigned = ticket.assignedTo && ticket.assignedTo.toString() === userId;
    const isAdmin = userRole === 'admin';

    if (!isOwner && !isAssigned && !isAdmin && userRole !== 'support') {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const result = await updateStatusClose({ _id, clientId: userId });

    if (result._id) {
      return res.json({
        status: "success",
        message: "The ticket has been closed",
      });
    }
    res.json({
      status: "error",
      message: "Unable to update the ticket",
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

module.exports=router;