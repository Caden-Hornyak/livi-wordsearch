let current_word = document.getElementById("current_word");
let score = document.getElementById("score");
let wrong_word = document.getElementById("wrong_word");
let word_dic;

document.addEventListener('DOMContentLoaded', function () {
    word_dic = JSON.parse(document.getElementById('wordDefinitions').getAttribute('data-words'));
});

function letter_press(letter) {
    console.log(letter);
    current_word.textContent += letter;
}

function submit_word() {
    console.log(current_word.textContent.toLowerCase());
    if (word_dic.hasOwnProperty(current_word.textContent.toLowerCase())) {
        let curr_score = Number(score.textContent);
        curr_score += current_word.textContent.length
        console.log(curr_score);
        score.textContent = curr_score.toString();
        wrong_word.textContent = "";
    } else {
        wrong_word.textContent = current_word.textContent + " is invalid";
    }
    current_word.textContent = "";
}

