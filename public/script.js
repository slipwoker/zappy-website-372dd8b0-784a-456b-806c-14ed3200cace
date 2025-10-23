// Prevent duplicate Zappy injection
if (window.zappyContactFormLoaded) {
  console.log('⚠️ Zappy: Contact form handler already loaded, skipping injection');
} else {
  window.zappyContactFormLoaded = true;
  console.log('✅ Zappy: Contact form handler loaded');
}

document.addEventListener('DOMContentLoaded', function() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
      const hamburgerIcon = this.querySelector('.hamburger-icon');
      const closeIcon = this.querySelector('.close-icon');
      const isActive = this.classList.contains('active');
      
      if (isActive) {
        hamburgerIcon.style.display = 'block';
        closeIcon.style.display = 'none';
        this.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      } else {
        hamburgerIcon.style.display = 'none';
        closeIcon.style.display = 'block';
        this.classList.add('active');
        navMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
    
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        const hamburgerIcon = mobileToggle.querySelector('.hamburger-icon');
        const closeIcon = mobileToggle.querySelector('.close-icon');
        hamburgerIcon.style.display = 'block';
        closeIcon.style.display = 'none';
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
  
  const phoneHeaderBtn = document.querySelector('.phone-header-btn');
  if (phoneHeaderBtn) {
    phoneHeaderBtn.addEventListener('click', function() {
      const phoneNumber = '[phone_number]';
      window.location.href = 'tel:' + phoneNumber;
    });
  }
  
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
      };
      
      console.log('Form submitted:', formData);
      
      // Send to Zappy backend API
      if (!window.zappyContactFormLoaded) {
        console.log('⚠️ Zappy: Handler not loaded, skipping API call');
      } else {
        (async function() {
          try {
            console.log('📧 Zappy: Sending contact form to backend...');
            const response = await fetch('https://api.zappy5.com/api/email/contact-form', {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                websiteId: '372dd8b0-784a-456b-806c-14ed3200cace',
                name: formData.name,
                email: formData.email,
                subject: formData.subject || 'Contact Form Submission',
                message: formData.message,
                phone: formData.phone || null
              })
            });
            
            if (!response.ok) {
              throw new Error('API response not OK: ' + response.status);
            }
            
            const result = await response.json();
            console.log('✅ Zappy: Email sent successfully', result);
          } catch (error) {
            console.error('❌ Zappy: Failed to send email', error);
            // Don't break existing functionality - continue with normal flow
          }
        })();
      }
      
      // Keep existing behavior
      alert('תודה על פנייתך! ניצור איתך קשר בהקדם.');
      contactForm.reset();
    });
  }
  
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    } else {
      navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
  });
});

/* Cookie Consent */

// Helper function to check cookie consent
function hasConsentFor(category) {
  if (typeof window.CookieConsent === 'undefined') {
    return false; // Default to no consent if cookie consent not loaded
  }
  
  return window.CookieConsent.validConsent(category);
}

// Helper function to execute code only with consent
function withConsent(category, callback) {
  if (hasConsentFor(category)) {
    callback();
  } else {
    console.log(`[WARNING] Skipping ${category} code - no user consent`);
  }
}

// Cookie Consent Initialization
console.log('[Cookie] Cookie consent script loaded - starting initialization...');

(function() {
  'use strict';
  
  let initAttempts = 0;
  const maxAttempts = 50; // 5 seconds max wait
  
  // Wait for DOM and vanilla-cookieconsent to be ready
  function initCookieConsent() {
    initAttempts++;
    
    console.log('[Cookie] Cookie consent init attempt', initAttempts, '- CookieConsent available:', typeof window.CookieConsent !== 'undefined');
    console.log('[Cookie] Document ready state:', document.readyState);
    console.log('[Cookie] Window object available:', typeof window !== 'undefined');
    
    if (typeof window.CookieConsent === 'undefined') {
      if (initAttempts < maxAttempts) {
        console.log('[Cookie] CookieConsent not ready, retrying in 100ms...');
        setTimeout(initCookieConsent, 100);
      } else {
        console.error('[Cookie] Cookie consent failed to load after', maxAttempts, 'attempts');
        console.error('[Cookie] Available window properties:', Object.keys(window).filter(k => k.toLowerCase().includes('cookie')));
      }
      return;
    }

    const cc = window.CookieConsent;
    
    console.log('[Cookie] Initializing cookie consent with config:', typeof cc);
    console.log('[Cookie] CookieConsent.run available:', typeof cc.run === 'function');
    
    // Initialize cookie consent
    try {
      cc.run({
  "autoShow": true,
  "mode": "opt-in",
  "revision": 0,
  "categories": {
    "necessary": {
      "enabled": true,
      "readOnly": true
    },
    "analytics": {
      "enabled": false,
      "readOnly": false,
      "autoClear": {
        "cookies": [
          {
            "name": "_ga"
          },
          {
            "name": "_ga_*"
          },
          {
            "name": "_gid"
          },
          {
            "name": "_gat"
          }
        ]
      }
    },
    "marketing": {
      "enabled": false,
      "readOnly": false,
      "autoClear": {
        "cookies": [
          {
            "name": "_fbp"
          },
          {
            "name": "_fbc"
          },
          {
            "name": "fr"
          }
        ]
      }
    }
  },
  "language": {
    "default": "he",
    "translations": {
      "he": {
        "consentModal": {
          "title": "אנחנו משתמשים בעוגיות 🍪",
          "description": "כובעלהלה משתמש בעוגיות כדי לשפר את החוויה שלך, לנתח שימוש באתר ולסייע במאמצי השיווק שלנו.",
          "acceptAllBtn": "אשר הכל",
          "acceptNecessaryBtn": "רק הכרחי",
          "showPreferencesBtn": "נהל העדפות",
          "footer": "<a href=\"#privacy-policy\">מדיניות פרטיות</a> | <a href=\"#terms-conditions\">תנאי שימוש</a>"
        },
        "preferencesModal": {
          "title": "העדפות עוגיות",
          "acceptAllBtn": "אשר הכל",
          "acceptNecessaryBtn": "רק הכרחי",
          "savePreferencesBtn": "שמור העדפות",
          "closeIconLabel": "סגור",
          "sections": [
            {
              "title": "עוגיות חיוניות",
              "description": "עוגיות אלה הכרחיות לתפקוד האתר ולא ניתן להשבית אותן.",
              "linkedCategory": "necessary"
            },
            {
              "title": "עוגיות ניתוח",
              "description": "עוגיות אלה עוזרות לנו להבין איך המבקרים מתקשרים עם האתר שלנו.",
              "linkedCategory": "analytics"
            },
            {
              "title": "עוגיות שיווקיות",
              "description": "עוגיות אלה משמשות להצגת פרסומות מותאמות אישית.",
              "linkedCategory": "marketing"
            }
          ]
        }
      }
    }
  },
  "guiOptions": {
    "consentModal": {
      "layout": "box",
      "position": "bottom right",
      "equalWeightButtons": true,
      "flipButtons": false
    },
    "preferencesModal": {
      "layout": "box",
      "equalWeightButtons": true,
      "flipButtons": false
    }
  }
});
      console.log('[Cookie] Cookie consent initialized successfully');
      
      // Optional: Handle consent changes (check if onChange is available)
      if (typeof cc.onChange === 'function') {
        cc.onChange(function(cookie, changed_preferences) {
          console.log('[Cookie] Cookie consent changed:', changed_preferences);
      
      // Enable/disable analytics based on consent
      if (changed_preferences.includes('analytics')) {
        if (cc.validConsent('analytics')) {
          // Enable analytics (e.g., Google Analytics)
          console.log('[Analytics] Analytics enabled');
          // Example: gtag('consent', 'update', { analytics_storage: 'granted' });
        } else {
          console.log('[Analytics] Analytics disabled');
          // Example: gtag('consent', 'update', { analytics_storage: 'denied' });
        }
      }
      
      // Enable/disable marketing based on consent
      if (changed_preferences.includes('marketing')) {
        if (cc.validConsent('marketing')) {
          console.log('[Marketing] Marketing enabled');
          // Example: gtag('consent', 'update', { ad_storage: 'granted' });
        } else {
          console.log('[Marketing] Marketing disabled');
          // Example: gtag('consent', 'update', { ad_storage: 'denied' });
        }
      }
        });
      } else {
        console.log('[Cookie] cc.onChange not available in this version');
      }

      // Note: Cookie Preferences button removed per marketing guidelines
      // Footer should be clean and minimal - users can manage cookies via banner
    } catch (error) {
      console.error('❌ Cookie consent initialization failed:', error);
      console.error('❌ Error details:', error.message, error.stack);
    }
  }

  // Initialize when DOM is ready - multiple approaches for reliability
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookieConsent);
    // Backup timeout in case DOMContentLoaded doesn't fire
    setTimeout(initCookieConsent, 1000);
  } else if (document.readyState === 'interactive' || document.readyState === 'complete') {
    initCookieConsent();
  } else {
    // Fallback - try after a short delay
    setTimeout(initCookieConsent, 500);
  }
  
  // Additional fallback - try after page load
  if (typeof window !== 'undefined') {
    if (window.addEventListener) {
      window.addEventListener('load', initCookieConsent, { once: true });
    }
  }
})();

/* Accessibility Features */

/* Mickidum Accessibility Toolbar Initialization */

window.onload = function() {
    console.log('♿ Initializing Mickidum Accessibility Toolbar...');
    console.log('   Language detected: he');
    console.log('   Language code: he-IL');
    
    try {
        window.micAccessTool = new MicAccessTool({
            buttonPosition: 'left', // Position on left side
            forceLang: 'he-IL' // Force language
        });
        
        console.log('✅ Mickidum Accessibility Toolbar initialized successfully');
        console.log('   Final language:', window.micAccessTool ? window.micAccessTool.currentLang || 'unknown' : 'instance not created');
        console.log('📱 Window width:', window.innerWidth);
        console.log('📲 Is Mobile:', window.innerWidth <= 768);
    } catch (error) {
        console.error('❌ Mickidum Accessibility Toolbar initialization failed:', error);
    }
};