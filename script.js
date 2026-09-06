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

        // ==========================================================================
    // --- 7. Comprehensive Projects Data Store & Modal Engine ---
    // ==========================================================================
    const projectsData = {
        pcms: {
            id: "pcms",
            title: "Decentralized Patient Consent Management System",
            subtitle: "Enterprise-Grade Web3 EHR Access Control & Consent Platform",
            badge: "Blockchain & Web3",
            icon: "fas fa-cubes",
            github: "https://github.com/VishnuSreeVidya/Patient-Consent-Management-System",
            liveDemo: "",
            problemStatement: "Traditional Electronic Health Record (EHR) systems centralize patient medical records in vulnerable silos, subjecting sensitive histories to institutional breaches, unauthorized monetization, and zero patient consent sovereignty. Furthermore, emergency scenarios require immediate critical care access without compromising permanent forensic auditability.",
            workflow: [
                {
                    step: 1,
                    title: "Client-Side Zero-Knowledge Encryption",
                    desc: "Diagnostic payloads and clinical files are encrypted in the patient's browser using AES-GCM-256 and PBKDF2 before transmission."
                },
                {
                    step: 2,
                    title: "Decentralized IPFS Storage",
                    desc: "Encrypted cipher data is pinned across decentralized IPFS nodes; only deterministic cryptographic CIDs are returned."
                },
                {
                    step: 3,
                    title: "Smart Contract Access Control",
                    desc: "Solidity smart contracts (PatientConsent.sol) govern permission matrices, time-locks, and cryptographic consent grants."
                },
                {
                    step: 4,
                    title: "ER Break-Glass Protocol",
                    desc: "Urgent medical overrides require mandatory clinical justification, instantly creating an immutable on-chain audit event."
                }
            ],
            features: [
                "Engineered production-grade Solidity smart contracts on Ethereum EVM enforcing granular patient-mediated authorization rules.",
                "Client-side zero-knowledge data confidentiality using AES-GCM 256-bit encryption and PBKDF2 key derivation prior to decentralized IPFS pinning.",
                "Fine-grained categorical permissions (General, Prescriptions, Lab Tests, Radiology, Sensitive) with smart contract time-bound validity and automated expiration.",
                "Emergency ER 'Break-Glass' protocol with mandatory clinical justification, creating an immutable on-chain forensic audit trail and instant ER alert notifications.",
                "Seamless Web3 wallet integration via MetaMask and Ethers.js v6 with dynamic event listeners."
            ],
            technologies: [
                "Solidity", "Ethereum / EVM", "Hardhat", "React 19", "Ethers.js v6", "IPFS", "AES-GCM-256", "MetaMask", "PBKDF2"
            ],
            challenges: "Balancing client-side cryptographic latency during high-resolution diagnostic file encryption while minimizing EVM gas overhead across complex multi-tier permission registries.",
            learnings: "Mastered decentralized access-control patterns, smart contract event indexing, zero-trust storage mechanics, and gas-efficient storage layouts in Solidity."
        },

        cybershield: {
            id: "cybershield",
            title: "CyberShield AI",
            subtitle: "Real-Time Cyber Security Log Analyzer & SOC Threat Detection Platform",
            badge: "AI & Security Operations",
            icon: "fas fa-shield-halved",
            github: "https://github.com/VishnuSreeVidya/CyberShield-AI",
            liveDemo: "",
            problemStatement: "Modern enterprise systems generate millions of raw server logs per hour across disparate formats. Manual analysis and sluggish monolithic tools fail to isolate zero-day indicators of compromise (IOCs), brute-force outbreaks, or data exfiltration attempts in real time, exposing networks to dangerous adversary dwell times.",
            workflow: [
                {
                    step: 1,
                    title: "Multi-Source Log Ingestion",
                    desc: "Accepts high-volume Apache, Syslog, JSON, and CSV server logs via drag-and-drop or continuous log stream."
                },
                {
                    step: 2,
                    title: "Async ThreadPool Parsing",
                    desc: "Python ThreadPoolExecutor parallelizes log extraction, timestamp parsing, and IP resolution with zero UI latency."
                },
                {
                    step: 3,
                    title: "7-Rule Heuristic Engine",
                    desc: "Scans payloads against deterministic heuristics for SQLi, XSS, Brute Force, Directory Traversal, Port Scans, and DoS."
                },
                {
                    step: 4,
                    title: "SOC Telemetry & Forensics Export",
                    desc: "Visualizes alert metrics on an interactive SOC dashboard and generates exportable PDF, CSV, and JSON incident reports."
                }
            ],
            features: [
                "Production-grade SOC telemetry interface with live incident triage, threat severity classifications, and Chart.js telemetry visualization.",
                "Asynchronous background processing engine utilizing Python ThreadPoolExecutor with real-time status polling for high-volume server logs.",
                "Multi-vector heuristic & threshold threat engine detecting Brute Force, SQL Injection, XSS, Directory Traversal, Port Scanning, and DoS attacks.",
                "Deep threat intelligence scanners: heuristic URL security analysis, malware file hash verification (MD5/SHA256), and PDF document parser.",
                "Automated multi-page forensic reporting delivering standardized PDF, CSV, and JSON incident export packages."
            ],
            technologies: [
                "Python 3.13", "Flask", "PostgreSQL", "Docker", "Scikit-learn", "Pandas", "Chart.js", "Threat Intelligence", "SOC Dashboard"
            ],
            challenges: "Processing gigabyte-scale unformatted log files concurrently without memory exhaustion and eliminating false-positive spikes during benign peak network traffic.",
            learnings: "Deepened expertise in asynchronous concurrency models, regex optimization for cyber forensics, and designing ergonomic interfaces for SOC analysts under high cognitive load."
        },

        nodetalk: {
            id: "nodetalk",
            title: "NodeTalk",
            subtitle: "Secure Real-Time Messaging Platform with Row-Level Security",
            badge: "Real-Time Messaging",
            icon: "fas fa-comments",
            github: "https://github.com/VishnuSreeVidya/NodeTalk",
            liveDemo: "",
            problemStatement: "Conventional messaging applications frequently suffer from high latency, insecure session serialization, or lack strict database tenant isolation, exposing private user discussions to eavesdropping or cross-account leakage.",
            workflow: [
                {
                    step: 1,
                    title: "JWT Token Handshake",
                    desc: "Clients authenticate via cryptographically signed JWT bearer tokens validated on initial connection."
                },
                {
                    step: 2,
                    title: "WebSocket & Realtime Hook",
                    desc: "Establishes duplex low-latency WebSocket channels via Supabase Realtime for instant one-to-one message dispatch."
                },
                {
                    step: 3,
                    title: "PostgreSQL RLS Filtering",
                    desc: "Database Row-Level Security policies enforce that queries only access conversation rows where the user is an active participant."
                },
                {
                    step: 4,
                    title: "Optimistic State Sync",
                    desc: "React interface updates message trees optimistically with online presence tracking and read receipts."
                }
            ],
            features: [
                "Low-latency bidirectional communication using WebSockets and Supabase Realtime for instant one-to-one messaging.",
                "Integrated JWT-based authentication and PostgreSQL Row-Level Security (RLS) ensuring strict user data protection.",
                "Responsive user interface built with React.js and Tailwind CSS with real-time message synchronization and online presence tracking.",
                "Optimized database indexing for low-latency thread retrieval and persistent message history."
            ],
            technologies: [
                "React.js", "Node.js", "Express.js", "PostgreSQL (Supabase)", "WebSockets", "JWT", "Tailwind CSS"
            ],
            challenges: "Eliminating message duplication across socket reconnections in unstable network conditions while strictly enforcing PostgreSQL RLS without query degradation.",
            learnings: "Mastered WebSocket lifecycle management, database-level security isolation, and optimistic UI synchronization in distributed clients."
        },

        cryptpact: {
            id: "cryptpact",
            title: "CryptPact",
            subtitle: "End-to-End Encrypted Real-Time Messaging Application",
            badge: "Encrypted Systems",
            icon: "fas fa-lock",
            github: "https://github.com/VishnuSreeVidya",
            liveDemo: "",
            problemStatement: "Centralized communication platforms retain plaintext keys or server-side decryption abilities, leaving confidential conversations, proprietary code, and sensitive credentials exposed to server breaches and surveillance.",
            workflow: [
                {
                    step: 1,
                    title: "Client-Side Key Exchange",
                    desc: "Asymmetric cryptographic handshake performed directly in-browser prior to establishing session credentials."
                },
                {
                    step: 2,
                    title: "Zero-Knowledge Cipher Packaging",
                    desc: "Messages and attachments are encrypted before leaving the device; servers only handle unreadable cipher text."
                },
                {
                    step: 3,
                    title: "Encrypted Socket Relaying",
                    desc: "Secure WebSocket multiplexing routes encrypted payloads without server-side key access."
                },
                {
                    step: 4,
                    title: "Ephemeral In-Memory Decryption",
                    desc: "Recipient browser decrypts messages in volatile memory with zero plaintext retention on host disks."
                }
            ],
            features: [
                "Engineered client-side end-to-end encryption protocols ensuring zero-knowledge privacy and total communication security.",
                "Integrated JWT authentication and WebSockets for secure connection handshakes and instant message delivery.",
                "Encrypted workspace rooms and terminal vault channels with ephemeral message options.",
                "Responsive modern UI with secure REST APIs delivering seamless encrypted chats and file handling."
            ],
            technologies: [
                "React.js", "Node.js", "Express.js", "MongoDB", "WebSockets", "JWT", "Web Cryptography API"
            ],
            challenges: "Managing client-side cryptographic key derivation without interrupting real-time typing speed and fluid UI responsiveness.",
            learnings: "Gained comprehensive command over end-to-end cryptographic architectures, Web Cryptography API, and zero-knowledge threat modeling."
        },

        safelink: {
            id: "safelink",
            title: "SafeLink",
            subtitle: "IoT-Based Emergency Response Wearable with Telegram Alert Telemetry",
            badge: "Security & IoT",
            icon: "fas fa-microchip",
            github: "https://github.com/VishnuSreeVidya/safe-link",
            liveDemo: "",
            problemStatement: "During sudden physical distress, falls, or personal safety emergencies, victims often cannot unlock a smartphone or dial emergency contacts, resulting in critical response delays when every second counts.",
            workflow: [
                {
                    step: 1,
                    title: "Continuous Sensor Polling",
                    desc: "ESP32 microcontroller constantly samples the ADXL345 3-axis accelerometer and acoustic sensors."
                },
                {
                    step: 2,
                    title: "Fall & SOS Heuristic Trigger",
                    desc: "Algorithm detects free-fall followed by high-G impact or activates via tactile SOS panic button."
                },
                {
                    step: 3,
                    title: "TinyGPS Coordinate Acquisition",
                    desc: "GPS module locks satellite coordinates, computing real-time latitude, longitude, and elevation."
                },
                {
                    step: 4,
                    title: "Telegram Bot Alert Telemetry",
                    desc: "Dispatches automated emergency messages with live Google Maps links to designated guardian channels."
                }
            ],
            features: [
                "Developed an autonomous IoT wearable safety device that detects falls, loud acoustic peaks, and SOS panic triggers.",
                "Integrated TinyGPS tracking and Telegram Bot API to send real-time location-based notifications to emergency contacts.",
                "Implemented sensor-based emergency detection using ESP32, ADXL345 3-axis accelerometer, and acoustic sensor.",
                "Field-tested through real-world community trials involving 50+ participants demonstrating verified alert latency under 4 seconds."
            ],
            technologies: [
                "ESP32", "Arduino IDE", "TinyGPS", "ADXL345 Accelerometer", "Telegram Bot API", "Wi-Fi Telemetry", "C/C++"
            ],
            challenges: "Filtering out accidental accelerometer noise (like jogging or device handling) from true human falls, while maintaining extreme power efficiency on a wearable battery.",
            learnings: "Practical mastery of embedded hardware programming, sensor calibration, real-time interrupt handling, and low-latency emergency telemetry."
        },

        eventnest: {
            id: "eventnest",
            title: "EventNest",
            subtitle: "Premier Venue Discovery, Real-Time Quotation Suite & AI Event Concierge",
            badge: "AI Venue Platform",
            icon: "fas fa-calendar-check",
            github: "https://github.com/VishnuSreeVidya/Eventnest",
            liveDemo: "",
            problemStatement: "Event planners and families in Andhra Pradesh and Telangana face opaque venue pricing, hidden catering fees, and cumbersome offline negotiations without spec comparisons, causing budget overruns and planning delays.",
            workflow: [
                {
                    step: 1,
                    title: "Multi-Filter Discovery",
                    desc: "Planners filter venues by budget, guest capacity, AC status, catering, and location across AP and Telangana."
                },
                {
                    step: 2,
                    title: "Side-by-Side Comparison Drawer",
                    desc: "Compares up to 4 venues simultaneously with difference highlights and one-click printable reports."
                },
                {
                    step: 3,
                    title: "Live Cost Estimator & Quote Sheet",
                    desc: "Calculates grand totals including 18% GST with automated quotation reference numbers (#EN-QT-XXXXXX)."
                },
                {
                    step: 4,
                    title: "AI Concierge & Multi-Role Dashboards",
                    desc: "Conversational AI assists budget allocation; distinct dashboards orchestrate Customer, Owner, and Admin workflows."
                }
            ],
            features: [
                "Side-by-side venue comparison drawer comparing up to 4 halls simultaneously with difference highlights and one-click printable reports (window.print()).",
                "Interactive live package cost estimator calculating exact budgets in real time with 18% GST breakdown and verified official quote sheet generation.",
                "Visual weekend availability calendar with real-time slot locking for owners and planners.",
                "AI Event Suite featuring match compatibility scoring, visual budget allocation progress bars, and conversational AI concierge with preset prompt chips.",
                "Multi-role management architecture supporting Customers (enquiry tracking), Venue Owners (multi-step listing, date locker), and Admins (verification queue)."
            ],
            technologies: [
                "React 19", "Vite", "Node.js", "Express.js", "Socket.io", "Redux Toolkit", "Framer Motion", "Tailwind CSS", "PostgreSQL"
            ],
            challenges: "Engineering real-time synchronized calculations across variable guest counts, food tiers, and tax laws with instantaneous printable layout fidelity.",
            learnings: "Architected complex multi-role state machines, responsive comparison matrices, and print-optimized CSS for commercial quotation documents."
        }
    };

    // --- Horizontal Carousel Navigation & Drag Engine ---
    const projectsTrack = document.getElementById('projectsHorizontalTrack');
    const prevBtn = document.getElementById('projectScrollPrev');
    const nextBtn = document.getElementById('projectScrollNext');
    const progressThumb = document.getElementById('projectsScrollProgressThumb');

    function updateTrackControls() {
        if (!projectsTrack) return;
        const scrollLeft = projectsTrack.scrollLeft;
        const maxScroll = projectsTrack.scrollWidth - projectsTrack.clientWidth;

        if (prevBtn) {
            if (scrollLeft <= 8) prevBtn.classList.add('disabled');
            else prevBtn.classList.remove('disabled');
        }

        if (nextBtn) {
            if (scrollLeft >= maxScroll - 8) nextBtn.classList.add('disabled');
            else nextBtn.classList.remove('disabled');
        }

        if (progressThumb && maxScroll > 0) {
            const scrollRatio = scrollLeft / maxScroll;
            const thumbWidth = 25; // in percent
            const maxTranslate = 100 - thumbWidth;
            progressThumb.style.width = `${thumbWidth}%`;
            progressThumb.style.transform = `translateX(${scrollRatio * (maxTranslate / thumbWidth) * 100}%)`;
        }
    }

    if (projectsTrack) {
        projectsTrack.addEventListener('scroll', updateTrackControls);
        window.addEventListener('resize', updateTrackControls);
        setTimeout(updateTrackControls, 200);

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                const cardWidth = projectsTrack.querySelector('.project-compact-card')?.offsetWidth || 360;
                projectsTrack.scrollBy({ left: -(cardWidth + 24), behavior: 'smooth' });
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const cardWidth = projectsTrack.querySelector('.project-compact-card')?.offsetWidth || 360;
                projectsTrack.scrollBy({ left: (cardWidth + 24), behavior: 'smooth' });
            });
        }

        // Mouse Drag to Scroll
        let isDown = false;
        let startX = 0;
        let scrollStartLeft = 0;
        let hasMoved = false;

        projectsTrack.addEventListener('mousedown', (e) => {
            isDown = true;
            hasMoved = false;
            startX = e.pageX - projectsTrack.offsetLeft;
            scrollStartLeft = projectsTrack.scrollLeft;
        });

        projectsTrack.addEventListener('mouseleave', () => {
            isDown = false;
        });

        projectsTrack.addEventListener('mouseup', () => {
            isDown = false;
        });

        projectsTrack.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - projectsTrack.offsetLeft;
            const walk = (x - startX) * 1.5;
            if (Math.abs(walk) > 5) hasMoved = true;
            projectsTrack.scrollLeft = scrollStartLeft - walk;
        });
    }

    // --- Category Filtering Engine ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const compactCards = document.querySelectorAll('.project-compact-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            compactCards.forEach(card => {
                const category = card.getAttribute('data-category') || '';
                if (filterValue === 'all' || category.includes(filterValue)) {
                    card.classList.remove('filtered-out');
                    card.style.display = 'flex';
                } else {
                    card.classList.add('filtered-out');
                    card.style.display = 'none';
                }
            });

            if (projectsTrack) {
                projectsTrack.scrollTo({ left: 0, behavior: 'smooth' });
                setTimeout(updateTrackControls, 250);
            }
        });
    });

    // --- Modal Management Engine ---
    const projectModal = document.getElementById('projectDetailsModal');
    const modalContentContainer = document.getElementById('modalBodyContent');
    const closeModalBtn = document.getElementById('closeProjectModal');

    function openProjectDetails(projectId) {
        const project = projectsData[projectId];
        if (!project || !modalContentContainer || !projectModal) return;

        let actionButtonsHtml = '';
        if (project.github) {
            actionButtonsHtml += `
                <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="modal-action-btn modal-btn-primary">
                    <i class="fab fa-github"></i> View GitHub Repository
                </a>
            `;
        }
        if (project.liveDemo) {
            actionButtonsHtml += `
                <a href="${project.liveDemo}" target="_blank" rel="noopener noreferrer" class="modal-action-btn modal-btn-secondary">
                    <i class="fas fa-arrow-up-right-from-square"></i> Launch Live Demo
                </a>
            `;
        }

        const workflowCardsHtml = project.workflow.map(step => `
            <div class="modal-step-card">
                <div class="modal-step-header">
                    <span class="modal-step-number">${step.step}</span>
                    <h5 class="modal-step-title">${step.title}</h5>
                </div>
                <p class="modal-step-desc">${step.desc}</p>
            </div>
        `).join('');

        const featuresListHtml = project.features.map(feat => `
            <li class="modal-feature-item">
                <i class="fas fa-check-circle modal-feature-bullet"></i>
                <span>${feat}</span>
            </li>
        `).join('');

        const techPillsHtml = project.technologies.map(tech => `
            <span class="modal-tech-pill">${tech}</span>
        `).join('');

        modalContentContainer.innerHTML = `
            <div class="modal-header-hero">
                <div class="modal-badge-row">
                    <span class="project-badge"><i class="${project.icon}" style="margin-right: 6px;"></i> ${project.badge}</span>
                </div>
                <h3 class="modal-title" id="modalProjectTitle">${project.title}</h3>
                <p class="modal-subtitle">${project.subtitle}</p>
                <div class="modal-action-row">
                    ${actionButtonsHtml}
                </div>
            </div>

            <div class="modal-section">
                <h4 class="modal-section-title"><i class="fas fa-bullseye"></i> Problem Statement & Purpose</h4>
                <div class="modal-problem-card">
                    <p>${project.problemStatement}</p>
                </div>
            </div>

            <div class="modal-section">
                <h4 class="modal-section-title"><i class="fas fa-network-wired"></i> System Architecture & Workflow</h4>
                <div class="modal-workflow-track">
                    ${workflowCardsHtml}
                </div>
            </div>

            <div class="modal-section">
                <h4 class="modal-section-title"><i class="fas fa-star"></i> Key Engineering Features</h4>
                <ul class="modal-features-list">
                    ${featuresListHtml}
                </ul>
            </div>

            <div class="modal-section">
                <h4 class="modal-section-title"><i class="fas fa-layer-group"></i> Technologies & Ecosystem</h4>
                <div class="modal-tech-cloud">
                    ${techPillsHtml}
                </div>
            </div>

            <div class="modal-section">
                <div class="modal-dual-grid">
                    <div class="modal-box-card">
                        <h4><i class="fas fa-shield-virus" style="color: #f87171;"></i> Engineering Challenges</h4>
                        <p>${project.challenges}</p>
                    </div>
                    <div class="modal-box-card">
                        <h4><i class="fas fa-lightbulb" style="color: #fbbf24;"></i> Key Learnings & Takeaways</h4>
                        <p>${project.learnings}</p>
                    </div>
                </div>
            </div>
        `;

        projectModal.classList.add('active');
        projectModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeProjectDetails() {
        if (!projectModal) return;
        projectModal.classList.remove('active');
        projectModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // Attach click listeners to cards
    compactCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const projectId = card.getAttribute('data-project-id');
            if (projectId) openProjectDetails(projectId);
        });

        // Keyboard accessibility (Enter / Space)
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const projectId = card.getAttribute('data-project-id');
                if (projectId) openProjectDetails(projectId);
            }
        });
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeProjectDetails);
    }

    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                closeProjectDetails();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
            closeProjectDetails();
        }
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
