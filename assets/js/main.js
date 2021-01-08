//Quiz questions and answers in an object oriented format
const questionEl = document.querySelector('#question');
const choicesEl = Array.from(document.querySelectorAll('.choice-text'));
const progressTextEl = document.querySelector('#progress-text');
const timerTextEl = document.querySelector('#timer');
const progressBarFullEl = document.querySelector('#progress-bar-full');

let currentQuestion = {};
let acceptingAnswers = true;
let timer = 120;
let questionCounter = 0;
let availableQuestions = [];
let timerObject = '';
let question = [
	{
		question: "What does 'DOM' stand for?",
		choice1: "Document Old Model",
		choice2: "Document Object Model",
		choice3: "Document Odd Movement",
		choice4: "None of the above",
		answer: 2,
	},
	{
		question: "A very useful tool during development for debugging and printing content is...?",
		choice1: "developer extensions",
		choice2: "praying to the coding gods",
		choice3: "git status",
		choice4: "console.log",
		answer: 4,
	},
	{
		question: "Which of the following commands is wrong?",
		choice1: "document.addeventlistener('click', myNewFunction)",
		choice2: "document.getElementById('main-content')",
		choice3: "progress = `You have completed ${currentQuestion} of ${totalQuestions}`",
		choice4: "numbers.sort((a, b) => a - b",
		answer: 1,
	},
	{
		question: "Which of the following is possible with the filter() method?",
		choice1: "Find words of a certain length in an array",
		choice2: "Remove duplicate items in an array",
		choice3: "Find items in an array based on value",
		choice4: "All of the above",
		answer: 4,
	},
	{
		question: "Given a string, which property will return its number of characters?",
		choice1: "string.size",
		choice2: "string.originChar",
		choice3: "string.length",
		choice4: "None of the above",
		answer: 3,
	},
	{
		question: "What does JSON stand for?",
		choice1: "Jack Slept on Nickles",
		choice2: "JavaScript Object Notation",
		choice3: "Joint System Object Notation",
		choice4: "None of the above",
		answer: 2,
	},
	{
		question: "Who created JavaScript?",
		choice1: "Chris Beard",
		choice2: "Douglas Crockford",
		choice3: "Brendan Eich",
		choice4: "Robert Martin",
		answer: 3,
	},
	{
		question: "What does API stand for?",
		choice1: "Application Programming Interface",
		choice2: "Application Program Interface",
		choice3: "Application Programming Instructions",
		choice4: "Application Peeling Internally",
		answer: 1,
	},
	{
		question: "What are '...' called when used with an array or object?",
		choice1: "Rest Operator",
		choice2: "Silencers",
		choice3: "Spread Operator",
		choice4: "None of the Above",
		answer: 3,
	},
	{
		question: "What is the only way to control variable scope?",
		choice1: "A 'const' declaration",
		choice2: "Yelling at it, until it learns",
		choice3: "DOM Manipulation",
		choice4: "Functions",
		answer: 4,
	},
	{
		question: "How do you create a DIV?",
		choice1: "document.createClassID('div')",
		choice2: "document.querySelector('div')",
		choice3: "document.createElement('div')",
		choice4: "document.textalign('div')",
		answer: 3,
	},
	{
		question: "How would you check if the variable 'foo' is equal to exactly 5 OR is equal to exactly 7?",
		choice1: "if (foo === 5 || foo === 7)",
		choice2: "if (foo == 5 || foo == 7)",
		choice3: "if (foo === 5 && foo ===7)",
		choice4: "if (foo == 5 && foo == 7)",
		answer: 1,
	},
	{
		question: "What is used to declare a variable?",
		choice1: "var",
		choice2: "let",
		choice3: "const",
		choice4: "All of the Above",
		answer: 4,
	},
	{
		question: "Which is a correct JavaScript file?",
		choice1: "JS.file",
		choice2: "Script.js",
		choice3: "JavaScript.html",
		choice4: "Java.script",
		answer: 2,
	},
	{
		question: "What case is most commonly used to declare variables?",
		choice1: "Backpack Case",
		choice2: "Upper Case",
		choice3: "Camel Case",
		choice4: "Lower Case",
		answer: 3,
	}
]

// set points per correct answer and number of questions
const SCORE_POINTS = 100;
const MAX_QUESTIONS = 10;

// ensure game variables are reset for each new game
var startGame = function() {
	questionCounter = 0;
	score = 0;
	availableQuestions = [...question];
	timerObject = setInterval(displayTime, 1000);
	getNewQuestion();
};

// decrement timer and go to end screen when time runs out
function displayTime() {
	timerTextEl.innerHTML = timer;
	if(timer > 0) {
		timer--;
	} else {
		localStorage.setItem('mostRecentScore', score);

		return window.location.assign('./end-game.html');
	}
}

// Question generator
var getNewQuestion = function() {
	// check if availableQuestions list is depleted or MAX_QUESTIONS limit reached
	if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
		// end quiz and save user score
		localStorage.setItem('mostRecentScore', score);

		return window.location.assign('./end-game.html');
	}

	questionCounter++;
	// visual and numeric tracker HUD
	progressTextEl.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
	progressBarFullEl.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

	// randomize question pool and set current question and choices for display
	const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
	currentQuestion = availableQuestions[questionsIndex];
	questionEl.innerText = currentQuestion.question;
	
	// iterate choices and assign correct location by dataset
	choicesEl.forEach(choice => {
		const number = choice.dataset['number']
		choice.innerText = currentQuestion['choice' + number]
	})
	
	// remove question from array to prevent duplication
	availableQuestions.splice(questionsIndex, 1);

	acceptingAnswers = true;
};

// check correct and incorrect 
choicesEl.forEach(choice => {
	choice.addEventListener('click', e => {
		if(!acceptingAnswers) return
		
		acceptingAnswers = false
		const selectedChoice = e.target;
		const selectedAnswer = selectedChoice.dataset['number']

		// assign class for style to be applied (green for correct and red for incorrect)
		let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
		if(classToApply === 'correct') {
			score += SCORE_POINTS;
			// incrementScore(SCORE_POINTS);
		}
		else {
			// penalize incorrect answer
			timer = timer - 10;
		}

		selectedChoice.parentElement.classList.add(classToApply);

		// add 1 second delay for user to see color change and identify correct/incorrect responses
		setTimeout(() => {
			selectedChoice.parentElement.classList.remove(classToApply);
			getNewQuestion();
		}, 1000)
	})
})

startGame();