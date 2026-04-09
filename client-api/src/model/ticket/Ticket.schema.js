const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  // Client who created the ticket
  clientId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  subject: {
    type: String,
    maxlength: 150,
    required: true,
    trim: true,
  },
  // Ticket status management
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Pending Info', 'Closed', 'Reopened'],
    default: 'Open',
    required: true,
  },
  // Priority level (for triage)
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium',
  },
  // Category/Type of issue
  category: {
    type: String,
    maxlength: 50,
    default: 'General',
  },
  // Support agent assigned to this ticket
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  // Ticket lifecycle dates
  openAt: {
    type: Date,
    default: Date.now(),
  },
  closedAt: {
    type: Date,
    default: null,
  },
  // Tags for organization
  tags: {
    type: [String],
    default: [],
  },
  // Conversation thread
  conversations: [
    {
      senderId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      sender: {
        type: String,
        maxlength: 50,
        required: true,
      },
      role: {
        type: String,
        enum: ['client', 'support'],
        default: 'client',
      },
      message: {
        type: String,
        maxlength: 2000,
        required: true,
      },
      msgAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  // Timestamps
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
}, { timestamps: true });

// Create indexes for better query performance
TicketSchema.index({ clientId: 1 });
TicketSchema.index({ assignedTo: 1 });
TicketSchema.index({ status: 1 });
TicketSchema.index({ createdAt: -1 });

module.exports = {
  TicketSchema: mongoose.model("Ticket", TicketSchema),
};