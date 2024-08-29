const nodemailer = require('nodemailer');
const Appointment = require('../models/appointmentModel')

const createAppointment = async (req, res) => {
    try {
        const { name, email, mobile, service, posted_date } = req.body;
        const appointment = new Appointment({ name, email, mobile, service, posted_date })
        await appointment.save()

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
            subject: 'New Appointment Form Submission',
            text: `You have a new appointment form submission from:
            Name: ${name}
            Email: ${email}
            Mobile: ${mobile}
            Service: ${service}
            Posted Date: ${posted_date}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json(appointment)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.find()
        res.status(200).json(appointment)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createAppointment,
    getAllAppointment
}