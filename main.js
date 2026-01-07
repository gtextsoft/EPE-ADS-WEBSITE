document.addEventListener('DOMContentLoaded', () => {
    // Reveal on scroll animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // Form submission handling
    const leadForm = document.getElementById('leadForm');

    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = leadForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            // Basic UI feedback
            submitBtn.disabled = true;
            submitBtn.textContent = 'Processing...';

            // Simulate form submission
            setTimeout(() => {
                leadForm.innerHTML = `
                    <div style="text-align: center; padding: 2rem;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">✅</div>
                        <h3 style="margin-bottom: 1rem;">Thank You, ${document.getElementById('fullName').value}!</h3>
                        <p>Your details have been received. A property advisor will contact you shortly via WhatsApp or phone.</p>
                        <button onclick="location.reload()" class="btn btn-primary" style="margin-top: 2rem;">Return</button>
                    </div>
                `;
            }, 1500);

            // In a real scenario, you would use fetch() here to send to a backend or MailerLite
            /*
            const formData = new FormData(leadForm);
            fetch('/your-endpoint', {
                method: 'POST',
                body: formData
            }).then(response => {
                // handle success
            });
            */
        });
    }

    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
