/**
* Template Name: Workfolio Custom Redesign for Sreelekshmi K S
* Author: Antigravity Code Assistant (Google DeepMind)
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader) return;
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.classList.toggle('bi-list');
      mobileNavToggleBtn.classList.toggle('bi-x');
    }
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Preloader removal
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button behavior
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 150 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll (AOS) init
   */
  function aosInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate Pure Counter
   */
  function initCounters() {
    if (typeof PureCounter !== 'undefined') {
      new PureCounter();
    }
  }
  window.addEventListener('load', initCounters);

  /**
   * Animate the skills progress bars on reveal using Intersection Observer (highly robust fallback)
   */
  function initSkillsAnimation() {
    let skillsAnimation = document.querySelectorAll('.skills-animation');
    if ('IntersectionObserver' in window) {
      let observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            let progress = entry.target.querySelectorAll('.progress .progress-bar');
            progress.forEach(el => {
              el.style.width = el.getAttribute('aria-valuenow') + '%';
            });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      skillsAnimation.forEach(item => {
        observer.observe(item);
      });
    } else {
      // Waypoints fallback if IntersectionObserver is not supported
      if (typeof Waypoint !== 'undefined') {
        skillsAnimation.forEach((item) => {
          new Waypoint({
            element: item,
            offset: '80%',
            handler: function() {
              let progress = item.querySelectorAll('.progress .progress-bar');
              progress.forEach(el => {
                el.style.width = el.getAttribute('aria-valuenow') + '%';
              });
            }
          });
        });
      } else {
        // Instant fill fallback
        skillsAnimation.forEach((item) => {
          let progress = item.querySelectorAll('.progress .progress-bar');
          progress.forEach(el => {
            el.style.width = el.getAttribute('aria-valuenow') + '%';
          });
        });
      }
    }
  }
  window.addEventListener('load', initSkillsAnimation);

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    });
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Project filters and details modal
   */
  const projectData = {
    bloodinventory: {
      title: 'BloodInventory',
      description: 'BloodInventory is a web-based blood inventory management system developed using PHP, Laravel, and MySQL to manage blood-related records and inventory information through a centralized platform.',
      technologies: ['PHP', 'Laravel', 'MySQL'],
      features: ['Centralized blood-related record management', 'Blood inventory information management']
    },
    school: {
      title: 'School Management System',
      description: 'A PHP and MySQL-based School Management System designed to organize and manage school-related information and administrative records through a centralized web application.',
      technologies: ['PHP', 'MySQL'],
      features: ['Centralized school information management', 'Administrative record management']
    },
    mystudyacademy: {
      title: 'MyStudyAcademy',
      description: 'MyStudyAcademy is an education-focused web application developed using PHP and SQL, providing students with educational information, course details, examination resources, and academic content.',
      technologies: ['PHP', 'SQL'],
      features: ['Course information', 'Examination resources', 'Academic content', 'Dynamic educational information']
    },
    iiem: {
      title: 'IIEM Institution',
      description: 'IIEM Institution is a comprehensive education management and information platform developed using PHP and SQL/MySQL, featuring course management, university information, distance education, competitive exams, student services, online verification, application tracking, and administrative management.',
      technologies: ['PHP', 'SQL', 'MySQL'],
      features: ['Course management', 'University management and course-university mapping', 'Distance education', 'Competitive exam information and exam details', 'Student enquiry and student management', 'Online verification and application status', 'EMI / payment management', 'Certificate verification and PDF generation', 'FAQ and testimonial management', 'Admin and student/user dashboards', 'SEO-friendly pages', 'Responsive UI']
    }
  };

  document.querySelectorAll('.project-filter').forEach(filterButton => {
    filterButton.addEventListener('click', () => {
      const filter = filterButton.dataset.filter;
      document.querySelectorAll('.project-filter').forEach(button => button.classList.remove('active'));
      filterButton.classList.add('active');
      document.querySelectorAll('.project-card').forEach(card => {
        const matches = filter === 'all' || card.dataset.projectTech.split(' ').includes(filter);
        card.classList.toggle('is-hidden', !matches);
      });
    });
  });

  const projectModal = document.getElementById('projectDetailsModal');
  if (projectModal) {
    projectModal.addEventListener('show.bs.modal', event => {
      const project = projectData[event.relatedTarget.dataset.project];
      if (!project) return;

      projectModal.querySelector('#projectDetailsTitle').textContent = project.title;
      projectModal.querySelector('#projectDetailsDescription').textContent = project.description;
      projectModal.querySelector('#projectDetailsTech').innerHTML = project.technologies.map(technology => `<span>${technology}</span>`).join('');
      projectModal.querySelector('#projectDetailsFeatures').innerHTML = project.features.map(feature => `<li>${feature}</li>`).join('');
    });
  }

})();
