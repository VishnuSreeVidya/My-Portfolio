document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Ambient Background Cursor Tracker ---
    const cursorTrail = document.getElementById('cursorTrail');
    if (cursorTrail) {
        document.addEventListener('mousemove', (e) => {
            cursorTrail.style.left = `${e.clientX}px`;
            cursorTrail.style.top = `${e.clientY}px`;
        });
    }

    // --- 2. Automated Text Typer Loop ---
    const typingField = document.getElementById('typingEngineField');
    const targetStrings = [
        "Computer Science Student",
        "Cybersecurity Specialist",
        "Full-Stack Web Developer",
        "IoT Hardware Enthusiast",
        "Blockchain Engineer"
    ];
    let listIndex = 0;
    let characterIndex = 0;
    let deletionFlag = false;
    let structuralSpeed = 100;

    function runTyperEngine() {
        if (!typingField) return;
        const currentTextString = targetStrings[listIndex];

        if (deletionFlag) {
            typingField.textContent = currentTextString.substring(0, characterIndex - 1);
            characterIndex--;
            structuralSpeed = 40;
        } else {
            typingField.textContent = currentTextString.substring(0, characterIndex + 1);
            characterIndex++;
            structuralSpeed = 90;
        }

        if (!deletionFlag && characterIndex === currentTextString.length) {
            structuralSpeed = 2000;
            deletionFlag = true;
        } else if (deletionFlag && characterIndex === 0) {
            deletionFlag = false;
            listIndex = (listIndex + 1) % targetStrings.length;
            structuralSpeed = 400;
        }
        setTimeout(runTyperEngine, structuralSpeed);
    }
    if (typingField) runTyperEngine();

    // --- 3. Mobile Hamburger Navigation Controller ---
    const menuToggle = document.getElementById('hamburgerToggle');
    const navMenuLayer = document.getElementById('navMenuLayer');
    const navAnchorLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenuLayer) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenuLayer.classList.toggle('active');
        });

        navAnchorLinks.forEach(linkItem => {
            linkItem.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenuLayer.classList.remove('active');
            });
        });
    }

    // --- 4. Window Scroll Monitors (Sticky Navbar & Active Tracking) ---
    const headerNavbar = document.querySelector('.navbar');
    const topReturnTrigger = document.getElementById('scrollTopBtn');
    const visualSections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const globalScrollY = window.scrollY;

        if (headerNavbar) {
            if (globalScrollY > 60) headerNavbar.classList.add('scrolled');
            else headerNavbar.classList.remove('scrolled');
        }

        if (topReturnTrigger) {
            if (globalScrollY > 400) topReturnTrigger.classList.add('visible');
            else topReturnTrigger.classList.remove('visible');
        }

        visualSections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTopOffset = section.offsetTop - 140;
            const targetId = section.getAttribute('id');

            if (globalScrollY > sectionTopOffset && globalScrollY <= sectionTopOffset + sectionHeight) {
                const activeAnchor = document.querySelector(`.nav-menu a[href*="${targetId}"]`);
                if (activeAnchor) {
                    navAnchorLinks.forEach(link => link.classList.remove('active'));
                    activeAnchor.classList.add('active');
                }
            }
        });
    });

    if (topReturnTrigger) {
        topReturnTrigger.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- 5. High Performance Intersection Observer Layout ---
    const revealNodes = document.querySelectorAll('.scroll-reveal');
    const animationSettings = {
        root: null,
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px"
    };

    const elementRevealObserver = new IntersectionObserver((entries, selfObserver) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                selfObserver.unobserve(entry.target);
            }
        });
    }, animationSettings);

    revealNodes.forEach(node => elementRevealObserver.observe(node));

    // --- 6. Form Submission Emulation ---
    const communicationForm = document.getElementById('portfolioCommsForm');
    if (communicationForm) {
        communicationForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const senderName = document.getElementById('clientIdentity').value.trim();
            showToast(`Thank you ${senderName}! Your message was transmitted.`);
            communicationForm.reset();
        });
    }

    // --- 7. Project Category Filtering Engine ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.showcase-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category') || '';
                if (filterValue === 'all' || category.includes(filterValue)) {
                    card.classList.remove('filtered-out');
                    card.style.display = 'flex';
                } else {
                    card.classList.add('filtered-out');
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- 8. Copy-to-Clipboard & Toast Feedback ---
    function showToast(message) {
        let toast = document.querySelector('.portfolio-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'portfolio-toast';
            document.body.appendChild(toast);
        }
        toast.innerHTML = `<i class="fas fa-check-circle" style="color: var(--neon-cyan); margin-right: 8px;"></i> ${message}`;
        toast.classList.add('toast-active');

        setTimeout(() => {
            toast.classList.remove('toast-active');
        }, 2500);
    }

    const copyButtons = document.querySelectorAll('.copy-trigger-btn');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const parentItem = btn.closest('.copyable-item');
            if (parentItem) {
                const textToCopy = parentItem.getAttribute('data-copy');
                if (textToCopy) {
                    navigator.clipboard.writeText(textToCopy).then(() => {
                        showToast(`Copied to clipboard: ${textToCopy}`);
                    }).catch(err => {
                        console.error('Failed to copy: ', err);
                    });
                }
            }
        });
    });
});
