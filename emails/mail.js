const sgMail = require('@sendgrid/mail')
const sendGridApiKey = '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'

sgMail.setApiKey(sendGridApiKey)


const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'nwabuezesc@gmail.com', 
        subject: 'Sending with SendGrid is Fun',
        text: 'I am sending an email with nodejs',
        // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    })  
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'nwabuezesc@gmail.com', 
        subject: 'Thank you for using us',
        text: 'I am sending an email with nodejs, it is sure entertaining',
        // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    })  
}

module.exports = {sendWelcomeEmail, sendCancelationEmail}
