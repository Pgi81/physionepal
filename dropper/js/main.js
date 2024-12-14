


// ============= WINDOW SECTION OBSERVER =======
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible'); // Add 'visible' class when in viewport
    }
  });
}, { threshold: 0.1 }); // Trigger when 10% of the section is visible

// Select all sections and observe them
document.querySelectorAll('.section').forEach((section) => observer.observe(section));




// Get the URL parameters
// const urlParams = new URLSearchParams(window.location.search);
// const myParam = urlParams.get('paramName'); // Replace 'paramName' with your parameter key

// // Check the parameter value and redirect if it matches
// if (myParam === 'acceptedValue') { // Replace 'acceptedValue' with your desired value
//     window.location.href = 'https://example.com/target-page'; // Replace with your target URL
// }
// // Get URL parameters dynamically
// const para = new URLSearchParams(window.location.search);

// // Check if a specific parameter exists
// for (const [key, value] of para.entries()) {
//     if (value === 'acceptedValue') { // Replace 'acceptedValue' with your criteria
//         // Redirect dynamically based on the parameter
//         window.location.href = `https://example.com/${key}-${value}`; // Use the key-value pair for redirection
//         break; // Stop further checks if a match is found
//     }
// }



//================DATE & TIME UPDATION CODE======================


let currentLanguage = 'en'; // Default language
const languages = {
  en: {
    months: [],
    days: [],
    format: { month: 'long', day: '2-digit', year: 'numeric' },
    time: { hour: '2-digit', minute: '2-digit', hour12: true },
    day: { weekday: 'long' }
  },
  ne: {
    months: ['जनवरी', 'फेब्रुअरी', 'मार्च', 'एप्रिल', 'मे', 'जून', 'जुलाई', 'अगस्ट', 'सेप्टेम्बर', 'अक्टोबर', 'नवम्बर', 'दिसम्बर'],
    days: ['आइतवार', 'सोमवार', 'मंगलवार', 'बुधबार', 'बिहीवार', 'शुक्रवार', 'शनिवार']
  }
};
function changeLanguage(language) {
  currentLanguage = language;
  document.getElementById("languageDropdown").innerText = language === 'en' ? 'ENG' : 'NEP';
  updateDateTime();
}
function updateDateTime() {
  const now = new Date();

  if (currentLanguage === 'en') {
    const enFormat = languages.en;
    document.getElementById('date').innerText = now.toLocaleDateString('en-US', enFormat.format);
    document.getElementById('time-day').innerText = `${now.toLocaleTimeString('en-US', enFormat.time)} / ${now.toLocaleDateString('en-US', enFormat.day)}`;
  } else if (currentLanguage === 'ne') {
    const neFormat = languages.ne;
    const nepaliDate = `${now.getDate()} ${neFormat.months[now.getMonth()]} ${now.getFullYear()}`;
    const nepaliTime = now.toLocaleTimeString('ne-NP', languages.en.time);
    const nepaliDay = neFormat.days[now.getDay()];
    document.getElementById('date').innerText = nepaliDate;
    document.getElementById('time-day').innerText = `${nepaliTime} / ${nepaliDay}`;
  }
}
setInterval(updateDateTime, 1000);
updateDateTime();


//============ CART FUNCTIONALITY ===================

// Sample Cart Data
let cartData = [
  { name: "Growers cider", description: "Brief description", price: 12, quantity: 1 },
  { name: "Fresh grapes", description: "Brief description", price: 8, quantity: 1 },
  { name: "Heinz tomato ketchup", description: "Brief description", price: 5, quantity: 1 }
];
function loadCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');
  const cartCountElement = document.getElementById('cart-count');

  cartItemsContainer.innerHTML = '';
  let total = 0;

  cartData.forEach(item => {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item d-flex justify-content-between lh-sm';
    listItem.innerHTML = `
            <div>
              <h6 class="my-0">${item.name}</h6>
              <small class="text-body-secondary">${item.description}</small>
              <div>Quantity: ${item.quantity}</div>
            </div>
            <span class="text-body-secondary">$${item.price * item.quantity}</span>
            <button class="btn btn-sm btn-danger ms-2" onclick="removeFromCart('${item.name}')">Remove</button>
            <button class="btn btn-sm btn-info ms-2" onclick="updateQuantity('${item.name}', ${item.quantity + 1})">+</button>
            <button class="btn btn-sm btn-info ms-2" onclick="updateQuantity('${item.name}', ${item.quantity - 1})">-</button>
          `;
    cartItemsContainer.appendChild(listItem);
    total += item.price * item.quantity;
  });

  cartTotalElement.textContent = `$${total}`;
  cartCountElement.textContent = cartData.length;
}
function addToCart(item) {
  cartData.push(item);
  loadCart();  // Re-render cart after adding the item
}
function removeFromCart(itemName) {
  cartData = cartData.filter(item => item.name !== itemName);
  loadCart();  // Re-render cart after removing the item
}
function updateQuantity(itemName, newQuantity) {
  const item = cartData.find(item => item.name === itemName);
  if (item && newQuantity > 0) {
    item.quantity = newQuantity;
    loadCart();  // Re-render cart after updating the quantity
  }
}
document.getElementById('checkout-btn').addEventListener('click', () => {
  alert('Proceeding to checkout!');
});
addToCart({ name: "Orange Juice", description: "Freshly squeezed", price: 5, quantity: 1 });
// Initialize Cart
loadCart();



//================DROMPDOWN CODE FOR SEARCH ITEM=====================

// // Array of data for the options
// const optionsData = [
//   { id: "assessmentMuscoOrth", label: "Assessment Tools", subLabel: "Musco/Ortho Physio", category: "Musco/Ortho Physio" },
//   { id: "treatTabSpanMuscoOrth", label: "Treatment Tables & Spanport", subLabel: "Musco/Ortho Physio", category: "Musco/Ortho Physio" },
//   { id: "manualToolsMuscoOrth", label: "Manual Therapy Tools", subLabel: "Musco/Ortho Physio", category: "Musco/Ortho Physio" },
//   { id: "exerciseEquipMuscoOrtho", label: "Exercise Equipment", subLabel: "Musco/Ortho Physio", category: "Musco/Ortho Physio" },
//   { id: "tracSpiDecomMuscoOrtho", label: "Traction and Spinal Decompression", subLabel: "Musco/Ortho Physio", category: "Musco/Ortho Physio" },
//   { id: "SpanMaterBraceMuscoOrtho", label: "Spanport Materials and Bracing", subLabel: "Musco/Ortho Physio", category: "Musco/Ortho Physio" },
//   { id: "BalanceCoordNeuro", label: "Balance and Coordination Equipment", subLabel: "Neuro Physio", category: "Neuro Physio" },
//   { id: "gaitMobilTrainNeuro", label: "Gait and Mobility Training", subLabel: "Neuro Physio", category: "Neuro Physio" },
//   { id: "assesmentNeuro", label: "Neurological Assessment Tools", subLabel: "Neuro Physio", category: "Neuro Physio" },
//   { id: "sensorIntegNeuro", label: "Sensory Integration Equipment", subLabel: "Neuro Physio", category: "Neuro Physio" },
//   { id: "musculeTrainNeuro", label: "Neuromuscular Training", subLabel: "Neuro Physio", category: "Neuro Physio" },
//   { id: "monitorCardioRespi", label: "Monitoring Equipment", subLabel: "Cardiorespi Physio", category: "Cardiorespi Physio" },
//   { id: "exerciseCardioRespi", label: "Exercise Equipment", subLabel: "Cardiorespi Physio", category: "Cardiorespi Physio" },
//   { id: "respiEquipCardioRespi", label: "Respiratory Equipment", subLabel: "Cardiorespi Physio", category: "Cardiorespi Physio" },
//   { id: "assesmentCardioRespi", label: "Assessment Tools", subLabel: "Cardiorespi Physio", category: "Cardiorespi Physio" },
//   { id: "developMotorSkillPediatric", label: "Development and Motor Skills", subLabel: "Pediatric Physio", category: "Pediatric Physio" },
//   { id: "sensorPediatric", label: "Sensory Equipment", subLabel: "Pediatric Physio", category: "Pediatric Physio" },
//   { id: "mobilEquipPediatric", label: "Mobility Equipment", subLabel: "Pediatric Physio", category: "Pediatric Physio" },
//   { id: "assesmantPediatric", label: "Assessment Tools", subLabel: "Pediatric Physio", category: "Pediatric Physio" },
//   { id: "assesmentSports", label: "Assessment Tools", subLabel: "Sports Physio", category: "Sports Physio" },
//   { id: "trainRehabSports", label: "Training and Rehabilitation", subLabel: "Sports Physio", category: "Sports Physio" },
//   { id: "recovPrevSports", label: "Recovery and Prevention", subLabel: "Sports Physio", category: "Sports Physio" },
//   { id: "pelvicEquipWomenH", label: "Pelvic Floor Equipment", subLabel: "Women's Health Physio", category: "Women's Health Physio" },
//   { id: "pregPostNatalWomenH", label: "Pregnancy and Post-natal", subLabel: "Women's Health Physio", category: "Women's Health Physio" },
//   { id: "treatAssesmentWomenH", label: "Treatment and Assessment", subLabel: "Women's Health Physio", category: "Women's Health Physio" },
//   { id: "workInjurPrevManageOccup", label: "Workplace Injury Prevention and Management", subLabel: "Occupational Health Physio", category: "Occupational Health Physio" },
//   { id: "ergonoAssesAdvOccup", label: "Ergonomic Assessment & Advice", subLabel: "Occupational Health Physio", category: "Occupational Health Physio" },
//   { id: "RtwPrgOccup", label: "Return-to-work Programs", subLabel: "Occupational Health Physio", category: "Occupational Health Physio" },
//   { id: "manualHandgTrainOccup", label: "Manual Handling Training", subLabel: "Occupational Health Physio", category: "Occupational Health Physio" },
//   { id: "WorkAssesOccup", label: "Workplace Assessment", subLabel: "Occupational Health Physio", category: "Occupational Health Physio" },
//   { id: "treatBalanDisoVesti", label: "Treatment of Balance Disorders", subLabel: "Vestibular Health Physio", category: "Vestibular Health Physio" },
//   { id: "vertiManageVesti", label: "Vertigo Management", subLabel: "Vestibular Health Physio", category: "Vestibular Health Physio" },
//   { id: "innEarCondVesti", label: "Inner Ear Conditions", subLabel: "Vestibular Health Physio", category: "Vestibular Health Physio" },
//   { id: "dizAssTreatVesti", label: "Dizziness Assessment & Treatment", subLabel: "Vestibular Health Physio", category: "Vestibular Health Physio" },
//   { id: "hotManual", label: "Hands-on Treatment Techniques", subLabel: "Manual Therapy", category: "Manual Therapy" },
//   { id: "joinMobilManipManual", label: "Joint Mobilization & Manipulation", subLabel: "Manual Therapy", category: "Manual Therapy" },
//   { id: "sofTissTechqManual", label: "Soft Tissue Techniques", subLabel: "Manual Therapy", category: "Manual Therapy" },
//   { id: "myofasRelsManual", label: "MyoFascial Release", subLabel: "Manual Therapy", category: "Manual Therapy" },
//   { id: "spinManipManual", label: "Spinal Manipulation", subLabel: "Manual Therapy", category: "Manual Therapy" },
//   { id: "canRelRehabOnco", label: "Cancer Related Rehabilitation", subLabel: "Oncology Physio", category: "Oncology Physio" },
//   { id: "posSurgiRecovOnco", label: "Post Surgical Recovery", subLabel: "Oncology Physio", category: "Oncology Physio" },
//   { id: "lypdemaManageOnco", label: "Lymphedema Management", subLabel: "Oncology Physio", category: "Oncology Physio" },
//   { id: "panManageOnco", label: "Pain Management", subLabel: "Oncology Physio", category: "Oncology Physio" },
//   { id: "exerPrgOnco", label: "Exercise Programs", subLabel: "Oncology Physio", category: "Oncology Physio" },
//   { id: "treatBunBurnNWounCare", label: "Treatment of Burns", subLabel: "Burns & Wound Care Physio", category: "Burns & Wound Care Physio" },
//   { id: "wounHealBunNWouncare", label: "Wound Healing", subLabel: "Burns & Wound Care Physio", category: "Burns & Wound Care Physio" },
//   { id: "skrManageBunNWounCare", label: "Scar Management", subLabel: "Burns & Wound Care Physio", category: "Burns & Wound Care Physio" },
//   { id: "rngMotonMainBunNWounCare", label: "Range of Motion Maintenance", subLabel: "Burns & Wound Care Physio", category: "Burns & Wound Care Physio" },
//   { id: "CompreTheraBunNWounCare", label: "Compression Therapy", subLabel: "Burns & Wound Care Physio", category: "Burns & Wound Care Physio" },
//   { id: "agngConGeria", label: "Aging Conditions", subLabel: "Geriatric Physio", category: "Geriatric Physio" },
//   { id: "balanNFalPrevGeria", label: "Balance & Fall Prevention", subLabel: "Geriatric Physio", category: "Geriatric Physio" },
//   { id: "osteoManagGeria", label: "Osteoporosis Management", subLabel: "Geriatric Physio", category: "Geriatric Physio" },
//   { id: "agRelMobilIssueGeria", label: "Age-related Mobility Issues", subLabel: "Geriatric Physio", category: "Geriatric Physio" },
//   { id: "arthtisManageGeria", label: "Arthritis Management", subLabel: "Geriatric Physio", category: "Geriatric Physio" },
//   { id: "respiEquipCriticIcu", label: "Respiratory Equipment", subLabel: "Critical/ICU Physio", category: "Critical/ICU Physio" },
//   { id: "mobilEquipCriticIcu", label: "Mobility Equipments", subLabel: "Critical/ICU Physio", category: "Critical/ICU Physio" },
//   { id: "monitorCriticIcu", label: "Monitoring Equipments", subLabel: "Critical/ICU Physio", category: "Critical/ICU Physio" },
//   { id: "positioningCriticIcu", label: "Positioning Equipments", subLabel: "Critical/ICU Physio", category: "Critical/ICU Physio" },
//   { id: "electroTheraSpecial", label: "Electrotherapy Equipment", subLabel: "Specialized Physio", category: "Specialized Physio" },
//   { id: "aquaticTheraSpecial", label: "Aquatic Therapy Equipment", subLabel: "Specialized Physio", category: "Specialized Physio" },
//   { id: "documentEduSpecial", label: "Documentation and Education", subLabel: "Specialized Physio", category: "Specialized Physio" },
//   { id: "infectContSafeSpecial", label: "Infection Control and Safety", subLabel: "Specialized Physio", category: "Specialized Physio" }
// ];
// // Function to render the options dynamically
// const renderOptions = () => {
//   const container = document.getElementById('custom-options-container');
//   optionsData.forEach(option => {
//     const div = document.createElement('div');
//     div.id = option.id;
//     div.classList.add('custom-option');
//     div.dataset.info = option.category;
//     div.innerHTML = `${option.label} <span class="sup">${option.subLabel}</span>`;
//     container.appendChild(div);
//   });
// };
// // Render the options when the page loads
// renderOptions();
// // Dropdown toggle functionality
// const selectBtn = document.querySelector('.custom-select-btn');
// const customOptions = document.querySelector('.custom-options');
// selectBtn.addEventListener('click', function () {
//   customOptions.style.display = customOptions.style.display === 'block' ? 'none' : 'block';
// });
// // Handle option selection and navigate to corresponding URL
// document.querySelectorAll('.custom-options div').forEach(option => {
//   option.addEventListener('click', function () {
//     const selectedId = this.id;
//     window.location.href = `dropper/link?id=${selectedId}`;
//   });
// });
// // Close dropdown if mouse leaves the custom options
// customOptions.addEventListener('mouseout', function () {
//   customOptions.style.display = 'none';
// });
// // Keep the dropdown open if mouse is over the options
// customOptions.addEventListener('mouseover', function () {
//   customOptions.style.display = 'block';
// });


//============== ADVERTISEMENT BANNER SCRIPTS ===============

// Function to update the countdown timer
function updateCountdown() {
  const endDate = new Date('2024-12-18T00:00:00'); // Set your target date
  const now = new Date();
  const timeLeft = endDate - now;

  if (timeLeft <= 0) {
    document.getElementById('countdown').innerHTML = "Time's up!";
    return;
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  document.getElementById('countdown').innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
setInterval(updateCountdown, 1000); // Update every second
updateCountdown(); // Run the function once to display the initial countdown
// Close button functionality with fade-out effect
document.getElementById('close-btn').addEventListener('click', function () {
  const advertisement = document.getElementById('advertisement');
  advertisement.style.transition = 'opacity 0.5s ease';
  advertisement.style.opacity = '0';
  setTimeout(() => advertisement.style.display = 'none', 500); // Hide after fade
});
// Auto-hide advertisement after 5 seconds
setTimeout(function () {
  const advertisement = document.getElementById('advertisement');
  advertisement.style.transition = 'opacity 0.5s ease';
  advertisement.style.opacity = '0';
  setTimeout(() => advertisement.style.display = 'none', 500); // Hide after fade
}, 3000); // 5000 milliseconds = 5 seconds



//============== SWIPER FUNCTIONALITY ===============


// Sample product data
const swiperProducts = [
  {
    href: "https://rukminim2.flixcart.com/image/416/416/xif0q/electrotherapy/s/r/5/digital-mini-tens-nerve-stimulator-2-channel-electrotherapy-original-imagn6ztqzbzkeqx.jpeg?q=70&crop=false",
    price: "$49.99",
    name: "TENS (Duo Channel)",
    deliveryTime: "2/3 Days",
    discount: "20% per 10 pieces",
    color: "Red, Blue",
    stock: 25,
    returnAvailable: "Available",
    sizeWeight: "5X10X3 / 5gm",
    guarantee: "Available",
    cashOnDelivery: "Available",
    deliveryCharge: "150 NPR",
    sellerDetails: "SR-G24-H189",
    image: "https://rukminim2.flixcart.com/image/416/416/xif0q/electrotherapy/s/r/5/digital-mini-tens-nerve-stimulator-2-channel-electrotherapy-original-imagn6ztqzbzkeqx.jpeg?q=70&crop=false"
  },
  {
    href: "https://s.alicdn.com/@sc04/kf/HTB1xHrKcyAnBKNjSZFvq6yTKXXav.jpg_720x720q50.jpg",
    price: "$59.99",
    name: "EMS (Electronic Muscle Simulator)",
    deliveryTime: "2/3 Days",
    discount: "15% per 5 pieces",
    color: "Black",
    stock: 10,
    returnAvailable: "Not Available",
    sizeWeight: "8X12X5 / 10gm",
    guarantee: "Not Available",
    cashOnDelivery: "Available",
    deliveryCharge: "200 NPR",
    sellerDetails: "SR-G24-H199",
    image: "https://s.alicdn.com/@sc04/kf/HTB1xHrKcyAnBKNjSZFvq6yTKXXav.jpg_720x720q50.jpg"
  }
  // Add more products as needed
];
// Function to generate swiper slides
function generateProductSlides(swiperProducts) {
  const swiperWrapper = document.getElementById('product-swiper-wrapper');

  // Clear any existing slides before appending new ones
  swiperWrapper.innerHTML = '';

  // Loop through the swiperProducts and create HTML for each
  swiperProducts.forEach(swiperProduct => {
    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide');

    swiperSlide.innerHTML = `
        <a href="${swiperProduct.href}" class="product-container">
          <!-- Left Specifications -->
          <div class="spec-container">
            <div class="spec-item">Price: ${swiperProduct.price}</div>
            <div class="spec-item">Name: ${swiperProduct.name}</div>
            <div class="spec-item">Delivery Time: ${swiperProduct.deliveryTime}</div>
            <div class="spec-item">Discount: ${swiperProduct.discount}</div>
            <div class="spec-item">Color: ${swiperProduct.color}</div>
            <div class="spec-item">Stock: ${swiperProduct.stock}</div>
          </div>
  
          <!-- Product Image -->
          <img src="${swiperProduct.image}" alt="${swiperProduct.name}" class="product-img">
  
          <!-- Right Specifications -->
          <div class="spec-container">
            <div class="spec-item">Return: ${swiperProduct.returnAvailable}</div>
            <div class="spec-item">Size/Weight: ${swiperProduct.sizeWeight}</div>
            <div class="spec-item">Guarantee: ${swiperProduct.guarantee}</div>
            <div class="spec-item">Cash on Delivery: ${swiperProduct.cashOnDelivery}</div>
            <div class="spec-item">Delivery Charge: ${swiperProduct.deliveryCharge}</div>
            <div class="spec-item">Seller Details: ${swiperProduct.sellerDetails}</div>
          </div>
        </a>
      `;

    // Append each product slide to the swiper wrapper
    swiperWrapper.appendChild(swiperSlide);
  });
}
// Call the function to generate the slides
generateProductSlides(swiperProducts);
// Initialize Swiper after slides are generated
const swiper = new Swiper('.swiper', {
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  effect: 'slide',
});


//======================================================||========================================================||
//============================================= WHOLE DYNAMIC PRODUCT  GRENERATOR ================================||
//======================================================||========================================================||
// ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓||






//============ Electrotherapy Product-grid Function  ===========
const electroProduct = [
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://rukminim2.flixcart.com/image/416/416/xif0q/electrotherapy/s/r/5/digital-mini-tens-nerve-stimulator-2-channel-electrotherapy-original-imagn6ztqzbzkeqx.jpeg?q=70&crop=false",
    imageSrc: "https://rukminim2.flixcart.com/image/416/416/xif0q/electrotherapy/s/r/5/digital-mini-tens-nerve-stimulator-2-channel-electrotherapy-original-imagn6ztqzbzkeqx.jpeg?q=70&crop=false",
    title: "TENS (Duo channel)",
     alt:"The TENS (Transcutaneous Electrical Nerve Stimulation) device, particularly the Duo Channel model, is known by various alternative names across countries and languages. Common names include **Nerve Stimulator**, **Pain Relief Machine**, and **Electric Nerve Stimulator**. In medical and professional circles, it may be referred to as **Electrotherapy Device**, **Neuromuscular Stimulator**, or **Electroanalgesia Unit**. In specific regions, localized terms are used, such as **Électrostimulateur Nerveux** (French), **Elektrostimulationsgerät** (German), **Estimulador Eléctrico** (Spanish), **刺激电疗仪** (Chinese), **Электростимулятор** (Russian), and **Terapia Elétrica de Estímulo Nervoso** (Portuguese). Other technical names include **Dual Channel EMS (Electrical Muscle Stimulation) Unit**, **Biphasic Stimulator**, and **Multifunction Electrotherapy Apparatus**. These names reflect the device's dual functionality for nerve and muscle stimulation in pain management and rehabilitation.",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://5.imimg.com/data5/SELLER/Default/2020/10/WZ/UN/IZ/74736160/15-1000x1000.jpg",
    imageSrc: "https://5.imimg.com/data5/SELLER/Default/2020/10/WZ/UN/IZ/74736160/15-1000x1000.jpg",
    title: "TENS (quad-Channel)",
     alt:"The TENS (Transcutaneous Electrical Nerve Stimulation) Quad-Channel device is known by several alternative names across languages and regions. Common names include **Quad-Channel Nerve Stimulator**, **Advanced Pain Relief Machine**, and **Four-Channel TENS Unit**. In professional and clinical contexts, it is often called **Electrotherapy Quad Device**, **Multichannel Neuromuscular Stimulator**, or **Electroanalgesia Quad Unit**. Localized terms include **Électrostimulateur Quadruple** (French), **Vierkanal-Elektrostimulationsgerät** (German), **Estimulador Eléctrico de Cuatro Canales** (Spanish), **四通道电刺激仪** (Chinese), **Четырёхканальный Электростимулятор** (Russian), and **Aparelho de Estimulação Nervosa de Quatro Canais** (Portuguese). Additional technical names include **Four-Channel EMS Unit**, **Multifunction Quad Electrotherapy Device**, and **Biphasic Quad Stimulator**. These names emphasize the device's capability to manage multiple electrode sets simultaneously, offering broader and more targeted pain relief or muscle stimulation.",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://m.media-amazon.com/images/I/41hxndxf1PL._SX300_SY300_QL70_FMwebp_.jpg",
    imageSrc: "https://m.media-amazon.com/images/I/41hxndxf1PL._SX300_SY300_QL70_FMwebp_.jpg",
    title: "Ultrasound(1 & 3 MHz)",
     alt:"The Ultrasound Therapy device (1 & 3 MHz) is known by various names worldwide, reflecting its purpose and professional usage. Commonly, it is called **Ultrasound Machine**, **Therapeutic Ultrasound Device**, or **Physiotherapy Ultrasound Unit**. In clinical and technical terms, it is often referred to as **Ultrasonic Therapy Equipment**, **Low-Frequency Ultrasound Device**, or **Deep Tissue Ultrasound Stimulator**. Regional terms include **Appareil à Ultrasons Thérapeutiques** (French), **Ultraschalltherapiegerät** (German), **Dispositivo de Ultrasonido Terapéutico** (Spanish), **超声波理疗仪** (Chinese), **Ультразвуковой Терапевтический Аппарат** (Russian), and **Aparelho de Ultrassom Terapêutico** (Portuguese). Other professional names include **1 & 3 MHz Ultrasound Therapy Unit**, **Bimodal Ultrasonic Device**, and **Ultrasonic Physiotherapy Apparatus**. These names highlight the dual-frequency functionality, allowing for both superficial (1 MHz) and deep tissue (3 MHz) treatment applications.",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://s.alicdn.com/@sc04/kf/HTB1xHrKcyAnBKNjSZFvq6yTKXXav.jpg_720x720q50.jpg",
    imageSrc: "https://s.alicdn.com/@sc04/kf/HTB1xHrKcyAnBKNjSZFvq6yTKXXav.jpg_720x720q50.jpg",
    title: "EMS",
     alt:"The EMS (Electrical Muscle Stimulation) device is known by numerous alternative names worldwide, depending on its use and audience. Commonly, it is called **Muscle Stimulator**, **Electric Muscle Trainer**, or **Electronic Muscle Stimulator**. In medical and professional settings, it is referred to as **Neuromuscular Electrical Stimulator (NMES)**, **Rehabilitation Stimulator**, or **Electrotherapy Muscle Unit**. Regional variations include **Stimulateur Musculaire Électrique** (French), **Elektromuskelstimulationsgerät** (German), **Estimulador Muscular Eléctrico** (Spanish), **电刺激肌肉仪** (Chinese), **Электростимулятор Мышц** (Russian), and **Aparelho de Estimulação Muscular** (Portuguese). More technical names include **EMS Therapy Unit**, **Electrostimulation Training Device**, and **Functional Electrical Stimulation (FES) System**. These names reflect the device’s versatility in muscle training, rehabilitation, and therapeutic applications.",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://www.mdpi.com/biomedicines/biomedicines-10-03204/article_deploy/html/images/biomedicines-10-03204-g001-550.jpg",
    imageSrc: "https://www.mdpi.com/biomedicines/biomedicines-10-03204/article_deploy/html/images/biomedicines-10-03204-g001-550.jpg",
    title: "Laser Therapy Devices",
     alt:"Laser Therapy Devices are referred to by various alternative names worldwide, reflecting their therapeutic and professional use. Common names include **Cold Laser**, **Low-Level Laser Therapy (LLLT) Device**, and **Laser Pain Relief Device**. In clinical and technical settings, they are called **Phototherapy Laser Device**, **Therapeutic Laser System**, or **Low-Intensity Laser Therapy Unit**. Regional terms include **Appareil de Thérapie au Laser** (French), **Lasertherapiegerät** (German), **Dispositivo de Terapia con Láser** (Spanish), **激光治疗仪** (Chinese), **Лазерный Терапевтический Аппарат** (Russian), and **Aparelho de Terapia a Laser** (Portuguese). Other professional names include **Soft Tissue Laser Device**, **Biostimulation Laser Unit**, and **High-Power Laser Therapy Device**. These names highlight the device's applications in pain relief, tissue repair, and regenerative therapy through controlled laser emissions.",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "imag/product/Portable-Cryotherapy-Units.png",
    imageSrc: "imag/product/Portable-Cryotherapy-Units.png",
    title: "Portable Cryotherapy Units",
     alt:"Portable Cryotherapy Units are known by various alternative names depending on their functionality and professional use. Common names include **Cryotherapy Machine**, **Portable Ice Therapy Unit**, or **Cold Therapy Device**. In medical and wellness settings, they may be referred to as **Cryogenic Therapy Unit**, **Cold Compression Device**, or **Portable Cryo Chamber**. Regional variations include **Appareil de Cryothérapie Portable** (French), **Tragbares Kryotherapiegerät** (German), **Unidad Portátil de Crioterapia** (Spanish), **便携式冷疗设备** (Chinese), **Портативный Криотерапевтический Аппарат** (Russian), and **Aparelho Portátil de Crioterapia** (Portuguese). Additional professional names include **Cryo Recovery System**, **Cold Therapy Pack**, and **Cryogenic Cooling Unit**. These names emphasize the device’s ability to provide localized or full-body cold therapy for pain relief, inflammation reduction, and muscle recovery.",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://www.peninsulahandtherapy.com.au/wp-content/uploads/2020/01/laser.jpg",
    imageSrc: "https://www.peninsulahandtherapy.com.au/wp-content/uploads/2020/01/laser.jpg",
    title: "Laser Pen (Low)",
     alt:"Laser Pens (Low) are commonly referred to as **Low-Level Laser Pen**, **Laser Therapy Pen**, or **Laser Treatment Pen**. In medical and wellness settings, they are also known as **Photobiomodulation Pen**, **Laser Acupuncture Pen**, or **Cold Laser Pen**. Regional terms include **Stylo Laser Thérapeutique** (French), **Lasertherapiepinsel** (German), **Láser Penetrante de Baja Intensidad** (Spanish), **低功率激光笔** (Chinese), **Низкоинтенсивный Лазерный Перье** (Russian), and **Caneta de Laser Terapêutico** (Portuguese). These names highlight the device’s use in targeted, low-intensity laser treatments for pain relief, tissue healing, and stimulating biological processes.",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://cpimg.tistatic.com/08637586/b/4/Digital-Ift-Unit-INTERFERENTIAL-THERAPY-.jpg",
    imageSrc: "https://cpimg.tistatic.com/08637586/b/4/Digital-Ift-Unit-INTERFERENTIAL-THERAPY-.jpg",
    title: "IFT Units",
     alt:"IFT Units, or Interferential Therapy Units, are known by various alternative names depending on their usage and region. Common names include **Interferential Current Therapy Unit**, **IFT Machine**, or **Interferential Stimulator**. In medical and therapeutic settings, they are also referred to as **Electrotherapy IFT Unit**, **Interferential Pain Relief Device**, or **IFT Electrotherapy Device**. Regional terms include **Appareil de Thérapie Interférentielle** (French), **IFT-Gerät** (German), **Unidad de Terapia Interferencial** (Spanish), **干扰电疗仪** (Chinese), **Интерференционная Терапия** (Russian), and **Unidade de Terapia Interferencial** (Portuguese). Other professional names include **Dual Channel IFT Unit**, **Interferential Current Machine**, and **Multichannel IFT Device**. These names emphasize the device’s ability to deliver high-frequency currents for pain relief, muscle stimulation, and rehabilitation purposes.",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://m.media-amazon.com/images/I/81fv-4cO1rL.__AC_SX300_SY300_QL70_ML2_.jpg",
    imageSrc: "https://m.media-amazon.com/images/I/81fv-4cO1rL.__AC_SX300_SY300_QL70_ML2_.jpg",
    title: "NMES Device",
     alt:"NMES Devices, or Neuromuscular Electrical Stimulation Devices, are commonly referred to by various alternative names. These include **NMES Machine**, **Electrotherapy Muscle Stimulator**, or **Muscle Stimulation Device**. In clinical and therapeutic settings, they are also known as **Neuromuscular Stimulator**, **Electrical Muscle Trainer**, or **Rehabilitation Stimulator**. Regional terms include **Appareil de Stimulation Neuromusculaire** (French), **NMES-Gerät** (German), **Dispositivo de Estimulación Muscular** (Spanish), **神经肌肉电刺激设备** (Chinese), **Электростимулятор Мышц** (Russian), and **Aparelho de Estimulação Neuromuscular** (Portuguese). Additional professional names include **Functional NMES Device**, **Biphasic NMES Unit**, and **Multichannel NMES System**. These names reflect the device’s use in rehabilitation, muscle training, and therapeutic applications to improve muscle strength and function.",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://m.media-amazon.com/images/I/518CLJLIR3L.__AC_SX300_SY300_QL70_ML2_.jpg",
    imageSrc: "https://m.media-amazon.com/images/I/518CLJLIR3L.__AC_SX300_SY300_QL70_ML2_.jpg",
    title: "Iontophoresis Machines",
     alt:"Iontophoresis Machines are known by various alternative names depending on their use and region. Common names include **Iontophoresis Device**, **Electrotherapy Iontophoresis Unit**, or **Skin Treatment Machine**. In medical and clinical settings, they are also referred to as **Iontophoresis Therapy Device**, **Drug Delivery System**, or **Transdermal Electrotherapy Unit**. Regional terms include **Appareil d'Iontophorèse** (French), **Iontophorese-Gerät** (German), **Unidad de Iontoforese** (Spanish), **离子导入设备** (Chinese), **Ионофорезное устройство** (Russian), and **Aparelho de Iontoforese** (Portuguese). Other professional names include **Electrochemical Drug Delivery System**, **Iontophoresis for Pain Relief**, and **Transdermal Current Device**. These names reflect the device’s ability to administer medication or treatment through the skin using controlled electrical currents.",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://soterixmedical.com/static/images/vestibular/1x1-Galvanic.png",
    imageSrc: "https://soterixmedical.com/static/images/vestibular/1x1-Galvanic.png",
    title: "Galvanic Stimulation",
     alt:"Galvanic Simulation Devices are commonly referred to by various alternative names. These include **Galvanic Current Device**, **Galvanic Therapy Machine**, or **Electrogalvanic Stimulator**. In professional settings, they may also be called **Galvanic Skin Response Device**, **Electrotherapy Galvanic Unit**, or **Skin Treatment Device**. Regional terms include **Appareil de Simulation Galvanique** (French), **Galvanotherapiegerät** (German), **Dispositivo de Estimulação Galvânica** (Spanish), **电脉冲治疗仪** (Chinese), **Гальваническое Стимулирование** (Russian), and **Aparelho de Estimulação Galvânica** (Portuguese). Additional professional names include **Galvanic Facial Device**, **Microcurrent Galvanic Unit**, and **Transdermal Galvanic Device**. These names highlight the device’s use in delivering low-level electrical currents for skin treatment, pain relief, and muscle stimulation.",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },{
    badge: null,
    wishlistIcon: "#heart",
    href: "https://m.media-amazon.com/images/I/51gJNFve-GL.__AC_SX300_SY300_QL70_ML2_.jpg",
    imageSrc: "https://m.media-amazon.com/images/I/51gJNFve-GL.__AC_SX300_SY300_QL70_ML2_.jpg",
    title: "Cranial Stimulation",
     alt:"link devices are known by several alternative names depending on the region and professional use. Common names include **CES Device**, **Electrotherapy Brain Stimulation Unit**, or **Cranial Electrotherapy Machine**. In clinical and therapeutic settings, they are also referred to as **Neurostimulation Device**, **Brainwave Therapy Machine**, or **Electro-psychiatric Stimulator**. Regional terms include **Appareil de Stimulation Cérébrale Électrique** (French), **Gehirnstimulationsgerät** (German), **Unidad de Estimulación Cerebral** (Spanish), **头部电疗设备** (Chinese), **Церебральная Электростимуляция** (Russian), and **Aparelho de Estimulação Cerebral** (Portuguese). Other professional names include **Low-Intensity Brain Stimulator**, **Electrotherapy for Anxiety and Depression**, and **Cognitive Enhancement Device**. These names emphasize the device’s use in treating conditions such as anxiety, depression, insomnia, and other neuropsychological issues through controlled electrical stimulation of the brain.",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },{
    badge: null,
    wishlistIcon: "#heart",
    href: "https://www.advantagemedical.com/media/catalog/product/cache/245a440e56007005bd7f3fd02cfb9075/1/7/176-0174a_1.jpg",
    imageSrc: "https://www.advantagemedical.com/media/catalog/product/cache/245a440e56007005bd7f3fd02cfb9075/1/7/176-0174a_1.jpg",
    title: "Electroacupuncture",
     alt:"Electroacupuncture devices are referred to by various alternative names depending on their application and region. Common names include **Electroacupuncture Device**, **Electro-Acupuncture Machine**, or **Acupuncture Electrotherapy Unit**. In clinical and professional settings, they are also known as **Electro-Acupuncture Stimulator**, **Acupuncture Electrical Stimulation Device**, or **Electrotherapy for Acupuncture**. Regional terms include **Appareil d'Electroacupuncture** (French), **Elektroakupunkturgerät** (German), **Unidad de Electroacupuntura** (Spanish), **电针治疗仪** (Chinese), **Электроакупунктурное Устройство** (Russian), and **Aparelho de Electroacupuntura** (Portuguese). Additional professional names include **Acupuncture Electro-Stimulator**, **Electrotherapy for Pain Relief**, and **Neuromuscular Electroacupuncture Device**. These names reflect the integration of electrical stimulation with traditional acupuncture techniques for pain management, rehabilitation, and holistic healing.",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },{
    badge: null,
    wishlistIcon: "#heart",
    href: "https://s.alicdn.com/@sc04/kf/Hcbab3941d3d24ecb857fd4ae59afe803I.jpg_300x300.jpg",
    imageSrc: "https://s.alicdn.com/@sc04/kf/Hcbab3941d3d24ecb857fd4ae59afe803I.jpg_300x300.jpg",
    title: "Electrodes",
     alt:"Electrodes used in various therapeutic and medical devices are referred to by a variety of alternative names. Common names include **Electrode Pads**, **Electrotherapy Electrodes**, or **Stim Electrodes**. In professional settings, they are also called **Conductive Pads**, **Electro-stimulation Electrodes**, or **Medical Electrodes**. Regional terms include **Electrodes Thérapeutiques** (French), **Elektroden** (German), **Electrodos Terapéuticos** (Spanish), **电极** (Chinese), **Электроды** (Russian), and **Eletrodos** (Portuguese). Other technical names include **Self-Adhesive Electrodes**, **Reusable Electrodes**, and **Gel Electrodes**. These names reflect the use of electrodes in various treatments, including electrical stimulation, neuromuscular therapy, and diagnostic applications.",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },{
    badge: null,
    wishlistIcon: "#heart",
    href: "https://www.dermedics-asia.com/media/catalog/product/cache/1/image/415x415/9df78eab33525d08d6e5fb8d27136e95/e/c/ecg.jpg",
    imageSrc: "https://www.dermedics-asia.com/media/catalog/product/cache/1/image/415x415/9df78eab33525d08d6e5fb8d27136e95/e/c/ecg.jpg",
    title: "Electrode Gels",
     alt:"Electrode gels are widely used in various medical and therapeutic applications, and they are referred to by several alternative names. Common names include **Electrode Gel**, **Conductive Gel**, or **Electrotherapy Gel**. In professional and clinical settings, they are also called **Stim Gel**, **Electrode Contact Gel**, or **Conductive Paste**. Regional terms include **Gel Conducteur** (French), **Leitgel** (German), **Gel de Conducción** (Spanish), **导电凝胶** (Chinese), **Электродный Гель** (Russian), and **Gel Condutivo** (Portuguese). Other specialized names include **Self-Adhesive Electrode Gel**, **Medical Conductive Gel**, and **Low-Resistance Electrogel**. These names reflect their primary use in enhancing electrical conductivity between electrodes and the skin, ensuring efficient transmission of electrical currents in various therapeutic devices.",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },{
    badge: null,
    wishlistIcon: "#heart",
    href: "https://www.soundhealthproducts.com/cdn/shop/products/biofeedback-device_medium.jpg?v=1368814975",
    imageSrc: "https://www.soundhealthproducts.com/cdn/shop/products/biofeedback-device_medium.jpg?v=1368814975",
    title: "Biofeedback Devices",
     alt:"Biofeedback devices are known by various alternative names based on their specific applications and professional use. Common names include **Biofeedback System**, **Biofeedback Machine**, or **Neurofeedback Device**. In clinical and wellness settings, they are also referred to as **Electroencephalography (EEG) Biofeedback Device**, **Stress Management Biofeedback Unit**, or **Physiological Monitoring Device**. Regional terms include **Appareil de Biofeedback** (French), **Biofeedback-Gerät** (German), **Unidad de Biofeedback** (Spanish), **生物反馈设备** (Chinese), **Биофидбек устройство** (Russian), and **Aparelho de Biofeedback** (Portuguese). Other professional names include **Heart Rate Variability Biofeedback**, **EEG Neurofeedback System**, and **Biofeedback Therapy Device**. These names highlight the device’s use in monitoring physiological functions such as brainwave activity, heart rate, muscle tension, and other bio signals for therapeutic and training purposes.",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },{
    badge: null,
    wishlistIcon: "#heart",
    href: "https://img.medicalexpo.com/images_me/photo-mg/80516-17957413.webp",
    imageSrc: "https://img.medicalexpo.com/images_me/photo-mg/80516-17957413.webp",
    title: "Pelvic Floor Stimulation",
     alt:"Pelvic Floor Stimulation devices are referred to by various alternative names depending on their usage and professional setting. Common names include **Pelvic Floor Therapy Device**, **Electro Pelvic Floor Stimulator**, or **Pelvic Muscle Stimulation Unit**. In medical and clinical settings, they are also known as **Pelvic Floor Rehabilitation Device**, **Electrotherapy for Incontinence**, or **Pelvic Health Stimulator**. Regional terms include **Appareil de Stimulation du Plancher Pelvien** (French), **Beckenbodentherapiegerät** (German), **Unidad de Estimulación del Suelo Pélvico** (Spanish), **盆底治疗设备** (Chinese), **Устройство для стимуляции тазового дна** (Russian), and **Aparelho de Estimulação do Assoalho Pélvico** (Portuguese). Additional professional names include **Pelvic Floor Electro-Stimulator**, **Incontinence Treatment Device**, and **Rehabilitation for Pelvic Muscle Disorders**. These names reflect the device’s primary use in treating conditions such as urinary incontinence, pelvic floor dysfunction, and postpartum recovery through electrical stimulation therapy.s",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },{
    badge: null,
    wishlistIcon: "#heart",
    href: "https://5.imimg.com/data5/IOS/Default/2024/5/415761764/PT/UG/DL/61042806/product-jpeg-1000x1000.png",
    imageSrc: "https://5.imimg.com/data5/IOS/Default/2024/5/415761764/PT/UG/DL/61042806/product-jpeg-1000x1000.png",
    title: "Kit Bags",
     alt:"Kit bags are versatile bags used to carry and store various equipment and supplies, often for medical or athletic purposes. They are referred to by different names depending on their use and setting. Common names include **Equipment Bag**, **Medical Kit Bag**, or **Therapy Bag**. In professional settings, they are also called **Athletic Training Bag**, **Physiotherapy Kit Bag**, or **Portable Medical Bag**. Regional terms include **Sac de Kit** (French), **Kit Tasche** (German), **Bolsa de Kit** (Spanish), **装备包** (Chinese), **Кит-сумка** (Russian), and **Bolsa de Kit** (Portuguese). Other professional names include **Electrotherapy Kit Bag**, **Sports Therapy Bag**, and **Rehabilitation Equipment Bag**. These names highlight their use in organizing and carrying medical devices, therapeutic tools, and sports recovery equipment.",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },{
    badge: null,
    wishlistIcon: "#heart",
    href: "https://www.aedsuperstore.com/thumbnail.asp?file=assets/images/11260-000023.jpg&maxx=500&maxy=0",
    imageSrc: "https://www.aedsuperstore.com/thumbnail.asp?file=assets/images/11260-000023.jpg&maxx=500&maxy=0",
    title: "Portable Care Cases",
     alt:"Portable care cases are compact, portable storage solutions designed to carry and organize medical or therapeutic equipment and supplies. They are referred to by various names depending on their use and purpose. Common names include **Portable Medical Case**, **Therapy Case**, or **Electrotherapy Care Case**. In clinical and professional settings, they are also called **Portable Treatment Case**, **Health Care Storage Case**, or **Rehabilitation Equipment Case**. Regional terms include **Boîte de Soins Portable** (French), **Transportkoffer für Pflege** (German), **Estuche de Cuidado Portátil** (Spanish), **便携护理箱** (Chinese), **Портативный Медицинский Кейс** (Russian), and **Caixa de Cuidados Portátil** (Portuguese). Additional professional names include **Electrotherapy Portable Case**, **Home Care Kit Case**, and **Mobile Health Equipment Case**. These names reflect their purpose of providing convenient, organized storage for medical and therapeutic devices while allowing easy transport.",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },{
    badge: null,
    wishlistIcon: "#heart",
    href: "https://www.btlmedical.com.hk/pain/images/product/btl-6000-shortwave-and-microwave-diathermy/kv.png",
    imageSrc: "https://www.btlmedical.com.hk/pain/images/product/btl-6000-shortwave-and-microwave-diathermy/kv.png",
    title: "Microwave diathermy ",
     alt:"Microwave diathermy devices are referred to by various alternative names depending on their specific use and professional setting. Common names include **Microwave Therapy Device**, **Microwave Diathermy Machine**, or **Electromagnetic Therapy Unit**. In clinical and medical settings, they are also called **Microwave Healing Device**, **Microwave Pain Relief Unit**, or **Thermal Therapy Device**. Regional terms include **Appareil de Diathermie Micro-ondes** (French), **Mikrowellen-Diathermiegerät** (German), **Unidad de Diatermia por Microondas** (Spanish), **微波透热治疗仪** (Chinese), **Микроволновая диатермия** (Russian), and **Aparelho de Diatermia por Microondas** (Portuguese). Additional professional names include **Microwave Thermal Therapy System**, **Electromagnetic Muscle Stimulation**, and **Infrared Microwave Device**. These names reflect the device’s use in delivering deep tissue heating for pain management, tissue repair, and muscle relaxation through electromagnetic waves.",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "imag/product/Paraffin-Wax-Therapy-Machine.png",
    imageSrc: "imag/product/Paraffin-Wax-Therapy-Machine.png",
    title: "Paraffin Wax Therapy Machine",
     alt:"Paraffin Wax Therapy Machine",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },

];
// Target container to append product HTML
const electroContainer = document.querySelector(".electro"); 
// Generate HTML for each product
electroProduct.forEach((product) => {
  const col = document.createElement("div");
  col.className = "col";

  col.innerHTML = `
<div class="product-item">
${product.badge ? `<span class="badge bg-success position-absolute m-3">${product.badge}</span>` : ""}
<a href="#" class="btn-wishlist">
<svg width="24" height="24" class="heart-icon">
<use xlink:href="#heart"></use>
</svg>
</a>
<figure>
<a href="${product.href}" title="${product.title}">
<img src="${product.imageSrc}" class="tab-image">
</a>
</figure>
<h3>${product.title}</h3>
<span class="qty">${product.quantity}</span>
<span class="rating">
<svg width="24" height="24" class="text-primary">
<use xlink:href="#star-solid"></use>
</svg>
${product.rating}
</span>
<span class="price">${product.price}</span>
<div class="d-flex align-items-center justify-content-between">
<div class="input-group product-qty">
<span class="input-group-btn">
<button type="button" class="quantity-left-minus btn btn-danger btn-number" data-type="minus">
<svg width="16" height="16">
<use xlink:href="#minus"></use>
</svg>
</button>
</span>
<input type="text" name="quantity" class="form-control input-number" value="1">
<span class="input-group-btn">
<button type="button" class="quantity-right-plus btn btn-success btn-number" data-type="plus">
<svg width="16" height="16">
<use xlink:href="#plus"></use>
</svg>
</button>
</span>
</div>
<a href="#" class="nav-link">Add to Cart <iconify-icon icon="uil:shopping-cart"></iconify-icon></a>
</div>
</div>
`;

electroContainer.appendChild(col);
});



//============ Exercise & Rehabilitation Product-grid Function  ===========
const exerRehabProduct = [
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://m.media-amazon.com/images/I/61xz+W6Q7oL._SX425_.jpg",
    imageSrc: "https://m.media-amazon.com/images/I/61xz+W6Q7oL._SX425_.jpg",
    title: "Resistance Bands",
     alt:"Resistance bands are versatile fitness and rehabilitation tools used to build strength and improve flexibility. They are referred to by various alternative names depending on their use and setting. Common names include **Resistance Exercise Bands**, **Therapeutic Resistance Bands**, or **Exercise Bands**. In professional settings, they are also called **Resistance Training Bands**, **Strength Bands**, or **Stretch Bands**. Regional terms include **Bandes de Résistance** (French), **Widerstandsbänder** (German), **Bandas de Resistencia** (Spanish), **弹力带** (Chinese), **Резистентные Ленты** (Russian), and **Bandas de Resistência** (Portuguese). Other professional names include **Resistance Loop Bands**, **Fitness Resistance Bands**, and **Physical Therapy Resistance Bands**. These names highlight their use in enhancing strength, flexibility, and rehabilitation exercises through varying levels of resistance.",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://funandfunction.com/media/catalog/product/cache/5f50e7afcd735cdc97be28b1a4e282f0/a/l/all-therapy-balls-sizes.jpg",
    imageSrc: "https://funandfunction.com/media/catalog/product/cache/5f50e7afcd735cdc97be28b1a4e282f0/a/l/all-therapy-balls-sizes.jpg",
    title: "Therapy Swiss Balls",
     alt:"Therapy Swiss balls, also known as stability or exercise balls, are commonly used in fitness, rehabilitation, and therapy for improving balance, core strength, and flexibility. They are referred to by various alternative names based on their use and professional setting. Common names include **Stability Ball**, **Exercise Ball**, or **Physiotherapy Ball**. In clinical and therapeutic settings, they are also called **Therapy Exercise Ball**, **Swiss Stability Ball**, or **Balance Therapy Ball**. Regional terms include **Ballon de Thérapie** (French), **Stabilitätsball** (German), **Pelota de Ejercicios** (Spanish), **瑞士球** (Chinese), **Швейцарский Мяч** (Russian), and **Bola de Terapia Suíça** (Portuguese). Additional professional names include **Core Stability Ball**, **Rehabilitation Exercise Ball**, and **Medical Swiss Ball**. These names emphasize their use in exercises that promote postural alignment, balance, and muscular strength.",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://m.media-amazon.com/images/I/71BNCwc0fKL._AC_SX425_.jpg",
    imageSrc: "https://m.media-amazon.com/images/I/71BNCwc0fKL._AC_SX425_.jpg",
    title: "Hand Exrecise Balls",
     alt:"Hand exercise balls, used for improving grip strength, dexterity, and rehabilitation, are known by various alternative names. Common names include **Grip Strength Ball**, **Hand Therapy Ball**, or **Finger Exerciser**. In professional settings, they are also referred to as **Hand Strengthening Ball**, **Dexterity Exercise Ball**, or **Rehabilitation Hand Ball**. Regional terms include **Ballon d'Exercice pour les Mains** (French), **Handtherapieball** (German), **Bola de Ejercicio para la Mano** (Spanish), **手部锻炼球** (Chinese), **Ручной Тренировочный Мяч** (Russian), and **Bola de Exercício para Mãos** (Portuguese). Other professional names include **Grip Trainer Ball**, **Therapeutic Hand Strengthener**, and **Fine Motor Skill Ball**. These names reflect their primary use in enhancing hand and finger strength, as well as aiding in recovery from injuries or conditions affecting hand function.",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://m.media-amazon.com/images/I/51oYQN8W6mL._SX300_SY300_QL70_FMwebp_.jpg",
    imageSrc: "https://m.media-amazon.com/images/I/51oYQN8W6mL._SX300_SY300_QL70_FMwebp_.jpg",
    title: "Balance Boards",
     alt:"Balance boards are versatile tools used for improving stability, coordination, and balance. They are referred to by various alternative names depending on their use and setting. Common names include **Balance Trainer**, **Stability Board**, or **Balance Platform**. In professional settings, they are also called **Core Balance Board**, **Exercise Balance Board**, or **Therapy Balance Board**. Regional terms include **Planche d'Équilibre** (French), **Balancebrett** (German), **Tablero de Equilibrio** (Spanish), **平衡板** (Chinese), **Балансировочная Доска** (Russian), and **Prancha de Equilíbrio** (Portuguese). Additional professional names include **Functional Balance Board**, **Rehabilitation Balance Trainer**, and **Postural Stability Board**. These names emphasize their use in enhancing physical stability, helping with injury prevention, and aiding in rehabilitation for conditions affecting balance and coordination.",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://sensoryassist.com.au/cdn/shop/files/sensory-support-massage-cushions-wobble-cushion-36696324604091.png?v=1733488914&width=540",
    imageSrc: "https://sensoryassist.com.au/cdn/shop/files/sensory-support-massage-cushions-wobble-cushion-36696324604091.png?v=1733488914&width=540",
    title: "Wobble Cushion",
     alt:"Wobble cushions, also known as balance cushions, are used for improving stability, balance, and core strength. They are referred to by various alternative names depending on their use and setting. Common names include **Balance Cushion**, **Stability Wobble Cushion**, or **Core Wobble Pad**. In professional settings, they are also called **Wobble Therapy Cushion**, **Inflatable Balance Cushion**, or **Rehabilitation Wobble Cushion**. Regional terms include **Coussin d'Équilibre** (French), **Wackelkissen** (German), **Almohadilla de Equilibrio** (Spanish), **晃动垫** (Chinese), **Ваггл-Подушка** (Russian), and **Almofada de Equilíbrio** (Portuguese). Additional professional names include **Balance Trainer Cushion**, **Posture Wobble Cushion**, and **Physical Therapy Wobble Cushion**. These names highlight their use in enhancing stability, improving posture, and supporting rehabilitation exercises.",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://assets.myworkouts.io/filestack/PURWLkSgRA2NTYTjqS0u_BarbellandDumbbellsandKettlebellsWorkouts.jpg",
    imageSrc: "https://assets.myworkouts.io/filestack/PURWLkSgRA2NTYTjqS0u_BarbellandDumbbellsandKettlebellsWorkouts.jpg",
    title: "Kettleballs & Dumbbbells",
     alt:"Kettlebells and dumbbells are essential fitness and strength-training tools, known by various alternative names based on their use and setting. **Kettlebells** are also referred to as **Kettleweights**, **Cast Iron Weights**, or **Bells**. In professional and gym settings, they are called **Competition Kettlebells**, **Functional Training Bells**, or **Training Kettlebells**. Regional terms include **Kettlebell** (English), **Kettlebell** (French), **Kettlebell** (German), **Kettlebell** (Spanish), **健美壶铃** (Chinese), **Ковшовые Гири** (Russian), and **Kettlebell** (Portuguese).**Dumbbells** are commonly known as **Free Weights**, **Hand Weights**, or **Barbell Alternatives**. In professional use, they are also called **Adjustable Dumbbells**, **Hex Dumbbells**, or **Weighted Dumbbells**. Regional terms include **Dumbbell** (English), **Poids Haltere** (French), **Hanteln** (German), **Pesas de Mano** (Spanish), **哑铃** (Chinese), **Гантели** (Russian), and **Dumbbell** (Portuguese).Both kettlebells and dumbbells are widely used for strength training, functional fitness, and rehabilitation exercises, enhancing overall physical performance and muscle development.",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "imag/product/Medicine-Ball-Slam-Ball.png",
    imageSrc: "imag/product/Medicine-Ball-Slam-Ball.png",
    title: "Medicine-Slam Balls",
     alt:"Medicine-Slam Balls",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://5.imimg.com/data5/SJ/GN/MY-3698549/weight-cuff-combo-2kg-2c1-kg-2c1-2f2-kg-1000x1000.jpg",
    imageSrc: "https://5.imimg.com/data5/SJ/GN/MY-3698549/weight-cuff-combo-2kg-2c1-kg-2c1-2f2-kg-1000x1000.jpg",
    title: "Weight Cuffs",
     alt:"Weight Cuffs",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://m.media-amazon.com/images/I/71ZQ8LOpbmL._AC_SX569_.jpg",
    imageSrc: "https://m.media-amazon.com/images/I/71ZQ8LOpbmL._AC_SX569_.jpg",
    title: "Barbells & Plates",
     alt:"Barbells & Plates",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://www.ncfitnessgear.com.au/wp-content/uploads/2021/08/Fitness-Home-Gym-Pulley-System.jpg",
    imageSrc: "https://www.ncfitnessgear.com.au/wp-content/uploads/2021/08/Fitness-Home-Gym-Pulley-System.jpg",
    title: "Cable Pully Systems",
     alt:"Cable Pully Systems",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },{
    badge: null,
    wishlistIcon: "#heart",
    href: "https://sunnyhealthfitness.com/cdn/shop/products/sunny-health-fitness-treadmills-smart-treadmilll-with-auto-incline-SF-T7705-Smart-01_1100x.jpg?v=1658426240",
    imageSrc: "https://sunnyhealthfitness.com/cdn/shop/products/sunny-health-fitness-treadmills-smart-treadmilll-with-auto-incline-SF-T7705-Smart-01_1100x.jpg?v=1658426240",
    title: "Treadmills",
     alt:"Treadmills",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },{
    badge: null,
    wishlistIcon: "#heart",
    href: "https://resources.fitshop.com/bilder/proform/crosstrainer/Proform%20Carbon%20EL%20PF-PFEL55921-INT/PFEL55920_STUDIO_0004_600.jpg",
    imageSrc: "https://resources.fitshop.com/bilder/proform/crosstrainer/Proform%20Carbon%20EL%20PF-PFEL55921-INT/PFEL55920_STUDIO_0004_600.jpg",
    title: "Elliptical Machines",
     alt:"Elliptical Machines",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },{
    badge: null,
    wishlistIcon: "#heart",
    href: "imag/product/recumbent-upright-bike.png",
    imageSrc: "imag/product/recumbent-upright-bike.png",
    title: "Recumbent & Upright Bikes",
     alt:"Recumbent & Upright Bikes",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },{
    badge: null,
    wishlistIcon: "#heart",
    href: "https://wolverson-fitness.co.uk/cdn/shop/files/wolverson-rower-mk2-1.jpg?v=1686752384&width=700",
    imageSrc: "https://wolverson-fitness.co.uk/cdn/shop/files/wolverson-rower-mk2-1.jpg?v=1686752384&width=700",
    title: "Rowing Machines",
     alt:"Rowing Machines",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },{
    badge: null,
    wishlistIcon: "#heart",
    href: "https://sunnyhealthfitness.com/cdn/shop/products/SU5AF8_1_1100x.jpg?v=1718669755",
    imageSrc: "https://sunnyhealthfitness.com/cdn/shop/products/SU5AF8_1_1100x.jpg?v=1718669755",
    title: "Stepper Machines",
     alt:"Stepper Machines",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },{
    badge: null,
    wishlistIcon: "#heart",
    href: "https://m.media-amazon.com/images/I/51edcJAOBRL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
    imageSrc: "https://m.media-amazon.com/images/I/51edcJAOBRL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
    title: "Mini Pedal Exerciser",
     alt:"Mini Pedal Exerciser",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },{
    badge: null,
    wishlistIcon: "#heart",
    href: "https://bosu.com/cdn/shop/files/BOSUBTHome1_cbe7bd59-958b-4381-a767-9ff5e3f2d711.jpg?v=1719600852&width=1400",
    imageSrc: "https://bosu.com/cdn/shop/files/BOSUBTHome1_cbe7bd59-958b-4381-a767-9ff5e3f2d711.jpg?v=1719600852&width=1400",
    title: "Bosu Balls",
     alt:"Bosu Balls",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },{
    badge: null,
    wishlistIcon: "#heart",
    href: "https://i.pinimg.com/736x/79/3d/17/793d171fb11079f2e570c853eb84d72e.jpg",
    imageSrc: "https://i.pinimg.com/736x/79/3d/17/793d171fb11079f2e570c853eb84d72e.jpg",
    title: "Foam Rollers",
     alt:"Foam Rollers",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },{
    badge: null,
    wishlistIcon: "#heart",
    href: "https://pimage.sport-thieme.com/detail-fillscale-webp/sport-thieme-foldable-balance-beam/282-4303-amazon",
    imageSrc: "https://pimage.sport-thieme.com/detail-fillscale-webp/sport-thieme-foldable-balance-beam/282-4303-amazon",
    title: "Balance Beams",
     alt:"Balance Beams",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://thenaturalshoestore.com.au/cdn/shop/files/ProprioceptionMatimg2_1.png?v=1727155609&width=5000",
    imageSrc: "https://thenaturalshoestore.com.au/cdn/shop/files/ProprioceptionMatimg2_1.png?v=1727155609&width=5000",
    title: "Proprioception Mats ",
     alt:"Proprioception Mats",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://cdn11.bigcommerce.com/s-475bc/images/stencil/500x659/products/57/1450/Athletic_Stretching_Strap_-_Optimized__86782.1556762944.jpg?c=3",
    imageSrc: "https://cdn11.bigcommerce.com/s-475bc/images/stencil/500x659/products/57/1450/Athletic_Stretching_Strap_-_Optimized__86782.1556762944.jpg?c=3",
    title: "Stretching Mats` ",
     alt:"Stretching Mats`",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://i0.wp.com/bestdealsnepal.com.np/wp-content/uploads/2021/04/Yoga-Mat.jpg?resize=768%2C768&ssl=1",
    imageSrc: "https://i0.wp.com/bestdealsnepal.com.np/wp-content/uploads/2021/04/Yoga-Mat.jpg?resize=768%2C768&ssl=1",
    title: "Yoga Meditation Mats ",
     alt:"Yoga Meditation Mats",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://m.media-amazon.com/images/I/71QzCB-yX9L._AC_SY450_.jpg",
    imageSrc: "https://m.media-amazon.com/images/I/71QzCB-yX9L._AC_SY450_.jpg",
    title: "Hamstring Stretchers ",
     alt:"Hamstring Stretchers",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://m.media-amazon.com/images/I/61gdtqDvcIL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
    imageSrc: "https://m.media-amazon.com/images/I/61gdtqDvcIL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
    title: "Calf Stretcher ",
     alt:"Calf Stretcher",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://www.alphafit.com.au/assets/thumbL/52791.jpg?20230131084926",
    imageSrc: "https://www.alphafit.com.au/assets/thumbL/52791.jpg?20230131084926",
    title: "ABs Rollers ",
     alt:"ABs Rollers",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  
  ];
// Target container to append product HTML
const exerRehabContainer = document.querySelector(".exerRehab"); 
// Generate HTML for each product
exerRehabProduct.forEach((product) => {
  const col = document.createElement("div");
  col.className = "col";

  col.innerHTML = `
<div class="product-item">
${product.badge ? `<span class="badge bg-success position-absolute m-3">${product.badge}</span>` : ""}
<a href="#" class="btn-wishlist">
<svg width="24" height="24" class="heart-icon">
<use xlink:href="#heart"></use>
</svg>
</a>
<figure>
<a href="${product.href}" title="${product.title}">
<img src="${product.imageSrc}" class="tab-image">
</a>
</figure>
<h3>${product.title}</h3>
<span class="qty">${product.quantity}</span>
<span class="rating">
<svg width="24" height="24" class="text-primary">
<use xlink:href="#star-solid"></use>
</svg>
${product.rating}
</span>
<span class="price">${product.price}</span>
<div class="d-flex align-items-center justify-content-between">
<div class="input-group product-qty">
<span class="input-group-btn">
<button type="button" class="quantity-left-minus btn btn-danger btn-number" data-type="minus">
<svg width="16" height="16">
<use xlink:href="#minus"></use>
</svg>
</button>
</span>
<input type="text" name="quantity" class="form-control input-number" value="1">
<span class="input-group-btn">
<button type="button" class="quantity-right-plus btn btn-success btn-number" data-type="plus">
<svg width="16" height="16">
<use xlink:href="#plus"></use>
</svg>
</button>
</span>
</div>
<a href="#" class="nav-link">Add to Cart <iconify-icon icon="uil:shopping-cart"></iconify-icon></a>
</div>
</div>
`;

exerRehabContainer.appendChild(col);
});



//============ Treatment Tables & Furniture Product-grid Function  ===========
const ttFProProduct = [
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://sportsphysio.ie/pub/media/catalog/product/cache/2412931737ea305c83b1060d21efa8ad/m/a/marlin-1_1.jpg",
    imageSrc: "https://sportsphysio.ie/pub/media/catalog/product/cache/2412931737ea305c83b1060d21efa8ad/m/a/marlin-1_1.jpg",
    title: "Adjustable Beds",
     alt:"Adjustable Beds",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://remingtonmedical.com/cdn/shop/files/Screen-Shot-2022-08-30-at-7.05.18-PM.png?v=1712606632&width=640",
    imageSrc: "https://remingtonmedical.com/cdn/shop/files/Screen-Shot-2022-08-30-at-7.05.18-PM.png?v=1712606632&width=640",
    title: "Massage Tables",
     alt:"Massage Tables",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://litpolmebel.com/image/cache/catalog/product/6990-1000x1000.jpg",
    imageSrc: "https://litpolmebel.com/image/cache/catalog/product/6990-1000x1000.jpg",
    title: "Examination Couch",
     alt:"Examination Couch",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://m.media-amazon.com/images/I/31fK5ZWyzZL._SY450_.jpg",
    imageSrc: "https://m.media-amazon.com/images/I/31fK5ZWyzZL._SY450_.jpg",
    title: "Traction Beds",
     alt:"Traction Beds",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://img.medicalexpo.com/images_me/photo-mg/129719-19055317.webp",
    imageSrc: "https://img.medicalexpo.com/images_me/photo-mg/129719-19055317.webp",
    title: "Hydraulic Beds",
     alt:"Hydraulic Beds",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://www.buymassagetables.com/cdn/shop/products/Essential_Thera-P-3-Section-_NotBranded2__600_974d68ae-4a3d-408c-b30f-5d030da4f760_300x300.png?v=1625093597",
    imageSrc: "https://www.buymassagetables.com/cdn/shop/products/Essential_Thera-P-3-Section-_NotBranded2__600_974d68ae-4a3d-408c-b30f-5d030da4f760_300x300.png?v=1625093597",
    title: "Electric Beds",
     alt:"Electric Beds",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://2.imimg.com/data2/YO/IV/MY-/a-1000x1000.jpg",
    imageSrc: "https://2.imimg.com/data2/YO/IV/MY-/a-1000x1000.jpg",
    title: "Four Section Tables",
     alt:"Four Section Tables",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://5.imimg.com/data5/GM/BY/MY-8509199/therapy-tilting-table-1000x1000.jpg",
    imageSrc: "https://5.imimg.com/data5/GM/BY/MY-8509199/therapy-tilting-table-1000x1000.jpg",
    title: "Tilt Tables",
     alt:"Tilt Tables",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://www.hausmann.com/wp-content/uploads/2020/12/4797.jpg",
    imageSrc: "https://www.hausmann.com/wp-content/uploads/2020/12/4797.jpg",
    title: "Bariatric Beds",
     alt:"Bariatric Beds",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://cdn11.bigcommerce.com/s-b26de/images/stencil/600x791/products/1391/4213/NT120-BACK-UP-NEW__01169.1709762989.jpg?c=2",
    imageSrc: "https://cdn11.bigcommerce.com/s-b26de/images/stencil/600x791/products/1391/4213/NT120-BACK-UP-NEW__01169.1709762989.jpg?c=2",
    title: "Bobath Tables",
     alt:"Bobath Table (Neuro Rehabilitation Table)",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://www.phsmedicalsolutions.com/hubfs/6legmattable.png",
    imageSrc: "https://www.phsmedicalsolutions.com/hubfs/6legmattable.png",
    title: "Mat Tables",
     alt:"Mat Tables",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },

  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://pacificmedical.com.au/wp-content/uploads/2021/08/CT-Flat-New.jpg",
    imageSrc: "https://pacificmedical.com.au/wp-content/uploads/2021/08/CT-Flat-New.jpg",
    title: "Chiropractic Tables",
     alt:"Chirproactic Tables",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://www.medik-medical.com/data/watermark/20190611/5cfef8a7e3323.jpg",
    imageSrc: "https://www.medik-medical.com/data/watermark/20190611/5cfef8a7e3323.jpg",
    title: "Pediatiric Tables",
     alt:"Pediatiric Tables",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://www.topmedicalmobility.com/wp-content/uploads/MK-500917-600x600.jpg.webp",
    imageSrc: "https://www.topmedicalmobility.com/wp-content/uploads/MK-500917-600x600.jpg.webp",
    title: "Geriatric Recliner Chair",
     alt:"Geriatric Recliner Chair",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },

];
// Target container to append product HTML
const ttFProContainer = document.querySelector(".ttFPro"); 
// Generate HTML for each product
ttFProProduct.forEach((product) => {
  const col = document.createElement("div");
  col.className = "col";

  col.innerHTML = `
<div class="product-item">
${product.badge ? `<span class="badge bg-success position-absolute m-3">${product.badge}</span>` : ""}
<a href="#" class="btn-wishlist">
<svg width="24" height="24" class="heart-icon">
<use xlink:href="#heart"></use>
</svg>
</a>
<figure>
<a href="${product.href}" title="${product.title}">
<img src="${product.imageSrc}" class="tab-image">
</a>
</figure>
<h3>${product.title}</h3>
<span class="qty">${product.quantity}</span>
<span class="rating">
<svg width="24" height="24" class="text-primary">
<use xlink:href="#star-solid"></use>
</svg>
${product.rating}
</span>
<span class="price">${product.price}</span>
<div class="d-flex align-items-center justify-content-between">
<div class="input-group product-qty">
<span class="input-group-btn">
<button type="button" class="quantity-left-minus btn btn-danger btn-number" data-type="minus">
<svg width="16" height="16">
<use xlink:href="#minus"></use>
</svg>
</button>
</span>
<input type="text" name="quantity" class="form-control input-number" value="1">
<span class="input-group-btn">
<button type="button" class="quantity-right-plus btn btn-success btn-number" data-type="plus">
<svg width="16" height="16">
<use xlink:href="#plus"></use>
</svg>
</button>
</span>
</div>
<a href="#" class="nav-link">Add to Cart <iconify-icon icon="uil:shopping-cart"></iconify-icon></a>
</div>
</div>
`;

ttFProContainer.appendChild(col);
});



//============ Manual Therapy Product-grid Function  ===========
const manTheraProduct = [
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://s.alicdn.com/@sc04/kf/Hb6b1fd75f73c4b26858da5915c2436b2y.jpg_720x720q50.jpg",
    imageSrc: "https://s.alicdn.com/@sc04/kf/Hb6b1fd75f73c4b26858da5915c2436b2y.jpg_720x720q50.jpg",
    title: "Masage Roller (Wooden)",
     alt:"Masage Roller (Wooden)",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://m.media-amazon.com/images/I/413zhGF7BsL._SX300_SY300_QL70_FMwebp_.jpg",
    imageSrc: "https://m.media-amazon.com/images/I/413zhGF7BsL._SX300_SY300_QL70_FMwebp_.jpg",
    title: "Manual Massage Sticks (Plastic-Wooden)",
     alt:"Manual Massage Sticks (Plastic-Wooden)",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://www.indosurgicals.com/images/products/Percussion%20Reflex%20Knee%20Hammer%20Taylor%20Model-1.jpg",
    imageSrc: "https://www.indosurgicals.com/images/products/Percussion%20Reflex%20Knee%20Hammer%20Taylor%20Model-1.jpg",
    title: "Relex Hammer-Type Taylor",
     alt:"Relex Hammer-Type Taylor",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://m.media-amazon.com/images/I/31Lib5TIJjL._SY445_SX342_QL70_FMwebp_.jpg",
    imageSrc: "https://m.media-amazon.com/images/I/31Lib5TIJjL._SY445_SX342_QL70_FMwebp_.jpg",
    title: "Reflex Hammer-Babinski",
     alt:"Reflex Hammer-Babinski",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://m.media-amazon.com/images/I/81+1SWjr1eL._AC_SX569_.jpg",
    imageSrc: "https://m.media-amazon.com/images/I/81+1SWjr1eL._AC_SX569_.jpg",
    title: "Cupping Therapy Set (Sillicon)",
     alt:"Cupping Therapy Set (Sillicon Cups)",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://m.media-amazon.com/images/I/71+cADTVkyL._AC_SY300_SX300_.jpg",
    imageSrc: "https://m.media-amazon.com/images/I/71+cADTVkyL._AC_SY300_SX300_.jpg",
    title: "Spiky Balls",
     alt:"Spiky Massage Balls",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://i5.walmartimages.com/seo/Deago-Massage-Lacrosse-Balls-for-Myofascial-Release-Trigger-Point-Therapy-Muscle-Knots-and-Yoga-Therapy-Set-of-2-Firm-Balls-Rose-Red_ec07c95f-a54b-4c45-b987-a2026fbc7dec.38614ed5bc235298525d6414a469ce38.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF",
    imageSrc: "https://i5.walmartimages.com/seo/Deago-Massage-Lacrosse-Balls-for-Myofascial-Release-Trigger-Point-Therapy-Muscle-Knots-and-Yoga-Therapy-Set-of-2-Firm-Balls-Rose-Red_ec07c95f-a54b-4c45-b987-a2026fbc7dec.38614ed5bc235298525d6414a469ce38.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF",
    title: "Lacrosse Massage Balls",
     alt:"Lacrosse Massage Balls",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://relaxusonline.com/cdn/shop/products/703294.jpg?v=1650920779",
    imageSrc: "https://relaxusonline.com/cdn/shop/products/703294.jpg?v=1650920779",
    title: "Thumb Saver Tool",
     alt:"Thumb Saver Tool",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://m.media-amazon.com/images/I/617LhM86mBL._AC_SX569_.jpg",
    imageSrc: "https://m.media-amazon.com/images/I/617LhM86mBL._AC_SX569_.jpg",
    title: "Pressure Point Knobs",
     alt:"Pressure Point Knobs",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://m.media-amazon.com/images/I/61lGKWPZxZL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
    imageSrc: "https://m.media-amazon.com/images/I/61lGKWPZxZL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
    title: "Gua Sha Scrapers",
     alt:"Gua Sha Scrapers",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://m.media-amazon.com/images/I/71SNAPWp1AL._AC_SX569_.jpg",
    imageSrc: "https://m.media-amazon.com/images/I/71SNAPWp1AL._AC_SX569_.jpg",
    title: "Stainless Massage Tools",
     alt:"Stainless Steel Massage Tools",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://m.media-amazon.com/images/I/712UHB03CbL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
    imageSrc: "https://m.media-amazon.com/images/I/712UHB03CbL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
    title: "Handheld Massage Guns",
     alt:"Handheld Massage Guns",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },

  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://m.media-amazon.com/images/I/81Pml+P-1fL._AC_SY300_SX300_.jpg",
    imageSrc: "https://m.media-amazon.com/images/I/81Pml+P-1fL._AC_SY300_SX300_.jpg",
    title: "Kinesiology Tape  (105 Feet)",
     alt:"Kinesiology Tape",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://m.media-amazon.com/images/I/71ZrxDAaaiL._AC_SX569_.jpg",
    imageSrc: "https://m.media-amazon.com/images/I/71ZrxDAaaiL._AC_SX569_.jpg",
    title: "Massage Chairs (Portable & Fixed)",
     alt:"Massage Chairs (Portable & Fixed)",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://m.media-amazon.com/images/I/71oxnyUtwIL._AC_SX569_.jpg",
    imageSrc: "https://m.media-amazon.com/images/I/71oxnyUtwIL._AC_SX569_.jpg",
    title: "18Pcs Hot Stone Therapy Sets",
     alt:"Hot Stone Therapy Sets",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://s.alicdn.com/@sc04/kf/H3e5ef241d47246e7bbd225630ec75805r.jpg_720x720q50.jpg",
    imageSrc: "https://s.alicdn.com/@sc04/kf/H3e5ef241d47246e7bbd225630ec75805r.jpg_720x720q50.jpg",
    title: "Hand Grip Strengthener",
     alt:"Hand Grip Strengthener",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://m.media-amazon.com/images/I/716MiCpk-pL._SX466_.jpg",
    imageSrc: "https://m.media-amazon.com/images/I/716MiCpk-pL._SX466_.jpg",
    title: "Therapy Putty",
     alt:"Therapy Putty",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "http://fitsy.in/uploads/products/170/e437f980d07532df8b4dbed147ac5d58.jpg",
    imageSrc: "http://fitsy.in/uploads/products/170/e437f980d07532df8b4dbed147ac5d58.jpg",
    title: "Stretching Straps",
     alt:"Stretching Straps",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://www.fisiotech.com/image/Prodotti/cunei.jpg",
    imageSrc: "https://www.fisiotech.com/image/Prodotti/cunei.jpg",
    title: "Therapeutic Wedges",
     alt:"Therapeutic Wedges",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://m.media-amazon.com/images/I/61QFjiHQTOL._SX466_.jpg",
    imageSrc: "https://m.media-amazon.com/images/I/61QFjiHQTOL._SX466_.jpg",
    title: "Posture Corrector",
     alt:"Posture Corrector Devices",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://5.imimg.com/data5/SELLER/Default/2023/5/311519651/FG/HY/XH/89256049/healthcave-mulligan-mobilization-belt-1000x1000.jpg",
    imageSrc: "https://5.imimg.com/data5/SELLER/Default/2023/5/311519651/FG/HY/XH/89256049/healthcave-mulligan-mobilization-belt-1000x1000.jpg",
    title: "Soft Tissue Belts",
     alt:"Soft Tissue Mobilization Belts",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://m.media-amazon.com/images/I/81RfNQDpLjL._AC_SX569_.jpg",
    imageSrc: "https://m.media-amazon.com/images/I/81RfNQDpLjL._AC_SX569_.jpg",
    title: "Stability Cushions",
     alt:"Balance and Stability Cushions",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
];
// Target container to append product HTML
const manTheraContainer = document.querySelector(".manThera"); 
// Generate HTML for each product
manTheraProduct.forEach((product) => {
  const col = document.createElement("div");
  col.className = "col";

  col.innerHTML = `
<div class="product-item">
${product.badge ? `<span class="badge bg-success position-absolute m-3">${product.badge}</span>` : ""}
<a href="#" class="btn-wishlist">
<svg width="24" height="24" class="heart-icon">
<use xlink:href="#heart"></use>
</svg>
</a>
<figure>
<a href="${product.href}" title="${product.title}">
<img src="${product.imageSrc}" class="tab-image">
</a>
</figure>
<h3>${product.title}</h3>
<span class="qty">${product.quantity}</span>
<span class="rating">
<svg width="24" height="24" class="text-primary">
<use xlink:href="#star-solid"></use>
</svg>
${product.rating}
</span>
<span class="price">${product.price}</span>
<div class="d-flex align-items-center justify-content-between">
<div class="input-group product-qty">
<span class="input-group-btn">
<button type="button" class="quantity-left-minus btn btn-danger btn-number" data-type="minus">
<svg width="16" height="16">
<use xlink:href="#minus"></use>
</svg>
</button>
</span>
<input type="text" name="quantity" class="form-control input-number" value="1">
<span class="input-group-btn">
<button type="button" class="quantity-right-plus btn btn-success btn-number" data-type="plus">
<svg width="16" height="16">
<use xlink:href="#plus"></use>
</svg>
</button>
</span>
</div>
<a href="#" class="nav-link">Add to Cart <iconify-icon icon="uil:shopping-cart"></iconify-icon></a>
</div>
</div>
`;

manTheraContainer.appendChild(col);
});



//============ Orthopedic Supports and Braces Product-grid Function  ===========
const orthoSupBraProduct = [
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://m.media-amazon.com/images/I/41KqqeLMhcL._SY445_SX342_QL70_FMwebp_.jpg",
    imageSrc: "https://m.media-amazon.com/images/I/41KqqeLMhcL._SY445_SX342_QL70_FMwebp_.jpg",
    title: "Hinged knee brace",
     alt:"Hinged knee brace",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://m.media-amazon.com/images/I/41x9XkeMDRL._SY445_SX342_QL70_FMwebp_.jpg",
    imageSrc: "https://m.media-amazon.com/images/I/41x9XkeMDRL._SY445_SX342_QL70_FMwebp_.jpg",
    title: "Elastic ankle support",
     alt:"Elastic ankle support",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://m.media-amazon.com/images/I/61SZRj-YP2L._SX466_.jpg",
    imageSrc: "https://m.media-amazon.com/images/I/61SZRj-YP2L._SX466_.jpg",
    title: "Wrist splint",
     alt:"Wrist splint",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://m.media-amazon.com/images/I/81lgnSSXYwL._SX466_.jpg",
    imageSrc: "https://m.media-amazon.com/images/I/81lgnSSXYwL._SX466_.jpg",
    title: "Lumbar support belt",
     alt:"Lumbar support belt",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://m.media-amazon.com/images/I/713eRidBwuL._SX466_.jpg",
    imageSrc: "https://m.media-amazon.com/images/I/713eRidBwuL._SX466_.jpg",
    title: "Shoulder immobilizer",
     alt:"Shoulder immobilizer",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://m.media-amazon.com/images/I/81xw05uyiaL._SX466_.jpg",
    imageSrc: "https://m.media-amazon.com/images/I/81xw05uyiaL._SX466_.jpg",
    title: "Cervical collar (soft)",
     alt:"Cervical collar (soft)",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },

  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://m.media-amazon.com/images/I/61-m73GK5vL._SX679_.jpg",
    imageSrc: "https://m.media-amazon.com/images/I/61-m73GK5vL._SX679_.jpg",
    title: "Cervical collar (hard)",
     alt:"Cervical collar (hard)",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://www.zensah.com/cdn/shop/products/compression-knee-sleeve-black_5000x.jpg?v=1619530792",
    imageSrc: "https://www.zensah.com/cdn/shop/products/compression-knee-sleeve-black_5000x.jpg?v=1619530792",
    title: "Knee Sleeves Cap",
     alt:"Compression Knee Sleeves",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://m.media-amazon.com/images/I/81zBGoHxnOL._AC_SX569_.jpg",
    imageSrc: "https://m.media-amazon.com/images/I/81zBGoHxnOL._AC_SX569_.jpg",
    title: "Lace-Up Ankle Brace",
     alt:"Lace-Up Ankle Brace",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://m.media-amazon.com/images/I/61TTF47moYL._SX466_.jpg",
    imageSrc: "https://m.media-amazon.com/images/I/61TTF47moYL._SX466_.jpg",
    title: "Gel Ankle Support",
     alt:"Gel Ankle Support",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://www.i-caremed.com/proimages/pb/pro/BK006.jpg",
    imageSrc: "https://www.i-caremed.com/proimages/pb/pro/BK006.jpg",
    title: "Thoracic Spine Braces",
     alt:"Thoracic Spine Support Braces",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://m.media-amazon.com/images/I/61bQbGapwaL._SX466_.jpg",
    imageSrc: "https://m.media-amazon.com/images/I/61bQbGapwaL._SX466_.jpg",
    title: "Sacroiliac Belt",
     alt:"Sacroiliac Belt",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://m.media-amazon.com/images/I/81bjekcs78L._AC_SX569_.jpg",
    imageSrc: "https://m.media-amazon.com/images/I/81bjekcs78L._AC_SX569_.jpg",
    title: "Thumb Spica Splint",
     alt:"Thumb Spica Splint",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "imag/product/Carpal-Tunnel-Brace.png",
    imageSrc: "imag/product/Carpal-Tunnel-Brace.png",
    title: "Carpal Tunnel Brace",
     alt:"Carpal Tunnel Brace",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "imag/product/Tennis-Elbow-Strap.png",
    imageSrc: "imag/product/Tennis-Elbow-Strap.png",
    title: "Tennis Elbow Strap",
     alt:"Tennis Elbow Strap",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "imag/product/Elbow-Compression-Sleeve.png",
    imageSrc: "imag/product/Elbow-Compression-Sleeve.png",
    title: "Elbow Compression Sleeve",
     alt:"Elbow Compression Sleeve",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "imag/product/Shoulder-Stabilizer-Brace.png",
    imageSrc: "imag/product/Shoulder-Stabilizer-Brace.png",
    title: "Shoulder Stabilizer Brace",
     alt:"Shoulder Stabilizer Brace",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "imag/product/Rotator-Cuff-Support.png",
    imageSrc: "imag/product/Rotator-Cuff-Support.png",
    title: "Rotator Cuff Support Unisex",
     alt:"Rotator Cuff Support Unisex",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "imag/product/Neck-Traction-Devices.png",
    imageSrc: "imag/product/Neck-Traction-Devices.png",
    title: "Neck Traction Devices Portable",
     alt:"Neck Traction Devices Portable",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "imag/product/Posture-Corrector-for-Cervical-Spine.png",
    imageSrc: "imag/product/Posture-Corrector-for-Cervical-Spine.png",
    title: "Posture Corrector for Cervical Spine",
     alt:"Neck Stretcher & Posture Corrector for Cervical Spine",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "imag/product/Hip-Abduction-Brace.png",
    imageSrc: "imag/product/Hip-Abduction-Brace.png",
    title: "Hip Abduction Brace",
     alt:"Hip Abduction Brace",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "imag/product/Pelvic-Stabilization-Belt.png",
    imageSrc: "imag/product/Pelvic-Stabilization-Belt.png",
    title: "Pelvic Stabilization Belt",
     alt:"Pelvic Stabilization Belt",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },

  {
    badge: null,
    wishlistIcon: "#heart",
    href: "imag/product/Plantar-Fasciitis-Arch-Support.png",
    imageSrc: "imag/product/Plantar-Fasciitis-Arch-Support.png",
    title: "Plantar Arch Support",
     alt:"Plantar Fasciitis Arch Support",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "imag/product/Toe-Separators-&-Bunion-Correctors.png",
    imageSrc: "imag/product/Toe-Separators-&-Bunion-Correctors.png",
    title: "Toe Separators",
     alt:"Toe Separators and Bunion Correctors",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "imag/product/Arm-Sling -Universal Fit.png",
    imageSrc: "imag/product/Arm-Sling -Universal Fit.png",
    title: "Arm Sling",
     alt:"Arm Sling (Universal Fit)",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "imag/product/Fracture-Brace-for-Upper-Limb.png",
    imageSrc: "imag/product/Fracture-Brace-for-Upper-Limb.png",
    title: "Fracture Brace",
     alt:"Fracture Brace for Upper Limb",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "imag/product/Compression-Thigh-Sleeves.png",
    imageSrc: "imag/product/Compression-Thigh-Sleeves.png",
    title: "Compression Thigh Sleeves",
     alt:"Compression Thigh Sleeves",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "imag/product/IT-Band-Strap.png",
    imageSrc: "imag/product/IT-Band-Strap.png",
    title: "IT Band Strap",
     alt:"IT Band Strap",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "imag/product/Rib Belt -Male-Female.png",
    imageSrc: "imag/product/Rib Belt -Male-Female.png",
    title: "Rib Belt Unisex",
     alt:"Rib Belt (Male/Female)",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "imag/product/Chest-Binder.png",
    imageSrc: "imag/product/Chest-Binder.png",
    title: "Chest Binder",
     alt:"Chest Binder",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "imag/product/Pediatric-Knee-Braces.png",
    imageSrc: "imag/product/Pediatric-Knee-Braces.png",
    title: "Pediatric Knee Braces",
     alt:"Pediatric Knee Braces",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "imag/product/Halo-Brace-Cervical-Immobilization.png",
    imageSrc: "imag/product/Halo-Brace-Cervical-Immobilization.png",
    title: "Halo Brace",
     alt:"Halo Brace (Cervical Immobilization)",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  
];
// Target container to append product HTML
const orthoSupBraContainer = document.querySelector(".orthoSupBra"); 
// Generate HTML for each product
orthoSupBraProduct.forEach((product) => {
  const col = document.createElement("div");
  col.className = "col";

  col.innerHTML = `
<div class="product-item">
${product.badge ? `<span class="badge bg-success position-absolute m-3">${product.badge}</span>` : ""}
<a href="#" class="btn-wishlist">
<svg width="24" height="24" class="heart-icon">
<use xlink:href="#heart"></use>
</svg>
</a>
<figure>
<a href="${product.href}" title="${product.title}">
<img src="${product.imageSrc}" class="tab-image">
</a>
</figure>
<h3>${product.title}</h3>
<span class="qty">${product.quantity}</span>
<span class="rating">
<svg width="24" height="24" class="text-primary">
<use xlink:href="#star-solid"></use>
</svg>
${product.rating}
</span>
<span class="price">${product.price}</span>
<div class="d-flex align-items-center justify-content-between">
<div class="input-group product-qty">
<span class="input-group-btn">
<button type="button" class="quantity-left-minus btn btn-danger btn-number" data-type="minus">
<svg width="16" height="16">
<use xlink:href="#minus"></use>
</svg>
</button>
</span>
<input type="text" name="quantity" class="form-control input-number" value="1">
<span class="input-group-btn">
<button type="button" class="quantity-right-plus btn btn-success btn-number" data-type="plus">
<svg width="16" height="16">
<use xlink:href="#plus"></use>
</svg>
</button>
</span>
</div>
<a href="#" class="nav-link">Add to Cart <iconify-icon icon="uil:shopping-cart"></iconify-icon></a>
</div>
</div>
`;

orthoSupBraContainer.appendChild(col);
});



//============ Heat and Cold Therapy Product-grid Function  ===========
const hcTheraProduct = [
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "link",
    imageSrc: "imag/product/Adjustable-Temperature-Pads.png",
    title: "Temprature Pads (AE)",
     alt:"Adjustable Electric Temperature Pads",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "link",
    imageSrc: "imag/product/Moist-Heating-Pads.png",
    title: "Moist Heating Pads",
     alt:"Moist Heating Pads",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
 
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "link",
    imageSrc: "imag/product/Hot-Water-Bottles.png",
    title: "Hot Water Bottles",
     alt:"Hot Water Bottles",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
 
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "link",
    imageSrc: "imag/product/Microwavable-Gel-Packs.png",
    title: "Gel Packs",
     alt:"Microwavable Gel Packs",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
 
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "link",
    imageSrc: "imag/product/Infrared-Heat-Lamps-physio.png",
    title: "Infrared Heat Lamps",
     alt:"Infrared Heat Lamps physio",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
 
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "link",
    imageSrc: "imag/product/Neck-and-Shoulder-Wraps.png",
    title: "Neck Wraps",
     alt:"Neck and Shoulder Wraps",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
 
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "link",
    imageSrc: "imag/product/Back-Heat-Wraps.png",
    title: "Back Heat Wraps",
     alt:"Back Heat Wraps",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
 
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "link",
    imageSrc: "imag/product/Heating-Blankets.png",
    title: "Heating Blankets",
     alt:"Heating Blankets PhysioTherapy",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
 
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "link",
    imageSrc: "imag/product/Reusable-Heat-Packs-Click-to-Heat.png",
    title: "Click To Heat Packs",
     alt:"Reusable Heat Packs (Click-to-Heat)",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
 
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "link",
    imageSrc: "imag/product/Frozen-Massage-Rollers.png",
    title: "Frozen Massage Rollers",
     alt:"Frozen Massage Rollers",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
 
  
  
];
// Target container to append product HTML
const hcTheraContainer = document.querySelector(".hcTherapro"); 
// Generate HTML for each product
hcTheraProduct.forEach((product) => {
  const col = document.createElement("div");
  col.className = "col";

  col.innerHTML = `
<div class="product-item">
${product.badge ? `<span class="badge bg-success position-absolute m-3">${product.badge}</span>` : ""}
<a href="#" class="btn-wishlist">
<svg width="24" height="24" class="heart-icon">
<use xlink:href="#heart"></use>
</svg>
</a>
<figure>
<a href="${product.href}" title="${product.title}">
<img src="${product.imageSrc}" class="tab-image">
</a>
</figure>
<h3>${product.title}</h3>
<span class="qty">${product.quantity}</span>
<span class="rating">
<svg width="24" height="24" class="text-primary">
<use xlink:href="#star-solid"></use>
</svg>
${product.rating}
</span>
<span class="price">${product.price}</span>
<div class="d-flex align-items-center justify-content-between">
<div class="input-group product-qty">
<span class="input-group-btn">
<button type="button" class="quantity-left-minus btn btn-danger btn-number" data-type="minus">
<svg width="16" height="16">
<use xlink:href="#minus"></use>
</svg>
</button>
</span>
<input type="text" name="quantity" class="form-control input-number" value="1">
<span class="input-group-btn">
<button type="button" class="quantity-right-plus btn btn-success btn-number" data-type="plus">
<svg width="16" height="16">
<use xlink:href="#plus"></use>
</svg>
</button>
</span>
</div>
<a href="#" class="nav-link">Add to Cart <iconify-icon icon="uil:shopping-cart"></iconify-icon></a>
</div>
</div>

`;

hcTheraContainer.appendChild(col);
});



//============ Mobility Aids Product-grid Function  ===========
const mobilAidproProduct = [
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "imag/product/Walking-Canes-or-Aid-for-Physio-&-Olders.png",
    imageSrc: "imag/product/Walking-Canes-or-Aid-for-Physio-&-Olders.png",
    title: "Walking Canes",
     alt:"Walking Canes or Aid for Physio & Olders",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "imag/product/Walkers-(Standard-Walkers,-Folding-Walkers,-Rollator-Walkers).png",
    imageSrc: "imag/product/Walkers-(Standard-Walkers,-Folding-Walkers,-Rollator-Walkers).png",
    title: "Walkers",
     alt:"Walkers (Standard Walkers, Folding Walkers, Rollator Walkers (with Wheels & Seat))",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "imag/product/Crutches-(Underarm-Crutches,-Forearm-Crutches-Lofstrand-Crutches,-Ergonomic-Crutches).png",
    imageSrc: "imag/product/Crutches-(Underarm-Crutches,-Forearm-Crutches-Lofstrand-Crutches,-Ergonomic-Crutches).png",
    title: "Crutches",
     alt:"Crutches (Underarm Crutches, Forearm Crutches (Lofstrand Crutches), Ergonomic Crutches)",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "imag/product/Wheelchairs-(Lightweight-Folding-Wheelchairs,-Heavy-Duty-Bariatric-Wheelchairs,-Compact-Power-Wheelchairs,-All-Terrain-Electric-Wheelchairs).png",
    imageSrc: "imag/product/Wheelchairs-(Lightweight-Folding-Wheelchairs,-Heavy-Duty-Bariatric-Wheelchairs,-Compact-Power-Wheelchairs,-All-Terrain-Electric-Wheelchairs).png",
    title: "Wheelchairs",
     alt:"Wheelchairs (Lightweight Folding Wheelchairs, Heavy-Duty Bariatric Wheelchairs, Compact Power Wheelchairs, All-Terrain Electric Wheelchairs)",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },{
    badge: null,
    wishlistIcon: "#heart",
    href: "imag/product/Transfer-Aids-Slide-Boards,-Anti-Static-Boards,-Gait-Belts,-Patient-Hoists,-Non-Powered-Stand-Aids,-Electric-Stand-Aids,-Pivot Discs.png.png",
    imageSrc: "imag/product/Transfer-Aids-Slide-Boards,-Anti-Static-Boards,-Gait-Belts,-Patient-Hoists,-Non-Powered-Stand-Aids,-Electric-Stand-Aids,-Pivot Discs.png.png",
    title: "Transfer Aids",
     alt:"Transfer Aids (Slide Boards, Anti-Static Boards, Gait Belts, Patient Hoists, Non-Powered Stand Aids, Electric Stand Aids, Pivot Discs)",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "imag/product/Mobility-Rehabilitation-Aids-for-Rehabilitation-Training-Types-Parallel-Bars,-Therapy-Balance-Bars,-Balance-Boards-&-Discs,-Gait-Trainers-for-Both-Pediatric-&-Adult,-Standing-Frames-Adjustable.png",
    imageSrc: "imag/product/Mobility-Rehabilitation-Aids-for-Rehabilitation-Training-Types-Parallel-Bars,-Therapy-Balance-Bars,-Balance-Boards-&-Discs,-Gait-Trainers-for-Both-Pediatric-&-Adult,-Standing-Frames-Adjustable.png",
    title: "Mobility Rehabilitation Aids",
     alt:"Mobility Rehabilitation Aids for Rehabilitation Training Types: Parallel Bars, Therapy Balance Bars, Balance Boards & Discs, Gait Trainers for Both Pediatric & Adult, Standing Frames Adjustable",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },

  {
    badge: null,
    wishlistIcon: "#heart",
    href: "imag/product/Supportive-Mobility-Products-Types-Knee-Walkers-(Knee-Scooters),-Seating-Cushions-(Pressure-Relief),-Elevated-Leg-Rest-Supports,-Ankle-Foot-Orthoses-(AFOs).png",
    imageSrc: "imag/product/Supportive-Mobility-Products-Types-Knee-Walkers-(Knee-Scooters),-Seating-Cushions-(Pressure-Relief),-Elevated-Leg-Rest-Supports,-Ankle-Foot-Orthoses-(AFOs).png",
    title: "Supportive Mobility Products",
     alt:"Supportive Mobility Products Types: Knee Walkers (Knee Scooters), Seating Cushions (Pressure Relief), Elevated Leg Rest Supports, Ankle-Foot Orthoses (AFOs)",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "imag/product/Accessories-for-Mobility-Aids-Types-Wheelchair Cushions-Walker-Glide-Caps-and-Wheels-Cane-and-Crutch-Tips-Mobility-Bag-Attachments.png",
    imageSrc: "imag/product/Accessories-for-Mobility-Aids-Types-Wheelchair Cushions-Walker-Glide-Caps-and-Wheels-Cane-and-Crutch-Tips-Mobility-Bag-Attachments.png",
    title: "Accessories for Mobility Aids",
     alt:"Accessories for Mobility Aids Types: Wheelchair Cushions, Walker Glide Caps and Wheels, Cane and Crutch Tips, Mobility Bag Attachments",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  
  
];
// Target container to append product HTML
const mobilAidproContainer = document.querySelector(".mobilAidpro"); 
// Generate HTML for each product
mobilAidproProduct.forEach((product) => {
  const col = document.createElement("div");
  col.className = "col";

  col.innerHTML = `
<div class="product-item">
${product.badge ? `<span class="badge bg-success position-absolute m-3">${product.badge}</span>` : ""}
<a href="#" class="btn-wishlist">
<svg width="24" height="24" class="heart-icon">
<use xlink:href="#heart"></use>
</svg>
</a>
<figure>
<a href="${product.href}" title="${product.title}"  target="_blank">
<img src="${product.imageSrc}" class="tab-image">
</a>
</figure>
<h3>${product.title}</h3>
<span class="qty">${product.quantity}</span>
<span class="rating">
<svg width="24" height="24" class="text-primary">
<use xlink:href="#star-solid"></use>
</svg>
${product.rating}
</span>
<span class="price">${product.price}</span>
<div class="d-flex align-items-center justify-content-between">
<div class="input-group product-qty">
<span class="input-group-btn">
<button type="button" class="quantity-left-minus btn btn-danger btn-number" data-type="minus">
<svg width="16" height="16">
<use xlink:href="#minus"></use>
</svg>
</button>
</span>
<input type="text" name="quantity" class="form-control input-number" value="1">
<span class="input-group-btn">
<button type="button" class="quantity-right-plus btn btn-success btn-number" data-type="plus">
<svg width="16" height="16">
<use xlink:href="#plus"></use>
</svg>
</button>
</span>
</div>
<a href="#" class="nav-link">Add to Cart <iconify-icon icon="uil:shopping-cart"></iconify-icon></a>
</div>
</div>
`;

mobilAidproContainer.appendChild(col);
});

 

//============ Traction and Decompression Equipment Product-grid Function  ===========
const tracDecomEquipProProduct = [
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "imag/product/Cervical-Traction-DevicesOver-the-Door-Cervical-Traction-Kits,-Inflatable-Neck-Traction-DevicesUnits,-Pneumatic-Cervical-Traction-Devices.png",
    imageSrc: "imag/product/Cervical-Traction-DevicesOver-the-Door-Cervical-Traction-Kits,-Inflatable-Neck-Traction-DevicesUnits,-Pneumatic-Cervical-Traction-Devices.png",
    title: "Cervical Traction Devices",
     alt:"Cervical Traction Devices Type: Over-the-Door Cervical Traction Kits, Inflatable Neck Traction Devices, Electric Cervical Traction Devices, Manual Cervical Traction Units, Pneumatic Cervical Traction Devices",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "imag/product/Lumbar-Traction-Devices-Type-Manual-Lumbar-Traction-Devices,-Electric-Lumbar-Traction-Machines,-Inversion-Tables,-Pelvic-Traction-Belts,-Mechanical-Lumbar-Traction-Systems-Png-Mad-By-Physio-Nepal-Sam.png",
    imageSrc: "imag/product/Lumbar-Traction-Devices-Type-Manual-Lumbar-Traction-Devices,-Electric-Lumbar-Traction-Machines,-Inversion-Tables,-Pelvic-Traction-Belts,-Mechanical-Lumbar-Traction-Systems-Png-Mad-By-Physio-Nepal-Sam.png",
    title: "Lumbar Traction Devices",
     alt:"Lumbar Traction Devices",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "imag/product/Portable-Traction-Devices-Portable-Back-Stretchers,-Compact-Traction-Belts,-Home-Traction-Kits-(Cervical-and-Lumbar).png",
    imageSrc: "imag/product/Portable-Traction-Devices-Portable-Back-Stretchers,-Compact-Traction-Belts,-Home-Traction-Kits-(Cervical-and-Lumbar).png",
    title: "Portable Traction Devices",
     alt:"Portable Traction Devices",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "imag/product/Accessories-for-Traction-and-Decompressions-Traction-Harnesses-(Cervical-and-Lumbar)-Pelvic-Straps-and-Pads-Support-Pillows-for-Traction-Therapy-Adjustable-Traction-Frame.png",
    imageSrc: "imag/product/Accessories-for-Traction-and-Decompressions-Traction-Harnesses-(Cervical-and-Lumbar)-Pelvic-Straps-and-Pads-Support-Pillows-for-Traction-Therapy-Adjustable-Traction-Frame.png",
    title: "Accessories for Traction",
     alt:"Accessories for Traction and Decompression",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },

  
];
// Target container to append product HTML
const tracDecomEquipProContainer = document.querySelector(".tracDecomEquipPro"); 
// Generate HTML for each product
tracDecomEquipProProduct.forEach((product) => {
  const col = document.createElement("div");
  col.className = "col";

  col.innerHTML = `
<div class="product-item">
${product.badge ? `<span class="badge bg-success position-absolute m-3">${product.badge}</span>` : ""}
<a href="#" class="btn-wishlist">
<svg width="24" height="24" class="heart-icon">
<use xlink:href="#heart"></use>
</svg>
</a>
<figure>
<a href="${product.href}" title="${product.title}"  target="_blank">
<img src="${product.imageSrc}" class="tab-image">
</a>
</figure>
<h3>${product.title}</h3>
<span class="qty">${product.quantity}</span>
<span class="rating">
<svg width="24" height="24" class="text-primary">
<use xlink:href="#star-solid"></use>
</svg>
${product.rating}
</span>
<span class="price">${product.price}</span>
<div class="d-flex align-items-center justify-content-between">
<div class="input-group product-qty">
<span class="input-group-btn">
<button type="button" class="quantity-left-minus btn btn-danger btn-number" data-type="minus">
<svg width="16" height="16">
<use xlink:href="#minus"></use>
</svg>
</button>
</span>
<input type="text" name="quantity" class="form-control input-number" value="1">
<span class="input-group-btn">
<button type="button" class="quantity-right-plus btn btn-success btn-number" data-type="plus">
<svg width="16" height="16">
<use xlink:href="#plus"></use>
</svg>
</button>
</span>
</div>
<a href="#" class="nav-link">Add to Cart <iconify-icon icon="uil:shopping-cart"></iconify-icon></a>
</div>
</div>
`;

tracDecomEquipProContainer.appendChild(col);
});


//============ Monitoring and Measurement Tools-grid Function  ===========
const monitMeasurProProduct = [
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://5.imimg.com/data5/EI/AT/LV/SELLER-84345970/goniometer-3-250x250.jpg",
    imageSrc: "https://5.imimg.com/data5/EI/AT/LV/SELLER-84345970/goniometer-3-250x250.jpg",
    title: "Goniometer",
     alt:"Goniometer (plastic & Metal)",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
  {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://m.media-amazon.com/images/I/71UqH725upL._AC_SX569_.jpg",
    imageSrc: "https://m.media-amazon.com/images/I/71UqH725upL._AC_SX569_.jpg",
    title: "Blood Pressure Monitor",
     alt:"Electronic Blood Pressure Monitor",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  }, {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://m.media-amazon.com/images/I/610ZWVkqoKL._AC_SX425_.jpg",
    imageSrc: "https://m.media-amazon.com/images/I/610ZWVkqoKL._AC_SX425_.jpg",
    title: "Sphygmomanometer ",
     alt:"Sphygmomanometer PARAMED Aneroid Sphygmomanometer – Manual Blood Pressure Cuff with Universal Cuff 8.7-16.5 and D-Ring – Carrying Case in The kit – Black – Stethoscope Not Included",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  }, {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://www.physiosupplies.eu/media/catalog/product/cache/38ee34d0e962c235b438549682ce42fd/b/a/baseline_hydraulic_pnch_gauges_1.jpg",
    imageSrc: "https://www.physiosupplies.eu/media/catalog/product/cache/38ee34d0e962c235b438549682ce42fd/b/a/baseline_hydraulic_pnch_gauges_1.jpg",
    title: "Pinch dynamometer",
     alt:"Pinch dynamometer",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  }, {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://m.media-amazon.com/images/I/41nlRiAT2uL.jpg",
    imageSrc: "https://m.media-amazon.com/images/I/41nlRiAT2uL.jpg",
    title: "Hand Dynamometer",
     alt:"GBEX Hand Dynamometer Grip Power Strength Meter 0-130 kg Capacity Force Gauge Grip Reader Strength Counter Fitness Equipment",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  }, {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://www.fab-ent.com/media/02_Evaluation/12-1149.jpg",
    imageSrc: "https://www.fab-ent.com/media/02_Evaluation/12-1149.jpg",
    title: "Inclinometer",
     alt:"Inclinometer",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  }, {
    badge: null,
    wishlistIcon: "#heart",
    href: "https://m.media-amazon.com/images/I/6189MAMYiqL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
    imageSrc: "https://m.media-amazon.com/images/I/6189MAMYiqL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
    title: "Pulse Oximeter",
     alt:"Pulse Oximeter, Finger Pulse Oximeter with OLED Display, Pulse Oximeter Fingertip, Blood Oxygen Saturation Monitor Finger, Heart Rate Monitor for Adult Child",
    quantity: "1 Unit",
    rating: "4.5",
    price: "$18.00",
  },
];
// Target container to append product HTML
const monitMeasurProContainer = document.querySelector(".monitMeasurPro"); 
// Generate HTML for each product
monitMeasurProProduct.forEach((product) => {
  const col = document.createElement("div");
  col.className = "col";

  col.innerHTML = `
<div class="product-item">
${product.badge ? `<span class="badge bg-success position-absolute m-3">${product.badge}</span>` : ""}
<a href="#" class="btn-wishlist">
<svg width="24" height="24" class="heart-icon">
<use xlink:href="#heart"></use>
</svg>
</a>
<figure>
<a href="${product.href}" title="${product.title}"  target="_blank">
<img src="${product.imageSrc}" class="tab-image">
</a>
</figure>
<h3>${product.title}</h3>
<span class="qty">${product.quantity}</span>
<span class="rating">
<svg width="24" height="24" class="text-primary">
<use xlink:href="#star-solid"></use>
</svg>
${product.rating}
</span>
<span class="price">${product.price}</span>
<div class="d-flex align-items-center justify-content-between">
<div class="input-group product-qty">
<span class="input-group-btn">
<button type="button" class="quantity-left-minus btn btn-danger btn-number" data-type="minus">
<svg width="16" height="16">
<use xlink:href="#minus"></use>
</svg>
</button>
</span>
<input type="text" name="quantity" class="form-control input-number" value="1">
<span class="input-group-btn">
<button type="button" class="quantity-right-plus btn btn-success btn-number" data-type="plus">
<svg width="16" height="16">
<use xlink:href="#plus"></use>
</svg>
</button>
</span>
</div>
<a href="#" class="nav-link">Add to Cart <iconify-icon icon="uil:shopping-cart"></iconify-icon></a>
</div>
</div>
`;

monitMeasurProContainer.appendChild(col);
});


//============ Active Product-grid Function  ===========

// Function For Acrtive grid function
function initializeProductGrid() {
  // CSS for Fade-in Animation
  const style = document.createElement("style");
  style.textContent = `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .fade-in {
      animation: fadeIn 0.5s ease-in-out;
    }
    .load-more-wrapper {
      text-align: center;
      margin-top: 20px;
    }
    .load-more-button {
      padding: 10px 20px;
      font-size: 16px;
    }
  `;
  document.head.appendChild(style);

  // Combine and shuffle products
  const allProductList = [
    ...electroProduct,
    ...monitMeasurProProduct,
    ...tracDecomEquipProProduct,
    ...mobilAidproProduct,
    ...hcTheraProduct,
    ...orthoSupBraProduct,
    ...manTheraProduct,
    ...ttFProProduct,
  ].sort(() => Math.random() - 0.5);

  // Variables to manage display
  let currentIndex = 0;
  const itemsPerPage = 10;

  // Target container
  const container = document.querySelector(".allItems"); // Replace with your actual container class or ID

  // Create a wrapper for the "Load More" button
  const loadMoreWrapper = document.createElement("div");
  loadMoreWrapper.className = "load-more-wrapper";
  loadMoreWrapper.innerHTML = `
    <button class="btn btn-primary load-more-button">Load More</button>
  `;
  container.parentNode.appendChild(loadMoreWrapper);
  const loadMoreButton = loadMoreWrapper.querySelector(".load-more-button");

  // Render products
  function renderProducts() {
    const productsToShow = allProductList.slice(currentIndex, currentIndex + itemsPerPage);

    productsToShow.forEach((product) => {
      const col = document.createElement("div");
      col.className = "col fade-in"; // Add fade-in class for animation

      col.innerHTML = `
      <div class="product-item">
        ${product.badge ? `<span class="badge bg-success position-absolute m-3">${product.badge}</span>` : ""}
        <a href="#" class="btn-wishlist">
          <svg width="24" height="24" class="heart-icon">
            <use xlink:href="#heart"></use>
          </svg>
        </a>
        <figure>
          <a href="${product.href}" title="${product.title}">
            <img src="${product.imageSrc}" class="tab-image">
          </a>
        </figure>
        <h3>${product.title}</h3>
        <span class="qty">${product.quantity}</span>
        <span class="rating">
          <svg width="24" height="24" class="text-primary">
            <use xlink:href="#star-solid"></use>
          </svg>
          ${product.rating}
        </span>
        <span class="price">${product.price}</span>
        <div class="d-flex align-items-center justify-content-between">
          <div class="input-group product-qty">
            <span class="input-group-btn">
              <button type="button" class="quantity-left-minus btn btn-danger btn-number" data-type="minus">
                <svg width="16" height="16">
                  <use xlink:href="#minus"></use>
                </svg>
              </button>
            </span>
            <input type="text" name="quantity" class="form-control input-number" value="1">
            <span class="input-group-btn">
              <button type="button" class="quantity-right-plus btn btn-success btn-number" data-type="plus">
                <svg width="16" height="16">
                  <use xlink:href="#plus"></use>
                </svg>
              </button>
            </span>
          </div>
          <a href="#" class="nav-link">Add to Cart <iconify-icon icon="uil:shopping-cart"></iconify-icon></a>
        </div>
      </div>
      `;
      container.appendChild(col);
    });

    // Update current index
    currentIndex += itemsPerPage;

    // Hide "Load More" button if all products are displayed
    if (currentIndex >= allProductList.length) {
      loadMoreWrapper.style.display = "none";
    }
  }

  // Event listener for "Load More" button
  loadMoreButton.addEventListener("click", renderProducts);

  // Quantity increment and decrement functionality
  document.addEventListener("click", function (event) {
    if (event.target.closest(".quantity-left-minus")) {
      const input = event.target.closest(".product-qty").querySelector(".input-number");
      let value = parseInt(input.value);
      if (value > 1) input.value = value - 1;
    }

    if (event.target.closest(".quantity-right-plus")) {
      const input = event.target.closest(".product-qty").querySelector(".input-number");
      let value = parseInt(input.value);
      input.value = value + 1;
    }
  });

  // Initial render
  renderProducts();
}

// Call the function
initializeProductGrid();
