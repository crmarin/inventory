import nodemailer from 'nodemailer';
import aws from '@aws-sdk/client-ses';

const ses = new aws.SES({
  apiVersion: '2010-12-01',
  region: 'us-east-1',
});

const sendMail = async (to, subject, body, file) => {
  // create Nodemailer SES transporter
  let transporter = nodemailer.createTransport({
    SES: { ses, aws },
  });

  // send some mail
  await transporter.sendMail(
    {
      from: process.env.FROM_ADDRESS,
      to: to,

      subject: subject + ' ✓ ' + Date.now(),
      text: body + ' ✓',
      attachments: [
        // Binary Buffer attachment
        {
          filename: file.name,
          content: Buffer.from(file.data),
          cid: 'note@example.com', // should be as unique as possible
        },
      ],
    },
    (err) => {
      return err;
    }
  );
};

export default sendMail;
