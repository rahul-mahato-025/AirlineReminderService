const transporter = require("../configs/email-config");

const sendBasicEmail = async (from, to, subject, text) => {
  try {
    await transporter.sendMail({
      from: `Rahul ${from}`,
      to,
      subject,
      text,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendBasicEmail,
};
