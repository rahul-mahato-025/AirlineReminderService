const amqplib = require("amqplib");
const {
  MESSAGE_BROKER_URL,
  EXCHANGE_NAME,
  QUEUE_NAME,
} = require("../config/serverConfig");
const TicketService = require("../services/ticket-service");

const ticketService = new TicketService();

const createChannel = async () => {
  try {
    const connection = await amqplib.connect(MESSAGE_BROKER_URL);
    const channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, "direct", false);
    return channel;
  } catch (error) {
    console.log(error);
  }
};

const subscribeMessage = async (channel, binding_key) => {
  try {
    const reminderQueue = await channel.assertQueue(QUEUE_NAME);
    channel.bindQueue(reminderQueue.queue, EXCHANGE_NAME, binding_key);

    channel.consume(reminderQueue.queue, (msg) => {
      console.log("message recieved: ", msg.content.toString());
      const payload = JSON.parse(msg.content.toString());
      ticketService.subscribeEvents(payload);
      channel.ack(msg);
    });
  } catch (error) {
    console.log(error);
  }
};

const publishMessage = async (channel, msg) => {
  try {
    await channel.assertQueue(QUEUE_NAME);
    channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(msg));
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createChannel,
  subscribeMessage,
  publishMessage,
};
