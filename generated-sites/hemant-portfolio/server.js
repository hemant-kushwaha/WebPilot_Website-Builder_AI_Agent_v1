const express = require('express');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve Static Frontend Files
app.use(express.static(path.join(__dirname)));

// Configure Nodemailer Transporter
// Supports SMTP env vars (e.g., SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS) or ethereal/console fallback if not configured
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: process.env.SMTP_USER && process.env.SMTP_PASS ? {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    } : undefined
});

// Contact API Endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validation
        if (!name || !name.trim()) {
            return res.status(400).json({ success: false, message: 'Name is required' });
        }

        if (!email || !email.trim()) {
            return res.status(400).json({ success: false, message: 'Email is required' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            return res.status(400).json({ success: false, message: 'Please enter a valid email address' });
        }

        if (!message || !message.trim()) {
            return res.status(400).json({ success: false, message: 'Message is required' });
        }

        // Email options
        const mailOptions = {
            from: process.env.SMTP_USER || 'hemantkushofficial@gmail.com',
            to: 'hemantkushofficial@gmail.com',
            replyTo: email.trim(),
            subject: `New Portfolio Contact Message from ${name.trim()}`,
            text: `You have received a new message from your portfolio contact form.\n\nName: ${name.trim()}\nEmail: ${email.trim()}\nMessage:\n${message.trim()}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px;">
                    <h2 style="color: #6366f1; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">New Contact Submission</h2>
                    <p><strong>Name:</strong> ${name.trim()}</p>
                    <p><strong>Email:</strong> <a href="mailto:${email.trim()}">${email.trim()}</a></p>
                    <p><strong>Message:</strong></p>
                    <div style="background: #f9fafb; padding: 15px; border-radius: 6px; border-left: 4px solid #6366f1; white-space: pre-wrap;">${message.trim()}</div>
                </div>
            `
        };

        // Send Email
        await transporter.sendMail(mailOptions);

        return res.status(200).json({
            success: true,
            message: 'Message sent successfully'
        });

    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.'
        });
    }
});

// Serve index.html for root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
