const nodemailer = require('nodemailer');

class MailSender {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendEmail(targetEmail, content) {
    const message = {
      from: process.env.SMTP_USER,
      to: targetEmail,
      subject: 'Ekspor Playlist',
      text: 'Terlampir hasil ekspor playlist dalam format JSON.',
      attachments: [
        {
          filename: 'playlist.json',
          content,
        },
      ],
    };

    await this.transporter.sendMail(message);
  }
}

module.exports = MailSender;
