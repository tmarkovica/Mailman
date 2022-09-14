const express = require('express');
const app = express();
let client = require('@sendgrid/mail')
const dotenv = require('dotenv').config();

app.use(express.json());

var emailsSentCounter = 0;

app.post('/contact-form', (req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'})

    const name = req.body.name.toString();
    const email = req.body.email.toString();
    const subject = req.body.subject.toString();
    const message = req.body.message.toString();
    const platform = req.body.platform.toString();

    // send form to sendgrid API
    client.setApiKey(process.env.SENDGRID_API_KEY)
    client.send({
        to: {
            email: process.env.MY_SECRET_EMAIL,
            name: 'Tom'
        },
        from: {
            email: email,
            name: name
        },
        templateId: 'd-5e61794c5577409fbd86b4d079ec96fa',
        dynamicTemplateData: {
            name: name,
            subject: subject,
            message: message,
            platform: platform
        }
    }).then((sendgridResponse) => {

        const statusCode = sendgridResponse[0].statusCode;
        
        if (statusCode == 202) {
            console.log("Email sent");
            res.end(JSON.stringify({ result: 'Sent' }));
            emailsSentCounter++;
            console.log(emailsSentCounter);
        }
        else {
            console.log("Not sent")
            res.end(JSON.stringify({ result: 'Not sent' }));
        }
    }).catch(error => {
        console.log("error caugt+646+4+45+fasd+4sad4adafa+s4a")
        console.log(error)
        res.end(JSON.stringify({ result: 'Email field does not contain a valid address' }));
    })
});

app.get('/emails-sent', (req, res) => {
    return res.send(JSON.stringify({
        emailsSent: emailsSentCounter
    }));
});

module.exports = app;