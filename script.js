document.addEventListener('DOMContentLoaded', () => {

    // --- SHARED FUNCTIONALITY ---
    
    // Sticky Header
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if(hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }

    // --- MAIN LANDING PAGE (index.html) ---

    // Intersection Observer for scroll animations
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (revealElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // observer.unobserve(entry.target); // Optional: stop observing once visible
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => observer.observe(el));
    }


    // --- THANK YOU PAGE (thankyou.html) ---

    if (document.body.classList.contains('thank-you-page')) {
        
        // 1. Confetti Animation
        const confettiContainer = document.getElementById('confetti-container');
        if (confettiContainer) {
            for (let i = 0; i < 100; i++) {
                const confetti = document.createElement('div');
                confetti.classList.add('confetti');
                confetti.style.left = `${Math.random() * 100}vw`;
                confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear ${Math.random() * 2}s forwards`;
                confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
                confettiContainer.appendChild(confetti);
            }
        }

        // 2. Social Sharing
        const shareTwitter = document.getElementById('share-twitter');
        if(shareTwitter) {
            shareTwitter.addEventListener('click', (e) => {
                e.preventDefault();
                const text = encodeURIComponent("I just subscribed to get early access to 'The Procrastination Paradox' ebook! You should check it out.");
                const url = encodeURIComponent("https://yourwebsite.com"); // Change to your actual URL
                window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'width=550,height=420');
            });
        }
        
        // 3. Redirect Timer
        const timerElement = document.getElementById('redirect-timer');
        if(timerElement) {
            let timeLeft = 30;
            const redirectTimer = setInterval(() => {
                timeLeft--;
                timerElement.textContent = timeLeft;
                if (timeLeft <= 0) {
                    clearInterval(redirectTimer);
                    window.location.href = 'index.html'; // Redirect to homepage
                }
            }, 1000);
        }

        // 4. URL Parameter Handling (Optional Personalization)
        // const urlParams = new URLSearchParams(window.location.search);
        // const userEmail = urlParams.get('email');
        // if (userEmail) {
        //     console.log(`Subscribed email: ${userEmail}`);
        //     // You could potentially use this to personalize the page, e.g.:
        //     // document.querySelector('.thank-you-subtitle').textContent = `A confirmation has been sent to ${userEmail}.`;
        // }
    }
});