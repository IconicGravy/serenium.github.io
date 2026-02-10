window.addEventListener('load', () => {
   const preloader = document.getElementById('preloader');
   setTimeout(() => {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
   }, 1500);
});

const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

document.addEventListener('mouseover', (e) => {
   if (e.target.closest('a, button, .gallery-item, .qa-header, input, .crypto-container')) {
      cursorOutline.classList.add('hovered');
   } else {
      cursorOutline.classList.remove('hovered');
   }
});

window.addEventListener('mousemove', (e) => {
   const posX = e.clientX;
   const posY = e.clientY;
   cursorDot.style.left = `${posX}px`;
   cursorDot.style.top = `${posY}px`;
   cursorOutline.animate({
      left: `${posX}px`,
      top: `${posY}px`
   }, {
      duration: 500,
      fill: "forwards"
   });

   document.body.style.setProperty('--mouse-x', `${posX}px`);
   document.body.style.setProperty('--mouse-y', `${posY}px`);
});

const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

function toggleMenu() {
   hamburgerBtn.classList.toggle('active');
   mobileMenu.classList.toggle('active');
   if (mobileMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
   } else {
      document.body.style.overflow = '';
   }
}

hamburgerBtn.addEventListener('click', toggleMenu);
mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

const track = document.getElementById('track');
const items = document.querySelectorAll('.gallery-item');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
let currentIndex = 1;

function updateGallery() {

   const itemWidth = items[currentIndex].getBoundingClientRect().width + 35;

   const centerOffset = (track.parentElement.clientWidth / 2) - (items[currentIndex].getBoundingClientRect().width / 2);

   const itemPosition = currentIndex * itemWidth;

   track.style.transform = `translateX(${-itemPosition + centerOffset}px)`;

   items.forEach((item, index) => {
      if (index === currentIndex) item.classList.add('active');
      else item.classList.remove('active');
   });
}

prevBtn.addEventListener('click', () => {
   currentIndex--;
   if (currentIndex < 0) currentIndex = items.length - 1;
   updateGallery();
});

nextBtn.addEventListener('click', () => {
   currentIndex++;
   if (currentIndex >= items.length) currentIndex = 0;
   updateGallery();
});

window.addEventListener('load', updateGallery);
window.addEventListener('resize', updateGallery);

const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');

function openModal(el) {
   const src = el.querySelector('img').src;
   modalImg.src = src;
   modal.classList.add('active');
}
modal.addEventListener('click', () => modal.classList.remove('active'));

const video = document.getElementById('showcaseVideo');
const playBtn = document.getElementById('playPauseBtn');
const progressBar = document.getElementById('progressBarContainer');
const progressFill = document.getElementById('progressFill');

playBtn.addEventListener('click', () => {
   if (video.paused) {
      video.play();
      playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
   } else {
      video.pause();
      playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
   }
});

video.addEventListener('timeupdate', () => {
   const percent = (video.currentTime / video.duration) * 100;
   progressFill.style.width = `${percent}%`;
});

progressBar.addEventListener('click', (e) => {
   const rect = progressBar.getBoundingClientRect();
   const clickX = e.clientX - rect.left;
   const width = rect.width;
   video.currentTime = (clickX / width) * video.duration;
});

const headers = document.querySelectorAll('.qa-header');
headers.forEach(header => {
   header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const isActive = header.classList.contains('active');

      document.querySelectorAll('.qa-header').forEach(h => {
         h.classList.remove('active');
         h.nextElementSibling.style.maxHeight = null;
      });

      if (!isActive) {
         header.classList.add('active');
         content.style.maxHeight = content.scrollHeight + "px";
      }
   });
});

const cards = document.querySelectorAll('.glass');

cards.forEach(card => {
   card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
   });

   card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
   });
});

const observer = new IntersectionObserver((entries) => {
   entries.forEach(entry => {
      if (entry.isIntersecting) {
         entry.target.style.opacity = 1;
         entry.target.style.transform = 'translateY(0)';
      }
   });
}, {
   threshold: 0.1
});

document.querySelectorAll('.glass, h2, .qa-item').forEach((el, i) => {
   el.style.opacity = 0;
   el.style.transform = 'translateY(40px)';
   el.style.transition = `all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) ${i * 0.1}s`;
   observer.observe(el);
});

const paymentModal = document.getElementById('payment-modal');
const closePayModal = document.getElementById('close-pay-modal');
const modalContentArea = document.getElementById('modal-content-area');
const buyBtns = document.querySelectorAll('.buy-btn');
let paypalRendered = false;

const paymentData = {
   robux: `
        <div class="pay-title">Robux Payment</div>
        <p class="pay-desc">Click the button below to purchase the official Gamepass for Serenium HvH.</p>
        <a href="https://www.roblox.com/game-pass/1664165638/serenium-hvh" target="_blank" class="discord-link-btn" style="background: white; color: black;">Buy Gamepass</a>
    `,
   card: `
        <div class="pay-title">Credit Card Payment</div>
        <p class="pay-desc">Purchase an $8 gift card via the link below and send the code to the seller.</p>
        <div class="crypto-container" style="cursor: pointer; text-align: center; justify-content: center; display: block;">
             <a href="https://www.g2a.com/paypal-gift-card-8-usd-by-rewarble-global-i10000339995080" target="_blank" style="color: white; text-decoration: none; font-weight: 600;">Buy Gift Card on G2A</a>
        </div>
        <p class="pay-desc" style="margin-top: 15px; font-size: 0.85rem;">Send code to: <a href="https://discord.com/users/1343575439008071842" target="_blank" style="color: var(--accent);">vibinn_vibes</a></p>
    `,
   crypto: `
        <div class="pay-title">Crypto Payment (LTC)</div>
        <p class="pay-desc">Send exactly $7.50 worth of LTC to the address below. Click to copy.</p>
        <div class="crypto-container" onclick="copyCrypto()">
            <i class="fa-brands fa-litecoin-sign crypto-icon"></i>
            <div class="crypto-address" id="crypto-address">LcurBrQdxtU4r79fmYdSFim1tb1pevSRat</div>
        </div>
        <div class="copy-feedback" id="copy-feedback">Copied!</div>
    `,
   paypal: `
        <div class="pay-title">PayPal Payment</div>
        <p class="pay-desc">In order to purchase via PayPal join our discord server via the button below.</p>
        <div class="crypto-container" style="cursor: pointer; text-align: center; justify-content: center; display: block;">
             <a href="https://discord.gg/twMsXpduVm" target="_blank" style="color: white; text-decoration: none; font-weight: 600;">Join Discord</a>
        </div>
        <div class="pay-notice">You cannot automatically purchase via PayPal anymore.</div>
    `
};

buyBtns.forEach(btn => {
   btn.addEventListener('click', (e) => {
      const card = e.target.closest('.price-card');
      const type = card.getAttribute('data-type');

      modalContentArea.innerHTML = paymentData[type];
      paymentModal.classList.add('active');

      if (type === 'paypal' && !paypalRendered) {
         paypal.Buttons({
            createOrder: function (data, actions) {
               return actions.order.create({
                  purchase_units: [{
                     amount: {
                        value: '7.50'
                     }
                  }]
               });
            },
            onApprove: function (data, actions) {
               return actions.order.capture().then(function (details) {
                  alert('Transaction completed by ' + details.payer.name.given_name); // only few people know about this btw :wink:
               });
            }
         }).render('#paypal-button-container');
         paypalRendered = true;
      }
   });
});

closePayModal.addEventListener('click', () => {
   paymentModal.classList.remove('active');
});

paymentModal.addEventListener('click', (e) => {
   if (e.target === paymentModal) {
      paymentModal.classList.remove('active');
   }
});

function copyCrypto() {
   const address = document.getElementById('crypto-address').innerText;
   navigator.clipboard.writeText(address).then(() => {
      const feedback = document.getElementById('copy-feedback');
      feedback.classList.add('show');
      setTimeout(() => {
         feedback.classList.remove('show');
      }, 2000);
   });
}
