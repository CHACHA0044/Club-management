const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendRegistrationConfirmation = async (userEmail, userName, eventTitle, eventDate, eventPlace) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: userEmail,
    subject: `Registration Confirmation - ${eventTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e40af;">Event Registration Confirmed</h2>
        <p>Dear ${userName},</p>
        <p>Your registration for the following event has been received and is pending approval:</p>
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e3a8a; margin-top: 0;">${eventTitle}</h3>
          <p><strong>Date:</strong> ${new Date(eventDate).toLocaleString()}</p>
          <p><strong>Location:</strong> ${eventPlace}</p>
        </div>
        <p>You will receive another email once your registration is approved by the organizer.</p>
        <p>Thank you for registering!</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Confirmation email sent to:", userEmail);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const sendApprovalEmail = async (userEmail, userName, eventTitle, eventDate, eventPlace) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: userEmail,
    subject: `Registration Approved - ${eventTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #10b981;">Registration Approved!</h2>
        <p>Dear ${userName},</p>
        <p>Great news! Your registration has been approved for:</p>
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e3a8a; margin-top: 0;">${eventTitle}</h3>
          <p><strong>Date:</strong> ${new Date(eventDate).toLocaleString()}</p>
          <p><strong>Location:</strong> ${eventPlace}</p>
        </div>
        <p>We look forward to seeing you at the event!</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Approval email sent to:", userEmail);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const sendRejectionEmail = async (userEmail, userName, eventTitle) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: userEmail,
    subject: `Registration Update - ${eventTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ef4444;">Registration Status Update</h2>
        <p>Dear ${userName},</p>
        <p>We regret to inform you that your registration for <strong>${eventTitle}</strong> could not be approved at this time.</p>
        <p>This may be due to capacity constraints or other event requirements.</p>
        <p>We encourage you to register for other upcoming events.</p>
        <p>Thank you for your understanding.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Rejection email sent to:", userEmail);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = {
  sendRegistrationConfirmation,
  sendApprovalEmail,
  sendRejectionEmail,
};