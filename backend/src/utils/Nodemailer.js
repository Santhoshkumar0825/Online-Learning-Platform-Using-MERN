import nodemailer from 'nodemailer';

export const Sendmail = async function(email, subject, message) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASS,
    },
  });

  const receiver = {
    from: process.env.SMTP_EMAIL, // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    html: message, // html body
  };

  console.log(email, subject, message);
  try {
    const info = await transporter.sendMail(receiver);
    console.log('email sent:', info.response);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Detailed error:', error); // Log the full error
    return { success: false, error: error.message }; // Return detailed error message
  }
};
