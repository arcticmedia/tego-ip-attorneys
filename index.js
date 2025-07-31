// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = '#ffffff';
        header.style.backdropFilter = 'none';
    }
});

// CTA Button Interactions
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        // Handle different button actions
        const buttonText = this.textContent.toLowerCase();
        
        if (buttonText.includes('consultation')) {
            // Scroll to contact section
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        } else if (buttonText.includes('call')) {
            // Handle phone call (in a real app, this would trigger a phone call)
            console.log('Phone call initiated');
        }
    });
});

// Practice Area Card Interactions
document.querySelectorAll('.practice-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
    
    card.addEventListener('click', function() {
        // Add click effect
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// Testimonial Card Interactions
document.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.practice-card, .testimonial-card, .about-content, .hero-content');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Form validation for future contact form
function validateForm(formData) {
    const errors = [];
    
    if (!formData.get('name') || formData.get('name').trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    if (!formData.get('email') || !isValidEmail(formData.get('email'))) {
        errors.push('Please enter a valid email address');
    }
    
    if (!formData.get('phone') || formData.get('phone').trim().length < 10) {
        errors.push('Please enter a valid phone number');
    }
    
    if (!formData.get('message') || formData.get('message').trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    return errors;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Performance optimization - lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Console welcome message
console.log('Welcome to Tego website!');
console.log('For legal assistance, please contact us at +354 517 8080');

// Team Member Switching Functionality
const teamMembers = [
    {
        name: "Bylgja Hrönn Björnsdóttir",
        title: "Partner - IP Attorney",
        bio: "Bylgja joined Tego as a Partner in 2016. She is an IP Attorney with over 13 years' experience of working with IPR and is an experienced practitioner both before the Icelandic authorities and the EUIPO.",
        image: "photos/person1.jpg"
    },
    {
        name: "Helga Guðmundsdóttir",
        title: "Lawyer",
        bio: "Helga completed a Bachelor's degree in Law from the University of Iceland in 2013, a Master's degree in International Law and the Settlement of Disputes from the United Nations mandated University for Peace in 2014 and is completing a Mag.",
        image: "photos/person2.png"
    },
    {
        name: "Lovísa Jónsdóttir",
        title: "Partner - IP Attorney",
        bio: "Lovísa is a founding Partner of Tego IP Consulting. She is an IP Attorney and has worked with IPR´s since 2003. Throughout her carreer Lovisa has been working with a wide range of IPR's for a versatile range of clients, comprising from all areas of the economic spectrum, such as the food, pharmaceutical and clothing industry as well as the finance sector.",
        image: "photos/person3.png"
    }
];

// Initialize team member switching
document.addEventListener('DOMContentLoaded', () => {
    const featuredImage = document.querySelector('.featured-img');
    const featuredName = document.querySelector('.featured-name');
    const featuredTitle = document.querySelector('.featured-title');
    const featuredBio = document.querySelector('.featured-bio');
    const teamThumbnails = document.querySelectorAll('.team-thumbnail');

    // Add click event listeners to thumbnails
    teamThumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            if (index < teamMembers.length) {
                switchTeamMember(index, featuredImage, featuredName, featuredTitle, featuredBio);
            }
        });

        // Add hover effect for better UX
        thumbnail.addEventListener('mouseenter', () => {
            thumbnail.style.transform = 'scale(1.05)';
            thumbnail.style.cursor = 'pointer';
        });

        thumbnail.addEventListener('mouseleave', () => {
            thumbnail.style.transform = 'scale(1)';
        });
    });
});

function switchTeamMember(index, featuredImage, featuredName, featuredTitle, featuredBio) {
    const member = teamMembers[index];
    
    // Add fade out effect
    const featuredDetails = document.querySelector('.featured-details');
    featuredDetails.style.opacity = '0.7';
    featuredDetails.style.transform = 'translateX(-8px)';
    
    // Update content after a brief delay for smooth transition
    setTimeout(() => {
        // Update image with crossfade effect
        featuredImage.style.opacity = '0';
        setTimeout(() => {
            featuredImage.src = member.image;
            featuredImage.alt = member.name;
            featuredImage.style.opacity = '1';
        }, 150);
        
        // Update text content
        featuredName.textContent = member.name;
        featuredTitle.textContent = member.title;
        featuredBio.textContent = member.bio;
        
        // Fade back in
        setTimeout(() => {
            featuredDetails.style.opacity = '1';
            featuredDetails.style.transform = 'translateX(0)';
        }, 200);
    }, 100);
    
    // Update active state for thumbnails
    document.querySelectorAll('.team-thumbnail').forEach((thumb, thumbIndex) => {
        if (thumbIndex === index) {
            thumb.style.border = '2px solid var(--primary-color)';
            thumb.style.transform = 'scale(1.05)';
        } else {
            thumb.style.border = '2px solid transparent';
            thumb.style.transform = 'scale(1)';
        }
    });
}

// Language Switcher Functionality
document.addEventListener('DOMContentLoaded', () => {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            langButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const selectedLang = button.getAttribute('data-lang');
            console.log(`Language switched to: ${selectedLang}`);
            
            // Here you would typically implement actual language switching
            // For now, we'll just log the selection
            if (selectedLang === 'is') {
                console.log('Switching to Icelandic');
                // Implement Icelandic translation logic here
            } else if (selectedLang === 'en') {
                console.log('Switching to English');
                // Implement English translation logic here
            }
        });
    });
});

// About Page Dropdown Functionality
document.addEventListener('DOMContentLoaded', () => {
    const aboutDropdowns = document.querySelectorAll('.about-dropdown');
    
    aboutDropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.about-dropdown-trigger');
        
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Close all other dropdowns
            aboutDropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                }
            });
            
            // Toggle current dropdown
            dropdown.classList.toggle('active');
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.about-dropdown')) {
            aboutDropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
});

// Service Page Dropdown Functionality
document.addEventListener('DOMContentLoaded', () => {
    const serviceDropdowns = document.querySelectorAll('.service-dropdown-item');

    serviceDropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.service-dropdown-trigger');

        trigger.addEventListener('click', (e) => {
            e.preventDefault();

            // Close all other dropdowns
            serviceDropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                }
            });

            // Toggle current dropdown
            dropdown.classList.toggle('active');
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.service-dropdown-item')) {
            serviceDropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
});

// Navbar Scroll Hide/Show Functionality
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    const scrollThreshold = 50;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Only trigger if scroll difference is significant
        if (Math.abs(scrollTop - lastScrollTop) > scrollThreshold) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down - hide navbar
                header.classList.add('nav-hidden');
            } else {
                // Scrolling up - show navbar
                header.classList.remove('nav-hidden');
            }
            lastScrollTop = scrollTop;
        }
    });
});

// Team Filter Functionality
document.addEventListener('DOMContentLoaded', () => {
    const teamFilters = document.querySelectorAll('.team-filter');
    const teamProfiles = document.querySelectorAll('.team-profile');

    teamFilters.forEach(filter => {
        filter.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all filters
            teamFilters.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked filter
            filter.classList.add('active');
            
            const filterType = filter.getAttribute('data-filter');
            
            // Filter team profiles
            teamProfiles.forEach(profile => {
                const category = profile.getAttribute('data-category');
                
                if (filterType === 'all') {
                    // Show all profiles
                    profile.classList.remove('hidden');
                } else if (filterType === 'partners') {
                    // Show only partners
                    if (category === 'partner') {
                        profile.classList.remove('hidden');
                    } else {
                        profile.classList.add('hidden');
                    }
                }
            });
        });
    });
});

// Profile Dropdown Functionality
document.addEventListener('DOMContentLoaded', () => {
    const profileDropdowns = document.querySelectorAll('.team-profile');
    console.log('Found profile dropdowns:', profileDropdowns.length);

    profileDropdowns.forEach((profile, index) => {
        const trigger = profile.querySelector('.profile-dropdown-trigger');
        console.log(`Profile ${index + 1} trigger:`, trigger);

        if (trigger) {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Profile dropdown clicked:', profile);

                // Close all other dropdowns
                profileDropdowns.forEach(otherProfile => {
                    if (otherProfile !== profile) {
                        otherProfile.classList.remove('active');
                    }
                });

                // Toggle current dropdown
                profile.classList.toggle('active');
                console.log('Profile active state:', profile.classList.contains('active'));
            });
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.team-profile')) {
            profileDropdowns.forEach(profile => {
                profile.classList.remove('active');
            });
        }
    });
});

// Cookie Consent Popup Functionality
document.addEventListener('DOMContentLoaded', () => {
    const cookiePopup = document.getElementById('cookie-consent');
    const cookieClose = document.getElementById('cookie-close');
    const acceptAllBtn = document.querySelector('.cookie-accept-all');
    const rejectBtn = document.querySelector('.cookie-reject');
    
    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem('cookieChoice');
    
    if (!cookieChoice) {
        // Show popup after a short delay
        setTimeout(() => {
            cookiePopup.style.display = 'block';
        }, 1000);
    }
    
    // Close button functionality
    cookieClose.addEventListener('click', () => {
        cookiePopup.style.display = 'none';
        localStorage.setItem('cookieChoice', 'dismissed');
    });
    
    // Accept all cookies
    acceptAllBtn.addEventListener('click', () => {
        cookiePopup.style.display = 'none';
        localStorage.setItem('cookieChoice', 'accepted');
        // Here you would typically set all cookies
        console.log('All cookies accepted');
    });
    
    // Reject optional cookies
    rejectBtn.addEventListener('click', () => {
        cookiePopup.style.display = 'none';
        localStorage.setItem('cookieChoice', 'rejected');
        // Here you would typically only set essential cookies
        console.log('Optional cookies rejected');
    });
});
