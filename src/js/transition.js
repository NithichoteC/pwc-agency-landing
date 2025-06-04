// FRESH APPLE TRANSITION - COMPLETE REWRITE
(function () {
  'use strict';

  console.log('🍎 FRESH APPLE TRANSITION: Starting...');

  // STATE
  let bars = [];
  let currentHeight = 750;
  let targetHeight = 750;
  let animationId = null;
  let initialized = false;

  // COLOR BLEND FUNCTION - ISOLATED
  function blendColors(from, to, ratio) {
    const fromRGB = parseInt(from.slice(1), 16);
    const toRGB = parseInt(to.slice(1), 16);

    const fromR = (fromRGB >> 16) & 0xff;
    const fromG = (fromRGB >> 8) & 0xff;
    const fromB = fromRGB & 0xff;

    const toR = (toRGB >> 16) & 0xff;
    const toG = (toRGB >> 8) & 0xff;
    const toB = toRGB & 0xff;

    const finalR = Math.round(fromR + (toR - fromR) * ratio);
    const finalG = Math.round(fromG + (toG - fromG) * ratio);
    const finalB = Math.round(fromB + (toB - fromB) * ratio);

    return `#${((finalR << 16) | (finalG << 8) | finalB).toString(16).padStart(6, '0')}`;
  }

  // INITIALIZATION
  function init() {
    console.log('🍎 INIT: Looking for elements...');

    const container = document.getElementById('transition-container');
    const section = document.querySelector('.failed-attempts-section');

    if (!container || !section) {
      console.log('🍎 INIT: Elements not found, retrying...', {
        container: !!container,
        section: !!section,
      });
      setTimeout(init, 100);
      return;
    }

    console.log('🍎 INIT: Elements found! Creating transition...');

    // Clear container
    container.innerHTML = '';
    bars = [];

    // Create 7 bars
    for (let i = 0; i < 7; i++) {
      const bar = document.createElement('div');
      const ratio = i / 6;
      const color = blendColors('#0A0A0A', '#333333', ratio);

      bar.style.cssText = `
                width: 100%;
                height: 107px;
                background: ${color};
                margin: 0;
                padding: 0;
                display: block;
            `;

      container.appendChild(bar);
      bars.push(bar);
    }

    // Set container styles
    container.style.cssText = `
            position: relative;
            width: 100%;
            height: 750px;
            overflow: hidden;
            background: #0A0A0A;
            margin: 0;
            padding: 0;
        `;

    // Scroll handler
    function handleScroll() {
      const scrollPos = window.pageYOffset;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionEnd = sectionTop + sectionHeight;
      const transitionStart = sectionEnd - 750;

      console.log('🍎 SCROLL:', {
        scrollPos: Math.round(scrollPos),
        sectionEnd: Math.round(sectionEnd),
        transitionStart: Math.round(transitionStart),
      });

      if (scrollPos <= transitionStart) {
        targetHeight = 750;
      } else if (scrollPos >= sectionEnd) {
        targetHeight = 0;
      } else {
        const progress = (scrollPos - transitionStart) / 750;
        targetHeight = 750 * (1 - progress);
      }
    }

    // Animation loop
    function animate() {
      const diff = targetHeight - currentHeight;

      if (Math.abs(diff) > 0.5) {
        currentHeight += diff * 0.12;
      } else {
        currentHeight = targetHeight;
      }

      const height = Math.max(0, Math.round(currentHeight));
      const barHeight = Math.round(height / 7);

      container.style.height = height + 'px';
      bars.forEach((bar) => {
        bar.style.height = barHeight + 'px';
        bar.style.display = height > 0 ? 'block' : 'none';
      });

      animationId = requestAnimationFrame(animate);
    }

    // Start
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    animate();

    initialized = true;
    console.log('🍎 INIT: Complete!');
  }

  // START
  if (document.readyState === 'complete') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
    window.addEventListener('load', init);
  }
})();
