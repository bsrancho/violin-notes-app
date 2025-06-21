/* --------------------------- data --------------------------- */
const NOTES = [
  { id: 'A', file: 'audio/a.mp3'   , label: 'A (open A)'      , stringFinger: 'A0' },
  { id: 'B', file: 'audio/b.mp3'   , label: 'B (1st finger)'   , stringFinger: 'A1' },
  { id: 'C', file: 'audio/c.mp3'   , label: 'C (2nd finger)'   , stringFinger: 'A2' },
  { id: 'D', file: 'audio/d.mp3'   , label: 'D (open D)'      , stringFinger: 'D0' },
  { id: 'E', file: 'audio/e.mp3'   , label: 'E (1st finger)'   , stringFinger: 'D1' },
  { id: 'F#',file: 'audio/fsharp.mp3', label: 'F♯ (2nd finger)', stringFinger: 'D2' }
];

const STORAGE_KEY = 'violinQuizStats';

/* --------------------------- state --------------------------- */
let currentNote = null;
let currentQuestionType = 'note'; // 'note' or 'stringFinger'
let score = (function() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { correct: 0, total: 0 };
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed.correct === 'number' && typeof parsed.total === 'number') {
      return parsed;
    }
  } catch (e) {
    console.warn('Invalid stored score, resetting');
  }
  return { correct: 0, total: 0 };
})();

/* --------------------------- DOM refs --------------------------- */
const choicesEl = document.getElementById('choices');
const feedback  = document.getElementById('feedback');
const scoreEl   = document.getElementById('score');
const staffImg  = document.getElementById('staff-img');

/* --------------------------- init --------------------------- */
init();

function init() {
  renderChoices();
  bindEvents();
  nextQuestion();
  updateScore();
}

/* --------------------------- ui builders --------------------------- */
function renderChoices() {
  choicesEl.innerHTML = '';                       // clear
  
  if (currentQuestionType === 'note') {
    // Show note names (A, B, C, D, E, F#)
    NOTES.forEach(note => {
      const btn = document.createElement('button');
      btn.textContent = note.id;
      btn.className = 'choice-btn';
      btn.dataset.noteId = note.id;
      choicesEl.appendChild(btn);
    });
  } else {
    // Show string/finger combinations (A0, A1, A2, D0, D1, D2)
    const stringFingerOptions = [...new Set(NOTES.map(note => note.stringFinger))];
    stringFingerOptions.forEach(option => {
      const btn = document.createElement('button');
      btn.textContent = option;
      btn.className = 'choice-btn';
      btn.dataset.stringFinger = option;
      choicesEl.appendChild(btn);
    });
  }
}

function bindEvents() {
  choicesEl.addEventListener('click', e => {
    if (e.target.matches('.choice-btn')) {
      if (currentQuestionType === 'note') {
        checkAnswer(e.target.dataset.noteId);
      } else {
        checkStringFingerAnswer(e.target.dataset.stringFinger);
      }
    }
  });
}

/* --------------------------- game logic --------------------------- */
function nextQuestion() {
  currentNote = NOTES[Math.floor(Math.random() * NOTES.length)];
  // Randomly choose question type
  currentQuestionType = Math.random() < 0.5 ? 'note' : 'stringFinger';
  
  // Show staff image for the note
  if (staffImg) {
    let imgName = currentNote.id.toLowerCase();
    // Handle F# special case
    if (imgName === 'f#') {
      imgName = 'f_sharp';
    }
    staffImg.src = `img/treble_${imgName}.png`;
    staffImg.style.display = 'block';
  }
  
  // Update question text
  if (currentQuestionType === 'note') {
    feedback.textContent = '🎵 What note is this?';
  } else {
    feedback.textContent = '🎻 What string and finger?';
  }
  
  // Re-render choices for new question type
  renderChoices();
}

function checkAnswer(selectedId) {
  const correct = selectedId === currentNote.id;
  feedback.textContent = correct ? '✅ Correct!' : `❌ Oops! It was ${currentNote.id}`;
  updateStats(correct);
  setTimeout(() => {
    feedback.textContent = '';
    nextQuestion();
  }, 1500);
}

function checkStringFingerAnswer(selectedStringFinger) {
  const correct = selectedStringFinger === currentNote.stringFinger;
  feedback.textContent = correct ? '✅ Correct!' : `❌ Oops! It was ${currentNote.stringFinger}`;
  updateStats(correct);
  setTimeout(() => {
    feedback.textContent = '';
    nextQuestion();
  }, 1500);
}

function updateStats(correct) {
  score.total++;
  if (correct) score.correct++;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(score));
  updateScore();
}

function updateScore() {
  scoreEl.textContent = `Score: ${score.correct} / ${score.total}`;
} 