// PWC Agency Landing Page JavaScript

// Logo fallback functionality
function showFallbackLogo() {
  const logoImg = document.querySelector('.logo img');
  const fallbackLogo = document.getElementById('fallbackLogo');

  if (logoImg && fallbackLogo) {
    logoImg.style.display = 'none';
    fallbackLogo.style.display = 'block';
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  console.log('PWC Agency Landing Page Loaded');

  // Add any initialization code here
  initializeAnimations();
  setupEventListeners();
});

// Initialize subtle animations
function initializeAnimations() {
  // Add entrance animations for elements
  const elementsToAnimate = ['.main-headline', '.subheadline', '.cta-massive'];

  elementsToAnimate.forEach((selector, index) => {
    const element = document.querySelector(selector);
    if (element) {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';

      setTimeout(() => {
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, index * 200);
    }
  });
}

// Setup event listeners
function setupEventListeners() {
  // CTA button interactions
  const ctaButton = document.querySelector('.cta-button-primary');
  if (ctaButton) {
    ctaButton.addEventListener('click', function (e) {
      // Add click tracking or navigation logic here
      console.log('CTA button clicked');
    });
  }

  // Navigation hover effects (already in CSS, but can add JS enhancements)
  const navItems = document.querySelectorAll(
    '[class*="nav-"], .strategy-call-block'
  );
  navItems.forEach((item) => {
    item.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-2px)';
    });

    item.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
    });
  });
}

// Export functions for global access
window.PWC = {
  showFallbackLogo,
  initializeAnimations,
  setupEventListeners,
};
