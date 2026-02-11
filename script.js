// script.js

// Functionality for calculator features
function calculateGratuity(amount, percentage) {
    return (amount * percentage) / 100;
}

// Navigation interactions
document.querySelectorAll('nav a').forEach(item => {
    item.addEventListener('click', event => {
        // Add navigation behavior here
        console.log('Navigating to:', item.getAttribute('href'));
    });
});

// Form handling
document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    const amount = parseFloat(document.querySelector('#amount').value);
    const percentage = parseFloat(document.querySelector('#percentage').value);
    const gratuity = calculateGratuity(amount, percentage);
    document.querySelector('#result').textContent = `Gratuity: ${gratuity.toFixed(2)}`;
});
