const nodemailer = require('nodemailer');
const Contact = require('../models/contactModel')

const createContact = async (req, res) => {
    try {
        const { name, email, mobile, message, posted_date } = req.body;
        const contact = new Contact({ name, email, mobile, message, posted_date })
        await contact.save()

        let transporter = nodemailer.createTransport({
            service: 'gmail', // or any other email service
            auth: {
                user: 'imadiahsen8@gmail.com',
                pass: 'quvq wdwg oetm qzui',
            },
        });

        let mailOptions = {
            from: 'imadiahsen8@gmail.com',
            to: 'ppreddyseniorcare@gmail.com',
            subject: 'New Contact Form Submission',
            text: `You have a new contact form submission from:
            Name: ${name}
            Email: ${email}
            Mobile: ${mobile}
            Message: ${message}
            Posted Date: ${posted_date}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json(contact)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllContact = async (req, res) => {
    try {
        const contact = await Contact.find()
        res.status(200).json(contact)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createContact,
    getAllContact
}