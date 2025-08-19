// CargoLynx Landing Page JavaScript

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initHeader();
    initNetworkAnimation();
    initJourneyToggle();
    initFeatureFilter();
    initSmoothScroll();
    initMobileMenu();
    initScrollAnimations();
    initPlatformDiagram();
    initPlatformIllustration();
});

// Header scroll effect
function initHeader() {
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// Network animation on hero section
function initNetworkAnimation() {
    const canvas = document.getElementById('network-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const nodes = [];
    const connections = [];
    const nodeCount = 50;
    
    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 3 + 2
        });
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update nodes
        nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            
            // Bounce off walls
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
            
            // Draw node
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 107, 53, 0.6)';
            ctx.fill();
        });
        
        // Draw connections
        nodes.forEach((node, i) => {
            nodes.slice(i + 1).forEach(otherNode => {
                const distance = Math.sqrt(
                    Math.pow(node.x - otherNode.x, 2) + 
                    Math.pow(node.y - otherNode.y, 2)
                );
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(otherNode.x, otherNode.y);
                    ctx.strokeStyle = `rgba(255, 107, 53, ${0.2 * (1 - distance / 150)})`;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Journey toggle functionality
function initJourneyToggle() {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const journeys = document.querySelectorAll('.journey');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const journey = button.dataset.journey;
            
            // Update active states
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            journeys.forEach(j => {
                if (j.classList.contains(`${journey}-journey`)) {
                    j.classList.add('active');
                } else {
                    j.classList.remove('active');
                }
            });
        });
    });
}

// Feature filter functionality
function initFeatureFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const featureItems = document.querySelectorAll('.feature-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            // Update active states
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter features
            featureItems.forEach(item => {
                const category = item.dataset.category;
                
                if (filter === 'all' || category === filter || category === 'all') {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Smooth scroll for navigation links
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navCta = document.querySelector('.nav-cta');
    
    if (!menuToggle) return;
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        
        // Create mobile menu if it doesn't exist
        let mobileMenu = document.querySelector('.mobile-menu');
        
        if (!mobileMenu) {
            mobileMenu = document.createElement('div');
            mobileMenu.className = 'mobile-menu';
            
            // Clone menu items
            const menuClone = navMenu.cloneNode(true);
            const ctaClone = navCta.cloneNode(true);
            
            mobileMenu.appendChild(menuClone);
            mobileMenu.appendChild(ctaClone);
            
            document.querySelector('.header').appendChild(mobileMenu);
        }
        
        mobileMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.addEventListener('click', (e) => {
        if (e.target.closest('.nav-menu a')) {
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll(
        '.benefit-card, .pillar, .tech-card, .step, .metric, .tier-card'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });
}

// Platform flow diagram animation (legacy)
function initPlatformDiagram() {
    const diagram = document.getElementById('platform-flow-diagram');
    if (!diagram) return;
    
    // Create animated flow diagram with enhanced content
    diagram.innerHTML = `
        <div class="flow-container">
            <div class="flow-node shipper-node" data-node="shipper">
                <i class="fas fa-building"></i>
                <span>Shipper</span>
                <div class="node-details">
                    <p>Direct access to verified carriers</p>
                    <p>Real-time tracking & transparency</p>
                </div>
            </div>
            
            <div class="flow-arrow">
                <div class="arrow-line"></div>
                <div class="arrow-head"></div>
                <div class="flow-label">Direct Connection</div>
            </div>
            
            <div class="flow-node platform-node" data-node="platform">
                <i class="fas fa-brain"></i>
                <span>CargoLynx AI</span>
                <div class="node-details">
                    <p>Intelligent matching algorithm</p>
                    <p>Automated optimization</p>
                </div>
            </div>
            
            <div class="flow-arrow">
                <div class="arrow-line"></div>
                <div class="arrow-head"></div>
                <div class="flow-label">Intelligent Matching</div>
            </div>
            
            <div class="flow-node carrier-node" data-node="carrier">
                <i class="fas fa-truck"></i>
                <span>Carrier</span>
                <div class="node-details">
                    <p>Premium freight opportunities</p>
                    <p>Instant payment options</p>
                </div>
            </div>
        </div>
    `;
    
    // Add interactive functionality to nodes
    const nodes = diagram.querySelectorAll('.flow-node');
    
    // Add hover effect for node details
    nodes.forEach(node => {
        const details = node.querySelector('.node-details');
        if (details) {
            details.style.opacity = '0';
            details.style.transform = 'translateY(10px)';
            details.style.transition = 'all 0.3s ease';
            details.style.marginTop = '10px';
            
            node.addEventListener('mouseenter', () => {
                details.style.opacity = '1';
                details.style.transform = 'translateY(0)';
            });
            
            node.addEventListener('mouseleave', () => {
                details.style.opacity = '0';
                details.style.transform = 'translateY(10px)';
            });
        }
    });
    
    // Animate nodes on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.5 });
    
    nodes.forEach(node => {
        node.style.opacity = '0';
        node.style.transform = 'translateY(20px)';
        node.style.transition = 'all 0.6s ease';
        observer.observe(node);
    });
}

// Platform Illustration Interactive Script
function initPlatformIllustration() {
    // Animate numbers on scroll
    const animateNumbers = () => {
        const numbers = document.querySelectorAll('.stat-number');
        
        numbers.forEach(number => {
            const value = parseFloat(number.getAttribute('data-value'));
            const isDecimal = value % 1 !== 0;
            const duration = 2000;
            const start = 0;
            const increment = value / (duration / 16);
            let current = start;
            
            const updateNumber = () => {
                current += increment;
                if (current < value) {
                    number.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
                    requestAnimationFrame(updateNumber);
                } else {
                    number.textContent = value;
                    // Add suffix based on context
                    if (number.parentElement.textContent.includes('Rate')) {
                        number.setAttribute('data-suffix', '%');
                    } else if (number.parentElement.textContent.includes('Reduction')) {
                        number.setAttribute('data-suffix', '%');
                    } else if (number.parentElement.textContent.includes('Billion')) {
                        number.setAttribute('data-suffix', 'B');
                    } else if (number.parentElement.textContent.includes('Seconds')) {
                        number.setAttribute('data-suffix', 's');
                    }
                }
            };
            
            updateNumber();
        });
    };
    
    // Intersection Observer for all animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger number animation for stats
                if (entry.target.classList.contains('platform-stats')) {
                    animateNumbers();
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animatedElements = document.querySelectorAll('.flow-item, .process-steps, .platform-stats, .section-header');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Flow item interactions
    const flowItems = document.querySelectorAll('.flow-item');
    const stepCards = document.querySelectorAll('.step-card');
    
    // Sync flow items with step cards
    flowItems.forEach(item => {
        item.addEventListener('click', function() {
            const step = this.getAttribute('data-step');
            
            // Update active states
            flowItems.forEach(f => f.classList.remove('active'));
            stepCards.forEach(s => s.classList.remove('active'));
            
            this.classList.add('active');
            const correspondingStep = document.querySelector(`.step-card[data-step="${step}"]`);
            if (correspondingStep) {
                correspondingStep.classList.add('active');
                correspondingStep.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });
    
    // Step card interactions
    stepCards.forEach(card => {
        card.addEventListener('click', function() {
            const step = this.getAttribute('data-step');
            
            // Update active states
            stepCards.forEach(s => s.classList.remove('active'));
            flowItems.forEach(f => f.classList.remove('active'));
            
            this.classList.add('active');
            const correspondingFlow = document.querySelector(`.flow-item[data-step="${step}"]`);
            if (correspondingFlow) {
                correspondingFlow.classList.add('active');
            }
        });
    });
    
    // Add hover effect for connection lines
    const connectionWrappers = document.querySelectorAll('.connection-wrapper');
    connectionWrappers.forEach(wrapper => {
        wrapper.addEventListener('mouseenter', function() {
            const movingDot = this.querySelector('.moving-dot');
            if (movingDot) {
                movingDot.style.animationDuration = '1s';
            }
        });
        
        wrapper.addEventListener('mouseleave', function() {
            const movingDot = this.querySelector('.moving-dot');
            if (movingDot) {
                movingDot.style.animationDuration = '3s';
            }
        });
    });
}

// Add some interactive hover effects
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.benefit-card, .tech-card, .cta-card');
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        
        if (e.clientX >= rect.left && e.clientX <= rect.right &&
            e.clientY >= rect.top && e.clientY <= rect.bottom) {
            card.style.transform = `perspective(1000px) rotateY(${deltaX * 5}deg) rotateX(${-deltaY * 5}deg) translateZ(10px)`;
        } else {
            card.style.transform = '';
        }
    });
});