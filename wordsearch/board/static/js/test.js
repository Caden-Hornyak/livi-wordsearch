let current_word = document.getElementById("current_word");

function letter_press(letter) {
    console.log(letter);
    current_word.textContent += letter;
}

function submit_word() {
    current_word.textContent = "Word: ";
}