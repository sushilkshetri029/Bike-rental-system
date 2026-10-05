const bikeDataFallback = [
  {
    id: 1,
    name: 'Bajaj Pulsar 150',
    rateUSD: 50,
    rateNPR: 6000,
    isNew: true,
    rating: 90,
    imageUrl: 'public/png/bajaj-pulsar-150.png',
    description: '',
    status: 'available',
  },
  {
    id: 2,
    name: 'Bajaj Pulsar 220',
    rateUSD: 40,
    rateNPR: 4800,
    isNew: true,
    rating: 100,
    imageUrl: 'public/png/bajaj-pulsar-220.png',
    description: '',
    status: 'available',
  },
  {
    id: 3,
    name: 'Yamaha FZS V2',
    rateUSD: 30,
    rateNPR: 3600,
    isNew: false,
    rating: 100,
    imageUrl: 'public/png/yamaha-fzs-v2.png',
    description: '',
    status: 'available',
  },
];

const homepageBikeBatchSize = 4;
let bikeData = bikeDataFallback;

function resolveAssetUrl(url) {
  const assetUrl = String(url || '').trim();
  if (assetUrl.startsWith('/png/')) {
    return `public${assetUrl}`;
  }
  if (assetUrl.startsWith('/')) {
    return `public${assetUrl}`;
  }
  return assetUrl;
}

function getBikeFallbackImage(bikeName) {
  const name = String(bikeName || '').trim().toLowerCase();
  if (name === 'hunter 350') {
    return 'public/png/bajaj-pulsar-150.png';
  }
  if (name === 'pulsar 220') {
    return 'public/png/bajaj-pulsar-220.png';
  }
  return 'public/png/yamaha-fzs-v2.png';
}

const whyItems = [
  {
    icon: 'fa-solid fa-sack-dollar',
    title: 'Affordable Prices',
    description: 'We offer the best prices in town for renting motorbikes.',
  },
  {
    icon: 'fa-solid fa-screwdriver-wrench',
    title: 'Top-notch Services',
    description: 'Our services are designed to provide you with the best experience.',
  },
  {
    icon: 'fa-solid fa-shield-halved',
    title: 'Safety First',
    description: 'Your safety is our priority. Our bikes are well-maintained.',
  },
  {
    icon: 'fa-solid fa-thumbs-up',
    title: 'Customer Satisfaction',
    description: 'We strive to provide the best customer service.',
  },
  {
    icon: 'fa-solid fa-clock',
    title: '24/7 Availability',
    description: 'We are available round the clock to serve you.',
  },
];

const howSteps = [
  {
    icon: 'fa-solid fa-magnifying-glass',
    number: '1.',
    title: 'Select Bike',
    description: 'Browse through our wide range of motorbikes and choose the one that suits your needs.',
  },
  {
    icon: 'fa-solid fa-file-signature',
    number: '2.',
    title: 'Book Online',
    description: 'Reserve your chosen bike online with our easy-to-use booking system.',
  },
  {
    icon: 'fa-solid fa-motorcycle',
    number: '3.',
    title: 'Pick Up',
    description: 'Visit our location to pick up your bike and complete the rental process.',
  },
  {
    icon: 'fa-solid fa-person-biking',
    number: '4.',
    title: 'Enjoy Ride',
    description: 'Hit the road and enjoy your ride with our top-quality motorbikes.',
  },
];

const faqData = [
  {
    question: 'What are the documents required for renting a motorbike?',
    answer: 'You need to provide a valid driving license and a valid ID proof to rent a motorbike.',
  },
  {
    question: 'Do I need to pay a security deposit?',
    answer: 'Yes, you need to pay a security deposit of NPR 5,000 which will be refunded after the rental period ends.',
  },
  {
    question: 'What is the minimum rental period?',
    answer: 'The minimum rental period is 24 hours.',
  },
  {
    question: 'What happens in case of an accident?',
    answer: 'In case of an accident, please contact us immediately. We will assist you with the necessary steps.',
  },
  {
    question: 'Can I extend my rental period?',
    answer: 'Yes, you can extend your rental period by contacting us before your current rental period ends.',
  },
];

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function starMarkup(ratingPercent) {
  const rating = ratingPercent / 20;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
  const stars = [];

  for (let index = 0; index < 5; index += 1) {
    let starClass = 'star';
    if (index >= fullStars + (hasHalfStar ? 1 : 0)) {
      starClass += ' dimmed';
    } else if (hasHalfStar && index === fullStars) {
      starClass += ' half';
    }
    stars.push(`<span class="${starClass}">★</span>`);
  }

  return stars.join('');
}

function bikeCardMarkup(bike) {
  const fallbackImage = getBikeFallbackImage(bike.name);
  const isAvailable = bike.status === 'available';
  const statusLabel = bike.status === 'maintenance' ? 'Maintenance' : 'Available';

  return `
    <div class="bike-card desktop">
      ${bike.isNew ? '<span class="new-label">New</span>' : ''}
      <div class="bike-image-wrapper">
        <img class="bike-image image-fit" src="${bike.imageUrl}" width="300" height="200" alt="${bike.name}" data-bike-image data-fallback-image="${fallbackImage}">
      </div>
      <div class="line"></div>
      <h3 class="bike-name">${bike.name}</h3>
      <div class="line"></div>
      <div class="bike-rates">
        <div class="rate-title">
          <span class="rate-text highlight-blue">Rate</span> (per day)
        </div>
        <div class="bike-rate">
          <span class="rate-usd highlight-yellow">$${bike.rateUSD}</span>
          <div class="line line-vertical rate-line"></div>
          NPR ${bike.rateNPR}
        </div>
      </div>
      <div class="line"></div>
      <div class="num-plates">
        <strong>Number Plate:</strong> ${bike.numberPlate || 'Not available'}
      </div>
      <div class="line"></div>
      <div class="bike-ratings">
        <div class="rating-stars" aria-label="${bike.rating / 20} out of 5 stars">${starMarkup(bike.rating)}</div>
      </div>
      <div class="bike-info" hidden>
        <div class="line"></div>
        <p><strong>Status:</strong> <span>${statusLabel}</span></p>
        <div class="line"></div>
        <p><strong>Description:</strong> ${bike.description || 'No description available.'}</p>
      </div>
      <div class="line"></div>
      <div class="bike-buttons">
        <button class="btn btn-blue hire-bike-btn" type="button" data-bike-id="${bike.id}" data-bike-name="${bike.name}" ${isAvailable ? '' : 'disabled'}>${isAvailable ? 'Hire Now' : 'Unavailable'}</button>
        <button class="more-info-btn btn btn-gray-light" type="button" aria-expanded="false">More Info</button>
      </div>
    </div>
  `;
}

async function loadBikeData() {
  try {
    const response = await fetch('api/bikes.php', { cache: 'no-store' });
    if (!response.ok) {
      return;
    }

    const payload = await response.json();
    if (Array.isArray(payload.bikes) && payload.bikes.length > 0) {
      bikeData = payload.bikes.map((bike) => ({
        id: Number(bike.id),
        name: bike.name,
        numberPlate: bike.number_plate || '',
        rateUSD: Number(bike.rate_usd),
        rateNPR: Number(bike.rate_npr),
        isNew: Boolean(Number(bike.is_new)),
        rating: Number(bike.rating),
        imageUrl: resolveAssetUrl(bike.image_url),
        description: bike.short_description || '',
        status: bike.status,
      }));
    }
  } catch (error) {
    bikeData = bikeDataFallback;
  }
}

async function syncAuthNavigation() {
  const authLinks = Array.from(document.querySelectorAll('a.sign-in-link[href="auth.php"]'));
  if (authLinks.length === 0) {
    return;
  }

  try {
    const response = await fetch('api/auth-status.php', { cache: 'no-store' });
    if (!response.ok) {
      return;
    }

    const state = await response.json();
    if (!state || !state.logged_in || !state.user) {
      return;
    }

    const firstName = typeof state.user.first_name === 'string' && state.user.first_name.trim() !== ''
      ? state.user.first_name.trim()
      : 'Account';

    authLinks.forEach((link) => {
      if (state.is_admin) {
        link.setAttribute('href', 'dashboard.php');
        link.textContent = 'Dashboard';
        return;
      }

      link.setAttribute('href', 'index.php');
      link.textContent = firstName;
    });
  } catch (error) {
    return;
  }
}

function initActiveLinks() {
  const page = document.body.dataset.page || 'home';
  document.querySelectorAll('[data-nav]').forEach((link) => {
    const target = link.getAttribute('data-nav');
    const active = target === page;
    link.classList.toggle('active', active);
  });
}

function initUserMenus() {
  const getAllMenus = () => Array.from(document.querySelectorAll('.user-menu'));

  const closeMenu = (menuElement) => {
    menuElement.classList.remove('is-open');
    const triggerButton = menuElement.querySelector('.user-menu-button');
    if (triggerButton) {
      triggerButton.setAttribute('aria-expanded', 'false');
    }
  };

  const closeAllMenus = (exceptMenuElement = null) => {
    getAllMenus().forEach((menuElement) => {
      if (menuElement === exceptMenuElement) {
        return;
      }
      closeMenu(menuElement);
    });
  };

  document.addEventListener('click', (event) => {
    const clickedButton = event.target.closest('.user-menu-button');
    if (clickedButton) {
      const currentMenu = clickedButton.closest('.user-menu');
      if (!currentMenu) {
        return;
      }

      const shouldOpen = !currentMenu.classList.contains('is-open');
      closeAllMenus(currentMenu);
      currentMenu.classList.toggle('is-open', shouldOpen);
      clickedButton.setAttribute('aria-expanded', String(shouldOpen));
      return;
    }

    // Any click outside a user menu closes every menu.
    if (!event.target.closest('.user-menu')) {
      closeAllMenus();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeAllMenus();
    }
  });
}

function renderHomeSections() {
  const whyContainer = document.getElementById('why-items');
  if (whyContainer) {
    whyContainer.innerHTML = whyItems
      .map(
        (item) => `
          <div class="why-item">
            <i class="${item.icon} icon-glyph why-icon" aria-hidden="true"></i>
            <h3 class="why-item-title">${item.title}</h3>
            <p class="why-item-description">${item.description}</p>
          </div>
        `,
      )
      .join('');
  }

  const howContainer = document.getElementById('how-it-works-steps');
  if (howContainer) {
    const pieces = [];
    howSteps.forEach((step, index) => {
      pieces.push(`
        <div class="how-it-works-step item-${index * 2 + 1}">
          <i class="${step.icon} icon-glyph icon" aria-hidden="true"></i>
          <h3 class="how-it-works-step-title"><span class="highlight-yellow">${step.number}</span> ${step.title}</h3>
          <p class="how-it-works-step-description">${step.description}</p>
        </div>
      `);
      if (index < howSteps.length - 1) {
        pieces.push(`<i class="fa-solid fa-arrow-right step-icon item-${index * 2 + 2}" aria-hidden="true"></i>`);
      }
    });
    howContainer.innerHTML = pieces.join('');
  }

  const desktopBikes = document.getElementById('bikes-desktop-grid');
  if (desktopBikes) {
    const showMoreBikes = document.querySelector('.show-more-btn');
    let visibleBikeCount = homepageBikeBatchSize;

    const displayBikes = (startIndex = 0) => {
      const bikeMarkup = bikeData
        .slice(startIndex, visibleBikeCount)
        .map((bike) => bikeCardMarkup(bike))
        .join('');

      if (startIndex > 0) {
        desktopBikes.insertAdjacentHTML('beforeend', bikeMarkup);
      } else {
        desktopBikes.innerHTML = bikeMarkup;
      }

        desktopBikes.querySelectorAll('img[data-bike-image]').forEach((image) => {
          image.addEventListener('error', () => {
            image.src = image.dataset.fallbackImage || 'public/png/yamaha-fzs-v2.png';
          }, { once: true });
        });

      if (showMoreBikes) {
        const isExpanded = visibleBikeCount > homepageBikeBatchSize;
        showMoreBikes.hidden = bikeData.length <= homepageBikeBatchSize;
        showMoreBikes.innerHTML = isExpanded
          ? 'Show Less Bikes <i class="fa-solid fa-chevron-up" aria-hidden="true"></i>'
          : 'Show More Bikes <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>';
      }
    };

    displayBikes();

    desktopBikes.addEventListener('click', (event) => {
      const moreInfoButton = event.target.closest('.more-info-btn');
      if (!moreInfoButton) {
        return;
      }

      const bikeInfo = moreInfoButton.closest('.bike-card').querySelector('.bike-info');
      const isHidden = bikeInfo.hidden;
      bikeInfo.hidden = !isHidden;
      moreInfoButton.setAttribute('aria-expanded', String(isHidden));
      moreInfoButton.textContent = isHidden ? 'Hide Info' : 'More Info';
    });

    if (showMoreBikes) {
      showMoreBikes.addEventListener('click', () => {
        if (visibleBikeCount > homepageBikeBatchSize) {
          visibleBikeCount = homepageBikeBatchSize;
          displayBikes();
          return;
        }

        const previousVisibleBikeCount = visibleBikeCount;
        visibleBikeCount += homepageBikeBatchSize;
        visibleBikeCount = Math.min(visibleBikeCount, bikeData.length);
        if (visibleBikeCount <= previousVisibleBikeCount) {
          return;
        }
        displayBikes(previousVisibleBikeCount);
      });
    }
  }

  const faqContainer = document.getElementById('faq-items');
  if (faqContainer) {
    faqContainer.innerHTML = faqData
      .map(
        (faq, index) => `
          <div class="faq-item" data-faq-index="${index}">
            <div class="faq-question-wrapper">
              <h3 class="faq-question">
                <span class="question-icon">?</span>
                ${faq.question}
              </h3>
              <div class="faq-icon">⌄</div>
            </div>
            <div class="faq-answer-wrapper">
              <p class="faq-answer">${faq.answer}</p>
            </div>
          </div>
        `,
      )
      .join('');
  }
}

function initFaqs() {
  const faqContainer = document.getElementById('faq-items');
  if (!faqContainer) {
    return;
  }

  const faqItems = faqContainer.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question-wrapper');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      faqItems.forEach((otherItem) => {
        otherItem.classList.remove('open');
      });

      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

function initBookingModal() {
  const backdrop = document.getElementById('booking-modal-backdrop');
  const form = backdrop ? backdrop.querySelector('.booking-modal-form') : null;
  const bikeIdInput = document.getElementById('booking-bike-id');
  const bikeNameInput = document.getElementById('booking-bike-name');
  const bikeNameLabel = document.getElementById('booking-modal-bike-name');
  const pickupDateInput = form ? form.querySelector('input[name="pickupDate"]') : null;
  const dropDateInput = form ? form.querySelector('input[name="dropDate"]') : null;

  if (!backdrop || !form || !bikeIdInput || !bikeNameInput || !bikeNameLabel) {
    return;
  }

  const close = () => {
    backdrop.hidden = true;
    document.body.classList.remove('no-scroll');
  };

  const openForButton = (hireButton) => {
    bikeIdInput.value = hireButton.dataset.bikeId || '';
    bikeNameInput.value = hireButton.dataset.bikeName || '';
    bikeNameLabel.textContent = bikeNameInput.value || 'Selected vehicle';
    if (pickupDateInput && dropDateInput) {
      dropDateInput.min = pickupDateInput.value;
    }
    backdrop.hidden = false;
    document.body.classList.add('no-scroll');
    form.querySelector('input[name="name"]').focus();
  };

  if (pickupDateInput && dropDateInput) {
    pickupDateInput.addEventListener('input', () => {
      dropDateInput.min = pickupDateInput.value;
      if (dropDateInput.value && dropDateInput.value < pickupDateInput.value) {
        dropDateInput.value = '';
      }
    });
  }

  const openAfterAuthentication = () => {
    const bikeId = new URLSearchParams(window.location.search).get('hire_bike');
    if (!bikeId) {
      return;
    }

    const hireButton = Array.from(document.querySelectorAll('.hire-bike-btn'))
      .find((button) => button.dataset.bikeId === bikeId);
    if (!hireButton) {
      return;
    }

    openForButton(hireButton);
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  document.addEventListener('click', (event) => {
    const hireButton = event.target.closest('.hire-bike-btn');
    if (hireButton) {
      fetch('api/auth-status.php', { cache: 'no-store' })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Unable to check authentication status.');
          }
          return response.json();
        })
        .then((state) => {
          if (state && state.logged_in) {
            openForButton(hireButton);
            return;
          }

          const returnTo = `index.php?hire_bike=${encodeURIComponent(hireButton.dataset.bikeId || '')}`;
          window.location.href = `auth.php?return_to=${encodeURIComponent(returnTo)}`;
        })
        .catch(() => {
          window.location.href = 'auth.php';
        });
      return;
    }

    if (event.target === backdrop || event.target.closest('.booking-modal-close, .booking-cancel-btn')) {
      close();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !backdrop.hidden) {
      close();
    }
  });

  openAfterAuthentication();
}

function setFooterYear() {
  const yearNodes = document.querySelectorAll('[data-year]');
  yearNodes.forEach((node) => {
    node.textContent = new Date().getFullYear();
  });
}

function getFieldLabel(input) {
  const inputId = input.getAttribute('id');
  if (inputId) {
    const explicitLabel = document.querySelector(`label[for="${inputId}"]`);
    if (explicitLabel) {
      return explicitLabel.textContent.trim();
    }
  }

  const wrapperLabel = input.closest('label');
  if (wrapperLabel) {
    const labelText = wrapperLabel.textContent.trim();
    if (labelText !== '') {
      return labelText;
    }
  }

  return (input.getAttribute('name') || 'This field').replace(/_/g, ' ');
}

function getErrorHost(input) {
  return input.closest('.auth-field')
    || input.closest('.input-field')
    || input.closest('.auth-row-meta')
    || input.parentElement;
}

function getOrCreateFieldError(input) {
  const host = getErrorHost(input);
  if (!host) {
    return null;
  }

  let error = host.querySelector('.field-error[data-for="' + (input.id || input.name || '') + '"]');
  if (!error) {
    error = document.createElement('div');
    error.className = 'field-error';
    error.setAttribute('data-for', input.id || input.name || 'field');
    host.appendChild(error);
  }

  return error;
}

function setFieldError(input, message) {
  const error = getOrCreateFieldError(input);
  if (!error) {
    return;
  }

  input.classList.add('input-invalid');
  error.textContent = message;
  error.hidden = false;
}

function clearFieldError(input) {
  input.classList.remove('input-invalid');

  const host = getErrorHost(input);
  if (!host) {
    return;
  }

  const selector = '.field-error[data-for="' + (input.id || input.name || '') + '"]';
  const error = host.querySelector(selector);
  if (error) {
    error.hidden = true;
    error.textContent = '';
  }
}

function validateSingleField(input, form) {
  const label = getFieldLabel(input);
  const value = String(input.value ?? '').trim();
  const type = (input.getAttribute('type') || 'text').toLowerCase();
  const name = (input.getAttribute('name') || '').toLowerCase();

  if (type === 'hidden') {
    clearFieldError(input);
    return true;
  }

  if (input.required) {
    if (type === 'checkbox' && !input.checked) {
      setFieldError(input, `${label} is required.`);
      return false;
    }

    if (type !== 'checkbox' && value === '') {
      setFieldError(input, `${label} is required.`);
      return false;
    }
  }

  if (value !== '' && type === 'email') {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!emailValid) {
      setFieldError(input, 'Please enter a valid email address.');
      return false;
    }
  }

  if (value !== '' && (name === 'phone' || name === 'contact')) {
    if (!/^(97|98)\d{8}$/.test(value)) {
      setFieldError(input, 'Phone number must be 10 digits and start with 97 or 98.');
      return false;
    }
  }

  if (name === 'password' && value !== '' && value.length < 6) {
    setFieldError(input, 'Password must be at least 6 characters long.');
    return false;
  }

  if (name === 'confirm_password') {
    const passwordInput = form.querySelector('input[name="password"]');
    const passwordValue = passwordInput ? String(passwordInput.value ?? '').trim() : '';

    if (value !== '' && passwordValue !== '' && value !== passwordValue) {
      setFieldError(input, 'Passwords do not match.');
      return false;
    }
  }

  clearFieldError(input);
  return true;
}

function validateFormFields(form) {
  const inputs = Array.from(form.querySelectorAll('input, select, textarea'));
  let isValid = true;
  let firstInvalid = null;

  inputs.forEach((input) => {
    const fieldValid = validateSingleField(input, form);
    if (!fieldValid && firstInvalid === null) {
      firstInvalid = input;
    }
    isValid = isValid && fieldValid;
  });

  if (!isValid && firstInvalid) {
    firstInvalid.focus();
  }

  return isValid;
}

function initFormValidation() {
  const forms = Array.from(document.querySelectorAll('form'));
  forms.forEach((form) => {
    form.setAttribute('novalidate', 'novalidate');
    form.addEventListener('submit', (event) => {
      if (!validateFormFields(form)) {
        event.preventDefault();
      }
    });
  });
}

function initAuthPage() {
  const authRoot = document.querySelector('[data-auth-page]');
  if (!authRoot) {
    return;
  }

  const tabs = Array.from(document.querySelectorAll('[data-auth-tab]'));
  const panels = Array.from(document.querySelectorAll('[data-auth-panel]'));
  const passwordToggles = Array.from(document.querySelectorAll('[data-toggle-password]'));

  const activate = (mode) => {
    tabs.forEach((tab) => {
      const active = tab.dataset.authTab === mode;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
    });

    panels.forEach((panel) => {
      const active = panel.dataset.authPanel === mode;
      panel.hidden = !active;
      panel.classList.toggle('active', active);
    });
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => activate(tab.dataset.authTab));
  });

  passwordToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const targetId = toggle.getAttribute('data-toggle-password');
      const input = targetId ? document.getElementById(targetId) : null;
      if (!input) {
        return;
      }

      const isPassword = input.getAttribute('type') === 'password';
      input.setAttribute('type', isPassword ? 'text' : 'password');
      toggle.innerHTML = isPassword
        ? '<i class="fa-solid fa-eye-slash" aria-hidden="true"></i>'
        : '<i class="fa-solid fa-eye" aria-hidden="true"></i>';
    });
  });

  activate(window.location.hash === '#register' ? 'register' : 'login');

  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#register') {
      activate('register');
    }
    if (window.location.hash === '#login' || window.location.hash === '') {
      activate('login');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadBikeData().finally(() => {
    initFormValidation();
    initActiveLinks();
    initUserMenus();
    setFooterYear();
    syncAuthNavigation();
    initAuthPage();
    renderHomeSections();
    initFaqs();
    initBookingModal();
  });
});
