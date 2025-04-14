// Enhanced navigation and interactive features for Re:Wild DAO website

document.addEventListener('DOMContentLoaded', function() {
    // Back to top button
    const backToTopButton = document.createElement('a');
    backToTopButton.href = '#';
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '&uarr;';
    document.body.appendChild(backToTopButton);

    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    // Smooth scroll to top when back to top button is clicked
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Progress bar
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-container';
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressContainer.appendChild(progressBar);
    document.body.insertBefore(progressContainer, document.body.firstChild);

    // Update progress bar as user scrolls
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // Section fade-in animation
    const sections = document.querySelectorAll('section');
    const fadeInSection = function() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('visible');
            }
        });
    };

    // Initial check for sections in view
    fadeInSection();
    
    // Check for sections in view on scroll
    window.addEventListener('scroll', fadeInSection);

    // Add table of contents to pages with multiple sections
    const mainContent = document.querySelector('.col-lg-8.mx-auto');
    if (mainContent) {
        const headings = mainContent.querySelectorAll('h2');
        if (headings.length > 2) {
            const toc = document.createElement('div');
            toc.className = 'toc d-none d-lg-block';
            const tocTitle = document.createElement('div');
            tocTitle.className = 'toc-title';
            tocTitle.textContent = 'Table of Contents';
            toc.appendChild(tocTitle);
            
            const tocList = document.createElement('ul');
            tocList.className = 'toc-list';
            
            headings.forEach((heading, index) => {
                // Add ID to heading if it doesn't have one
                if (!heading.id) {
                    heading.id = 'section-' + index;
                }
                
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = '#' + heading.id;
                link.textContent = heading.textContent;
                listItem.appendChild(link);
                tocList.appendChild(listItem);
                
                // Smooth scroll to section when TOC link is clicked
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });
            
            toc.appendChild(tocList);
            
            // Insert TOC after the first paragraph
            const firstParagraph = mainContent.querySelector('p');
            if (firstParagraph) {
                firstParagraph.parentNode.insertBefore(toc, firstParagraph.nextSibling);
            }
        }
    }

    // Add breadcrumbs
    const currentPage = document.querySelector('.navbar-nav .active');
    if (currentPage && currentPage.textContent !== 'Home') {
        const breadcrumbNav = document.createElement('nav');
        breadcrumbNav.setAttribute('aria-label', 'breadcrumb');
        
        const breadcrumbOl = document.createElement('ol');
        breadcrumbOl.className = 'breadcrumb';
        
        const homeBreadcrumb = document.createElement('li');
        homeBreadcrumb.className = 'breadcrumb-item';
        const homeLink = document.createElement('a');
        homeLink.href = 'index.html';
        homeLink.textContent = 'Home';
        homeBreadcrumb.appendChild(homeLink);
        
        const currentBreadcrumb = document.createElement('li');
        currentBreadcrumb.className = 'breadcrumb-item active';
        currentBreadcrumb.setAttribute('aria-current', 'page');
        currentBreadcrumb.textContent = currentPage.textContent;
        
        breadcrumbOl.appendChild(homeBreadcrumb);
        breadcrumbOl.appendChild(currentBreadcrumb);
        breadcrumbNav.appendChild(breadcrumbOl);
        
        const contentSection = document.querySelector('section .container .row');
        if (contentSection) {
            contentSection.insertBefore(breadcrumbNav, contentSection.firstChild);
        }
    }

    // Add Font Awesome for icons
    const fontAwesome = document.createElement('link');
    fontAwesome.rel = 'stylesheet';
    fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
    document.head.appendChild(fontAwesome);

    // Add enhanced styles
    const enhancedStyles = document.createElement('link');
    enhancedStyles.rel = 'stylesheet';
    enhancedStyles.href = 'enhanced-styles.css';
    document.head.appendChild(enhancedStyles);

    // Add print button
    const printButton = document.createElement('button');
    printButton.className = 'btn btn-outline-secondary ms-2';
    printButton.innerHTML = '<i class="fas fa-print"></i> Print';
    printButton.addEventListener('click', function() {
        window.print();
    });
    
    const ctaBox = document.querySelector('.cta-box .button-group');
    if (ctaBox) {
        ctaBox.appendChild(printButton);
    }
});
