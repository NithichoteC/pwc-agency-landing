// PWC AGENCY - APPLE-STYLE STRIPED PARALLAX TRANSITION SYSTEM
// Smooth transition from dark section (#0A0A0A) to hero section background (#121212)

class PWCStripedTransition {
    constructor() {
        console.log('🎨 PWCStripedTransition constructor called');
        
        // Configuration
        this.NUMBER_OF_BARS = 7;
        this.INITIAL_TOTAL_HEIGHT = 750;
        this.EASING_FACTOR = 0.12;
        this.INITIAL_BAR_HEIGHT = this.INITIAL_TOTAL_HEIGHT / this.NUMBER_OF_BARS;

        // DOM Elements
        this.elements = {
            container: document.getElementById('pwc-transition-container'),
            failedAttemptsSection: document.querySelector('.failed-attempts-section'),
            nextSection: document.querySelector('.next-section')
        };

        console.log('🔍 DOM Elements found:', {
            container: !!this.elements.container,
            failedAttemptsSection: !!this.elements.failedAttemptsSection,
            nextSection: !!this.elements.nextSection
        });

        // State Management
        this.state = {
            bars: [],
            rafId: null,
            currentTargetHeight: this.INITIAL_TOTAL_HEIGHT,
            targetTotalHeight: this.INITIAL_TOTAL_HEIGHT
        };

        // Initialize if container exists
        if (this.elements.container) {
            console.log('✅ Container found, initializing...');
            this.init();
        } else {
            console.error('❌ PWC transition container not found!');
        }
    }

    /**
     * Interpolates between two hex colors
     */
    interpolateColor(color1, color2, factor) {
        factor = Math.max(0, Math.min(1, factor));

        const c1 = parseInt(color1.slice(1), 16);
        const c2 = parseInt(color2.slice(1), 16);

        const r1 = (c1 >> 16) & 0xff; 
        const g1 = (c1 >> 8) & 0xff; 
        const b1 = c1 & 0xff;
        const r2 = (c2 >> 16) & 0xff; 
        const g2 = (c2 >> 8) & 0xff; 
        const b2 = c2 & 0xff;

        const r = Math.round(r1 + (r2 - r1) * factor);
        const g = Math.round(g1 + (g2 - g1) * factor);
        const b = Math.round(b1 + (b2 - b1) * factor);

        return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
    }

    /**
     * Creates the visual transition bars
     */
    createBars() {
        console.log('🎨 Creating transition bars...');
        const fragment = document.createDocumentFragment();
        
        for (let i = 0; i < this.NUMBER_OF_BARS; i++) {
            const bar = document.createElement('div');
            bar.className = 'pwc-transition-bar';

            // Color interpolation from dark section to hero background
            const factor = (this.NUMBER_OF_BARS > 1) ? (i / (this.NUMBER_OF_BARS - 1)) : 0;
            const color = this.interpolateColor('#0A0A0A', '#121212', factor);
            bar.style.backgroundColor = color;
            bar.style.height = `${this.INITIAL_BAR_HEIGHT}px`;

            console.log(`Bar ${i}: color=${color}, height=${this.INITIAL_BAR_HEIGHT}px`);

            fragment.appendChild(bar);
            this.state.bars.push(bar);
        }
        
        this.elements.container.appendChild(fragment);
        this.elements.container.style.height = `${this.state.currentTargetHeight}px`;
        
        console.log(`✅ Created ${this.state.bars.length} bars, container height: ${this.state.currentTargetHeight}px`);
    }

    /**
     * Calculates target height based on scroll position
     */
    calculateAndUpdateTargetHeight() {
        const scrollY = window.pageYOffset || window.scrollY;

        if (!this.elements.failedAttemptsSection) {
            console.warn('⚠️ Failed attempts section not found');
            return;
        }

        // Calculate when the failed attempts section is leaving viewport
        const sectionBottom = this.elements.failedAttemptsSection.offsetTop + 
                            this.elements.failedAttemptsSection.offsetHeight;

        // Define collapse range
        const collapseEnd = sectionBottom;
        const collapseStart = collapseEnd - this.INITIAL_TOTAL_HEIGHT;

        let newTargetHeight;
        if (scrollY <= collapseStart) {
            newTargetHeight = this.INITIAL_TOTAL_HEIGHT; // Fully expanded
        } else if (scrollY >= collapseEnd) {
            newTargetHeight = 0; // Fully collapsed
        } else {
            // Calculate progress within collapse zone
            const progress = (scrollY - collapseStart) / this.INITIAL_TOTAL_HEIGHT;
            newTargetHeight = Math.max(0, this.INITIAL_TOTAL_HEIGHT * (1 - progress));
        }
        
        if (Math.abs(newTargetHeight - this.state.targetTotalHeight) > 1) {
            console.log(`📐 Scroll: ${scrollY}, Target height: ${newTargetHeight}px (was ${this.state.targetTotalHeight}px)`);
        }
        
        this.state.targetTotalHeight = newTargetHeight;
    }

    /**
     * Main animation loop with smooth easing
     */
    animationLoop() {
        const diff = this.state.targetTotalHeight - this.state.currentTargetHeight;

        // Snap to target if difference is negligible
        if (Math.abs(diff) < 0.1) {
            this.state.currentTargetHeight = this.state.targetTotalHeight;
        } else {
            // Apply easing
            this.state.currentTargetHeight += diff * this.EASING_FACTOR;
        }

        // Update DOM
        const displayTotalHeight = Math.round(this.state.currentTargetHeight);
        const displayBarHeight = (this.NUMBER_OF_BARS > 0 && displayTotalHeight > 0) 
            ? (displayTotalHeight / this.NUMBER_OF_BARS) : 0;

        if (displayTotalHeight <= 0) {
            // Fully collapsed state
            this.elements.container.style.height = '0px';
            this.elements.container.style.minHeight = '0px';
            this.elements.container.style.maxHeight = '0px';
            this.state.bars.forEach(bar => {
                bar.style.height = '0px';
                bar.style.display = 'none';
            });
        } else {
            // Expanded/partially collapsed state
            this.elements.container.style.height = `${displayTotalHeight}px`;
            this.elements.container.style.minHeight = '';
            this.elements.container.style.maxHeight = '';
            this.state.bars.forEach(bar => {
                bar.style.height = `${displayBarHeight.toFixed(2)}px`;
                bar.style.display = 'block';
            });
        }

        this.state.rafId = requestAnimationFrame(() => this.animationLoop());
    }

    /**
     * Initialize the transition system
     */
    init() {
        console.log('🚀 Initializing PWC Striped Transition System...');
        this.createBars();

        // Start animation loop after DOM is ready
        requestAnimationFrame(() => {
            this.calculateAndUpdateTargetHeight();
            this.state.currentTargetHeight = this.state.targetTotalHeight;
            console.log(`🎬 Animation loop starting with height: ${this.state.currentTargetHeight}px`);
            this.animationLoop();
        });

        // Event listeners
        window.addEventListener('scroll', () => this.calculateAndUpdateTargetHeight(), { 
            passive: true 
        });
        
        window.addEventListener('resize', () => {
            this.calculateAndUpdateTargetHeight();
        });

        console.log('✅ PWC Striped Transition System initialized successfully');
    }
}

// Auto-initialize when DOM is ready
console.log('📜 PWC Striped Transition script loaded');

if (document.readyState === 'loading') {
    console.log('⏳ DOM loading, waiting for DOMContentLoaded...');
    document.addEventListener('DOMContentLoaded', () => {
        console.log('🎯 DOMContentLoaded fired, creating PWCStripedTransition');
        window.pwcStripedTransition = new PWCStripedTransition();
    });
} else {
    console.log('✅ DOM already ready, creating PWCStripedTransition immediately');
    window.pwcStripedTransition = new PWCStripedTransition();
} 