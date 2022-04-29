import nodemailer from 'nodemailer';
import ejs from 'ejs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name;
    this.url = url;
    this.from = `Eddy Uwambaje <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Sendgrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD
        }
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  // Send the actual email
  async send(template, subject) {
    // 1) Render HTML based on a ejs template
    const html = await ejs.renderFile(
<<<<<<< HEAD
      `./../views/email/${template}.ejs`,
=======
      `${__dirname}/../views/email/${template}.ejs`,
>>>>>>> cd59fe1d3274d874646ea1c0b7892ddb6c5692e9
      {
        firstName: this.firstName,
        url: this.url,
        subject
      }
    );
    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: html
    };
    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', "Welcome to Eddy's Family!");
  }

  async sendPasswordReset() {
    await this.send(
      'passwordreset',
      'Your password reset token (valid for only 10 minutes)'
    );
  }

  async sendFeedback() {
    await this.send('feedback', 'Uwambajeeddy feedback');
  }
}

export default Email;
