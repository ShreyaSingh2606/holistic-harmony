// ============================================================
//  HOLISTIC HARMONY — script.js
//  Milestone 2: API Integration, Loading States, Responsiveness
// ============================================================

const API_BASE = 'https://yoga-api-nzy4.onrender.com/v1';

// ---- State ----
let allPoses = [];      // raw data from API
let filteredPoses = []; // after search/filter/sort

// ---- DOM refs ----
const posesGrid   = document.getElementById('posesGrid');
const loader      = document.getElementById('loader');
const errorState  = document.getElementById('errorState');
const noResults   = document.getElementById('noResults');
const resultCount = document.getElementById('resultCount');
const searchInput = document.getElementById('searchInput');
const levelFilter = document.getElementById('levelFilter');
const sortSelect  = document.getElementById('sortSelect');

// ============================================================
//  1. FETCH YOGA POSES FROM API
// ============================================================
async function fetchPoses() {
  showLoader(true);
  hideError();
  posesGrid.innerHTML = '';
  noResults.style.display = 'none';

  try {
    const response = await fetch(`${API_BASE}/poses`);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data = await response.json();

    // The API returns an array of poses directly
    allPoses = Array.isArray(data) ? data : [];

    showLoader(false);
    applyFilters(); // render with current filter state

  } catch (err) {
    console.error('Failed to fetch poses:', err);
    showLoader(false);
    showError(true);
  }
}

// ============================================================
//  2. FILTER / SORT / SEARCH  (using Array HOFs)
// ============================================================
function applyFilters() {
  const query  = searchInput.value.trim().toLowerCase();
  const level  = levelFilter.value;
  const sortBy = sortSelect.value;

  // -- Filter by search keyword --
  let result = allPoses.filter(pose =>
    pose.english_name.toLowerCase().includes(query) ||
    (pose.sanskrit_name_adapted || '').toLowerCase().includes(query) ||
    (pose.pose_benefits || '').toLowerCase().includes(query)
  );

  // -- Filter by difficulty level --
  if (level !== 'all') {
    result = result.filter(pose =>
      pose.difficulty_level === level
    );
  }

  // -- Sort --
  result = result.sort((a, b) => {
    if (sortBy === 'az') return a.english_name.localeCompare(b.english_name);
    if (sortBy === 'za') return b.english_name.localeCompare(a.english_name);
    return 0; // default: original API order
  });

  filteredPoses = result;
  renderPoses(filteredPoses);
}

// ============================================================
//  3. RENDER POSE CARDS
// ============================================================
function renderPoses(poses) {
  posesGrid.innerHTML = '';
  noResults.style.display = 'none';

  if (poses.length === 0) {
    noResults.style.display = 'block';
    resultCount.textContent = '';
    return;
  }

  poses.forEach((pose, index) => {
    const card = createPoseCard(pose, index);
    posesGrid.appendChild(card);
  });

  resultCount.textContent = `Showing ${poses.length} pose${poses.length !== 1 ? 's' : ''}`;
}

function createPoseCard(pose, index) {
  const card = document.createElement('div');
  card.className = 'pose-card';
  card.style.animationDelay = `${index * 0.05}s`;

  const level = pose.difficulty_level || 'Beginner';
  const imgSrc = pose.url_png || pose.url_svg || '';
  const benefits = pose.pose_benefits || 'No description available.';
  const sanskrit = pose.sanskrit_name_adapted || pose.sanskrit_name || '';

  card.innerHTML = `
    <div class="pose-img-wrap">
      <img
        src="${imgSrc}"
        alt="${pose.english_name}"
        onerror="this.src='https://via.placeholder.com/120x120?text=🧘'; this.onerror=null;"
      />
    </div>
    <div class="pose-card-body">
      <span class="pose-level level-${level.replace(' ','')}">${level}</span>
      <h3 class="pose-name">${pose.english_name}</h3>
      ${sanskrit ? `<p class="pose-sanskrit">${sanskrit}</p>` : ''}
      <p class="pose-benefits">${benefits}</p>
    </div>
    <div class="pose-card-footer">
      <button class="btn-detail" data-id="${pose.id}">View Details</button>
    </div>
  `;

  card.querySelector('.btn-detail').addEventListener('click', () => openModal(pose));
  card.addEventListener('click', (e) => {
    if (!e.target.classList.contains('btn-detail')) openModal(pose);
  });

  return card;
}

// ============================================================
//  4. MODAL — Pose Detail
// ============================================================
const modalOverlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');
const modalClose   = document.getElementById('modalClose');

function openModal(pose) {
  const level = pose.difficulty_level || 'Beginner';
  const imgSrc = pose.url_png || pose.url_svg || '';
  const benefits = pose.pose_benefits || 'No description available.';
  const sanskrit = pose.sanskrit_name_adapted || pose.sanskrit_name || '';
  const translation = pose.translation_name || '';

  modalContent.innerHTML = `
    ${imgSrc ? `
      <div class="modal-img-wrap">
        <img src="${imgSrc}" alt="${pose.english_name}" class="modal-img"
          onerror="this.parentElement.style.display='none'"
        />
      </div>` : ''}
    <span class="pose-level level-${level.replace(' ','')}">${level}</span>
    <h2 class="modal-pose-name">${pose.english_name}</h2>
    ${sanskrit ? `<p class="modal-sanskrit">${sanskrit}</p>` : ''}
    ${translation ? `<p class="modal-translation">✦ ${translation}</p>` : ''}

    <p class="modal-section-label">Benefits & Instructions</p>
    <p class="modal-text">${benefits}</p>

    ${pose.category_name ? `
      <p class="modal-section-label">Category</p>
      <p class="modal-text">${pose.category_name}</p>
    ` : ''}
  `;

  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ============================================================
//  5. MUDRAS — Custom Dataset
// ============================================================
const mudrasData = [
  {
    name: 'Gyan Mudra',
    sanskrit: 'Jñāna Mudrā',
    emoji: '🤌',
    benefit: 'Enhances concentration, memory, and mental clarity. Reduces stress and relieves depression.',
    tag: 'Mind & Focus'
  },
  {
    name: 'Prana Mudra',
    sanskrit: 'Prāṇa Mudrā',
    emoji: '🙏',
    benefit: 'Activates dormant energy in the body. Improves eyesight and boosts immunity.',
    tag: 'Vitality'
  },
  {
    name: 'Apan Mudra',
    sanskrit: 'Apāna Mudrā',
    emoji: '👌',
    benefit: 'Detoxifies the body, aids digestion, and helps regulate diabetes.',
    tag: 'Detox & Digestion'
  },
  {
    name: 'Shuni Mudra',
    sanskrit: 'Śūnyā Mudrā',
    emoji: '🖐️',
    benefit: 'Reduces ear pain and hearing problems. Promotes patience and intuition.',
    tag: 'Patience & Hearing'
  },
  {
    name: 'Surya Mudra',
    sanskrit: 'Sūrya Mudrā',
    emoji: '☀️',
    benefit: 'Boosts metabolism and aids weight management. Generates warmth in the body.',
    tag: 'Metabolism'
  },
  {
    name: 'Vayu Mudra',
    sanskrit: 'Vāyu Mudrā',
    emoji: '💨',
    benefit: 'Relieves gas and bloating. Helps with arthritis and Parkinson\'s symptoms.',
    tag: 'Air & Relief'
  }
];

function renderMudras() {
  const grid = document.getElementById('mudraGrid');
  mudrasData.forEach((mudra, index) => {
    const card = document.createElement('div');
    card.className = 'mudra-card';
    card.style.animationDelay = `${index * 0.07}s`;
    card.innerHTML = `
      <span class="mudra-emoji">${mudra.emoji}</span>
      <h3 class="mudra-name">${mudra.name}</h3>
      <p class="mudra-sanskrit">${mudra.sanskrit}</p>
      <p class="mudra-benefit">${mudra.benefit}</p>
      <span class="mudra-tag">${mudra.tag}</span>
    `;
    grid.appendChild(card);
  });
}

// ============================================================
//  6. AYURVEDA — Custom Dataset
// ============================================================
const ayurvedaData = [
  {
    time: 'Morning Ritual',
    tip: 'Oil Pulling (Gandusha)',
    desc: 'Swish 1 tablespoon of sesame or coconut oil in your mouth for 10–15 minutes each morning to remove toxins and improve oral health.'
  },
  {
    time: 'Morning Routine',
    tip: 'Drink Warm Water',
    desc: 'Start every day with a glass of warm water — ideally with a squeeze of lemon — to stimulate digestion and flush the lymphatic system.'
  },
  {
    time: 'Diet Tip',
    tip: 'Eat According to Your Dosha',
    desc: 'Vata types benefit from warm, oily, and grounding foods. Pitta benefits from cool, sweet, and bitter foods. Kapha needs light, dry, and spicy foods.'
  },
  {
    time: 'Midday Practice',
    tip: 'Pranayama Breathing',
    desc: 'Practice Nadi Shodhana (alternate nostril breathing) for 5–10 minutes to balance the left and right hemispheres of the brain.'
  },
  {
    time: 'Evening Ritual',
    tip: 'Abhyanga Self-Massage',
    desc: 'Massage warm sesame oil into your skin before bathing. This nourishes the nervous system, improves circulation, and induces deep sleep.'
  },
  {
    time: 'Herb of the Day',
    tip: 'Ashwagandha',
    desc: 'Known as the "Indian Ginseng", Ashwagandha reduces cortisol, boosts energy, and supports a calm and resilient nervous system.'
  },
  {
    time: 'Digestive Tip',
    tip: 'Triphala at Night',
    desc: 'Take Triphala churna (a blend of three fruits) with warm water before bed to support healthy elimination and detoxify the colon.'
  },
  {
    time: 'Sleep Hygiene',
    tip: 'Lights Out by 10 PM',
    desc: 'Ayurveda aligns sleep with natures clock. Sleeping before 10 PM allows the liver to detoxify and the mind to fully restore overnight.'
  }
];

function renderAyurveda() {
  const grid = document.getElementById('ayurvedaGrid');
  ayurvedaData.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'ayurveda-card';
    card.style.animationDelay = `${index * 0.06}s`;
    card.innerHTML = `
      <p class="ayurveda-time">${item.time}</p>
      <h3 class="ayurveda-tip">${item.tip}</h3>
      <p class="ayurveda-desc">${item.desc}</p>
    `;
    grid.appendChild(card);
  });
}

// ============================================================
//  7. EVENT LISTENERS
// ============================================================
searchInput.addEventListener('input', applyFilters);
levelFilter.addEventListener('change', applyFilters);
sortSelect.addEventListener('change', applyFilters);

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks   = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close nav on link click (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    // Update active link
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// ============================================================
//  8. HELPERS
// ============================================================
function showLoader(state) {
  loader.style.display = state ? 'block' : 'none';
}
function showError(state) {
  errorState.style.display = state ? 'block' : 'none';
}
function hideError() {
  errorState.style.display = 'none';
}

// ============================================================
//  9. INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  fetchPoses();
  renderMudras();
  renderAyurveda();
});