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

  async getAllPendingTickets() {
    try {
      const tickets = await this.ticketRepository.getAllPendingTickets();
      return tickets;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(ticketId, data) {
    try {
      const ticket = await this.ticketRepository.update(ticketId, data);
      return ticket;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  subscribeEvents(payload) {
    const { service, data } = payload;
    switch (service) {
      case "CREATE_TICKET":
        this.create(data);
    }
  }
}

module.exports = TicketService;
