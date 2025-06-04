// AI-Level Lead Notification System
class AILeadNotificationSystem {
  constructor() {
    this.container = document.getElementById('notifications-container');
    this.notifications = [];
    this.maxNotifications = 4;
    this.intervalMs = 1000;
    this.timeoutRef = null;
    this.isAnimating = false;

    this.aiBusinessData = {
      clientActions: [
        { icon: '🤖', action: 'AI Agent Deployed', type: 'ai' },
        { icon: '💰', action: 'Contract Executed', type: 'contract' },
        { icon: '📊', action: 'AI Analysis Complete', type: 'analysis' },
        { icon: '🎯', action: 'Territory Secured', type: 'territory' },
        { icon: '⚡', action: 'System Optimized', type: 'system' },
        { icon: '🚀', action: 'ROI Increased +127%', type: 'performance' },
      ],
      businessTypes: [
        'Solar Co. - Austin TX',
        'Elite Roofing - Miami FL',
        'Solar Pro - Denver CO',
        'Premier Roofing - Phoenix AZ',
        'Solar Systems - Tampa FL',
        'Tech Contractors - Seattle WA',
      ],
      projectValues: [
        '$18.5K project',
        '$31.2K system',
        '$47.8K install',
        '$9.7K repair',
        '$68.3K commercial',
        '$24.1K residential',
      ],
      territories: [
        'TX-78704',
        'FL-33101',
        'CO-80202',
        'AZ-85001',
        'NC-28202',
        'WA-98101',
      ],
    };

    this.init();
  }

  init() {
    this.startAINotificationFlow();
  }

  generateAINotification() {
    const clientAction = this.getRandomItem(this.aiBusinessData.clientActions);
    const businessType = this.getRandomItem(this.aiBusinessData.businessTypes);
    const projectValue = this.getRandomItem(this.aiBusinessData.projectValues);
    const territory = this.getRandomItem(this.aiBusinessData.territories);

    let message;
    switch (clientAction.type) {
      case 'ai':
        message = `${businessType}`;
        break;
      case 'contract':
        message = `${projectValue} • ${territory}`;
        break;
      case 'analysis':
        message = `Territory: ${territory}`;
        break;
      case 'territory':
        message = `${businessType}`;
        break;
      case 'system':
        message = `${territory} • Live`;
        break;
      case 'performance':
        message = `${businessType}`;
        break;
      default:
        message = `${businessType}`;
    }

    return {
      id: this.generateId(),
      icon: clientAction.icon,
      title: clientAction.action,
      message: message,
      element: null,
    };
  }

  getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  generateId() {
    return Math.random().toString(36).substr(2, 9);
  }

  async addNotification() {
    if (this.isAnimating) return;
    this.isAnimating = true;

    try {
      if (this.notifications.length >= this.maxNotifications) {
        await this.removeOldestNotification();
        await this.wait(100);
      }

      await this.addNewNotification();
    } finally {
      this.isAnimating = false;
      this.scheduleNext();
    }
  }

  async addNewNotification() {
    return new Promise((resolve) => {
      const newNotification = this.generateAINotification();
      const element = this.createNotificationElement(newNotification);
      newNotification.element = element;

      element.classList.add('entering');
      this.notifications.push(newNotification);
      this.container.appendChild(element);
      element.offsetHeight;

      requestAnimationFrame(() => {
        element.classList.remove('entering');
        element.classList.add('show');
        setTimeout(resolve, 400);
      });
    });
  }

  async removeOldestNotification() {
    return new Promise((resolve) => {
      if (this.notifications.length === 0) {
        resolve();
        return;
      }

      const oldest = this.notifications[0];
      const remainingNotifications = this.notifications.slice(1);

      const positions = remainingNotifications.map((notif) => ({
        element: notif.element,
        currentTop: notif.element.offsetTop,
      }));

      oldest.element.classList.add('removing');

      setTimeout(() => {
        this.notifications = remainingNotifications;

        if (oldest.element.parentNode) {
          oldest.element.parentNode.removeChild(oldest.element);
        }

        positions.forEach((pos) => {
          const newTop = pos.element.offsetTop;
          const diff = pos.currentTop - newTop;

          if (Math.abs(diff) > 1) {
            pos.element.style.transform = `translateY(${diff}px)`;
            pos.element.offsetHeight;

            requestAnimationFrame(() => {
              pos.element.style.transition = 'transform 0.3s ease';
              pos.element.style.transform = 'translateY(0)';

              setTimeout(() => {
                pos.element.style.transition = '';
                pos.element.style.transform = '';
              }, 300);
            });
          }
        });

        setTimeout(resolve, 100);
      }, 200);
    });
  }

  createNotificationElement(notification) {
    const element = document.createElement('div');
    element.className = 'ai-notification';
    element.innerHTML = `
            <div class="ai-notification-content">
                <div class="ai-notification-icon">${notification.icon}</div>
                <div class="ai-notification-text">
                    <div class="ai-notification-title">${notification.title}</div>
                    <div class="ai-notification-message">${notification.message}</div>
                </div>
            </div>
        `;
    return element;
  }

  scheduleNext() {
    if (this.timeoutRef) {
      clearTimeout(this.timeoutRef);
    }

    const baseDelay = 3000;
    const randomDelay = Math.random() * 2000;
    const totalDelay = baseDelay + randomDelay;

    this.timeoutRef = setTimeout(() => {
      this.addNotification();
    }, totalDelay);
  }

  startAINotificationFlow() {
    if (!this.container) return;

    setTimeout(() => {
      this.addNotification();
    }, 2000);
  }

  wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// AI Activity Feed System
class AIActivityFeedSystem {
  constructor() {
    this.container = document.getElementById('ai-activity-list');
    this.isVisible = false;
    this.activities = [];
    this.maxActivities = 5;
    this.currentIndex = 0;

    this.activityTemplates = [
      { icon: '🤖', text: 'AI qualified lead in Denver CO', time: '2m ago' },
      {
        icon: '⚡',
        text: 'Smart targeting optimized for TX-78704',
        time: '4m ago',
      },
      {
        icon: '📊',
        text: 'Predictive analysis completed for Elite Solar',
        time: '6m ago',
      },
      {
        icon: '🎯',
        text: 'High-value prospect identified: $28K system',
        time: '8m ago',
      },
      {
        icon: '🔄',
        text: 'AI nurture sequence activated for Miami FL',
        time: '11m ago',
      },
      {
        icon: '⚡',
        text: 'Campaign optimization increased CTR by 34%',
        time: '13m ago',
      },
      {
        icon: '📈',
        text: 'Lead quality score: 94% match for Premier Roofing',
        time: '15m ago',
      },
      {
        icon: '🤖',
        text: 'Automated follow-up scheduled for $18.5K prospect',
        time: '17m ago',
      },
      {
        icon: '🎯',
        text: 'Territory analysis: Phoenix AZ showing high intent',
        time: '19m ago',
      },
      {
        icon: '⚡',
        text: 'Real-time optimization: Austin TX performance +47%',
        time: '22m ago',
      },
      {
        icon: '📊',
        text: 'AI detected optimal contact window: 2-4 PM',
        time: '24m ago',
      },
      {
        icon: '🔄',
        text: 'Smart qualification saved 2.3 hours for Solar Pro',
        time: '26m ago',
      },
    ];

    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.preloadActivities();
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.isVisible) {
            this.isVisible = true;
            this.startActivityFeed();
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    const section = document.getElementById('pwc-intro');
    if (section) {
      observer.observe(section);
    }
  }

  preloadActivities() {
    // Shuffle and prepare initial activities
    const shuffled = [...this.activityTemplates].sort(
      () => Math.random() - 0.5
    );
    this.activities = shuffled.slice(0, this.maxActivities);
  }

  startActivityFeed() {
    if (!this.container) return;

    // Add initial activities with stagger
    this.activities.forEach((activity, index) => {
      setTimeout(() => {
        this.addActivity(activity, index);
      }, index * 800); // Stagger each activity by 800ms
    });

    // Continue cycling through activities
    setTimeout(
      () => {
        this.startContinuousFeed();
      },
      this.maxActivities * 800 + 2000
    ); // Wait for initial batch + 2s
  }

  addActivity(activity, animationDelay = 0) {
    const activityElement = document.createElement('div');
    activityElement.className = 'activity-item';
    activityElement.style.animationDelay = `${animationDelay * 0.1}s`;

    activityElement.innerHTML = `
            <div class="activity-icon">${activity.icon}</div>
            <div class="activity-text">${activity.text}</div>
            <div class="activity-time">${activity.time}</div>
        `;

    // Remove oldest if at max capacity
    const existingActivities =
      this.container.querySelectorAll('.activity-item');
    if (existingActivities.length >= this.maxActivities) {
      const oldest = existingActivities[0];
      oldest.style.opacity = '0';
      oldest.style.transform = 'translateY(-20px)';
      setTimeout(() => {
        if (oldest.parentNode) {
          oldest.parentNode.removeChild(oldest);
        }
      }, 300);
    }

    this.container.appendChild(activityElement);
  }

  startContinuousFeed() {
    setInterval(() => {
      if (this.isVisible) {
        // Get a random activity that's not currently shown
        const availableActivities = this.activityTemplates.filter(
          (template) => {
            const currentTexts = Array.from(
              this.container.querySelectorAll('.activity-text')
            ).map((el) => el.textContent);
            return !currentTexts.includes(template.text);
          }
        );

        if (availableActivities.length > 0) {
          const randomActivity =
            availableActivities[
              Math.floor(Math.random() * availableActivities.length)
            ];
          this.addActivity(randomActivity);
        }
      }
    }, 4000); // Add new activity every 4 seconds
  }
}

// Initialize both systems when page loads
document.addEventListener('DOMContentLoaded', () => {
  window.__ACTIVITY_FEED__ = new AIActivityFeedSystem();
  window.__NOTIFICATION_SYSTEM__ = new AILeadNotificationSystem();

  // Set boot success flag
  if (window.__BOOT_SUCCESS__ === undefined) {
    window.__BOOT_SUCCESS__ = true;
  }
});
