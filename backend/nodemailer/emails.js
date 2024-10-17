import { 
    VERIFICATION_EMAIL_TEMPLATE, 
    WELCOME_EMAIL_TEMPLATE, 
    PASSWORD_RESET_REQUEST_TEMPLATE, 
    PASSWORD_RESET_SUCCESS_TEMPLATE
     } from "./emailTemplates.js"
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    pool: true,          // Enable connection pooling
    maxConnections: 5,   // Maximum number of connections to maintain in the pool
    maxMessages: 100,    // Maximum number of messages to send per connection
  });
  

export const sendVerificationEmail = async (email, verificationToken) => {
  const mailOptions = {
    from: '"MERN-AUTH" wilsonjeffery230@gmail.com',
    to: email,
    subject: 'Verify Your Email',
    html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
    category: "Verification Email"
  };

  try {
    const response = await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully.', response);
  } catch (error) {
    console.error('Error sending verification email:', error.message);
    throw new Error(`Error sending verification email: ${error.message}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const mailOptions = {
    from: '"MERN-AUTH" wilsonjeffery230@gmail.com',
    to: email,
    subject: 'Welcome Email',
    html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name),
    category: "Welcome Email"
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully.');
  } catch (error) {
    console.error('Error sending welcome email:', error.message);
    throw new Error(`Error sending welcome email: ${error.message}`);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) =>{
    const mailOptions = {
        from: '"MERN-AUTH" wilsonjeffery230@gmail.com',
        to: email,
        subject: 'Reset your password',
        html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
        category: "Password Reset Email"
      };
    try {
        await transporter.sendMail(mailOptions);
        console.log("Password Reset Email sent successfully")
    } catch (error) {
        console.error('Error sending password-reset email:', error.message);
        throw new Error(`Error sending password-reset email: ${error.message}`);
    }
}

export const sendResetSuccessEmail = async (email) =>{
    const mailOptions = {
        from: '"MERN-AUTH" wilsonjeffery230@gmail.com',
        to: email,
        subject: 'Password reset successful',
        html: PASSWORD_RESET_SUCCESS_TEMPLATE,
        category: "Password Reset Success Email"
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log("Password Reset Email sent successfully")
    } catch (error) {
        console.error('Error sending password-reset email:', error.message);
        throw new Error(`Error sending password-reset email: ${error.message}`);
    }
}
