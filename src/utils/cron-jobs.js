const cron = require("node-cron");
const TicketService = require("../services/ticket-service");
const transporter = require("../config/email-config");
const ticketService = new TicketService();

const setupAndStartCronJobs = () => {
  cron.schedule("*/2 * * * *", async () => {
    const tickets = await ticketService.getAllPendingTickets();
    tickets.forEach((ticket) => {
      transporter.sendMail(
        {
          from: "rahul@admin.com",
          to: ticket.recipient,
          subject: ticket.subject,
          text: ticket.content,
        },
        async (err, data) => {
          if (err) {
            console.log(err);
          } else {
            await ticketService.update(ticket.id, { status: "SUCCESS" });
          }
        }
      );
    });
  });
};

module.exports = setupAndStartCronJobs;
