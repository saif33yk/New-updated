document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
   duration: 800,
   easing: 'ease-in-out',
   once: true,
   mirror: false,
   disable: window.innerWidth < 768
 });
 
 (function() {
   const _0xc87b = ['UGFyYWRpc2UgUlA=', 'aHR0cHM6Ly9kaXNjb3JkLmdnL3BycGs='];
 
   const config = {
     copyrightText: window.atob(_0xc87b[0]),
     discordLink: window.atob(_0xc87b[1]),
     targetSelectors: [
       '.container', 
       'footer', 
       'section', 
       '.content-wrapper', 
       '.bg-dark-light/50'
     ],
     buttonContainers: [
       '.flex.flex-col.sm\\:flex-row.gap-4.justify-center',
       '.flex.flex-col.sm\\:flex-row.justify-center.gap-3'
     ]
   };
 
   function createCopyrightHTML() {
     return `<a href="${config.discordLink}" target="_blank" class="hover:no-underline cursor-pointer">
       <p class="text-xs text-gray-400 relative z-10 hover:scale-105 transition-transform duration-300 copyright-text">
         <span class="bg-gradient-to-r from-[#969605] via-[#d0d334] to-[#d0d334] bg-clip-text text-transparent font-semibold">Copyright by</span>
         <span class="text-white font-semibold tracking-wide"> ${config.copyrightText}</span>
       </p>
     </a>`;
   }
 
   function ensureCopyright() {
     // If we've already run this function, don't run it again
     if (window._copyrightProcessed) {
       return;
     }
     
     window._copyrightProcessed = true;
     console.info('Telif hakkı koruması: Telif hakkı bilgisi ekleniyor...');
     
     try {
       createMissingCopyrights();
       checkButtonContainers();
       
       // Set up observers for existing copyright holders
       document.querySelectorAll('.copyright-holder').forEach(holder => {
         if (!holder._observed) {
           observeCopyrightElement(holder);
           holder._observed = true;
         }
       });
       
       return true;
     } catch (err) {
       console.warn('Telif hakkı koruması: Hata oluştu', err);
       return false;
     }
   }
 
   function checkButtonContainers() {
     config.buttonContainers.forEach(selector => {
       try {
         const containers = document.querySelectorAll(selector);
         containers.forEach(container => {
           const nextElement = container.nextElementSibling;
           if (!nextElement || !nextElement.classList.contains('copyright-holder')) {
             const copyrightDiv = createCopyrightElement();
             container.parentNode.insertBefore(copyrightDiv, container.nextSibling);
             observeCopyrightElement(copyrightDiv);
           }
         });
       } catch (err) {
         console.warn('Telif hakkı koruması: Buton konteyner kontrolü sırasında hata oluştu', err);
       }
     });
   }
 
   function createMissingCopyrights() {
     let addedCount = 0;
 
     config.targetSelectors.forEach(selector => {
       try {
         const elements = document.querySelectorAll(selector);
         elements.forEach(element => {
           if (!elementContainsCopyright(element)) {
             const copyrightDiv = createCopyrightElement();
 
             if (element.tagName.toLowerCase() === 'footer') {
               const existingCopyright = element.querySelector('.text-center.text-gray-500.text-sm');
               if (existingCopyright) {
                 existingCopyright.parentNode.insertBefore(copyrightDiv, existingCopyright);
                 addedCount++;
                 return;
               }
             }
 
             element.appendChild(copyrightDiv);
             addedCount++;
           }
         });
       } catch (err) {
         console.warn('Telif hakkı koruması: Element ekleme sırasında hata oluştu', err);
       }
     });
 
     return addedCount;
   }
 
   function elementContainsCopyright(element, depth = 3) {
     if (!element || depth <= 0) return false;
     
     if (element.querySelector('.copyright-holder')) {
       return true;
     }
     
     return element.parentElement ? elementContainsCopyright(element.parentElement, depth - 1) : false;
   }
 
   function createCopyrightElement() {
     const div = document.createElement('div');
     div.className = 'mt-4 pt-2 text-center opacity-60 hover:opacity-100 transition-opacity duration-300 copyright-holder';
     div.innerHTML = createCopyrightHTML();
     return div;
   }
 
   function observeCopyrightElement(element) {
     if (!element || element._observed) return;
 
     const observer = new MutationObserver(mutations => {
       mutations.forEach(mutation => {
         if (mutation.type === 'childList') {
           const textElement = mutation.target.querySelector('.copyright-text');
           if (!textElement || !textElement.textContent.includes('Copyright')) {
             mutation.target.innerHTML = createCopyrightHTML();
           }
         } else if (mutation.type === 'attributes') {
           if (mutation.attributeName === 'style') {
             const style = mutation.target.style;
             if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
               style.display = '';
               style.visibility = '';
               style.opacity = '0.6';
               console.warn('Telif hakkı koruması: Stil değişikliği engellendi');
             }
           } else if (mutation.attributeName === 'class') {
             if (!mutation.target.classList.contains('copyright-holder')) {
               mutation.target.classList.add('copyright-holder');
             }
           }
         }
       });
     });
 
     observer.observe(element, {
       attributes: true,
       childList: true,
       subtree: true,
       attributeFilter: ['style', 'class']
     });
 
     protectElementStyle(element);
     element._observed = true;
   }
 
   function protectElementStyle(element) {
     if (!element) return;
 
     let originalStyle = element.style;
     Object.defineProperty(element, 'style', {
       get: function() {
         return originalStyle;
       },
       set: function(value) {
         if (value && (
           (value.display === 'none') || 
           (value.visibility === 'hidden') || 
           (value.opacity === '0')
         )) {
           console.warn('Telif hakkı koruması: Stil değişikliği engellendi');
           return;
         }
         originalStyle = value;
       },
       configurable: false
     });
   }

   function initCopyrightProtection() {
     if (window._copyrightInitialized) return;
     window._copyrightInitialized = true;

     if (document.readyState === 'complete') {
       ensureCopyright();
     } else {
       window.addEventListener('load', () => {
         ensureCopyright();
       }, { once: true });
     }
   }
 
   initCopyrightProtection();
 })();
 
   // Modern Read More Functionality
   const initReadMoreButtons = function() {
     const readMoreButtons = document.querySelectorAll('.read-more-btn');
     
     readMoreButtons.forEach(button => {
       button.addEventListener('click', function() {
         // Find the nearest description container
         const updateContent = this.closest('.update-content');
         const fullDescription = updateContent.querySelector('.full-description');
         const readMoreText = this.querySelector('.read-more-text');
         
         // Check if full description is hidden
         const isHidden = fullDescription.classList.contains('hidden');
         
         // Toggle description visibility with modern animation
         if (isHidden) {
           // Prepare for opening animation
           fullDescription.style.maxHeight = '0';
           fullDescription.style.opacity = '0';
           fullDescription.style.transform = 'translateY(-15px)';
           fullDescription.style.transition = 'opacity 0.5s ease, transform 0.5s ease, max-height 0.6s ease';
           
           // Show description
           fullDescription.classList.remove('hidden');
           this.classList.add('active');
           
           // Trigger the animation after a small delay (for better visual effect)
           setTimeout(() => {
             fullDescription.style.maxHeight = '800px'; // Arbitrary large value
             fullDescription.style.opacity = '1';
             fullDescription.style.transform = 'translateY(0)';
             
             // Create ripple effect on button
             const ripple = document.createElement('span');
             ripple.className = 'ripple-effect';
             button.appendChild(ripple);
             
             // Get the largest diameter of the button
             const diameter = Math.max(button.clientWidth, button.clientHeight);
             
             // Set the size and position of the ripple
             ripple.style.width = ripple.style.height = `${diameter}px`;
             ripple.style.top = `${-diameter/2 + button.clientHeight/2}px`;
             ripple.style.left = `${-diameter/2 + button.clientWidth/2}px`;
             
             // Remove the ripple after animation completes
             setTimeout(() => {
               ripple.remove();
             }, 800);
           }, 50);
           
           // Add subtle animation to list items for a staggered effect
           const listItems = fullDescription.querySelectorAll('li');
           listItems.forEach((item, index) => {
             item.style.opacity = '0';
             item.style.transform = 'translateX(-10px)';
             
             setTimeout(() => {
               item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
               item.style.opacity = '1';
               item.style.transform = 'translateX(0)';
             }, 100 + 50 * index); // Start after the container begins animating
           });
           
           // Add subtle animation to other elements for a complete effect
           const paragraphs = fullDescription.querySelectorAll('p');
           paragraphs.forEach((paragraph, index) => {
             paragraph.style.opacity = '0';
             paragraph.style.transform = 'translateY(8px)';
             
             setTimeout(() => {
               paragraph.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
               paragraph.style.opacity = '1';
               paragraph.style.transform = 'translateY(0)';
             }, 70 + 40 * index);
           });
           
           // Animate the background color of content boxes for a nice effect
           const contentBoxes = fullDescription.querySelectorAll('.bg-[#0f1524]/80');
           contentBoxes.forEach((box, index) => {
             box.style.transition = 'background-color 0.8s ease, transform 0.5s ease';
             
             setTimeout(() => {
               box.style.transform = 'scale(1.01)';
               setTimeout(() => {
                 box.style.transform = 'scale(1)';
               }, 300);
             }, 100 + 150 * index);
           });
           
           // Update button text
           readMoreText.textContent = 'Show Less';
         } else {
           // Hide description with animation
           fullDescription.style.opacity = '0';
           fullDescription.style.transform = 'translateY(-10px)';
           fullDescription.style.maxHeight = '0';
           this.classList.remove('active');
           
           // Create ripple effect on button for closing
           const ripple = document.createElement('span');
           ripple.className = 'ripple-effect ripple-close';
           button.appendChild(ripple);
           
           // Get the largest diameter of the button
           const diameter = Math.max(button.clientWidth, button.clientHeight);
           
           // Set the size and position of the ripple
           ripple.style.width = ripple.style.height = `${diameter}px`;
           ripple.style.top = `${-diameter/2 + button.clientHeight/2}px`;
           ripple.style.left = `${-diameter/2 + button.clientWidth/2}px`;
           
           // Remove the ripple after animation completes
           setTimeout(() => {
             ripple.remove();
           }, 800);
           
           // Adding delay before fully hiding to allow animation to complete
           setTimeout(() => {
             fullDescription.classList.add('hidden');
             fullDescription.style.opacity = '';
             fullDescription.style.transform = '';
             fullDescription.style.maxHeight = '';
           }, 500);
           
           // Update button text
           readMoreText.textContent = 'Show More';
         }
       });
     });
   };
 
   // Initialize Read More functionality when page is loaded
   if (document.readyState === 'loading') {
     document.addEventListener('DOMContentLoaded', initReadMoreButtons);
   } else {
     initReadMoreButtons();
   }
 
   // Number Counter Animation
   const numberCounters = document.querySelectorAll('.number-counter');
   const observerOptions = {
     threshold: 0.5
   };
 
   const observer = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
       if (entry.isIntersecting) {
         const counter = entry.target;
         const target = parseInt(counter.getAttribute('data-target'));
         const duration = 800; // 800 milisaniye (daha hızlı animasyon için)
         const start = parseInt(counter.textContent);
         const range = target - start;
         
         // Eğer hedef 100'den büyükse, ilk önce (hedef-100)'e hızlıca atla
         // Sonra son 100 sayıyı normal hızda say
         const fastTarget = range > 100 ? target - 100 : start;
         
         // Hızlı kısım için sürenin %30'unu, yavaş kısım için %70'ini kullan
         const fastDuration = duration * 0.3;
         const slowDuration = duration * 0.7;
         
         // Hızlı kısım
         if (fastTarget > start) {
           counter.textContent = fastTarget;
           
           // Yavaş kısım
           let current = fastTarget;
           const slowRange = target - fastTarget;
           const stepTime = Math.abs(Math.floor(slowDuration / slowRange));
           
           const updateCounter = () => {
             current += 1;
             counter.textContent = current;
             
             if (current < target) {
               setTimeout(updateCounter, stepTime);
             }
           };
           
           setTimeout(updateCounter, fastDuration);
         } else {
           // Hedef zaten küçükse veya 100'den az bir değişim varsa normal sayma
           let current = start;
           const stepTime = Math.abs(Math.floor(duration / range));
           
           const updateCounter = () => {
             current += 1;
             counter.textContent = current;
             
             if (current < target) {
               setTimeout(updateCounter, stepTime);
             }
           };
           
           updateCounter();
         }
         
         observer.unobserve(counter);
       }
     });
   }, observerOptions);
 
   numberCounters.forEach(counter => {
     observer.observe(counter);
   });
 
   // Scroll Buttons
   const scrollToTopBtn = document.getElementById('scrollToTop');
   const scrollToBottomBtn = document.getElementById('scrollToBottom');
   
   // Scroll butonlarının görünürlüğü
   window.addEventListener('scroll', function() {
     const windowHeight = window.innerHeight;
     const fullHeight = document.documentElement.scrollHeight;
     const scrolled = window.pageYOffset;
     const scrollableDistance = fullHeight - windowHeight;
     
     // En aşağıdaysa sadece yukarı butonu göster
     if (Math.ceil(scrolled) >= scrollableDistance - 10) {
       scrollToTopBtn.classList.remove('opacity-0', 'invisible', 'scale-90');
       scrollToTopBtn.classList.add('opacity-100', 'visible', 'scale-100');
       scrollToBottomBtn.classList.add('opacity-0', 'invisible', 'scale-90');
       scrollToBottomBtn.classList.remove('opacity-100', 'visible', 'scale-100');
     }
     // En yukarıdaysa sadece aşağı butonu göster
     else if (scrolled < 100) {
       scrollToBottomBtn.classList.remove('opacity-0', 'invisible', 'scale-90');
       scrollToBottomBtn.classList.add('opacity-100', 'visible', 'scale-100');
       scrollToTopBtn.classList.add('opacity-0', 'invisible', 'scale-90');
       scrollToTopBtn.classList.remove('opacity-100', 'visible', 'scale-100');
     }
     // Ortadaysa ikisini de gizle
     else {
       scrollToTopBtn.classList.add('opacity-0', 'invisible', 'scale-90');
       scrollToBottomBtn.classList.add('opacity-0', 'invisible', 'scale-90');
       scrollToTopBtn.classList.remove('opacity-100', 'visible', 'scale-100');
       scrollToBottomBtn.classList.remove('opacity-100', 'visible', 'scale-100');
     }
   });
   
   // Yukarı çıkma fonksiyonu
   scrollToTopBtn.addEventListener('click', function() {
     window.scrollTo({
       top: 0,
       behavior: 'smooth'
     });
   });
   
   // Aşağı inme fonksiyonu
   scrollToBottomBtn.addEventListener('click', function() {
     window.scrollTo({
       top: document.documentElement.scrollHeight,
       behavior: 'smooth'
     });
   });
 
   // Main Slider Functionality
   const mainSlider = document.getElementById('mainSlider');
   const sliderDots = document.querySelectorAll('.slider-dot');
   const sliderPrevButton = mainSlider?.parentElement?.querySelector('.fa-chevron-left')?.parentElement;
   const sliderNextButton = mainSlider?.parentElement?.querySelector('.fa-chevron-right')?.parentElement;
   let currentSlide = 0;
   let slideInterval;
   const slideCount = 3;
   const autoSlideDelay = 5000; // 5 seconds
 
   function updateSlider() {
     if (!mainSlider) return;
     mainSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
     
     // Update dots
     sliderDots.forEach((dot, index) => {
       if (index === currentSlide) {
         dot.classList.add('bg-white', 'scale-125');
         dot.classList.remove('bg-white/50');
       } else {
         dot.classList.remove('bg-white', 'scale-125');
         dot.classList.add('bg-white/50');
       }
     });
   }
 
   function nextSlide() {
     currentSlide = (currentSlide + 1) % slideCount;
     updateSlider();
   }
 
   function prevSlide() {
     currentSlide = (currentSlide - 1 + slideCount) % slideCount;
     updateSlider();
   }
 
   function startAutoSlide() {
     if (slideInterval) clearInterval(slideInterval);
     slideInterval = setInterval(nextSlide, autoSlideDelay);
   }
 
   function stopAutoSlide() {
     if (slideInterval) {
       clearInterval(slideInterval);
     }
   }
 
   // Event Listeners for Slider
   if (sliderPrevButton && sliderNextButton) {
     sliderPrevButton.addEventListener('click', () => {
       prevSlide();
       stopAutoSlide();
       startAutoSlide();
     });
 
     sliderNextButton.addEventListener('click', () => {
       nextSlide();
       stopAutoSlide();
       startAutoSlide();
     });
   }
 
   sliderDots.forEach((dot, index) => {
     dot.addEventListener('click', () => {
       currentSlide = index;
       updateSlider();
       stopAutoSlide();
       startAutoSlide();
     });
   });
 
   // Start auto sliding
   if (mainSlider) {
     startAutoSlide();
 
     // Pause auto slide on hover
     mainSlider.parentElement.addEventListener('mouseenter', stopAutoSlide);
     mainSlider.parentElement.addEventListener('mouseleave', startAutoSlide);
   }
 
   // Mobile Menu Function
   const mobileMenuButton = document.getElementById('mobile-menu-button');
   const mobileMenu = document.getElementById('mobile-menu');
   let isMenuOpen = false;
 
   if (mobileMenuButton && mobileMenu) {
     const toggleMenu = () => {
       isMenuOpen = !isMenuOpen;
       
       // Icon değişimi
       const icon = mobileMenuButton.querySelector('i');
       icon.classList.remove(isMenuOpen ? 'fa-bars' : 'fa-times');
       icon.classList.add(isMenuOpen ? 'fa-times' : 'fa-bars');
       
       // Menü görünürlüğü
       if (isMenuOpen) {
         mobileMenu.classList.remove('hidden');
         document.body.classList.add('menu-open');
         setTimeout(() => {
           mobileMenu.style.opacity = '1';
           mobileMenu.style.transform = 'translateY(0)';
         }, 10);
       } else {
         mobileMenu.style.opacity = '0';
         mobileMenu.style.transform = 'translateY(-10px)';
         document.body.classList.remove('menu-open');
         setTimeout(() => {
           mobileMenu.classList.add('hidden');
         }, 300);
       }
     };
 
     // Menü butonuna tıklama
     mobileMenuButton.addEventListener('click', (e) => {
       e.stopPropagation();
       toggleMenu();
     });
 
     // Sayfa dışına tıklama ile menüyü kapatma
     document.addEventListener('click', (e) => {
       if (isMenuOpen && !mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
         toggleMenu();
       }
     });
 
     // ESC tuşu ile menüyü kapatma
     document.addEventListener('keydown', (e) => {
       if (e.key === 'Escape' && isMenuOpen) {
         toggleMenu();
       }
     });
 
     // Mobil menü scroll kontrolü
     let touchStartY = 0;
     let touchEndY = 0;
 
     mobileMenu.addEventListener('touchstart', (e) => {
       touchStartY = e.touches[0].clientY;
     }, { passive: true });
 
     mobileMenu.addEventListener('touchmove', (e) => {
       touchEndY = e.touches[0].clientY;
       const scrollTop = mobileMenu.scrollTop;
       const scrollHeight = mobileMenu.scrollHeight;
       const clientHeight = mobileMenu.clientHeight;
       
       // Üstte ve aşağı kaydırma yapmaya çalışıyorsa
       if (scrollTop === 0 && touchEndY > touchStartY) {
         e.preventDefault();
       }
       
       // Altta ve yukarı kaydırma yapmaya çalışıyorsa
       if (scrollTop + clientHeight >= scrollHeight && touchEndY < touchStartY) {
         e.preventDefault();
       }
     }, { passive: false });
 
     // Kopyalama işlevi için tüm butonları seç
     const copyButtons = document.querySelectorAll('.copy-ip, .copy-ip-footer, #copy-ip, #copy-direct');
 
     copyButtons.forEach(button => {
       button.addEventListener('click', function() {
         // En yakın parent elementi bul ve içindeki IP adresini al
         const container = this.closest('div');
         const codeElement = container.querySelector('code');
         
         if (codeElement) {
           // IP adresini kopyala
           navigator.clipboard.writeText(codeElement.textContent.trim())
             .then(() => {
               // Başarılı kopyalama animasyonu
               const originalIcon = this.innerHTML;
               this.innerHTML = '<i class="fas fa-check text-[#d0d334]"></i>';
               
               // 2 saniye sonra orijinal ikona geri dön
               setTimeout(() => {
                 this.innerHTML = originalIcon;
               }, 2000);
             })
             .catch(err => {
               console.error('Kopyalama hatası:', err);
               // Hata durumunda kullanıcıya bildir
               const originalIcon = this.innerHTML;
               this.innerHTML = '<i class="fas fa-times text-red-500"></i>';
               
               setTimeout(() => {
                 this.innerHTML = originalIcon;
               }, 2000);
             });
         }
       });
     });
 
     // Sayfa yüklendiğinde menüyü gizle
     mobileMenu.style.opacity = '0';
     mobileMenu.style.transform = 'translateY(-10px)';
   }
 
   // Smooth Scroll
   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
     anchor.addEventListener('click', function (e) {
       e.preventDefault();
       
       const targetId = this.getAttribute('href');
       const targetElement = document.querySelector(targetId);
       
       if (targetElement) {
         // Close mobile menu if open
         if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
           mobileMenu.classList.add('hidden');
         }
         
         window.scrollTo({
           top: targetElement.offsetTop - 70, // Offset for navbar height
           behavior: 'smooth'
         });
       }
     });
   });
 
   // Navbar Scroll Effect
   const navbar = document.querySelector('nav');
   window.addEventListener('scroll', function() {
     if (window.scrollY > 50) {
       navbar.classList.add('bg-opacity-90', 'backdrop-blur-sm');
       navbar.classList.remove('bg-opacity-100');
     } else {
       navbar.classList.remove('bg-opacity-90', 'backdrop-blur-sm');
       navbar.classList.add('bg-opacity-100');
     }
   });
 
   // Contact Form Handler
   const contactForm = document.getElementById('contact-form');
   if (contactForm) {
     contactForm.addEventListener('submit', async (e) => {
       e.preventDefault();
       
       const formData = {
         name: document.getElementById('name').value,
         email: document.getElementById('email').value,
         subject: document.getElementById('subject').value,
         message: document.getElementById('message').value
       };
 
       try {
         // Here you can make a request to your backend API endpoint
         // Example: const response = await fetch('https://api.eyesroleplay.com/contact', {
         //   method: 'POST',
         //   headers: { 'Content-Type': 'application/json' },
         //   body: JSON.stringify(formData)
         // });
 
         // For now, just log to console
         console.log('Form submitted:', formData);
         alert('Your message has been sent successfully! We will get back to you as soon as possible.');
         contactForm.reset();
       } catch (error) {
         console.error('Form submission error:', error);
         alert('An error occurred while sending your message. Please try again later.');
       }
     });
   }
 
   // Live update for server statistics
   function updateServerStats() {
     // Simulated values instead of connecting to a real API
     const activePlayers = Math.floor(Math.random() * 30) + 70; // 70-100 range
     const maxPlayers = 128;
     const registeredPlayers = 7800 + Math.floor(Math.random() * 200);
     const activePolice = Math.floor(Math.random() * 5) + 12; // 12-17 range
     const activeMedical = Math.floor(Math.random() * 4) + 8; // 8-12 range
     
     // Update statistics
     const statsElements = document.querySelectorAll('.text-primary.font-bold');
     if (statsElements.length >= 4) {
       statsElements[0].textContent = `${activePlayers}/${maxPlayers}`;
       statsElements[1].textContent = `${registeredPlayers.toLocaleString()}+`;
       statsElements[2].textContent = activePolice;
       statsElements[3].textContent = activeMedical;
     }
     
     // Update counter elements on homepage
     const countElements = document.querySelectorAll('.number-counter');
     if (countElements.length >= 2) {
       // Aktif oyuncular sayacını güncelle
       const playerCounter = countElements[0];
       playerCounter.setAttribute('data-target', activePlayers);
       // Kayıtlı kullanıcı sayacını güncelle
       const userCounter = countElements[1];
       userCounter.setAttribute('data-target', registeredPlayers);
     }
   }
   
   // Update statistics at regular intervals
   updateServerStats(); // Initial update
   setInterval(updateServerStats, 10000); // Güncelleme süresini 15 saniyeden 10 saniyeye düşürdüm
   
   // Add parallax effect to hero section
   const heroImage = document.querySelector('#home img');
   if (heroImage) {
     window.addEventListener('scroll', function() {
       const scrollPosition = window.scrollY;
       if (scrollPosition < window.innerHeight) {
         heroImage.style.transform = `translateY(${scrollPosition * 0.4}px)`;
       }
     });
   }
   
   // Add card hover effects
   const cards = document.querySelectorAll('.bg-dark-light');
   cards.forEach(card => {
     card.classList.add('card');
   });
 
   // FAQ Toggle Functionality
   document.querySelectorAll('.faq-btn').forEach(button => {
     button.addEventListener('click', () => {
       const content = button.nextElementSibling;
       const icon = button.querySelector('i');
       
       // Toggle content visibility
       content.classList.toggle('hidden');
       
       // Toggle icon rotation
       icon.classList.toggle('fa-chevron-down');
       icon.classList.toggle('fa-chevron-up');
       
       // Close other open FAQs
       document.querySelectorAll('.faq-btn').forEach(otherButton => {
         if (otherButton !== button) {
           const otherContent = otherButton.nextElementSibling;
           const otherIcon = otherButton.querySelector('i');
           
           otherContent.classList.add('hidden');
           otherIcon.classList.remove('fa-chevron-up');
           otherIcon.classList.add('fa-chevron-down');
         }
       });
     });
   });
 
   // Gallery Functionality
   const filterButtons = document.querySelectorAll('.filter-btn');
   const galleryItems = document.querySelectorAll('.gallery-item');
   const mediaModal = document.getElementById('mediaModal');
   const modalContent = document.getElementById('modalContent');
   const modalCaption = document.getElementById('modalCaption');
   const prevButton = document.getElementById('prevButton');
   const nextButton = document.getElementById('nextButton');
   
   let currentImageIndex = 0;
   let visibleItems = [...galleryItems];
 
   // Function to show image at current index
   const showImage = (index) => {
     const item = visibleItems[index];
     const img = item.querySelector('img');
     const title = item.querySelector('h3');
     const description = item.querySelector('p');
     const type = item.getAttribute('data-type');
     const videoUrl = item.getAttribute('data-video-url');
     
     modalContent.innerHTML = '';
     
     if (type === 'image') {
       const image = document.createElement('img');
       image.src = img.src;
       image.alt = img.alt;
       image.className = 'max-h-[70vh] w-auto object-contain rounded-lg shadow-2xl transition-transform duration-300';
       image.style.opacity = '0';
       modalContent.appendChild(image);
 
       // Add rotation functionality
       let currentRotation = 0;
       const rotateImage = (direction) => {
         currentRotation += direction * 90;
         image.style.transform = `rotate(${currentRotation}deg)`;
       };
 
       // Add keyboard event for rotation
       const handleKeyDown = (e) => {
         if (e.key === 'ArrowUp') {
           rotateImage(-1); // Rotate left
           e.preventDefault();
         } else if (e.key === 'ArrowDown') {
           rotateImage(1); // Rotate right
           e.preventDefault();
         }
       };
 
       document.addEventListener('keydown', handleKeyDown);
 
       // Remove event listener when modal is closed
       const cleanup = () => {
         document.removeEventListener('keydown', handleKeyDown);
       };
       mediaModal.addEventListener('hidden', cleanup, { once: true });
       
       setTimeout(() => {
         image.style.transition = 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out';
         image.style.opacity = '1';
       }, 100);
     } else if (type === 'video' && videoUrl) {
       const iframe = document.createElement('iframe');
       iframe.src = videoUrl;
       iframe.className = 'w-[80vw] aspect-video rounded-lg shadow-2xl';
       iframe.setAttribute('frameborder', '0');
       iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
       iframe.setAttribute('allowfullscreen', '');
       modalContent.appendChild(iframe);
     }
     
     if (title && description) {
       modalCaption.innerHTML = `
         <div class="transform transition-all duration-300 opacity-0 translate-y-4">
           <h3 class="text-xl font-bold text-white mb-2">${title.textContent}</h3>
           <p class="text-gray-300">${description.textContent}</p>
           ${type === 'image' ? '<p class="text-gray-400 text-sm mt-2"><i class="fas fa-arrow-up"></i> <i class="fas fa-arrow-down"></i> Use the up/down arrow keys to rotate </p>' : ''}
         </div>
       `;
       
       setTimeout(() => {
         const captionDiv = modalCaption.querySelector('div');
         captionDiv.style.opacity = '1';
         captionDiv.style.transform = 'translateY(0)';
       }, 200);
     } else {
       modalCaption.innerHTML = '';
     }
 
     // Update navigation buttons visibility
     prevButton.style.visibility = visibleItems.length > 1 ? 'visible' : 'hidden';
     nextButton.style.visibility = visibleItems.length > 1 ? 'visible' : 'hidden';
   };
 
   // Function to navigate to next/previous image
   const navigate = (direction) => {
     const image = modalContent.querySelector('img');
     if (image) {
       image.style.opacity = '0';
       setTimeout(() => {
         currentImageIndex = (currentImageIndex + direction + visibleItems.length) % visibleItems.length;
         showImage(currentImageIndex);
       }, 300);
     } else {
       currentImageIndex = (currentImageIndex + direction + visibleItems.length) % visibleItems.length;
       showImage(currentImageIndex);
     }
   };
 
   // Event listeners for navigation
   if (prevButton) {
     prevButton.addEventListener('click', (e) => {
       e.stopPropagation();
       navigate(-1);
     });
   }
   
   if (nextButton) {
     nextButton.addEventListener('click', (e) => {
       e.stopPropagation();
       navigate(1);
     });
   }
 
   // Keyboard navigation
   document.addEventListener('keydown', (e) => {
     if (mediaModal && !mediaModal.classList.contains('hidden')) {
       if (e.key === 'ArrowLeft') {
         navigate(-1);
         e.preventDefault();
       } else if (e.key === 'ArrowRight') {
         navigate(1);
         e.preventDefault();
       }
     }
   });
 
   // Update visible items when filter changes
   if (filterButtons && filterButtons.length > 0) {
     filterButtons.forEach(button => {
       button.addEventListener('click', () => {
         // Remove active class from all buttons
         filterButtons.forEach(btn => {
           if (btn) {
             btn.classList.remove('active', 'bg-primary', 'text-white');
             btn.classList.add('bg-dark-light', 'hover:bg-primary/20');
           }
         });
         
         // Add active class to clicked button
         button.classList.add('active', 'bg-primary', 'text-white');
         button.classList.remove('bg-dark-light', 'hover:bg-primary/20');
         
         const filter = button.getAttribute('data-filter');
         
         if (filter === 'all') {
           visibleItems = galleryItems ? [...galleryItems] : [];
         } else {
           visibleItems = galleryItems ? [...galleryItems].filter(item => item.getAttribute('data-category') === filter) : [];
         }
 
         if (galleryItems && galleryItems.length > 0) {
           galleryItems.forEach(item => {
             if (item) {
               if (filter === 'all' || item.getAttribute('data-category') === filter) {
                 item.style.display = 'block';
               } else {
                 item.style.display = 'none';
               }
             }
           });
         }
       });
     });
   }
 
   // Gallery item click handler
   if (galleryItems && galleryItems.length > 0) {
     galleryItems.forEach((item, index) => {
       if (item) {
         item.addEventListener('click', () => {
           if (visibleItems && mediaModal) {
             currentImageIndex = visibleItems.indexOf(item);
             showImage(currentImageIndex);
             mediaModal.classList.remove('hidden');
             document.body.style.overflow = 'hidden';
           }
         });
       }
     });
   }
 
   // Close modal functionality with fade out
   const closeModalWithAnimation = () => {
     if (!modalContent || !modalCaption || !mediaModal) return;
     
     const image = modalContent.querySelector('img');
     const captionDiv = modalCaption.querySelector('div');
     
     if (image) {
       image.style.opacity = '0';
     }
     if (captionDiv) {
       captionDiv.style.opacity = '0';
       captionDiv.style.transform = 'translateY(4px)';
     }
     
     setTimeout(() => {
       mediaModal.classList.add('hidden');
       document.body.style.overflow = '';
       modalContent.innerHTML = '';
       modalCaption.innerHTML = '';
     }, 300);
   };
 
   // Close modal when clicking outside content
   if (mediaModal) {
     mediaModal.addEventListener('click', (e) => {
       if (!e.target.closest('#modalContent') && 
           !e.target.closest('#modalCaption') && 
           !e.target.closest('#prevButton') && 
           !e.target.closest('#nextButton')) {
         closeModalWithAnimation();
       }
     });
   }
 
   // Close modal with Escape key
   document.addEventListener('keydown', (e) => {
     if (e.key === 'Escape' && mediaModal && !mediaModal.classList.contains('hidden')) {
       closeModalWithAnimation();
     }
   });
 
   // Prevent modal from closing when clicking inside content
   if (modalContent) {
     modalContent.addEventListener('click', (e) => {
       e.stopPropagation();
     });
   }
 
   // Prevent modal from closing when clicking inside caption
   if (modalCaption) {
     modalCaption.addEventListener('click', (e) => {
       e.stopPropagation();
     });
   }
 
   // Video functionality
   const videoContainers = document.querySelectorAll('.video-container');
   const videoUrls = [
     'https://www.youtube.com/embed/yIXi_0fC3P0?autoplay=1&rel=0',
     'https://www.youtube.com/embed/LI-lh9IooYY?autoplay=1&rel=0'
   ];
 
   if (videoContainers && videoContainers.length > 0) {
     videoContainers.forEach((container, index) => {
       if (container && videoUrls[index]) {
         const iframe = container.querySelector('iframe');
         if (iframe) {
           iframe.src = videoUrls[index];
           
           // Video container'ı tıklanabilir yap
           container.style.cursor = 'pointer';
           
           // Tıklama olayını ekle
           container.addEventListener('click', () => {
             try {
               // Modal oluştur
               const modal = document.createElement('div');
               modal.className = 'fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4';
               
               // Video iframe'ini oluştur
               const videoIframe = document.createElement('iframe');
               videoIframe.src = videoUrls[index];
               videoIframe.className = 'w-full max-w-4xl aspect-video rounded-lg';
               videoIframe.setAttribute('frameborder', '0');
               videoIframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
               videoIframe.setAttribute('allowfullscreen', '');
               
               // Kapatma butonu ekle
               const closeBtn = document.createElement('button');
               closeBtn.className = 'absolute top-4 right-4 text-white text-2xl';
               closeBtn.innerHTML = '<i class="fas fa-times"></i>';
               
               // Modal içeriğini oluştur
               const modalContent = document.createElement('div');
               modalContent.className = 'relative w-full max-w-4xl';
               
               modalContent.appendChild(videoIframe);
               modal.appendChild(modalContent);
               modal.appendChild(closeBtn);
               document.body.appendChild(modal);
               
               // Scroll'u devre dışı bırak
               document.body.style.overflow = 'hidden';
               
               // Kapatma işlevselliği
               const closeModal = () => {
                 modal.remove();
                 document.body.style.overflow = '';
               };
               
               closeBtn.addEventListener('click', closeModal);
               modal.addEventListener('click', (e) => {
                 if (e.target === modal) closeModal();
               });
               
               // ESC tuşu ile kapatma
               const keyHandler = (e) => {
                 if (e.key === 'Escape') {
                   closeModal();
                   document.removeEventListener('keydown', keyHandler);
                 }
               };
               
               document.addEventListener('keydown', keyHandler);
             } catch (error) {
               console.error('Video modal oluşturmada hata:', error);
             }
           });
         }
       }
     });
   }
 
   // Gallery Slider Functions
   const gallerySlider = document.getElementById('gallerySlider');
   const filteredGallery = document.getElementById('filteredGallery');
   let isAnimating = false;
   let sliderControls;
   let autoSlideInterval;
   let totalSlideCount = 0;
 
   function initializeSlider() {
     if (!gallerySlider) return { slideWidth: 0, gap: 0 };
     
     const slides = document.querySelectorAll('#gallerySlider > div');
     if (!slides.length) return { slideWidth: 0, gap: 0 };
     
     // Önce mevcut klonları temizle
     const clones = gallerySlider.querySelectorAll('.clone');
     clones.forEach(clone => clone.remove());
     
     const slideWidth = slides[0].offsetWidth;
     const gap = 24;
     totalSlideCount = slides.length;
     
     // Slider container'ı güncelle
     gallerySlider.style.display = 'flex';
     gallerySlider.style.gap = gap + 'px';
     gallerySlider.style.transition = 'transform 0.5s ease-in-out';
     
     // Minimum 6 slide olacak şekilde kopyala
     const minSlides = 6;
     const repeatCount = Math.ceil(minSlides / slides.length);
     
     // Başa ve sona yeterli sayıda slide ekle
     for (let i = 0; i < repeatCount; i++) {
       slides.forEach(slide => {
         // Sona ekle
         const endClone = slide.cloneNode(true);
         endClone.classList.add('clone');
         gallerySlider.appendChild(endClone);
         
         // Başa ekle
         const startClone = slide.cloneNode(true);
         startClone.classList.add('clone');
         gallerySlider.insertBefore(startClone, gallerySlider.firstChild);
       });
     }
     
     // Başlangıç pozisyonunu ayarla
     const offset = -(totalSlideCount * (slideWidth + gap));
     gallerySlider.style.transform = `translateX(${offset}px)`;
     
     return { slideWidth, gap };
   }
 
   function createInfiniteSlider() {
     const { slideWidth, gap } = initializeSlider();
     if (!slideWidth) return null;
     
     let currentIndex = totalSlideCount; // Başlangıç indeksi
     
     function moveSlider(direction = 1) {
       if (isAnimating) return;
       isAnimating = true;
       
       currentIndex += direction;
       const offset = -(currentIndex * (slideWidth + gap));
       gallerySlider.style.transform = `translateX(${offset}px)`;
       
       // Sonsuz döngü kontrolü
       setTimeout(() => {
         const totalSlides = document.querySelectorAll('#gallerySlider > div').length;
         const resetThreshold = Math.floor(totalSlides / 3);
         
         if (currentIndex >= totalSlides - resetThreshold) {
           currentIndex = totalSlideCount;
           resetSlider();
         } else if (currentIndex <= resetThreshold) {
           currentIndex = totalSlides - totalSlideCount - resetThreshold;
           resetSlider();
         }
         
         isAnimating = false;
       }, 500);
     }
     
     function resetSlider() {
       gallerySlider.style.transition = 'none';
       const offset = -(currentIndex * (slideWidth + gap));
       gallerySlider.style.transform = `translateX(${offset}px)`;
       
       // Force reflow
       gallerySlider.offsetHeight;
       
       setTimeout(() => {
         gallerySlider.style.transition = 'transform 0.5s ease-in-out';
       }, 50);
     }
     
     function startAutoSlide() {
       if (autoSlideInterval) clearInterval(autoSlideInterval);
       autoSlideInterval = setInterval(() => moveSlider(1), 3000);
     }
     
     function stopAutoSlide() {
       if (autoSlideInterval) {
         clearInterval(autoSlideInterval);
         autoSlideInterval = null;
       }
     }
     
     // Touch events
     let touchStartX = 0;
     let touchEndX = 0;
     let isSwiping = false;
     
     if (gallerySlider) {
       gallerySlider.addEventListener('touchstart', (e) => {
         touchStartX = e.touches[0].clientX;
         isSwiping = true;
         stopAutoSlide();
       }, { passive: true });
       
       gallerySlider.addEventListener('touchmove', (e) => {
         if (!isSwiping) return;
         
         touchEndX = e.touches[0].clientX;
         const diff = touchEndX - touchStartX;
         
         // Dokunmatik kaydırma animasyonu
         if (Math.abs(diff) > 20) {
           const currentOffset = -(currentIndex * (slideWidth + gap));
           gallerySlider.style.transform = `translateX(${currentOffset + diff}px)`;
         }
       }, { passive: true });
       
       gallerySlider.addEventListener('touchend', () => {
         if (!isSwiping) return;
         
         const diff = touchEndX - touchStartX;
         if (Math.abs(diff) > 50) {
           moveSlider(diff > 0 ? -1 : 1);
         } else {
           // Geri al
           resetSlider();
         }
         
         isSwiping = false;
         startAutoSlide();
       });
       
       gallerySlider.addEventListener('touchcancel', () => {
         if (isSwiping) {
           resetSlider();
           isSwiping = false;
           startAutoSlide();
         }
       });
     }
     
     // Mouse events
     let isMouseDown = false;
     let mouseStartX = 0;
     let mouseEndX = 0;
     
     if (gallerySlider) {
       gallerySlider.addEventListener('mousedown', (e) => {
         isMouseDown = true;
         mouseStartX = e.clientX;
         stopAutoSlide();
         gallerySlider.style.cursor = 'grabbing';
       });
       
       gallerySlider.addEventListener('mousemove', (e) => {
         if (!isMouseDown) return;
         
         mouseEndX = e.clientX;
         const diff = mouseEndX - mouseStartX;
         
         // Mouse kaydırma animasyonu
         if (Math.abs(diff) > 20) {
           const currentOffset = -(currentIndex * (slideWidth + gap));
           gallerySlider.style.transform = `translateX(${currentOffset + diff}px)`;
         }
       });
       
       gallerySlider.addEventListener('mouseup', () => {
         if (!isMouseDown) return;
         
         const diff = mouseEndX - mouseStartX;
         if (Math.abs(diff) > 50) {
           moveSlider(diff > 0 ? -1 : 1);
         } else {
           resetSlider();
         }
         
         isMouseDown = false;
         gallerySlider.style.cursor = '';
         startAutoSlide();
       });
       
       gallerySlider.addEventListener('mouseleave', () => {
         if (isMouseDown) {
           resetSlider();
           isMouseDown = false;
           gallerySlider.style.cursor = '';
           startAutoSlide();
         }
       });
       
       gallerySlider.addEventListener('mouseenter', stopAutoSlide);
       gallerySlider.addEventListener('mouseleave', startAutoSlide);
     }
     
     // Keyboard events
     document.addEventListener('keydown', (e) => {
       if (e.key === 'ArrowLeft') moveSlider(-1);
       if (e.key === 'ArrowRight') moveSlider(1);
     });
     
     // Window focus/blur events
     window.addEventListener('focus', startAutoSlide);
     window.addEventListener('blur', stopAutoSlide);
     
     return { startAutoSlide, stopAutoSlide, moveSlider, resetSlider };
   }
 
   // Gallery sayfasında olup olmadığımızı kontrol et
   function isGalleryPage() {
     return window.location.pathname.includes('gallery.html');
   }
 
   // Sayfa yüklendiğinde veya gallery kategorisine girildiğinde slider'ı başlat
   function initializeGallerySection() {
     if (!isGalleryPage()) return;
     
     const activeFilter = document.querySelector('.filter-btn.active');
     
     if (activeFilter && activeFilter.getAttribute('data-filter') === 'all') {
       if (gallerySlider) {
         gallerySlider.parentElement.classList.remove('hidden');
       }
       if (filteredGallery) {
         filteredGallery.classList.add('hidden');
       }
       if (!sliderControls) {
         sliderControls = createInfiniteSlider();
         if (sliderControls) {
           sliderControls.startAutoSlide();
         }
       }
     }
   }
 
   // Filter functionality
   filterButtons.forEach(button => {
     button.addEventListener('click', () => {
       // Remove active class from all buttons
       filterButtons.forEach(btn => {
         btn.classList.remove('active', 'bg-primary', 'text-white');
         btn.classList.add('bg-dark-light', 'hover:bg-primary/20');
       });
       
       // Add active class to clicked button
       button.classList.add('active', 'bg-primary', 'text-white');
       button.classList.remove('bg-dark-light', 'hover:bg-primary/20');
       
       const filter = button.getAttribute('data-filter');
       
       if (filter === 'all') {
         if (gallerySlider) {
           gallerySlider.parentElement.classList.remove('hidden');
         }
         if (filteredGallery) {
           filteredGallery.classList.add('hidden');
         }
         if (!sliderControls) {
           sliderControls = createInfiniteSlider();
         }
         if (sliderControls) {
           sliderControls.startAutoSlide();
         }
       } else {
         if (gallerySlider) {
           gallerySlider.parentElement.classList.add('hidden');
         }
         if (filteredGallery) {
           filteredGallery.classList.remove('hidden');
         }
         if (sliderControls) {
           sliderControls.stopAutoSlide();
         }
         
         const galleryItems = document.querySelectorAll('.gallery-item');
         galleryItems.forEach(item => {
           if (item.getAttribute('data-category') === filter) {
             item.style.display = 'block';
           } else {
             item.style.display = 'none';
           }
         });
       }
     });
   });
 
   window.addEventListener('resize', () => {
     if (isGalleryPage() && sliderControls) {
       sliderControls.stopAutoSlide();
       sliderControls = createInfiniteSlider();
       if (sliderControls) {
         sliderControls.startAutoSlide();
       }
     }
   });
 
   function loadResponsiveImages() {
     const images = document.querySelectorAll('img[data-src]');
     images.forEach(img => {
       if (window.innerWidth <= 768) {
         img.src = img.getAttribute('data-src-mobile') || img.getAttribute('data-src');
       } else {
         img.src = img.getAttribute('data-src');
       }
       img.removeAttribute('data-src');
       img.removeAttribute('data-src-mobile');
     });
   }
 
   let resizeTimeout;
   window.addEventListener('resize', () => {
     clearTimeout(resizeTimeout);
     resizeTimeout = setTimeout(() => {
       loadResponsiveImages();
       updateLayoutOnResize();
     }, 250);
   });
 
   function updateLayoutOnResize() {
     const isMobile = window.innerWidth <= 768;
     const sections = document.querySelectorAll('section');
     
     sections.forEach(section => {
       if (isMobile) {
         section.classList.add('mobile-container');
       } else {
         section.classList.remove('mobile-container');
       }
     });
   }

   document.addEventListener('DOMContentLoaded', () => {
     loadResponsiveImages();
     updateLayoutOnResize();
   });
 
   const progressBars = document.querySelectorAll('.progress-line');
   
   progressBars.forEach(bar => {
     const length = bar.getTotalLength();

     bar.style.strokeDasharray = length;
     bar.style.strokeDashoffset = length;

     setTimeout(() => {
       bar.style.transition = 'stroke-dashoffset 2s ease-out';
       bar.style.strokeDashoffset = '0';
     }, 100);
   });
 
   document.addEventListener('DOMContentLoaded', () => {
     AOS.init({
       duration: 800,
       easing: 'ease-in-out',
       once: true,
       mirror: false,
       disable: window.innerWidth < 768
     });
 
     animateNumbers();
 
     setInterval(animateNumbers, 10000);
   });
 
   function setMobileHeight() {
     let vh = window.innerHeight * 0.01;
     document.documentElement.style.setProperty('--vh', `${vh}px`);
   }

   setMobileHeight();

   window.addEventListener('resize', () => {
     setMobileHeight();
   });
 
   const legalDropdown = document.querySelector('.group .absolute');
   if (legalDropdown) {
     const currentUrl = window.location.href.toLowerCase();
     const isLegalPage = currentUrl.includes('terms.html') || 
                          currentUrl.includes('privacy.html') || 
                          currentUrl.includes('rules.html');
     
     if (isLegalPage) {
       legalDropdown.classList.remove('opacity-0', 'invisible', 'translate-y-2');
       legalDropdown.classList.add('opacity-100', 'visible', 'translate-y-0');
       const legalGroup = document.querySelector('.group');
       if (legalGroup) {
         legalGroup.classList.add('active-dropdown');
       }
     }
   }
 });
