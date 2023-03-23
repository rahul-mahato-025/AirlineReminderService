const { Op } = require("sequelize");
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

  async getAllPendingTickets() {
    try {
      const tickets = await Ticket.findAll({
        where: {
          notificationTime: {
            [Op.lte]: new Date(),
          },
          status: "PENDING",
        },
      });
      return tickets;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(ticketId, data) {
    try {
      const ticket = await Ticket.findByPk(ticketId);

      if (data.status) {
        ticket.status = data.status;
      }

      ticket.save();
      return ticket;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = TicketRepository;
