const usernameEl = document.querySelector('#username');
const saveScoreBtnEl = document.querySelector('#saveScoreBtn');
const finalScoreEl = document.querySelector('#finalScore');
const mostRecentScoreEl = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;

finalScoreEl.innerText = mostRecentScoreEl;

usernameEl.addEventListener('keyup', () => {
  saveScoreBtnEl.disabled = !usernameEl.value
});

/* compare previous scores with current */
var saveHighScore = function(e) {
  e.preventDefault();

  const score = {
    score: mostRecentScoreEl,
    name: usernameEl.value,
  }

  /* add current score to high scores then reset from high to low */
  highScores.push(score);

  highScores.sort((a,b) => {
    return b.score - a.score
  })

  /* Show 5 highest scores */
  highScores.splice(5);

  /* Add scores to local storage then open */
  localStorage.setItem('highScores', JSON.stringify(highScores));
  window.location.assign('../htmls/highscores.html')
}