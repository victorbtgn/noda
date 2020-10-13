const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = (email, verificationToken) => ({
    to: email,
    from: process.env.EMAIL_RESOURCE,
    subject: 'Test SendGridMailer',
    text: 'and easy to do anywhere, even with Node.js',
    html: `<p>Verify email in link <a href="${process.env.DOMAIN}/auth/verify/${verificationToken}">${process.env.DOMAIN}/auth/verify/${verificationToken}</a></p>`,
  });

const sendEmail = async (email, verificationToken) => {
    try {
    //   const [response] = await sgMail.send(msg(email, verificationToken));
    //   console.log(response);
    await sgMail.send(msg(email, verificationToken));
    } catch (error) {
        throw error
    }
  }

  module.exports = {sendEmail}