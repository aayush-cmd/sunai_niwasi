// Custom JavaScript for Enhanced UI
// Modal Functions - GLOBAL SCOPE for HTML onclick access
window.openParticipationForm = function() {
  var modal = document.getElementById('participationModal');
  if (modal) { 
    modal.style.display = 'flex'; 
  } else { 
    console.error('participationModal not found'); 
  }
}

// Registration Form Functionality
document.addEventListener('DOMContentLoaded', function() {
  const registrationForm = document.querySelector('.registration-form');
  
  if (registrationForm) {
    registrationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        mobile: document.getElementById('mobile').value,
        email: document.getElementById('email').value,
        country: document.getElementById('country').value,
        state: document.getElementById('state').value,
        city: document.getElementById('city').value,
        community: document.getElementById('community').value,
        communityDetails: document.getElementById('communityDetails').value,
        message: document.getElementById('message').value
      };
      
      // Validate form
      if (!formData.firstName || !formData.lastName || !formData.mobile || !formData.email || !formData.state || !formData.city) {
        alert('Please fill in all required fields');
        return;
      }
      
      // Show success message
      showSuccessMessage();
      
      // Log form data (in production, this would be sent to server)
      console.log('Registration Form Data:', formData);
      
      // Reset form after delay
      setTimeout(() => {
        registrationForm.reset();
      }, 2000);
    });
  }
  
  // Add input animations
  const formInputs = document.querySelectorAll('.form-input');
  formInputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      if (this.value === '') {
        this.parentElement.classList.remove('focused');
      }
    });
    
    input.addEventListener('input', function() {
      if (this.value !== '') {
        this.parentElement.classList.add('has-value');
      } else {
        this.parentElement.classList.remove('has-value');
      }
    });
  });
});

function showSuccessMessage() {
  const submitBtn = document.querySelector('.submit-btn');
  const originalText = submitBtn.innerHTML;
  
  // Show success state
  submitBtn.innerHTML = 'Registration Successful! <i class="fas fa-check"></i>';
  submitBtn.style.background = 'linear-gradient(135deg, #28a745 0%, #218838 100%)';
  
  // Reset after 3 seconds
  setTimeout(() => {
    submitBtn.innerHTML = originalText;
    submitBtn.style.background = 'linear-gradient(135deg, #e8430a 0%, #d63808 100%)';
  }, 3000);
}

function resetForm() {
  const registrationForm = document.querySelector('.registration-form');
  if (registrationForm) {
    // Clear all form fields
    registrationForm.reset();
    
    // Remove any validation classes
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
      input.parentElement.classList.remove('focused', 'has-value');
    });
    
    // Show visual feedback
    const cancelBtn = document.querySelector('.cancel-btn');
    const originalText = cancelBtn.innerHTML;
    
    cancelBtn.innerHTML = 'Form Reset! <i class="fas fa-undo"></i>';
    cancelBtn.style.background = 'linear-gradient(135deg, #17a2b8 0%, #138496 100%)';
    
    // Reset after 2 seconds
    setTimeout(() => {
      cancelBtn.innerHTML = originalText;
      cancelBtn.style.background = 'linear-gradient(135deg, #6c757d 0%, #5a6268 100%)';
    }, 2000);
  }
}

window.openTimeSuggestionForm = function() {
  var modal = document.getElementById('timeSuggestionModal');
  if (modal) { 
    modal.style.display = 'flex'; 
  } else { 
    console.error('timeSuggestionModal not found'); 
  }
}

window.openTopicSuggestionForm = function() {
  var modal = document.getElementById('topicSuggestionModal');
  if (modal) { 
    modal.style.display = 'flex'; 
  } else { 
    console.error('topicSuggestionModal not found'); 
  }
}

window.closeModal = function(id) {
  var modal = document.getElementById(id);
  if (modal) { 
    modal.style.display = 'none'; 
  }
}

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {

  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      // Remove active class from all nav links
      document.querySelectorAll('#navbar .nav-link').forEach(link => {
        link.classList.remove('active');
      });
      
      // Add active class to clicked link
      this.classList.add('active');
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'auto',
          block: 'start'
        });
      }
    });
  });
  
  // Set active nav link based on current scroll position
  function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#navbar .nav-link');
    
    let currentSection = '';
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        currentSection = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('active');
      }
    });
  }
  
  // Update active nav link on scroll
  window.addEventListener('scroll', setActiveNavLink);
  
  // Set initial active state
  setActiveNavLink();

  // White Bar Dropdown - Click functionality
  const whiteBarDropdown = document.getElementById('whiteBarDropdown');
  const whiteBarDropdownMenu = document.getElementById('whiteBarDropdownMenu');

  console.log('Dropdown elements found:', whiteBarDropdown, whiteBarDropdownMenu);

  if (whiteBarDropdown && whiteBarDropdownMenu) {
    whiteBarDropdown.addEventListener('click', function(e) {
      console.log('Dropdown button clicked!');
      e.preventDefault();
      e.stopPropagation();
      
      const isActive = whiteBarDropdownMenu.classList.contains('active');
      console.log('Current active state:', isActive);
      
      // Close dropdown if it's open
      if (isActive) {
        whiteBarDropdownMenu.classList.remove('active');
        whiteBarDropdown.classList.remove('active');
        console.log('Dropdown closed');
      } else {
        // Open dropdown
        whiteBarDropdownMenu.classList.add('active');
        whiteBarDropdown.classList.add('active');
        console.log('Dropdown opened');
      }
    });
  } else {
    console.log('Dropdown elements NOT found!');
  }

  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (whiteBarDropdown && whiteBarDropdownMenu) {
      if (!whiteBarDropdown.contains(e.target) && !whiteBarDropdownMenu.contains(e.target)) {
        whiteBarDropdownMenu.classList.remove('active');
        whiteBarDropdown.classList.remove('active');
      }
    }
  });

  // Close dropdown when clicking on dropdown items
  const dropdownItems = document.querySelectorAll('.white-bar-dropdown-item');
  dropdownItems.forEach(item => {
    item.addEventListener('click', function() {
      whiteBarDropdownMenu.classList.remove('active');
      whiteBarDropdown.classList.remove('active');
    });
  });

  // Hamburger Menu Toggle for 1151px Breakpoint
  const navbarToggle = document.getElementById('navbarToggle');
  const navbarNav = document.getElementById('navbarNav');

  if (navbarToggle && navbarNav) {
    navbarToggle.addEventListener('click', function() {
      navbarNav.classList.toggle('mobile-show');
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (navbarNav && navbarNav.classList.contains('mobile-show')) {
      if (!navbarNav.contains(e.target) && !navbarToggle.contains(e.target)) {
        navbarNav.classList.remove('mobile-show');
      }
    }
  });

  // Search Overlay functionality
  const searchToggle = document.getElementById('searchToggle');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchClose = document.getElementById('searchClose');
  const searchInput = document.getElementById('searchInput');

  // Modal Functions - GLOBAL SCOPE for HTML onclick access
  function openParticipationForm() {
    document.getElementById('participationModal').classList.add('active');
  }

  function openTimeSuggestionForm() {
    document.getElementById('timeSuggestionModal').classList.add('active');
  }

  function openTopicSuggestionForm() {
    document.getElementById('topicSuggestionModal').classList.add('active');
  }

  function closeModal(id) {
    document.getElementById(id).classList.remove('active');
  }

  // Form submission handlers
  function handleParticipationSubmit(e) {
    e.preventDefault();
    alert('धन्यवाद! आपका अनुरोध प्राप्त हो गया।');
    closeModal('participationModal');
  }
  
  function handleTimeSuggestionSubmit(e) {
    e.preventDefault();
    alert('धन्यवाद! आपका समय सुझाव प्राप्त हो गया।');
    closeModal('timeSuggestionModal');
  }
  
  function handleTopicSuggestionSubmit(e) {
    e.preventDefault();
    alert('धन्यवाद! आपका विषय सुझाव प्राप्त हो गया।');
    closeModal('topicSuggestionModal');
  }

  // Close modal when clicking outside
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function(e) {
      if (e.target === this) this.classList.remove('active');
    });
  });

  if (searchToggle && searchOverlay) {
    searchToggle.addEventListener('click', function() {
      searchOverlay.classList.add('active');
      // Lock body scroll
      document.body.style.overflow = 'hidden';
      // Auto-focus on input when opened
      setTimeout(() => {
        if (searchInput) {
          searchInput.focus();
        }
      }, 400);
    });
  }

  if (searchClose && searchOverlay) {
    searchClose.addEventListener('click', function() {
      searchOverlay.classList.remove('active');
      // Restore body scroll
      document.body.style.overflow = '';
    });
  }

  // Close search overlay on ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && searchOverlay && searchOverlay.classList.contains('active')) {
      searchOverlay.classList.remove('active');
      // Restore body scroll
      document.body.style.overflow = '';
    }
  });

  // Close search overlay on overlay background click
  if (searchOverlay) searchOverlay.addEventListener('click', function(e) {
    if (e.target === searchOverlay) {
      searchOverlay.classList.remove('active');
      // Restore body scroll
      document.body.style.overflow = '';
    }
  });

  // Full Screen Overlay Drawer functionality
  const drawerToggle = document.getElementById('sidebarToggle');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerClose = document.getElementById('drawerClose');
  const sidebarLogo = document.querySelector('.sidebar-logo');

  // Close drawer function
  function closeDrawer() {
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore body scroll
  }

  if (drawerToggle && drawerOverlay) {
    drawerToggle.addEventListener('click', function() {
      drawerOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent body scroll
    });
  }

  // Logo click to close drawer
  if (sidebarLogo) {
    sidebarLogo.addEventListener('click', function(e) {
      e.preventDefault();
      closeDrawer();
    });
  }

  // X button click to close drawer
  if (drawerClose && drawerOverlay) {
    drawerClose.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('X button clicked'); // Debug log
      closeDrawer();
    });
  }

  // Close drawer on overlay click
  if (drawerOverlay) drawerOverlay.addEventListener('click', function(e) {
    if (e.target === drawerOverlay) {
      closeDrawer();
    }
  });

  // Close drawer on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && drawerOverlay && drawerOverlay.classList.contains('active')) {
      closeDrawer();
    }
  });

  
  // Close search overlay on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && searchOverlay && searchOverlay.classList.contains('active')) {
      searchOverlay.classList.remove('active');
      if (searchInput) searchInput.value = '';
    }
  });

  // Close search overlay on background click
  if (searchOverlay) searchOverlay.addEventListener('click', function(e) {
    if (e.target === searchOverlay) {
      searchOverlay.classList.remove('active');
      if (searchInput) searchInput.value = '';
    }
  });

  // Sidebar functionality
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  const sidebarClose = document.getElementById('sidebarClose');

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.add('active');
    });
  }

  if (sidebarClose && sidebar) {
    sidebarClose.addEventListener('click', function() {
      sidebar.classList.remove('active');
    });
  }

  // Close sidebar on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
      sidebar.classList.remove('active');
    }
  });

  // Close sidebar on background click
  document.addEventListener('click', function(e) {
    if (sidebar.classList.contains('active') && 
        !sidebar.contains(e.target) && 
        !sidebarToggle.contains(e.target)) {
      sidebar.classList.remove('active');
    }
  });

  // Add scroll to top button functionality
  const scrollToTopBtn = document.getElementById('scrollToTop');

  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }
  });

  scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });
  });

});

 // Scroll to Top Button
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'block';
      } else {
        scrollToTopBtn.style.display = 'none';
      }
    });

    scrollToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Modal Functions (if needed for future use)
    function openModal(modalId) {
      // Modal functionality can be added here if needed
      console.log('Opening modal:', modalId);
    }

    function closeModal(modalId) {
      // Modal functionality can be added here if needed
      console.log('Closing modal:', modalId);
    }