
function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  }

// Initialize EmailJS
(function(){
    emailjs.init("perexneo@gmail.com"); // Replace with your EmailJS user ID
})();

document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Clear previous error messages
        clearErrors();

        // Validate the form
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        let isValid = true;

        if (name === '') {
            showError('nameError', 'Name is required.');
            isValid = false;
        }

        if (email === '') {
            showError('emailError', 'Email is required.');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError('emailError', 'Invalid email format.');
            isValid = false;
        }

        if (message === '') {
            showError('messageError', 'Message is required.');
            isValid = false;
        }

        if (isValid) {
            // Send email using EmailJS
            emailjs.send("service_im7i1nk", "template_zldyei8", {
                name: name,
                email: email,
                message: message
            }).then(function(response) {
                document.getElementById('formSuccessMessage').innerText = 'Your message has been sent successfully!';
                contactForm.reset(); // Reset the form
            }, function(error) {
                console.error('Error sending message:', error);
                alert('Failed to send message. Please try again later.');
            });
        }
    });
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function showError(elementId, message) {
    document.getElementById(elementId).innerText = message;
}

function clearErrors() {
    document.getElementById('nameError').innerText = '';
    document.getElementById('emailError').innerText = '';
    document.getElementById('messageError').innerText = '';
}

