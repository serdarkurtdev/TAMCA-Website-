const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/donate', (req, res) => {
  const { page } = req.params;
  res.sendFile(path.join(__dirname, 'public', `donate.html`));
});

app.get('/about', (req, res) => {
  const { page } = req.params;
  res.sendFile(path.join(__dirname, 'public', `about.html`));
});

app.get('/contact', (req, res) => {
  const { page } = req.params;
  res.sendFile(path.join(__dirname, 'public', `contact.html`));
});

app.get('/services', (req, res) => {
  const { page } = req.params;
  res.sendFile(path.join(__dirname, 'public', `services.html`));
});

app.get('/tvdisplay', (req, res) => {
  const { page } = req.params;
  res.sendFile(path.join(__dirname, 'public', `tvdisplay.html`));
});

app.get('/tvdisplay2', (req, res) => {
  const { page } = req.params;
  res.sendFile(path.join(__dirname, 'public', `tvdisplay2.html`));
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});


// Stripe payment handler test
const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('your_stripe_secret_key');

app.use(bodyParser.json());

// Endpoint to handle Stripe webhook events
app.post('https://tamca.org/stripe/webhook', async (req, res) => {
    const payload = req.body;
    const sig = req.headers['stripe-signature'];

    try {
        // Verify webhook signature
        const event = stripe.webhooks.constructEvent(payload, sig, 'your_webhook_secret');

        // Handle successful payment events
        if (event.type === 'payment_intent.succeeded') {
            const paymentIntent = event.data.object;
            console.log('Payment intent succeeded:', paymentIntent);
            // Insert data into Azure SQL Database or perform other actions
        }

        res.sendStatus(200);
    } catch (error) {
        console.error('Error handling webhook event:', error);
        res.sendStatus(400);
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

