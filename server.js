const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());

// Nodemailer setup using Purelymail SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.purelymail.com",
  port: 465,
  secure: true, // Use true for port 465, false for other ports
  auth: {
    user: "pwz2k@purelymail.com",
    pass: "33VgKLWg;'QLNW7",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  const mailOptions = {
    from: '"Support Team" <support@xclusivelabels.com>',
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId}`);
  } catch (error) {
    console.error(`Error sending email: ${error.message}`);
  }
};


app.get("/", async (req, res)=>{
  return res.json("running")
})

// Endpoint to trigger email sending
app.post("/send-email", async (req, res) => {
  const { to, subject, text, html } = req.body;

  // Basic validation
  if (!to || !subject || !text || !html) {
    return res.status(400).send("Missing required fields");
  }

  // Send the email
  const data = await sendEmail(to, subject, text, html);
  console.log(data);
  res.json("Email sent!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
