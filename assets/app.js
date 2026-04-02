// ===== SCREEN MANAGEMENT =====
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

// ===== CHECKOUT =====
const plans = {
  monthly: { name: 'Monthly Plan', price: '$14/mo' },
  annual: { name: 'Annual Plan', price: '$99/yr' },
  couple: { name: 'Couples Plan', price: '$149/yr' }
};

function openCheckout(plan) {
  const p = plans[plan];
  document.getElementById('checkout-summary').innerHTML =
    `<span class="plan-name">${p.name}</span><span class="plan-price">${p.price}</span>`;
  document.getElementById('checkout-modal').classList.add('open');
}

function closeCheckout() {
  document.getElementById('checkout-modal').classList.remove('open');
}

function completePayment() {
  closeCheckout();
  enterApp();
}

function enterApp() {
  showScreen('app-screen');
  initApp();
}

// ===== ACCESS CODE =====
const validCodes = ['HEART2024','LOVE-LOOP','GIFT-ACCESS','BETA-TEST','COUPLE-CODE'];

function validateCode() {
  const val = document.getElementById('access-code-input').value.trim().toUpperCase();
  const err = document.getElementById('code-error');
  if (validCodes.includes(val) || val.length >= 8) {
    err.classList.remove('visible');
    enterApp();
  } else {
    err.classList.add('visible');
  }
}

// ===== TAB SWITCHING =====
function switchTab(tab) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelector(`#tab-${tab}`).classList.add('active');
  document.querySelectorAll('.nav-tab, .topnav-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === tab);
  });
  if (tab === 'intake') ensureIntakeRendered();
  window.scrollTo(0, 0);
}

function toggleGuideSection(header) {
  const section = header.closest('.guide-section');
  section.classList.toggle('open');
}


function ensureIntakeRendered() {
  const intakeEl = document.getElementById('intake-questions');
  const navEl = document.getElementById('intake-nav');
  if (!intakeEl) return;

  const currentContent = (intakeEl.textContent || '').trim();
  const reflectionCompleted = currentQuestion >= intakeQuestions.length;

  if (reflectionCompleted) {
    renderReflectionComplete();
    return;
  }

  if (!currentContent) {
    if (navEl) navEl.style.display = 'flex';
    renderQuestion();
    return;
  }
}


const optionSets = {
  supportLevel: [
    { emoji: '🤍', label: 'I have not felt very supported recently.' },
    { emoji: '🌥️', label: 'Support has been inconsistent recently.' },
    { emoji: '🌿', label: 'I have felt mostly supported recently.' },
    { emoji: '✨', label: 'I have felt deeply supported recently.' }
  ],
  conflictIntensity: [
    { emoji: '☀️', label: 'No real conflict recently.' },
    { emoji: '🌤️', label: 'A few small tensions came up, but they stayed manageable.' },
    { emoji: '🌦️', label: 'We had at least one meaningful disagreement recently.' },
    { emoji: '⛈️', label: 'Conflict has felt intense, repeated, or emotionally heavy recently.' }
  ],
  resolution: [
    { emoji: '✅', label: 'Most of it feels resolved.' },
    { emoji: '🪴', label: 'Some of it feels better, but parts are still lingering.' },
    { emoji: '🫧', label: 'We mostly stopped talking about it without fully resolving it.' },
    { emoji: '🧱', label: 'It still feels unresolved and active between us.' }
  ],
  depth: [
    { emoji: '🌱', label: 'Light — I want a quick, reassuring tune-in.' },
    { emoji: '🌿', label: 'Moderate — I can handle some depth, as long as it stays gentle.' },
    { emoji: '🌳', label: 'Deep — I want a more honest, structured conversation.' }
  ],
  mood: [
    { emoji: '🕯️', label: 'Cozy and warm' },
    { emoji: '😂', label: 'Playful and light' },
    { emoji: '🌊', label: 'Calm and restorative' },
    { emoji: '💗', label: 'Romantic and intimate' },
    { emoji: '🎯', label: 'Clear and focused' }
  ],
  energy: [
    { emoji: '🪶', label: 'Low energy — we need something easy and low-pressure.' },
    { emoji: '🌤️', label: 'Medium energy — we can handle a little movement or planning.' },
    { emoji: '⚡', label: 'High energy — we would enjoy something more active or adventurous.' }
  ],
  attachment: [
    { emoji: '🔐', label: 'Mostly secure — closeness usually feels steady.' },
    { emoji: '🌊', label: 'More anxious — I can worry, overthink, or need reassurance.' },
    { emoji: '🏔️', label: 'More avoidant — I can feel overwhelmed and need space first.' },
    { emoji: '🌀', label: 'Mixed or unsure — it depends on stress and context.' }
  ],
  intimacyState: [
    { emoji: '💞', label: 'It has felt connected and satisfying recently.' },
    { emoji: '🤍', label: 'It has felt neutral or lower priority recently.' },
    { emoji: '🌫️', label: 'It has felt distant, mismatched, or easy to avoid recently.' },
    { emoji: '⚠️', label: 'It has felt confusing, pressured, or tender recently.' }
  ]
};

const intakeQuestions = [
  {
    section: 'Relationship Climate',
    text: 'In the last 2–3 weeks, how connected have you felt to your partner overall?',
    hint: 'Choose the option that best fits the overall feeling, not one single moment.',
    type: 'single',
    options: [
      { emoji: '✨', label: 'Very connected — we have felt close, warm, and emotionally in sync.' },
      { emoji: '🌿', label: 'Mostly connected — things have felt generally good, with a little distance here and there.' },
      { emoji: '🌥️', label: 'Somewhat disconnected — we have cared about each other, but have felt a little off or hard to reach.' },
      { emoji: '🌧️', label: 'Quite disconnected — something has felt noticeably distant, strained, or hard lately.' }
    ]
  },
  {
    section: 'Relationship Climate',
    text: 'Recently, how supported have you felt by your partner?',
    hint: 'Think emotionally, practically, and in everyday life.',
    type: 'single',
    options: optionSets.supportLevel
  },
  {
    section: 'Recent Conflict',
    text: 'How much conflict or repeated tension has shown up recently?',
    hint: 'Include recurring arguments, lingering tension, or issues that keep resurfacing.',
    type: 'single',
    options: optionSets.conflictIntensity
  },
  {
    section: 'Recent Conflict',
    text: 'If conflict has come up recently, what has it been mostly about?',
    hint: 'Select all that apply.',
    type: 'multi',
    options: [
      { emoji: '💬', label: 'How we communicate or misunderstand each other' },
      { emoji: '🕒', label: 'Time together, attention, or responsiveness' },
      { emoji: '🏠', label: 'Chores, routines, or mental load' },
      { emoji: '💵', label: 'Money, planning, or practical stress' },
      { emoji: '💞', label: 'Affection, sex, or physical closeness' },
      { emoji: '🧑‍🤝‍🧑', label: 'Family, friends, or social obligations' },
      { emoji: '🧭', label: 'Boundaries, trust, or future direction' }
    ]
  },
  {
    section: 'Recent Conflict',
    text: 'How resolved do recent issues feel right now?',
    hint: 'Pick the option that best matches the current state, even if it is imperfect.',
    type: 'single',
    options: optionSets.resolution
  },
  {
    section: 'Emotional Patterns',
    text: 'When you feel hurt or activated recently, what are you most likely to do first?',
    hint: 'Choose your most common first move.',
    type: 'single',
    options: [
      { emoji: '🗣️', label: 'I want to talk right away so it does not sit there.' },
      { emoji: '🚪', label: 'I need time or space before I can talk well.' },
      { emoji: '🤐', label: 'I go quiet, shut down, or try to keep the peace.' },
      { emoji: '🛠️', label: 'I try to explain, fix, or solve it quickly.' }
    ]
  },
  {
    section: 'Positives & Strengths',
    text: 'What is going really well in your relationship recently?',
    hint: 'Select all that feel true right now.',
    type: 'multi',
    options: [
      { emoji: '😂', label: 'We have been laughing, playing, or having fun together.' },
      { emoji: '🤝', label: 'We have felt like a team in daily life.' },
      { emoji: '💗', label: 'We have shown care, warmth, or affection consistently.' },
      { emoji: '🧠', label: 'We have been communicating more clearly than usual.' },
      { emoji: '🌙', label: 'We have made meaningful time for each other.' },
      { emoji: '🪴', label: 'We have been handling stress or conflict better than before.' }
    ]
  },
  {
    section: 'Life Stress',
    text: 'Which outside stressors have been affecting your relationship recently?',
    hint: 'Select all that apply. Leave it blank if things feel fairly calm.',
    type: 'multi',
    options: [
      { emoji: '💼', label: 'Work, school, or schedule stress' },
      { emoji: '💵', label: 'Financial pressure or planning stress' },
      { emoji: '🏡', label: 'Home, moving, caregiving, or household demands' },
      { emoji: '🩺', label: 'Health, burnout, or exhaustion' },
      { emoji: '💔', label: 'Grief, family strain, or emotional heaviness' },
      { emoji: '✈️', label: 'Travel, events, weddings, or social obligations' }
    ]
  },
  {
    section: 'Intimacy',
    text: 'How has physical intimacy or affection felt recently?',
    hint: 'Handled gently. Choose the option that fits best right now.',
    type: 'single',
    options: optionSets.intimacyState
  },
  {
    section: 'Activities & Rituals',
    text: 'Which shared activities actually sound good for your next check-in season?',
    hint: 'Select as many as would genuinely feel doable and enjoyable.',
    type: 'multi',
    options: [
      { emoji: '🍵', label: 'Tea, coffee, dessert, or a café stop' },
      { emoji: '🚶', label: 'Walk, park stroll, beach/lake time, or easy outdoor movement' },
      { emoji: '🍳', label: 'Cooking, baking, or making a cozy meal together' },
      { emoji: '🎬', label: 'Movie, show, or music night with a short discussion after' },
      { emoji: '🚗', label: 'Drive, playlist share, or talking in the car' },
      { emoji: '🎨', label: 'Painting, coloring, crafting, puzzle, or board game' },
      { emoji: '🧺', label: 'Picnic, bookstore, market, or casual date outing' },
      { emoji: '🧗', label: 'Adventure date, class, workout, or something more active' }
    ]
  },
  {
    section: 'Activities & Rituals',
    text: 'What mood would help your next check-in feel easier?',
    hint: 'Select up to two moods that fit best.',
    type: 'multiLimit',
    limit: 2,
    options: optionSets.mood
  },
  {
    section: 'Activities & Rituals',
    text: 'How much energy do you realistically have for your next check-in?',
    hint: 'This helps us recommend a pairing you can actually follow through on.',
    type: 'single',
    options: optionSets.energy
  },
  {
    section: 'Attachment & Pacing',
    text: 'Which attachment tendency sounds most like you recently?',
    hint: 'This is only here to help pace the conversation gently.',
    type: 'single',
    options: optionSets.attachment
  },
  {
    section: 'Check-In Preference',
    text: 'For your next check-in, how deep are you realistically open to going?',
    hint: 'Choose what feels sustainable, not what sounds ideal.',
    type: 'single',
    options: optionSets.depth
  }
];

let currentQuestion = 0;
const answers = {};
let checkInsCompleted = 2;
let currentRecommendation = null;
let dynamicMapData = null;

const activityLibrary = [
  { title: 'Tea & Candlelight Reset', emoji: '🍵', intensity: 'light', moods: ['Cozy and warm','Calm and restorative','Romantic and intimate'], energies: ['Low energy — we need something easy and low-pressure.'], hobbies: ['Tea, coffee, dessert, or a café stop'], bestFor: ['before'], duration: '20 min ritual', desc: 'Make a warm drink, dim the lights, and settle in before you talk. This works especially well when your nervous systems need softness first.' },
  { title: 'Dessert Walk', emoji: '🍦', intensity: 'light', moods: ['Playful and light','Calm and restorative'], energies: ['Medium energy — we can handle a little movement or planning.'], hobbies: ['Walk, park stroll, beach/lake time, or easy outdoor movement','Tea, coffee, dessert, or a café stop'], bestFor: ['during','after'], duration: '30–40 min', desc: 'Grab something sweet and walk side by side. This keeps the check-in from feeling too intense while still creating room to talk.' },
  { title: 'Sunset or Park Walk', emoji: '🚶', intensity: 'moderate', moods: ['Calm and restorative','Clear and focused'], energies: ['Medium energy — we can handle a little movement or planning.','High energy — we would enjoy something more active or adventurous.'], hobbies: ['Walk, park stroll, beach/lake time, or easy outdoor movement'], bestFor: ['during'], duration: '30–45 min', desc: 'Walking reduces face-to-face pressure and helps harder conversations move more naturally.' },
  { title: 'Cook First, Talk After', emoji: '🍳', intensity: 'moderate', moods: ['Cozy and warm','Romantic and intimate','Playful and light'], energies: ['Medium energy — we can handle a little movement or planning.'], hobbies: ['Cooking, baking, or making a cozy meal together'], bestFor: ['before'], duration: '45–75 min', desc: 'A shared task creates teamwork before the conversation begins. Good for moderate check-ins that need warmth and grounding.' },
  { title: 'Playlist Drive', emoji: '🚗', intensity: 'moderate', moods: ['Calm and restorative','Romantic and intimate'], energies: ['Low energy — we need something easy and low-pressure.','Medium energy — we can handle a little movement or planning.'], hobbies: ['Drive, playlist share, or talking in the car'], bestFor: ['before','after'], duration: '20–40 min', desc: 'Let music soften the edges first. Ideal when one or both of you open up more easily without direct eye contact.' },
  { title: 'Movie + 3 Questions', emoji: '🎬', intensity: 'light', moods: ['Playful and light','Cozy and warm'], energies: ['Low energy — we need something easy and low-pressure.'], hobbies: ['Movie, show, or music night with a short discussion after'], bestFor: ['after'], duration: '90 min + 15 min chat', desc: 'Watch something comforting, then ask three guided questions after. Great for maintenance seasons and connection boosts.' },
  { title: 'Puzzle or Board Game Check-In', emoji: '🧩', intensity: 'light', moods: ['Playful and light','Calm and restorative'], energies: ['Low energy — we need something easy and low-pressure.'], hobbies: ['Painting, coloring, crafting, puzzle, or board game'], bestFor: ['during'], duration: '30–50 min', desc: 'Hands busy, pressure low. Helpful when talking directly feels heavy or awkward.' },
  { title: 'Bookstore or Market Date', emoji: '📚', intensity: 'light', moods: ['Playful and light','Romantic and intimate'], energies: ['Medium energy — we can handle a little movement or planning.'], hobbies: ['Picnic, bookstore, market, or casual date outing'], bestFor: ['before','after'], duration: '45–75 min', desc: 'A gentle outing can make the conversation feel less like a meeting and more like intentional time together.' },
  { title: 'Blanket Fort / Living Room Reset', emoji: '🕯️', intensity: 'deep', moods: ['Cozy and warm','Romantic and intimate'], energies: ['Low energy — we need something easy and low-pressure.'], hobbies: ['Tea, coffee, dessert, or a café stop','Movie, show, or music night with a short discussion after'], bestFor: ['during'], duration: '45–60 min', desc: 'Create a soft nest at home for a deeper, slower conversation. Best when emotions feel tender and safety matters more than novelty.' },
  { title: 'Stretch, Breathe, Then Talk', emoji: '🧘', intensity: 'deep', moods: ['Calm and restorative','Clear and focused'], energies: ['Low energy — we need something easy and low-pressure.','Medium energy — we can handle a little movement or planning.'], hobbies: ['Adventure date, class, workout, or something more active'], bestFor: ['before'], duration: '15–25 min', desc: 'A few minutes of movement and regulation can prevent a heavier conversation from escalating too fast.' },
  { title: 'Adventure Date Debrief', emoji: '🧗', intensity: 'light', moods: ['Playful and light','Romantic and intimate'], energies: ['High energy — we would enjoy something more active or adventurous.'], hobbies: ['Adventure date, class, workout, or something more active'], bestFor: ['after'], duration: '60–120 min activity + 15 min chat', desc: 'Use a class, hike, climbing gym, or active date as the connective moment, then do a shorter, lighter check-in afterward.' },
  { title: 'Picnic + Future Vision Talk', emoji: '🧺', intensity: 'moderate', moods: ['Romantic and intimate','Clear and focused'], energies: ['Medium energy — we can handle a little movement or planning.'], hobbies: ['Picnic, bookstore, market, or casual date outing','Walk, park stroll, beach/lake time, or easy outdoor movement'], bestFor: ['during'], duration: '45–60 min', desc: 'Best when you want connection plus future-focused conversation without making it feel formal.' },
  { title: 'Art Night + Gentle Repair', emoji: '🎨', intensity: 'moderate', moods: ['Calm and restorative','Cozy and warm'], energies: ['Low energy — we need something easy and low-pressure.','Medium energy — we can handle a little movement or planning.'], hobbies: ['Painting, coloring, crafting, puzzle, or board game'], bestFor: ['during','after'], duration: '45–70 min', desc: 'Creative activity gives the body somewhere to place nervous energy while you move through repair more slowly.' }
];

const historyTrends = [
  { label: 'Connection', val: 72 },
  { label: 'Intimacy', val: 58 },
  { label: 'Communication', val: 63 },
  { label: 'Shared Fun', val: 79 },
  { label: 'Conflict Repair', val: 66 },
  { label: 'Support', val: 81 }
];

const pastCheckIns = [
  { date: 'March 22', type: 'Connection Boost', depth: 'Light-Moderate', mood: '🌿' },
  { date: 'March 8', type: 'Maintenance Check-In', depth: 'Light', mood: '☀️' },
  { date: 'Feb 29', type: 'Stress Spillover', depth: 'Deep', mood: '🌧' },
  { date: 'Feb 14', type: 'Intimacy Reconnect', depth: 'Moderate', mood: '🌸' }
];

function answerValue(index) {
  return answers[index];
}

function answerLabels(index) {
  const q = intakeQuestions[index];
  const val = answers[index];
  if (val == null) return [];
  if (Array.isArray(val)) return val.map(i => q.options[i]?.label).filter(Boolean);
  return [q.options[val]?.label].filter(Boolean);
}

function renderQuestion() {
  const q = intakeQuestions[currentQuestion];
  const el = document.getElementById('intake-questions');
  const progress = ((currentQuestion + 1) / intakeQuestions.length) * 100;
  document.getElementById('intake-progress-bar').style.width = progress + '%';
  document.getElementById('intake-progress-text').textContent = `${currentQuestion + 1} of ${intakeQuestions.length}`;

  document.getElementById('intake-prev-btn').style.display = currentQuestion > 0 ? 'block' : 'none';
  document.getElementById('intake-next-btn').textContent =
    currentQuestion === intakeQuestions.length - 1 ? 'Complete Reflection ✓' : 'Continue →';

  const helper = q.type === 'multi' ? 'Select all that apply.' : q.type === 'multiLimit' ? `Select up to ${q.limit}.` : 'Choose one answer.';

  let inner = `
    <div class="question-card">
      <span class="question-section-tag">${q.section}</span>
      <div class="question-text">${q.text}</div>
      ${q.hint ? `<div class="question-hint">${q.hint}</div>` : ''}
      <div style="font-size:12px;color:var(--text-soft);font-weight:500;margin:-0.3rem 0 1rem;letter-spacing:0.02em;">${helper}</div>
      <div class="options-grid">
  `;

  const selectedVals = Array.isArray(answers[currentQuestion]) ? answers[currentQuestion] : [];
  q.options.forEach((opt, i) => {
    const isSelected = q.type === 'single' ? answers[currentQuestion] === i : selectedVals.includes(i);
    inner += `
      <button class="option-btn ${isSelected ? 'selected' : ''}" onclick="handleOptionClick(${i})">
        <span class="option-emoji">${opt.emoji}</span>
        ${opt.label}
      </button>
    `;
  });

  inner += `</div></div>`;
  el.innerHTML = inner;
}

function handleOptionClick(idx) {
  const q = intakeQuestions[currentQuestion];
  if (q.type === 'single') {
    answers[currentQuestion] = idx;
  } else {
    const current = Array.isArray(answers[currentQuestion]) ? [...answers[currentQuestion]] : [];
    const existingIndex = current.indexOf(idx);
    if (existingIndex >= 0) {
      current.splice(existingIndex, 1);
    } else if (q.type === 'multiLimit' && current.length >= q.limit) {
      current.shift();
      current.push(idx);
    } else {
      current.push(idx);
    }
    answers[currentQuestion] = current;
  }
  renderQuestion();
}


function questionAnswered(q, val) {
  if (q.type === 'single') return typeof val === 'number';
  return Array.isArray(val);
}


function renderReflectionComplete() {
  const intakeEl = document.getElementById('intake-questions');
  const navEl = document.getElementById('intake-nav');
  const progressBar = document.getElementById('intake-progress-bar');
  const progressText = document.getElementById('intake-progress-text');
  if (!intakeEl) return;
  intakeEl.innerHTML = `
    <div class="question-card" style="text-align:center;padding:2.5rem 1.5rem;">
      <div style="font-size:48px;margin-bottom:1rem;">🌸</div>
      <div class="question-text" style="margin-bottom:0.8rem;">Reflection complete.</div>
      <p style="font-size:15px;color:var(--text-mid);font-weight:300;line-height:1.65;margin-bottom:1.5rem;">
        Your answers just updated your relationship map, personalized check-in, and activity pairings.
      </p>
      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
        <button class="btn-primary" onclick="switchTab('builder')">View Your Check-In →</button>
        <button class="btn-secondary" onclick="restartReflection()">Retake Reflection</button>
      </div>
    </div>
  `;
  if (navEl) navEl.style.display = 'none';
  if (progressBar) progressBar.style.width = '100%';
  if (progressText) progressText.textContent = `${intakeQuestions.length} of ${intakeQuestions.length}`;
}

function restartReflection() {
  currentQuestion = 0;
  const nav = document.getElementById('intake-nav');
  if (nav) nav.style.display = 'flex';
  renderQuestion();
}

function intakeNext() {
  const q = intakeQuestions[currentQuestion];
  if (!questionAnswered(q, answers[currentQuestion])) {
    if (q.type === 'single') {
      alert('Choose the option that fits best before continuing.');
      return;
    }
    answers[currentQuestion] = [];
  }

  if (currentQuestion < intakeQuestions.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    generateRecommendation();
    currentQuestion = intakeQuestions.length;
    renderReflectionComplete();
  }
}

function intakePrev() {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
  }
}

function scoreFromSingle(questionIndex, mapping) {
  const val = answers[questionIndex];
  if (typeof val !== 'number') return 0;
  return mapping[val] ?? 0;
}

function countMulti(questionIndex) {
  return Array.isArray(answers[questionIndex]) ? answers[questionIndex].length : 0;
}

function selectionIncludes(questionIndex, labelStart) {
  return answerLabels(questionIndex).some(label => label.startsWith(labelStart));
}

function generateRecommendation() {
  const connection = 100 - scoreFromSingle(0, {0: 5, 1: 18, 2: 38, 3: 55});
  const support = 100 - scoreFromSingle(1, {0: 55, 1: 32, 2: 15, 3: 5});
  const conflict = scoreFromSingle(2, {0: 5, 1: 25, 2: 55, 3: 80});
  const unresolved = scoreFromSingle(4, {0: 10, 1: 30, 2: 50, 3: 75});
  const joy = Math.min(90, 30 + countMulti(6) * 10);
  const stress = Math.min(90, countMulti(7) * 14);
  const intimacyStrain = scoreFromSingle(8, {0: 5, 1: 18, 2: 50, 3: 70});
  const attachment = answerLabels(12)[0] || '';
  const depthPref = answerLabels(13)[0] || optionSets.depth[1].label;
  const moodLabels = answerLabels(10);
  const hobbyLabels = answerLabels(9);
  const energyLabel = answerLabels(11)[0] || optionSets.energy[1].label;
  const conflictTopics = answerLabels(3);
  const strengths = answerLabels(6);

  const seriousness = conflict + unresolved + stress + intimacyStrain + (100 - connection);

  let type = 'Connection Boost Check-In';
  let duration = '25–35 min';
  let frequency = 'Weekly';
  let depth = 'Light-Moderate';
  let tone = 'Warm, low-pressure, and structured';

  if (seriousness >= 220 || depthPref.startsWith('Deep')) {
    type = 'Deep Reset Check-In';
    duration = '60–90 min';
    frequency = 'Weekly or twice-weekly for a short season';
    depth = 'Deep';
    tone = 'Soft start, slower pacing, and more structure';
  } else if (conflict + unresolved >= 105) {
    type = 'Repair Check-In';
    duration = '40–55 min';
    frequency = 'Weekly';
    depth = 'Moderate-Deep';
    tone = 'Gentle, clear, and repair-focused';
  } else if (stress >= 42) {
    type = 'Stress Spillover Check-In';
    duration = '30–40 min';
    frequency = 'Weekly';
    depth = 'Moderate';
    tone = 'Grounded, validating, and practical';
  } else if (intimacyStrain >= 50) {
    type = 'Intimacy Reconnect Check-In';
    duration = '35–50 min';
    frequency = 'Every 1–2 weeks';
    depth = 'Moderate';
    tone = 'Tender, respectful, and not rushed';
  } else if (joy >= 70 && conflict < 35) {
    type = 'Maintenance Check-In';
    duration = '20–25 min';
    frequency = 'Every 1–2 weeks';
    depth = 'Light';
    tone = 'Warm, appreciative, and future-facing';
  }

  const themes = [];
  if (strengths.length) themes.push('Appreciation');
  if (conflictTopics.some(t => t.includes('communicate'))) themes.push('Communication');
  if (conflictTopics.some(t => t.includes('Time together') || t.includes('attention'))) themes.push('Quality Time');
  if (stress >= 28) themes.push('Stress Spillover');
  if (intimacyStrain >= 40) themes.push('Intimacy');
  if (conflictTopics.some(t => t.includes('Family') || t.includes('social'))) themes.push('Boundaries / Social Pressure');
  if (!themes.length) themes.push('Connection', 'Appreciation', 'Future Vision');

  const activityOptions = chooseActivities({ type, moodLabels, hobbyLabels, energyLabel, seriousness });
  const mainActivity = activityOptions[0];

  const questions = buildConversationQuestions({ type, themes, conflictTopics, strengths, stress, intimacyStrain, unresolved });
  const pacing = buildPacingNote({ attachment, seriousness, unresolved, energyLabel });
  const closing = buildClosingRitual({ type, strengths, moodLabels });
  const focusAreas = [...new Set(themes)].slice(0, 4);

  currentRecommendation = {
    connection: Math.max(38, Math.round((connection + support + joy) / 3)),
    focusAreas,
    type,
    duration,
    frequency,
    depth,
    tone,
    description: buildDescription(type, themes, stress, unresolved),
    themes,
    questions,
    pacing,
    closing,
    mainActivity,
    activities: activityOptions,
    strengths: strengths.length ? strengths : ['Care', 'Potential', 'Willingness to check in'],
    openers: buildOpeners({ type, themes, unresolved }),
    nextCheckIn: frequency.includes('1–2 weeks') ? 'Next week' : 'This week'
  };

  dynamicMapData = buildMapData({ connection, support, conflict, unresolved, joy, stress, intimacyStrain, themes });
  renderDynamicUI();
}

function buildDescription(type, themes, stress, unresolved) {
  if (type === 'Maintenance Check-In') {
    return 'Things are not in a crisis state right now. A shorter check-in will help you protect what is already working and stay intentional before distance builds.';
  }
  if (type === 'Repair Check-In') {
    return 'Recent tension does not just need time — it needs a little structure. This check-in should make room for repair without turning into a spiral.';
  }
  if (type === 'Stress Spillover Check-In') {
    return 'Outside pressure seems to be spilling into the relationship. Keep the conversation practical, validating, and gently focused on what each of you needs.';
  }
  if (type === 'Intimacy Reconnect Check-In') {
    return 'Closeness may need more tenderness and clarity right now. Slow pacing and emotionally safe wording matter more than forcing a breakthrough.';
  }
  return `Your answers suggest a need for a more intentional check-in around ${themes.slice(0, 2).join(' and ').toLowerCase()}. This version gives you enough structure to be honest without making the conversation feel overwhelming.`;
}

function buildConversationQuestions({ type, themes, conflictTopics, strengths, stress, intimacyStrain, unresolved }) {
  const qs = [];
  qs.push('What has felt good between us recently that we do not want to lose?');
  if (strengths.length) qs.push(`Which recent strength do we most want to protect right now: ${strengths.slice(0, 2).join(' or ')}?`);
  if (conflictTopics.length) qs.push(`Which recent stress point feels most important to talk about first: ${conflictTopics[0].toLowerCase()}?`);
  if (unresolved >= 50) qs.push('Is there anything from a recent disagreement that still feels unfinished, unspoken, or misunderstood?');
  if (themes.includes('Communication')) qs.push('When have we missed each other recently in the way we talk, text, or respond?');
  if (themes.includes('Quality Time')) qs.push('What kind of time together would make us feel more connected this week — practical and realistic, not idealized?');
  if (stress >= 28) qs.push('What outside pressure is affecting us most right now, and how can we stop taking it out on each other?');
  if (intimacyStrain >= 40) qs.push('What would help physical or emotional closeness feel safer, easier, or more mutual right now?');
  if (type === 'Deep Reset Check-In') qs.push('What do we each need more of in this season that we have not clearly named yet?');
  qs.push('What is one small thing we want to try differently before our next check-in?');
  return qs.slice(0, 6);
}

function buildPacingNote({ attachment, seriousness, unresolved, energyLabel }) {
  let note = 'Start with appreciation, then move into one hard topic at a time. Avoid stacking five concerns into one moment.';
  if (attachment.startsWith('More anxious')) {
    note += ' Reassurance and clarity will matter here — name what is going well before shifting into what feels hard.';
  } else if (attachment.startsWith('More avoidant')) {
    note += ' Build in pauses and keep the conversation time-bound so it does not feel endless or cornering.';
  } else if (attachment.startsWith('Mixed')) {
    note += ' Expect your needs to shift moment to moment; use check-ins to name that instead of judging it.';
  }
  if (seriousness >= 220 || unresolved >= 50) {
    note += ' If either of you gets flooded, take a 2-minute regulation break and come back to the same question instead of opening a new one.';
  }
  if (energyLabel.startsWith('Low energy')) {
    note += ' Keep the plan simple and do not turn this into an all-night emotional marathon.';
  }
  return note;
}

function buildClosingRitual({ type, strengths, moodLabels }) {
  if (type === 'Repair Check-In' || type === 'Deep Reset Check-In') {
    return 'Close by naming one thing you understood better, one appreciation, and one concrete next step. Then do something regulating together before ending the night.';
  }
  if (moodLabels.includes('Romantic and intimate')) {
    return 'Close with one appreciation each, then share one thing that helps you feel chosen, desired, or deeply cared for.';
  }
  return `Close with two appreciations and one thing you want to carry forward from ${strengths[0] ? strengths[0].toLowerCase() : 'this season'}.`;
}

function buildOpeners({ type, themes, unresolved }) {
  const openers = ['What has your heart been carrying recently that I may not fully see yet?'];
  if (type === 'Maintenance Check-In') openers.unshift('What is one moment from recently that made you feel close to me?');
  if (themes.includes('Stress Spillover')) openers.push('What has been feeling heavy outside of us that has followed us into the relationship?');
  if (unresolved >= 50) openers.push('Is there anything from a recent hard moment you want us to come back to gently?');
  return openers.slice(0, 2);
}

function chooseActivities({ type, moodLabels, hobbyLabels, energyLabel, seriousness }) {
  const ranked = activityLibrary.map(activity => {
    let score = 0;
    if (moodLabels.some(m => activity.moods.includes(m))) score += 3;
    if (hobbyLabels.some(h => activity.hobbies.includes(h))) score += 4;
    if (activity.energies.includes(energyLabel)) score += 3;
    if (type === 'Deep Reset Check-In' && activity.intensity === 'deep') score += 3;
    if (type === 'Repair Check-In' && (activity.intensity === 'moderate' || activity.intensity === 'deep')) score += 2;
    if (type === 'Maintenance Check-In' && activity.intensity === 'light') score += 3;
    if (seriousness > 210 && activity.title.includes('Adventure')) score -= 3;
    return { ...activity, score };
  }).sort((a, b) => b.score - a.score);
  return ranked.slice(0, 6);
}

function buildMapData({ connection, support, conflict, unresolved, joy, stress, intimacyStrain, themes }) {
  const data = [
    { name: 'Communication', score: Math.max(38, 88 - conflict), status: calcStatus(88 - conflict) },
    { name: 'Trust', score: Math.max(50, support), status: calcStatus(support) },
    { name: 'Emotional Intimacy', score: Math.max(35, connection), status: calcStatus(connection) },
    { name: 'Physical Intimacy', score: Math.max(30, 85 - intimacyStrain), status: calcStatus(85 - intimacyStrain) },
    { name: 'Conflict Repair', score: Math.max(25, 90 - unresolved), status: calcStatus(90 - unresolved) },
    { name: 'Quality Time', score: themes.includes('Quality Time') ? 58 : 75, status: calcStatus(themes.includes('Quality Time') ? 58 : 75) },
    { name: 'Shared Fun', score: joy, status: calcStatus(joy) },
    { name: 'Life Stress', score: Math.max(25, 90 - stress), status: calcStatus(90 - stress) },
    { name: 'Support / Seen', score: support, status: calcStatus(support) },
    { name: 'Future Goals', score: 72, status: calcStatus(72) }
  ];
  return data;
}

function calcStatus(score) {
  if (score >= 78) return 'thriving';
  if (score >= 62) return 'stable';
  if (score >= 45) return 'attention';
  return 'tense';
}

function renderDynamicUI() {
  const rec = currentRecommendation;
  if (!rec) return;

  // Home dashboard
  document.getElementById('home-connection-score').textContent = rec.connection;
  document.getElementById('home-focus-areas').textContent = rec.focusAreas.length;
  document.getElementById('home-checkins-done').textContent = checkInsCompleted;
  document.getElementById('home-next-checkin').textContent = rec.nextCheckIn;
  document.getElementById('home-rec-title').textContent = rec.type;
  document.getElementById('home-rec-desc').textContent = rec.description;
  document.getElementById('home-rec-meta').innerHTML = `
    <span class="meta-chip">⏱ ${rec.duration}</span>
    <span class="meta-chip">📅 ${rec.frequency}</span>
    <span class="meta-chip">🌙 ${rec.depth}</span>
    <span class="meta-chip">🌿 ${rec.tone}</span>
  `;
  document.getElementById('home-activity-icon').textContent = rec.mainActivity.emoji;
  document.getElementById('home-activity-title').textContent = rec.mainActivity.title;
  document.getElementById('home-activity-desc').textContent = rec.mainActivity.desc;
  document.getElementById('home-strengths').innerHTML = rec.strengths.slice(0, 4).map(s => `<span class="pill-tag strength">${s.replace(/\.$/, '')}</span>`).join('');
  document.getElementById('home-openers').innerHTML = rec.openers.map(o => `<div class="guide-prompt">"${o}"</div>`).join('');

  // Builder
  document.getElementById('builder-output-type').textContent = `This Week · ${rec.type.replace(' Check-In','')}`;
  document.getElementById('builder-output-title').textContent = rec.type;
  document.getElementById('builder-output-meta').innerHTML = `
    <span class="meta-badge">⏱ ${rec.duration}</span>
    <span class="meta-badge">📅 ${rec.frequency}</span>
    <span class="meta-badge">🌿 ${rec.depth}</span>
    <span class="meta-badge">💞 ${rec.tone}</span>
  `;
  document.getElementById('builder-theme-tags').innerHTML = rec.themes.map((theme, i) => {
    const cls = i === 0 ? 'strength' : i === 1 ? 'attention' : 'growing';
    return `<span class="pill-tag ${cls}">${theme}</span>`;
  }).join('');
  document.getElementById('builder-theme-desc').textContent = `This check-in should start with grounding and appreciation, then move into ${rec.themes.slice(0, 2).join(' and ').toLowerCase()}, and end with a small next step you can actually keep.`;
  document.getElementById('builder-pacing').textContent = rec.pacing;
  document.getElementById('builder-closing').textContent = rec.closing;
  initBuilderQuestions(rec.questions);

  // Activities
  document.getElementById('activities-intro').textContent = `Based on your recent answers, we recommend ${rec.depth.toLowerCase()} conversations paired with ${rec.mainActivity.title.toLowerCase()}-style connection moments.`;
  document.getElementById('activities-list').innerHTML = rec.activities.map((a, idx) => {
    const iconClass = idx % 4 === 0 ? 'warm' : idx % 4 === 1 ? 'light' : idx % 4 === 2 ? 'cozy' : 'calm';
    return `
      <div class="activity-card">
        <div class="activity-card-icon ${iconClass}">${a.emoji}</div>
        <div>
          <div class="activity-card-title">${a.title}</div>
          <div class="activity-card-meta">
            <span class="activity-tag when">${capitalize(a.bestFor[0])} check-in</span>
            <span class="activity-tag time">${a.duration}</span>
            <span class="activity-tag mood">${a.moods[0]}</span>
          </div>
          <p class="activity-card-desc">${a.desc}</p>
        </div>
      </div>
    `;
  }).join('');

  // Map + pulse
  initPulseBars(rec);
  initMapCategories();
  drawRadar();
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function initPulseBars(rec = null) {
  const map = dynamicMapData || [
    { name: 'Connection', score: 72 },
    { name: 'Trust', score: 88 },
    { name: 'Intimacy', score: 60 },
    { name: 'Stress', score: 55 },
    { name: 'Fun', score: 78 },
    { name: 'Repair', score: 65 },
    { name: 'Support', score: 82 }
  ];
  const categories = [
    { name: 'Connection', val: dynamicMapData ? dynamicMapData.find(d => d.name === 'Emotional Intimacy')?.score || 72 : 72, color: 'var(--lavender-deep)' },
    { name: 'Trust', val: dynamicMapData ? dynamicMapData.find(d => d.name === 'Trust')?.score || 88 : 88, color: 'var(--lavender-mid)' },
    { name: 'Intimacy', val: dynamicMapData ? dynamicMapData.find(d => d.name === 'Physical Intimacy')?.score || 60 : 60, color: 'var(--rose)' },
    { name: 'Stress', val: dynamicMapData ? 100 - (dynamicMapData.find(d => d.name === 'Life Stress')?.score || 45) : 55, color: 'var(--dusty-rose)' },
    { name: 'Fun', val: dynamicMapData ? dynamicMapData.find(d => d.name === 'Shared Fun')?.score || 78 : 78, color: 'var(--gold)' },
    { name: 'Repair', val: dynamicMapData ? dynamicMapData.find(d => d.name === 'Conflict Repair')?.score || 65 : 65, color: 'var(--blush-mid)' },
    { name: 'Support', val: dynamicMapData ? dynamicMapData.find(d => d.name === 'Support / Seen')?.score || 82 : 82, color: 'var(--lavender-deep)' }
  ];
  const container = document.getElementById('pulse-bars');
  container.innerHTML = categories.map(c => `
    <div class="pulse-bar-wrap">
      <div class="pulse-bar-fill" style="height:${c.val}%;background:${c.color};width:100%"></div>
      <div class="pulse-bar-name">${c.name}</div>
    </div>
  `).join('');

  const summary = document.getElementById('pulse-summary');
  const tags = rec ? [
    rec.themes[0] ? `<span class="pill-tag strength">${rec.themes[0]}</span>` : '',
    rec.themes[1] ? `<span class="pill-tag attention">${rec.themes[1]}</span>` : '',
    rec.strengths[0] ? `<span class="pill-tag growing">${rec.strengths[0]}</span>` : '',
    `<span class="pill-tag stable">${rec.depth}</span>`
  ].join('') : `
    <span class="pill-tag strength">Trust strong</span>
    <span class="pill-tag attention">Intimacy dip</span>
    <span class="pill-tag growing">Fun increasing</span>
    <span class="pill-tag stable">Support stable</span>
  `;
  summary.innerHTML = tags;
}

function drawRadar() {
  const svg = document.getElementById('radar-chart');
  const cx = 150, cy = 150, r = 110;
  const data = dynamicMapData || [
    { name: 'Communication', score: 65 },
    { name: 'Conflict Repair', score: 55 },
    { name: 'Physical Intimacy', score: 60 },
    { name: 'Trust', score: 88 },
    { name: 'Quality Time', score: 70 },
    { name: 'Shared Fun', score: 78 },
    { name: 'Support / Seen', score: 82 },
    { name: 'Future Goals', score: 72 }
  ];
  const labels = data.slice(0, 8).map(d => d.name.replace(' / Seen','').replace('Conflict Repair','Repair').replace('Physical Intimacy','Intimacy').replace('Shared Fun','Fun').replace('Future Goals','Future'));
  const scores = data.slice(0, 8).map(d => d.score / 100);
  const n = labels.length;

  function polar(i, radius) {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
  }

  let html = '';
  [0.25, 0.5, 0.75, 1].forEach(frac => {
    html += `<circle cx="${cx}" cy="${cy}" r="${r * frac}" fill="none" stroke="rgba(196,181,240,0.25)" stroke-width="1"/>`;
  });

  for (let i = 0; i < n; i++) {
    const pt = polar(i, r);
    html += `<line x1="${cx}" y1="${cy}" x2="${pt.x}" y2="${pt.y}" stroke="rgba(196,181,240,0.2)" stroke-width="1"/>`;
  }

  const points = scores.map((s, i) => polar(i, r * s));
  html += `<polygon points="${points.map(p => `${p.x},${p.y}`).join(' ')}" fill="rgba(155,135,224,0.18)" stroke="var(--lavender-deep)" stroke-width="2"/>`;

  points.forEach((p, i) => {
    const score = scores[i];
    const color = score >= 0.75 ? '#9b87e0' : score >= 0.60 ? '#c9a96e' : '#c06b88';
    html += `<circle cx="${p.x}" cy="${p.y}" r="5" fill="${color}" stroke="white" stroke-width="2"/>`;
  });

  for (let i = 0; i < n; i++) {
    const pt = polar(i, r + 22);
    html += `<text x="${pt.x}" y="${pt.y}" text-anchor="middle" dominant-baseline="middle" fill="var(--text-mid)" font-size="9" font-family="DM Sans, sans-serif" font-weight="500">${labels[i]}</text>`;
  }

  svg.innerHTML = html;
}

const statusLabels = { thriving: 'Thriving', stable: 'Stable', attention: 'Needs Attention', tense: 'Tense' };

function initMapCategories() {
  const data = dynamicMapData || [
    { name: 'Communication', status: 'attention', score: 65 },
    { name: 'Trust', status: 'thriving', score: 88 },
    { name: 'Emotional Intimacy', status: 'stable', score: 70 },
    { name: 'Physical Intimacy', status: 'attention', score: 60 },
    { name: 'Conflict Repair', status: 'stable', score: 68 },
    { name: 'Quality Time', status: 'attention', score: 62 },
    { name: 'Shared Fun', status: 'thriving', score: 78 },
    { name: 'Life Stress', status: 'tense', score: 45 },
    { name: 'Family Dynamics', status: 'stable', score: 72 },
    { name: 'Future Goals', status: 'thriving', score: 80 }
  ];
  const el = document.getElementById('map-categories');
  el.innerHTML = data.map(d => `
    <div class="cat-row" onclick="alert('${d.name}: ${statusLabels[d.status]} (${d.score}%). In a fuller build, this opens the contributing answers, suggested prompts, and recommended pacing.')">
      <div class="cat-row-name">${d.name}</div>
      <div class="cat-bar">
        <div class="cat-bar-fill ${d.status}" style="width:${d.score}%"></div>
      </div>
      <div class="cat-status ${d.status}">${statusLabels[d.status]}</div>
    </div>
  `).join('');
}

function initBuilderQuestions(customQuestions = null) {
  const el = document.getElementById('builder-questions');
  const questions = customQuestions || [
    'What has felt good between us recently that we do not want to lose?',
    'Have you felt heard in your day-to-day conversations lately? Where has that felt off?',
    'What would more connection actually look like right now — practically, not ideally?',
    'Is there anything from the last few weeks you want to revisit gently?',
    'What are we each looking forward to in the next month, individually and together?'
  ];
  el.innerHTML = questions.map((q, i) => `
    <li class="question-item">
      <div class="q-num">${i + 1}</div>
      <div class="q-text">${q}</div>
    </li>
  `).join('');
}

function initHistory() {
  const tEl = document.getElementById('trend-rows');
  tEl.innerHTML = historyTrends.map(t => `
    <div class="trend-row">
      <div class="trend-label">${t.label}</div>
      <div class="trend-bar-outer">
        <div class="trend-bar-fill" style="width:${t.val}%"></div>
      </div>
      <div class="trend-val">${t.val}%</div>
    </div>
  `).join('');

  const cEl = document.getElementById('checkin-history');
  cEl.innerHTML = pastCheckIns.map(c => `
    <div class="card-sm" style="margin-bottom:6px;display:flex;align-items:center;justify-content:space-between;gap:10px;">
      <div style="display:flex;align-items:center;gap:10px;">
        <span style="font-size:20px;">${c.mood}</span>
        <div>
          <div style="font-family:var(--font-display);font-size:1rem;color:var(--text-dark);font-weight:400;">${c.type}</div>
          <div style="font-size:12px;color:var(--text-soft);font-weight:300;">${c.date} · ${c.depth}</div>
        </div>
      </div>
      <button class="btn-ghost" style="font-size:12px;text-decoration:none;">View →</button>
    </div>
  `).join('');
}

function markCheckInDone() {
  checkInsCompleted += 1;
  const date = new Date();
  const label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const mood = currentRecommendation?.depth === 'Deep' ? '🌧' : currentRecommendation?.depth === 'Light' ? '☀️' : '🌿';
  if (currentRecommendation) {
    pastCheckIns.unshift({
      date: label,
      type: currentRecommendation.type.replace(' Check-In',''),
      depth: currentRecommendation.depth,
      mood
    });
    initHistory();
    document.getElementById('home-checkins-done').textContent = checkInsCompleted;
  }
  alert('Check-in marked complete. Your trend history was updated — nice work making space for each other.');
}

function initApp() {
  initPulseBars();
  drawRadar();
  initMapCategories();
  renderQuestion();
  initBuilderQuestions();
  initHistory();
  document.getElementById('intake-nav').style.display = 'flex';
}

document.getElementById('checkout-modal').addEventListener('click', function(e) {
  if (e.target === this) closeCheckout();
});


document.addEventListener('DOMContentLoaded', () => {
  const appScreen = document.getElementById('app-screen');
  if (appScreen && appScreen.classList.contains('active')) {
    initApp();
  }
});
