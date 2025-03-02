const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Nodemailer Configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
    },
});

// Handle Form Submission
app.post('/submit', (req, res) => {
    const { name, email, phone, service, message } = req.body;

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'your-email@gmail.com',
        subject: `New Service Request: ${service}`,
        text: `
            Name: ${name}
            Email: ${email}
            Phone: ${phone}
            Service: ${service}
            Message: ${message}
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});