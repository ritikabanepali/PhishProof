
function startQuiz() {
    document.getElementById("level-info").textContent = `Level: ${levels[currentLevelIndex].name}`;
    resetScore();
    loadQuestion();
}

const levels = [
    {
        name: "Easy",
        questions: [
            {
                question: "Samira needs to create a password for her online account. What should we do to make it secure?",
                options: [
                    "Use her first name and birthday",
                    "Use a combination of letters, numbers, and special characters",
                    "Use the word 'password'"
                ],
                correct: 1,
                explanation: "Using a mix of characters makes the password harder to guess and increases security."
            },
            {
                question: "Samira connects to a public wifi network at a coffee shop. What should she avoid doing?",
                options: [
                    "Browsing the internet for fun",
                    "Checking her email",
                    "Entering sensitive information, like bank details"
                ],
                correct: 2,
                explanation: "Public wifi networks are not secure and can be easily intercepted by others."
            },
            {
                question: "Samira notices a social media app is asking for permission to access her location. What's the safest action?",
                options: [
                    "Deny the request unless necessary for the app",
                    "Allow it for all apps"
                ],
                correct: 0,
                explanation: "Denying unnecessary location requests helps protect your privacy."
            },
            {
                question: "Samira receives a pop-up ad offering a free gift if she enters her credit card details. Should she do it?",
                options: [
                    "Yes, it's a free gift!",
                    "No, it's probably a scam"
                ],
                correct: 1,
                explanation: "Pop-up ads offering free gifts are often scams designed to steal your personal information."
            }
        ]
    },
    {
        name: "Medium",
        questions: [
            {
                question: "Samira's friend sends her a message about winning a prize if she forwards the message to 10 people. What is this called?",
                options: [
                    "A phishing attack",
                    "A chain message or hoax"
                ],
                correct: 1,
                explanation: "Forwarding chain messages spreads misinformation or leads to scams."
            },
            {
                question: "Samira is asked to verify her account by entering a code sent to her phone. What type of security feature is this?",
                options: [
                    "Two-factor authentication",
                    "CAPTCHA"
                ],
                correct: 0,
                explanation: "Two-factor authentication adds an extra layer of security by requiring both your password and a code sent to your phone."
            },
            {
                question: "Samira received a notification about a security update for her phone, but she's in the middle of something. What should she do?",
                options: [
                    "Delay the update until she's finished with her task",
                    "Install the security update as soon as possible to avoid vulnerabilities"
                ],
                correct: 1,
                explanation: "Security updates fix bugs or vulnerabilities that can be exploited by hackers."
            },
            {
                question: "Samira wants to check her bank account online, but she's using a public wifi network. What should she do?",
                options: [
                    "Use a virtual private network (VPN) for added security",
                    "Access her bank account without worrying about security"
                ],
                correct: 0,
                explanation: "A VPN encrypts your data on public wifi and makes it safer."
            }
        ]
    },
    {
        name: "Intermediate",
        questions: [
            {
                question: "Which of the following would be the best password for Samira to use for a new online account she is creating?",
                options: [
                    "july272004",
                    "pudding123",
                    "Foodtruck3859!"
                ],
                correct: 2,
                explanation: "This password is strong because it combines upper- and lowercase letters, numbers, and a special character."
            },
            {
                question: "Samira receives a notification about an unusual login attempt to her account from a foreign country. Which type of cyber security feature should she have in place to mitigate this risk?",
                options: [
                    "Virtual private network (VPN)",
                    "Multi-factor authentication (MFA)"
                ],
                correct: 1,
                explanation: "MFA provides an additional layer of security by requiring both a password and another factor to log in."
            },
            {
                question: "Samira enters her credit card details to make a purchase. How can she ensure her card information stays secure online?",
                options: [
                    "Only use websites with 'https' in the URL and a secure payment gateway",
                    "Save her credit card details in the browser for faster checkout"
                ],
                correct: 0,
                explanation: "'https' ensures that the connection between your device and the website is encrypted."
            },
            {
                question: "Samira is concerned about the tracking of her online activities through cookies. Which of the following actions can help reduce her exposure to tracking cookies?",
                options: [
                    "Enable 'do not track' in her browser settings",
                    "Clear her browser history only"
                ],
                correct: 0,
                explanation: "Enabling 'do not track' helps prevent tracking cookies."
            }
        ]
    }
];

let currentLevelIndex = 0;
let currentQuestionIndex = 0;
let score = 0;
let sectionsPassed = 0;
const totalSections = 3; // We have 3 levels (Easy, Medium, Intermediate)
const requiredSectionsToPass = 2; // Must pass 2 out of 3 levels to pass overall
const passingScorePerLevel = 4; // Must get all 4 correct to pass a level

// Reset the score for the new level
function resetScore() {
    score = 0; // Reset the score to 0
    document.getElementById("score-count").textContent = score; // Update the displayed score
}

// Function to load a question
function loadQuestion() {
    const level = levels[currentLevelIndex];
    const questionObj = level.questions[currentQuestionIndex];
    document.getElementById("question").textContent = questionObj.question;

    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = ""; // Clear previous options

    questionObj.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(button);
    });
}

// Function to check if the selected answer is correct
function checkAnswer(selectedOption) {
    const level = levels[currentLevelIndex];
    const questionObj = level.questions[currentQuestionIndex];

    // Check if the selected answer is correct
    if (selectedOption === questionObj.correct) {
        score++;  // Increment the score if the answer is correct
        document.getElementById("score-count").textContent = score;
    }

    // Move to the next question or end the level
    currentQuestionIndex++;

    // If there are more questions, show the "Next" button
    if (currentQuestionIndex < level.questions.length) {
        document.getElementById("next-button").classList.remove("hidden");
    } else {
        endLevel(); // If no more questions, end the level
    }
}

// Function to move to the next question
function nextQuestion() {
    document.getElementById("next-button").classList.add("hidden");
    loadQuestion();
}

// Function to end a level
function endLevel() {
    // Check if the user passed this level (must get exactly 4 correct)
    if (score === passingScorePerLevel) {
        sectionsPassed++; // User passed this level
        document.getElementById("levels-passed-count").textContent = sectionsPassed; // Update levels passed count
    }

    // Reset question index and score for the next level
    currentQuestionIndex = 0;
    score = 0; // Reset score for the next level
    currentLevelIndex++;

    if (currentLevelIndex < levels.length) {
        // Load the next level if available
        startQuiz();
    } else {
        // After completing all levels, check if enough sections were passed
        if (sectionsPassed >= requiredSectionsToPass) {
            endQuiz(true); // Pass the quiz
        } else {
            endQuiz(false); // Fail the quiz
        }
    }
}

// Function to handle quiz completion
function endQuiz(passed) {
    if (passed) {
        alert(`Quiz completed! You passed ${sectionsPassed} out of ${totalSections} levels. Great job!`);
    } else {
        alert("You did not pass enough levels to complete the quiz. Please try again.");
    }

    // Show the restart button at the end of the quiz
    document.getElementById("restart-quiz").classList.remove("hidden");
}

// Function to restart the quiz
function restartQuiz() {
    currentLevelIndex = 0;
    currentQuestionIndex = 0;
    score = 0;
    sectionsPassed = 0; // Reset passed sections count
    document.getElementById("score-count").textContent = score;
    document.getElementById("levels-passed-count").textContent = sectionsPassed; // Reset levels passed count
    document.getElementById("restart-quiz").classList.add("hidden"); // Hide restart button

    startQuiz();
}

// Start the quiz when the page loads
document.addEventListener("DOMContentLoaded", startQuiz);
