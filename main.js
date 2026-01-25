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

    // WhatsApp redirect function
    function redirectToWhatsApp(formData) {
        const name = formData.get('fullName') || '';
        const country = formData.get('country') || '';
        const whatsapp = formData.get('whatsapp') || '';
        const investment = formData.get('investmentOption') || '';
        const timeline = formData.get('timeline') || '';

        // Prefilled message (exact format as specified)
        const message = encodeURIComponent(
            `Hello, I just registered interest in Sardius Farm City Estate (Epe Prelaunch). Please share the full breakdown and next steps.`
        );

        // WhatsApp link - using wa.link format (update with your actual link)
        // Alternative: use direct WhatsApp number format: https://wa.me/2348123456789?text=...
        const whatsappUrl = `https://wa.link/303dll?text=${message}`;

        // Redirect to WhatsApp
        window.location.href = whatsappUrl;
    }

    // Form submission handler
    function handleFormSubmit(form, formId) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;

            // Show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Processing...';

            const formData = new FormData(form);

            try {
                // Optional: Send to Formspree or your backend
                // Uncomment and update the endpoint if you want to store submissions
                /*
                const response = await fetch('https://formspree.io/f/xvzzklon', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Form submission failed');
                }
                */

                // Small delay for UX
                await new Promise(resolve => setTimeout(resolve, 500));

                // Redirect to WhatsApp
                redirectToWhatsApp(formData);

            } catch (error) {
                console.error('Form submission error:', error);
                
                // Even if backend fails, still redirect to WhatsApp
                redirectToWhatsApp(formData);
            }
        });
    }

    // Handle early form
    const earlyForm = document.getElementById('early-form-element');
    if (earlyForm) {
        handleFormSubmit(earlyForm, 'early-form');
    }

    // Handle main form
    const mainForm = document.getElementById('main-form-element');
    if (mainForm) {
        handleFormSubmit(mainForm, 'main-form');
    }

    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Hide sticky CTA when user is at the form section
    const stickyCTA = document.querySelector('.sticky-cta-mobile');
    const mainFormSection = document.getElementById('main-form');
    
    if (stickyCTA && mainFormSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    stickyCTA.style.display = 'none';
                } else {
                    stickyCTA.style.display = 'block';
                }
            });
        }, {
            threshold: 0.3
        });

        observer.observe(mainFormSection);
    }
});
