$(document).ready(function() {
    // Generate table of contents
    const toc = $('#toc');
    if (toc.length) {
        const content = $('#content');
        const headings = content.find('h2, h3');
        
        // Only proceed if we found headings
        if (headings.length) {
            // Create the nav list
            const navList = $('<ul class="nav flex-column"></ul>');
            toc.append(navList);
            
            headings.each(function(index) {
                const heading = $(this);
                // Use the heading text to generate a clean ID
                const id = heading.text().toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '');
                heading.attr('id', id);
                
                const level = parseInt(heading.prop('tagName').substring(1)) - 2;
                const indent = level > 0 ? 'ms-' + (level * 2) : '';
                
                navList.append(`
                    <li class="nav-item">
                        <a class="nav-link ${indent}" href="#${id}" data-bs-scroll="true">
                            ${heading.text()}
                        </a>
                    </li>
                `);
            });
        }
    }

    // Initialize scrollspy with better options
    const mainContent = document.querySelector('main');
    if (mainContent) {
        const spy = new bootstrap.ScrollSpy(mainContent, {
            target: '#toc',
            rootMargin: '0px 0px -25% 0px',
            smoothScroll: true,
            threshold: [0.1, 0.5, 0.9]
        });
    }

    // Enhanced smooth scrolling for anchor links
    $(document).on('click', 'a[href^="#"]', function(event) {
        event.preventDefault();
        const hash = this.hash;
        if (!hash) return;

        const target = $(hash);
        if (target.length) {
            const headerOffset = 20;
            const elementPosition = target.offset().top;
            const offsetPosition = elementPosition - headerOffset;

            $('html, body').animate({
                scrollTop: offsetPosition
            }, {
                duration: 300,
                easing: 'swing',
                complete: function() {
                    // Update URL without adding to history
                    if (history.replaceState) {
                        history.replaceState(null, null, hash);
                    }
                }
            });
        }
    });

    // Add active class to current nav item
    const path = window.location.pathname;
    $('.nav-link').each(function() {
        const href = $(this).attr('href');
        if (href && href === path) {
            $(this).addClass('active');
        }
    });

    // Handle initial hash in URL
    if (window.location.hash) {
        const target = $(window.location.hash);
        if (target.length) {
            setTimeout(function() {
                const headerOffset = 20;
                const elementPosition = target.offset().top;
                const offsetPosition = elementPosition - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }, 300);
        }
    }
}); 