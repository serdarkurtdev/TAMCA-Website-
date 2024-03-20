// Set your publishable Stripe key
const stripe = Stripe('pk_test_51OsEQqDSgElixwQZmtp6HSlCbAXbUoFZ0Ypg93PfbTLvsOBRu0MOP9U7n2L4lmhczgyCLnGmhQxnJXWW5HN9c1mB00bw1jQTCf');
const elements = stripe.elements();

// Create an instance of the card Element
const card = elements.create('card');

// Add an instance of the card Element into the `card-element` div
card.mount('#card-element');

// Handle real-time validation errors from the card Element
card.addEventListener('change', function(event) {
    const displayError = document.getElementById('card-errors');
    if (event.error) {
        displayError.textContent = event.error.message;
    } else {
        displayError.textContent = '';
    }
});

// Handle form submission
const form = document.getElementById('payment-form');
form.addEventListener('submit', async function(event) {
    event.preventDefault();

    // Disable the submit button to prevent multiple submissions
    form.querySelector('button').disabled = true;

    const { token, error } = await stripe.createToken(card);

    if (error) {
        // Inform the user if there's an error
        const errorElement = document.getElementById('card-errors');
        errorElement.textContent = error.message;
    } else {
        // If successful, send the token to your server
        stripeTokenHandler(token);
    }
});

// Send the token to your server
async function stripeTokenHandler(token) {
    try {
        const response = await fetch('/webhook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: token.id })
        });

        if (response.ok) {
            // Handle successful payment
            alert('Payment successful! Thank you for your donation.');
        } else {
            // Handle payment error
            alert('Payment failed. Please try again later.');
        }
    } catch (error) {
        console.error('Error processing payment:', error);
        alert('An error occurred while processing your payment. Please try again later.');
    }
}
