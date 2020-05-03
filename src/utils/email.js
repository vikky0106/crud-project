'use strict';
const nodemailer = require('nodemailer');

/**
 * Function send email.
 * @param {string} to Email id to whom we have to send email
 * @param {string} subject subject of email
 * @param {string} mailbody body of email
 * @returns {promise} Promise with reject or resolve state
 */
module.exports.sendEmail = async function (to, subject, mailbody) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
        try {
            // For testing in production real credentials can be used.
            const testAccount = await nodemailer.createTestAccount();

            /** create reusable transporter object using the
             * default SMTP transport */
            const transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: testAccount.user, // generated ethereal user
                    pass: testAccount.pass // generated ethereal password
                }
            });

            const sendMailTo = to.toLowerCase();
            const senderName = process.env.SENDER_NAME || 'Testing';
            const senderEmail = process.env.SENDER_EMAIL || 'testing@zyz.com';
            const from = `${senderName} < ${senderEmail} >`;
            const mailOptions = {
                from: from,
                to: sendMailTo,
                subject: subject,
                text: mailbody
            };
            const info = await transporter.sendMail(mailOptions);
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            return resolve(nodemailer.getTestMessageUrl(info));
        } catch (error) {
            console.error('Error while sending Email', error);
            return reject(error);
        }
    });
};
