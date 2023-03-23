const { StatusCodes } = require("http-status-codes");
const TicketService = require("../services/ticket-service");

const ticketService = new TicketService();

const create = async (req, res) => {
  try {
    const ticket = await ticketService.create({
      subject: req.body.subject,
      content: req.body.content,
      recipient: req.body.recipient,
      notificationTime: req.body.notificationTime,
    });
    return res.status(StatusCodes.CREATED).json({
      data: ticket,
      success: true,
      error: {},
      message: "Ticket created successfully",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: {},
      success: false,
      error: error,
      message: "Unable to create ticket",
    });
  }
};

module.exports = { create };
