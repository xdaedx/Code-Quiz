const highScoresListEl = document.querySelector('#highScoresList');
const highScoresEl = JSON.parse(localStorage.getItem('highScores')) || [];

// take in new highScores array and create list by name and score
highScoresListEl.innerHTML = highScoresEl.map(score => {
  return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join('');