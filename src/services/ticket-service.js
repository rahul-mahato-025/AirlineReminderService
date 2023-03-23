const TicketRepository = require("../repositories/ticket-repository");

class TicketService {
  constructor() {
    this.ticketRepository = new TicketRepository();
  }

  async create(data) {
    try {
      const ticket = await this.ticketRepository.create(data);
      return ticket;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = TicketService;
