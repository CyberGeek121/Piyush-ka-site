// Wait for the DOM to be fully loaded before running any scripts
document.addEventListener('DOMContentLoaded', function () {
    
    // Initialize Particles.js
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 700
                }
            },
            "color": {
                "value": "#2980b9"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false
            },
            "size": {
                "value": 3,
                "random": true
            },
            "move": {
                "enable": true,
                "speed": 2
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": false
                },
                "onclick": {
                    "enable": false
                },
                "resize": true
            }
        },
        "retina_detect": true
    });

    // Modal Handling for Hobbies
    const hobbiesButton = document.getElementById('hobbies-button');
    const hobbiesModal = document.getElementById('hobbies-modal');
    const closeHobbies = document.getElementById('close-hobbies');
    const hobbyItems = document.querySelectorAll('.hobby-item');
    const detailModal = document.getElementById('detail-modal');
    const closeDetail = document.getElementById('close-detail');
    const detailTitle = document.getElementById('detail-title');
    const detailText = document.getElementById('detail-text');

    // Open Hobbies Modal
    hobbiesButton.addEventListener('click', function () {
        hobbiesModal.style.display = 'block';
    });

    // Close Hobbies Modal
    closeHobbies.addEventListener('click', function () {
        hobbiesModal.style.display = 'none';
    });

    // Open Detail Modal when a hobby is hovered
    hobbyItems.forEach(function (item) {
        item.addEventListener('mouseover', function () {
            const title = item.textContent;
            const detail = item.getAttribute('data-detail');
            detailTitle.textContent = title;
            detailText.textContent = detail;
            detailModal.style.display = 'block';
        });
    });

    // Close Detail Modal
    closeDetail.addEventListener('click', function () {
        detailModal.style.display = 'none';
    });

    // Close modals when clicking outside of them
    window.addEventListener('click', function (event) {
        if (event.target === hobbiesModal) {
            hobbiesModal.style.display = 'none';
        }
        if (event.target === detailModal) {
            detailModal.style.display = 'none';
        }

        // Close game modals
        const gameModals = document.querySelectorAll('.game-modal');
        gameModals.forEach(function (modal) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    // High Scores Initialization
    const highScores = {
        'color-clicker': 0,
        'trivia-quiz': 0,
        'reaction-tester': 0,
        'typing-speed-test': 0
    };

    // Load High Scores from Local Storage
    window.onload = function () {
        for (let game in highScores) {
            const storedScore = localStorage.getItem(`highscore-${game}`);
            if (storedScore) {
                highScores[game] = game === 'reaction-tester' ? parseInt(storedScore) : parseInt(storedScore);
            }
        }
        updateHighScoresDisplay();
    };

    // Update High Scores Display
    function updateHighScoresDisplay() {
        document.getElementById('hs-color-clicker').textContent = highScores['color-clicker'];
        document.getElementById('hs-trivia-quiz').textContent = highScores['trivia-quiz'];
        document.getElementById('hs-reaction-tester').textContent = highScores['reaction-tester'] !== 0 ? highScores['reaction-tester'] : 'N/A';
        document.getElementById('hs-typing-speed-test').textContent = highScores['typing-speed-test'];

        // Also update individual game modals
        document.getElementById('color-clicker-highscore').textContent = highScores['color-clicker'];
        document.getElementById('quiz-highscore').textContent = highScores['trivia-quiz'];
        document.getElementById('reaction-besttime').textContent = highScores['reaction-tester'] !== 0 ? highScores['reaction-tester'] : 'N/A';
        document.getElementById('typing-highwpm').textContent = highScores['typing-speed-test'];
    }

    // Save High Score to Local Storage
    function saveHighScore(game, score) {
        if (game === 'reaction-tester') {
            if (highScores[game] === 0 || score < highScores[game]) {
                highScores[game] = score;
                localStorage.setItem(`highscore-${game}`, score);
                updateHighScoresDisplay();
            }
        } else if (game === 'color-clicker' || game === 'trivia-quiz' || game === 'typing-speed-test') {
            if (score > highScores[game]) {
                highScores[game] = score;
                localStorage.setItem(`highscore-${game}`, score);
                updateHighScoresDisplay();
            }
        }
    }

    // Game Button Event Listeners
    const gameButtons = document.querySelectorAll('.game-button');
    const gameModals = document.querySelectorAll('.game-modal');
    const gameCloses = document.querySelectorAll('.game-close');

    gameButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const game = button.getAttribute('data-game');
            document.getElementById(`${game}-modal`).style.display = 'block';
            if (game === 'color-clicker') startColorClicker();
            if (game === 'trivia-quiz') startTriviaQuiz();
            if (game === 'reaction-tester') startReactionTester();
            if (game === 'typing-speed-test') startTypingSpeedTest();
        });
    });

    gameCloses.forEach(function (close) {
        close.addEventListener('click', function () {
            gameModals.forEach(function (modal) {
                modal.style.display = 'none';
            });
        });
    });

    // Movies Carousel
    const carousel = document.querySelector('.movies-carousel');
    const prevButton = document.querySelector('.carousel-arrow.prev');
    const nextButton = document.querySelector('.carousel-arrow.next');
    let scrollPosition = 0;
    const cardWidth = 200; // 180px width + 20px gap

    function updateArrowsVisibility() {
        prevButton.style.display = scrollPosition <= 0 ? 'none' : 'block';
        nextButton.style.display = scrollPosition >= carousel.scrollWidth - carousel.clientWidth ? 'none' : 'block';
    }

    function scrollCarousel(direction) {
        const containerWidth = carousel.clientWidth;
        const scrollAmount = Math.floor(containerWidth / cardWidth) * cardWidth;

        if (direction === 'next' && scrollPosition < carousel.scrollWidth - carousel.clientWidth) {
            scrollPosition += scrollAmount;
        } else if (direction === 'prev' && scrollPosition > 0) {
            scrollPosition -= scrollAmount;
        }

        scrollPosition = Math.max(0, Math.min(scrollPosition, carousel.scrollWidth - carousel.clientWidth));
        carousel.style.transform = `translateX(-${scrollPosition}px)`;
        updateArrowsVisibility();
    }

    nextButton.addEventListener('click', () => scrollCarousel('next'));
    prevButton.addEventListener('click', () => scrollCarousel('prev'));

    // Initial visibility check
    updateArrowsVisibility();

    // Update visibility on window resize
    window.addEventListener('resize', updateArrowsVisibility);

    // Color Clicker Game
    let colorClickerInterval;
    let colorClickerScore = 0;
    let colorClickerTimer = 10;
    const colorClickerButton = document.getElementById('color-clicker-button');
    const colorClickerCPSSpan = document.getElementById('color-clicker-cps');
    const colorClickerHighScoreSpan = document.getElementById('color-clicker-highscore');
    const colorClickerTimerSelect = document.getElementById('color-clicker-timer');
    const customTimerInput = document.getElementById('custom-timer-input');

    let clickTimes = [];
    let gameStartTime = 0;

    // Handle Timer Selection
    colorClickerTimerSelect.addEventListener('change', () => {
        if (colorClickerTimerSelect.value === 'custom') {
            customTimerInput.style.display = 'block';
        } else {
            customTimerInput.style.display = 'none';
        }
    });

    // Start Color Clicker Game
    function startColorClicker() {
        // Reset score and click times
        colorClickerScore = 0;
        clickTimes = [];
        colorClickerCPSSpan.textContent = '0';

        // Determine timer
        const selectedTimer = colorClickerTimerSelect.value;
        if (selectedTimer === 'custom') {
            const customTime = parseInt(customTimerInput.value);
            if (isNaN(customTime) || customTime <= 0) {
                alert('Please enter a valid custom time in seconds.');
                document.getElementById('color-clicker-modal').style.display = 'none';
                return;
            }
            colorClickerTimer = customTime;
        } else {
            colorClickerTimer = parseInt(selectedTimer);
        }

        // Reset timer display
        const timerElement = document.getElementById('color-clicker-timer-display');
        if (timerElement) {
            timerElement.remove();
        }

        // Reset button state
        colorClickerButton.disabled = false;
        colorClickerButton.textContent = 'Click Me!';
        colorClickerButton.style.backgroundColor = '#e74c3c';
        colorClickerButton.style.cursor = 'pointer';

        // Append timer display
        const modalContent = document.querySelector('#color-clicker-modal .game-modal-content');

        const newTimerElement = document.createElement('p');
        newTimerElement.id = 'color-clicker-timer-display';
        newTimerElement.textContent = `Time Left: ${colorClickerTimer} seconds`;
        modalContent.appendChild(newTimerElement);

        // Change button to start the game when clicked
        colorClickerButton.onclick = () => {
            if (colorClickerScore === 0 && clickTimes.length === 0) {
                // Start the game
                gameStartTime = new Date().getTime();
                startCountdown(newTimerElement);
            }
            colorClickerScore++;
            clickTimes.push(new Date().getTime());
            calculateCPS();
        };
    }

    // Countdown Function
    function startCountdown(timerElement) {
        let timeLeft = colorClickerTimer;

        colorClickerInterval = setInterval(() => {
            timeLeft--;
            timerElement.textContent = `Time Left: ${timeLeft} seconds`;

            // Change text color based on time left
            const percentageLeft = timeLeft / colorClickerTimer;
            if (percentageLeft > 0.5) {
                timerElement.style.color = '#27ae60'; // Green
            } else if (percentageLeft > 0.2) {
                timerElement.style.color = '#f39c12'; // Orange
            } else {
                timerElement.style.color = '#e74c3c'; // Red
            }

            if (timeLeft <= 0) {
                endColorClickerGame();
            }
        }, 1000);
    }

    // Calculate CPS
    function calculateCPS() {
        const currentTime = new Date().getTime();
        // Remove clicks outside of game time
        clickTimes = clickTimes.filter(time => time >= gameStartTime);
        const totalClicks = clickTimes.length;
        const elapsedTimeInSeconds = (currentTime - gameStartTime) / 1000;
        const cps = elapsedTimeInSeconds > 0 ? (totalClicks / elapsedTimeInSeconds).toFixed(2) : 0;
        colorClickerCPSSpan.textContent = cps;
    }

    // End Color Clicker Game
    function endColorClickerGame() {
        clearInterval(colorClickerInterval);
        colorClickerButton.disabled = true;
        colorClickerButton.textContent = 'Time Up!';
        colorClickerButton.style.backgroundColor = '#95a5a6';
        colorClickerButton.style.cursor = 'not-allowed';

        // Calculate CPS accurately
        const finalCPS = colorClickerCPSSpan.textContent;
        colorClickerCPSSpan.textContent = finalCPS;

        // Update High Score
        saveHighScore('color-clicker', finalCPS);

        // Flash background briefly
        document.body.style.backgroundColor = '#2ecc71';
        setTimeout(() => {
            document.body.style.backgroundColor = '#f0f4f8';
        }, 500);
    }

    // Trivia Quiz Game
    let currentQuizQuestion = {};
    let quizScore = 0;
    let quizStreak = 0;
    const quizQuestionElement = document.getElementById('quiz-question');
    const quizOptionsContainer = document.getElementById('quiz-options');
    const nextQuestionBtn = document.getElementById('next-question');
    const retryQuizBtn = document.getElementById('retry-quiz');
    const quizScoreSpan = document.getElementById('quiz-score');
    const quizStreakSpan = document.getElementById('quiz-streak');
    const quizHighScoreSpan = document.getElementById('quiz-highscore');

    let isFetchingQuiz = false;

    // Start Trivia Quiz
    function startTriviaQuiz() {
        if (isFetchingQuiz) return; // Prevent multiple fetches
        quizScore = 0;
        quizStreak = 0;
        quizScoreSpan.textContent = quizScore;
        quizStreakSpan.textContent = quizStreak;
        fetchNextQuestion();
    }

    // Fetch Next Question from Open Trivia DB API with Error Handling
    async function fetchNextQuestion() {
        if (isFetchingQuiz) return;
        isFetchingQuiz = true;
        quizOptionsContainer.innerHTML = 'Loading question...';
        quizQuestionElement.textContent = 'Fetching question...';
        try {
            const response = await fetch('https://opentdb.com/api.php?amount=1&type=multiple');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            if (data.response_code === 0 && data.results.length > 0) {
                currentQuizQuestion = data.results[0];
                displayQuizQuestion();
            } else {
                throw new Error('No questions available');
            }
        } catch (error) {
            console.error('Error fetching trivia questions:', error);
            quizQuestionElement.textContent = 'Failed to load question.';
            addRetryButton();
        }
        isFetchingQuiz = false;
    }

    // Display Quiz Question
    function displayQuizQuestion() {
        quizQuestionElement.innerHTML = decodeHTML(currentQuizQuestion.question);
        const options = [...currentQuizQuestion.incorrect_answers];
        options.push(currentQuizQuestion.correct_answer);
        shuffleArray(options);
        quizOptionsContainer.innerHTML = '';
        options.forEach(option => {
            const button = document.createElement('button');
            button.classList.add('quiz-option');
            button.innerHTML = decodeHTML(option);
            button.onclick = () => selectQuizOption(option);
            quizOptionsContainer.appendChild(button);
        });
    }

    // Select Quiz Option
    function selectQuizOption(selectedOption) {
        const correctAnswer = decodeHTML(currentQuizQuestion.correct_answer);
        const allOptions = document.querySelectorAll('.quiz-option');
        allOptions.forEach(button => {
            button.disabled = true;
            if (button.textContent === correctAnswer) {
                button.style.backgroundColor = '#27ae60'; // Correct answer
            } else if (button.textContent === decodeHTML(selectedOption)) {
                button.style.backgroundColor = '#e74c3c'; // Incorrect selection
            }
        });

        if (selectedOption === correctAnswer) {
            quizScore++;
            quizStreak++;
            quizScoreSpan.textContent = quizScore;
            quizStreakSpan.textContent = quizStreak;
        } else {
            quizStreak = 0;
            quizStreakSpan.textContent = quizStreak;
        }

        // Update High Score
        saveHighScore('trivia-quiz', quizScore);

        nextQuestionBtn.style.display = 'block';
    }

    // Next Question
    nextQuestionBtn.onclick = () => {
        nextQuestionBtn.style.display = 'none';
        fetchNextQuestion();
    }

    // Add Retry Button
    function addRetryButton() {
        retryQuizBtn.style.display = 'block';
    }

    retryQuizBtn.onclick = () => {
        retryQuizBtn.style.display = 'none';
        startTriviaQuiz();
    }

    // Decode HTML entities
    function decodeHTML(html) {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    }

    // Reaction Tester Game
    let reactionStartTime, reactionEndTime;
    let reactionTimeout;
    const reactionBox = document.getElementById('reaction-box');
    const reactionInstruction = document.getElementById('reaction-instruction');
    const reactionTimeSpan = document.getElementById('reaction-time');
    const reactionBestTimeSpan = document.getElementById('reaction-besttime');
    const reactionFunFact = document.getElementById('reaction-funfact');

    let reactionTestInProgress = false;

    // Start Reaction Tester
    function startReactionTester() {
        if (reactionTestInProgress) return; // Prevent multiple tests
        reactionTestInProgress = true;

        reactionTimeSpan.textContent = '0';
        reactionFunFact.textContent = '';
        reactionInstruction.textContent = 'Wait for the color to change, then click as fast as you can!';
        reactionBox.style.backgroundColor = '#e74c3c';
        reactionBox.textContent = 'Wait...';
        reactionBox.style.cursor = 'default';
        reactionEndTime = 0;

        // Remove any event listeners to prevent spamming
        reactionBox.onclick = null;

        // Set random timeout between 2 to 5 seconds
        const randomDelay = Math.floor(Math.random() * 3000) + 2000;
        reactionTimeout = setTimeout(() => {
            reactionStartTime = new Date().getTime();
            reactionBox.style.backgroundColor = '#27ae60';
            reactionBox.textContent = 'Click!';
            reactionBox.style.cursor = 'pointer';

            // Assign a single-click event
            reactionBox.onclick = handleReactionClick;
        }, randomDelay);
    }

    // Handle Reaction Click
    function handleReactionClick() {
        if (!reactionTestInProgress) return;
        reactionEndTime = new Date().getTime();
        const reactionTime = reactionEndTime - reactionStartTime;

        reactionTimeSpan.textContent = reactionTime;
        reactionBox.style.backgroundColor = '#2980b9';
        reactionBox.textContent = 'Start Again';
        reactionBox.style.cursor = 'pointer';
        reactionFunFact.textContent = getReactionFunFact(reactionTime);

        // Update Best Time
        saveHighScore('reaction-tester', reactionTime);

        // Reset for next test
        reactionTestInProgress = false;

        // Assign the restart function
        reactionBox.onclick = startReactionTester;
    }

    // Get Reaction Fun Fact based on reaction time
    function getReactionFunFact(reactionTime) {
        let fact = "";
        if (reactionTime <= 200) {
            fact = "Incredible! You're lightning fast.";
        } else if (reactionTime <= 250) {
            fact = "Great job! You're faster than average.";
        } else if (reactionTime <= 300) {
            fact = "Good speed! Keep practicing to get even quicker.";
        } else {
            fact = "Not bad, but there's room for improvement.";
        }
        fact += " Average human reaction time is around 250 milliseconds.";
        return fact;
    }

    // Typing Speed Test Game
    let typingTimerInterval;
    let typingTimeLeft = 10; // Reduced to 10 seconds
    let typingStartTime;
    let typingWordsTyped = 0;
    let typingCorrectChars = 0;
    let typingTotalChars = 0;
    let typingSampleText = '';
    let typingBestWPM = 0;
    let typingAccuracy = 0;
    let typingSubmitted = false;

    const typingTextElement = document.getElementById('typing-text');
    const typingInput = document.getElementById('typing-input');
    const typingStartBtn = document.getElementById('typing-start');
    const typingSubmitBtn = document.getElementById('typing-submit');
    const typingTimerSpan = document.getElementById('typing-timer');
    const typingWPMSpan = document.getElementById('typing-wpm');
    const typingAccuracySpan = document.getElementById('typing-accuracy');
    const typingHighWPMSpan = document.getElementById('typing-highwpm');

    let typingTestInProgress = false;

    // Sample Texts
    const sampleTexts = [
        "The quick brown fox jumps over the lazy dog.",
        "Artificial Intelligence is transforming the world.",
        "Web development is both challenging and rewarding.",
        "Geopolitics plays a crucial role in international relations.",
        "Science uncovers the mysteries of the universe.",
        "Consistency is the key to mastery.",
        "Curiosity drives innovation and discovery.",
        "Efficiency enhances productivity in every task.",
        "Creativity fuels progress and unique solutions.",
        "Perseverance leads to success despite obstacles."
    ];

    // Disable Copy and Paste
    typingInput.addEventListener('paste', (e) => {
        e.preventDefault();
    });

    typingInput.addEventListener('copy', (e) => {
        e.preventDefault();
    });

    // Start Typing Speed Test
    function startTypingSpeedTest() {
        if (typingTestInProgress) return; // Prevent multiple tests
        typingTestInProgress = true;
        typingSubmitted = false;

        // Reset variables
        typingWordsTyped = 0;
        typingCorrectChars = 0;
        typingTotalChars = 0;
        typingAccuracy = 0;
        typingWPMSpan.textContent = '0';
        typingAccuracySpan.textContent = '0';
        typingInput.value = '';
        typingInput.disabled = false;
        typingSubmitBtn.style.display = 'none';
        typingStartBtn.style.display = 'none';
        typingSampleText = getRandomText();
        typingTextElement.textContent = typingSampleText;
        typingTimeLeft = 10; // 10 seconds
        typingTimerSpan.textContent = typingTimeLeft;
        typingHighWPMSpan.textContent = highScores['typing-speed-test'] !== 0 ? highScores['typing-speed-test'] : '0';

        // Clear any previous timers
        clearInterval(typingTimerInterval);

        // Start Timer
        typingTimerInterval = setInterval(() => {
            typingTimeLeft--;
            typingTimerSpan.textContent = typingTimeLeft;
            if (typingTimeLeft <= 0) {
                endTypingSpeedTest();
            }
        }, 1000);

        // Enable input
        typingInput.disabled = false;
        typingInput.focus();

        // Set event listeners
        typingInput.value = '';
        typingInput.style.borderColor = '#2980b9';
        typingInput.addEventListener('input', handleTypingInput);

        // Allow end test by pressing Enter
        typingInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                endTypingSpeedTest();
            }
        });
    }

    // Get Random Sample Text
    function getRandomText() {
        const index = Math.floor(Math.random() * sampleTexts.length);
        return sampleTexts[index];
    }

    // Handle Typing Input
    function handleTypingInput() {
        const input = typingInput.value;
        typingCorrectChars = 0;
        typingTotalChars = input.length;

        for (let i = 0; i < input.length; i++) {
            if (input[i] === typingSampleText[i]) {
                typingCorrectChars++;
            }
        }

        typingWordsTyped = input.trim().split(/\s+/).length;
        typingAccuracy = typingTotalChars === 0 ? 0 : ((typingCorrectChars / typingTotalChars) * 100).toFixed(2);
        typingAccuracySpan.textContent = typingAccuracy;
    }

    // End Typing Speed Test
    function endTypingSpeedTest() {
        if (typingSubmitted) return;
        typingSubmitted = true;
        typingTestInProgress = false;

        clearInterval(typingTimerInterval);
        typingInput.disabled = true;
        typingSubmitBtn.style.display = 'block';
        typingStartBtn.style.display = 'block';

        typingSubmitBtn.onclick = calculateTypingResults;
    }

    // Calculate Typing Results
    function calculateTypingResults() {
        if (typingSubmitted) return;
        typingSubmitted = true;

        // Calculate WPM: words typed
        const wpm = Math.floor(typingWordsTyped * (60 / 10)); // Since time is 10 seconds
        typingWPMSpan.textContent = wpm;
        typingAccuracySpan.textContent = typingAccuracy;

        // Update High WPM
        if (wpm > highScores['typing-speed-test']) {
            saveHighScore('typing-speed-test', wpm);
            typingHighWPMSpan.textContent = highScores['typing-speed-test'];
        }

        alert(`Test Completed!\nWPM: ${wpm}\nAccuracy: ${typingAccuracy}%`);
    }

    // Utility Functions
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Initialize games
    startColorClicker();
    startTriviaQuiz();
    startReactionTester();
    startTypingSpeedTest();
});

// Firebase Realtime Database Integration
function loadMessages() {
    db.collection('messages').orderBy('timestamp')
        .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    const message = change.doc.data();
                    displayMessage(message.sender, message.message);
                }
            });
        });
}

function displayMessage(sender, message) {
    // Add the message to your chat UI
    // Implementation depends on your specific UI structure
}