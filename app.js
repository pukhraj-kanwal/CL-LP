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

// Platform flow diagram animation
function initPlatformDiagram() {
    const diagram = document.getElementById('platform-flow-diagram');
    if (!diagram) return;
    
    // Create animated flow diagram
    diagram.innerHTML = `
        <div class="flow-container">
            <div class="flow-node shipper-node">
                <i class="fas fa-building"></i>
                <span>Shipper</span>
            </div>
            
            <div class="flow-arrow">
                <div class="arrow-line"></div>
                <div class="arrow-head"></div>
                <div class="flow-label">Direct Connection</div>
            </div>
            
            <div class="flow-node platform-node">
                <i class="fas fa-brain"></i>
                <span>CargoLynx AI</span>
            </div>
            
            <div class="flow-arrow">
                <div class="arrow-line"></div>
                <div class="arrow-head"></div>
                <div class="flow-label">Intelligent Matching</div>
            </div>
            
            <div class="flow-node carrier-node">
                <i class="fas fa-truck"></i>
                <span>Carrier</span>
            </div>
        </div>
    `;
    
    // Add CSS for the diagram
    const style = document.createElement('style');
    style.textContent = `
        .flow-container {
            display: flex;
            align-items: center;
            justify-content: space-around;
            padding: 2rem;
        }
        
        .flow-node {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            padding: 2rem;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
        }
        
        .flow-node:hover {
            transform: translateY(-4px);
        }
        
        .flow-node i {
            font-size: 3rem;
            color: #FF6B35;
        }
        
        .flow-node span {
            font-weight: 600;
            color: #323232;
        }
        
        .flow-arrow {
            position: relative;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .arrow-line {
            position: absolute;
            width: 100%;
            height: 2px;
            background: #FF6B35;
            animation: flow 2s ease-in-out infinite;
        }
        
        .arrow-head {
            position: absolute;
            right: 0;
            width: 0;
            height: 0;
            border-left: 12px solid #FF6B35;
            border-top: 8px solid transparent;
            border-bottom: 8px solid transparent;
        }
        
        .flow-label {
            position: absolute;
            top: -30px;
            font-size: 0.875rem;
            color: #959595;
            white-space: nowrap;
        }
        
        @keyframes flow {
            0% {
                background: linear-gradient(90deg, transparent 0%, #FF6B35 50%, transparent 100%);
                background-size: 200% 100%;
                background-position: -100% 0;
            }
            100% {
                background-position: 100% 0;
            }
        }
        
        @media (max-width: 768px) {
            .flow-container {
                flex-direction: column;
                gap: 2rem;
            }
            
            .flow-arrow {
                transform: rotate(90deg);
                width: 100px;
                height: 60px;
            }
        }
        
        /* Animation classes */
        .fade-in-up {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in-up.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Mobile menu styles */
        .mobile-menu {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            padding: 1rem;
            transform: translateY(-100%);
            opacity: 0;
            transition: transform 0.3s ease, opacity 0.3s ease;
        }
        
        .mobile-menu.active {
            display: block;
            transform: translateY(0);
            opacity: 1;
        }
        
        .mobile-menu .nav-menu {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-bottom: 1rem;
        }
        
        .mobile-menu .nav-cta {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }
    `;
    
    document.head.appendChild(style);
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