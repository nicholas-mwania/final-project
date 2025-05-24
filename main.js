// FAQ toggle
$('.faq-question').click(function() {
    $(this).next('.faq-answer').slideToggle(200);
    $('.faq-answer').not($(this).next()).slideUp(200);
});

// Newsletter form submission
$('#newsletterForm').submit(function(e) {
    e.preventDefault();
    var email = $('#newsletterEmail').val();
    $('#newsletterMsg').text('Thank you for subscribing, ' + email + '!');
    $('#newsletterForm')[0].reset();
});

// Show/hide back to top button
$(window).scroll(function() {
    if ($(this).scrollTop() > 200) {
        $('#backToTop').fadeIn();
    } else {
        $('#backToTop').fadeOut();
    }
});

// Scroll to top on click
$('#backToTop').click(function() {
    $('html, body').animate({scrollTop: 0}, 600);
});

// Special offer banner close
$('.close-offer').click(function() {
    $('.special-offer-banner').slideUp();
    $('body').removeClass('has-offer');
});

// Add margin to body when banner is visible
$(document).ready(function() {
    if ($('.special-offer-banner').length) {
        $('body').addClass('has-offer');
    }
});

// Dynamic Recommendations
$(document).ready(function() {
    // Select all main shoe brand <li> elements
    var $allBrands = $('#shoe-brands .brand-list > li').clone();
    // Shuffle the array
    var shuffled = $allBrands.sort(function() { return 0.5 - Math.random(); });
    // Pick the first 3 (or any number you want)
    var $recommendations = shuffled.slice(0, 3);
    // Empty and append to recommendations list
    $('.recommendations-list').empty().append($recommendations);
});

// Wishlist/Favorites functionality
$(document).ready(function() {
    // Load favorites from localStorage
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    $('.brand-list .wishlist-btn').each(function() {
        const brand = $(this).closest('li').data('brand');
        if (favorites.includes(brand)) {
            $(this).addClass('favorited').text('♥');
        }
    });

    // Toggle favorite on click
    $('.brand-list').on('click', '.wishlist-btn', function(e) {
        e.preventDefault();
        const $btn = $(this);
        const $li = $btn.closest('li');
        const brand = $li.data('brand');
        let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        if ($btn.hasClass('favorited')) {
            $btn.removeClass('favorited').text('♡');
            favorites = favorites.filter(f => f !== brand);
        } else {
            $btn.addClass('favorited').text('♥');
            favorites.push(brand);
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
    });

    // Light/Dark mode toggle
    const themeToggle = $('#themeToggle');
    // Load saved theme
    if (localStorage.getItem('theme') === 'dark') {
        $('body').addClass('dark-mode');
        themeToggle.text('☀️');
    }
    themeToggle.click(function() {
        $('body').toggleClass('dark-mode');
        const isDark = $('body').hasClass('dark-mode');
        themeToggle.text(isDark ? '☀️' : '🌙');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
});

// Remove duplicate brands by data-brand attribute
$(document).ready(function() {
    let seen = {};
    $('.brand-list > li').each(function() {
        let brand = $(this).data('brand');
        if (seen[brand]) {
            $(this).remove();
        } else {
            seen[brand] = true;
        }
    });
});

// Toast for info card buttons
$('.info-card-btn').click(function(e) {
    e.preventDefault();
    let msg = "Thanks for your interest! More features coming soon.";
    $('#toast').text(msg).fadeIn(200);
    setTimeout(() => { $('#toast').fadeOut(400); }, 2000);
});

// Shoe Info Card Modal
$('#shoeInfoBtn').click(function() {
    $('#shoeInfoModal').show();
});
$('#closeShoeInfo').click(function() {
    $('#shoeInfoModal').hide();
});
$(window).on('click', function(e) {
    if ($(e.target).is('#shoeInfoModal')) $('#shoeInfoModal').hide();
});