const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const stripe = require('stripe')('your_stripe_api_key');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Webhook endpoint for Stripe events
app.post('/webhook', async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.rawBody, sig, 'your_webhook_secret');
    } catch (err) {
        console.error('Error verifying webhook signature:', err.message);
        return res.sendStatus(400);
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            const customerEmail = session.customer_email;
            const amountPaid = session.amount_total / 100; // Convert from cents to dollars
            const invoiceId = session.invoice;
            
            // Generate invoice PDF
            const pdfBuffer = await stripe.invoices.retrieveInvoicePdf(invoiceId);

            // Send email with invoice PDF attached
            sendInvoiceEmail(customerEmail, pdfBuffer);
            break;
        // Handle other event types as needed
    }

    // Acknowledge receipt of the webhook event
    res.sendStatus(200);
});

// Function to send email with invoice attached
function sendInvoiceEmail(customerEmail, pdfBuffer) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your_email@gmail.com',
            pass: 'your_email_password'
        }
    });

    const mailOptions = {
        from: 'your_email@gmail.com',
        to: customerEmail,
        subject: 'Invoice for Your Donation',
        text: 'Thank you for your donation! Please find your invoice attached.',
        attachments: [{
            filename: 'invoice.pdf',
            content: pdfBuffer
        }]
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error('Error sending email:', err);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
