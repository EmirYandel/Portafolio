const words = {
    easy: [
        { english: "apple", spanish: "manzana" },
        { english: "house", spanish: "casa" },
        { english: "dog", spanish: "perro" },
        { english: "car", spanish: "coche" },
        { english: "sun", spanish: "sol" }
    ],
    medium: [
        { english: "bottle", spanish: "botella" },
        { english: "cloud", spanish: "nube" },
        { english: "river", spanish: "río" },
        { english: "mountain", spanish: "montaña" },
        { english: "window", spanish: "ventana" }
    ],
    hard: [
        { english: "thunderstorm", spanish: "tormenta eléctrica" },
        { english: "butterfly", spanish: "mariposa" },
        { english: "whisper", spanish: "susurro" },
        { english: "knowledge", spanish: "conocimiento" },
        { english: "friendship", spanish: "amistad" }
    ]
};

let difficulty = "easy";
let currentWords = [];
let currentWordIndex = 0;
let score = 0;
let timer = 30;
let timerInterval;

document.addEventListener("DOMContentLoaded", () => {
    loadWordList();
});

function setDifficulty() {
    difficulty = document.getElementById("difficulty").value;
    resetGame();
}

function resetGame() {
    clearInterval(timerInterval);
    timer = 30;
    document.getElementById("timer").textContent = timer;
    document.getElementById("score").textContent = "0";
    document.getElementById("feedback").textContent = "";
    document.getElementById("answer").value = "";
    document.getElementById("answer").disabled = true;
    document.getElementById("word").textContent = "Haz clic en 'Iniciar Juego'";
    currentWords = [...words[difficulty]].sort(() => Math.random() - 0.5);
    currentWordIndex = 0;
}

function startGame() {
    resetGame();
    document.getElementById("answer").disabled = false;
    loadWord();
    startTimer();
}

function loadWord() {
    if (currentWordIndex < currentWords.length) {
        document.getElementById("word").textContent = currentWords[currentWordIndex].english;
    } else {
        endGame();
    }
}

function checkAnswer() {
    if (currentWordIndex >= currentWords.length) return;

    const userAnswer = document.getElementById("answer").value.toLowerCase();
    const correctAnswer = currentWords[currentWordIndex].spanish.toLowerCase();

    if (userAnswer === correctAnswer) {
        score++;
        document.getElementById("feedback").textContent = "¡Correcto!";
    } else {
        document.getElementById("feedback").textContent = `Incorrecto. La respuesta es "${correctAnswer}"`;
    }

    document.getElementById("score").textContent = score;
    document.getElementById("answer").value = "";
    currentWordIndex++;
    loadWord();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timer--;
        document.getElementById("timer").textContent = timer;

        if (timer <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(timerInterval);
    document.getElementById("feedback").textContent = "¡Tiempo terminado! Tu puntuación: " + score;
    document.getElementById("answer").disabled = true;
    document.getElementById("word").textContent = "Juego terminado";
}

function loadWordList() {
    const list = document.getElementById("wordList");
    list.innerHTML = "";

    Object.values(words).flat().forEach(pair => {
        const listItem = document.createElement("li");
        listItem.textContent = `${pair.english} - ${pair.spanish}`;
        list.appendChild(listItem);
    });
}
