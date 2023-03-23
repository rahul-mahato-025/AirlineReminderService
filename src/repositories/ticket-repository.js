const { Ticket } = require("../models/index");

class TicketRepository {
  async create(data) {
    try {
      const ticket = await Ticket.create(data);
      return ticket;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = TicketRepository;
