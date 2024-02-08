let current_word = document.getElementById("current_word");
let score = document.getElementById("score");
let wrong_word = document.getElementById("wrong_word");
let word_dic;
let mouseDown = false;
let seen = {};
let completed_words = {};

var ding_audio = new Audio('C:\Users\19494\Desktop\Coding\Python\WordSearchWeb\wordsearch\board\static\sounds\ding.mp3');


document.addEventListener('DOMContentLoaded', function () {
    word_dic = JSON.parse(document.getElementById('wordDefinitions').getAttribute('data-words'));
});

const boardLetters = document.querySelectorAll('.board_letters');

boardLetters.forEach(letter => {
    letter.addEventListener('mousedown', handleLetterDown);
    letter.addEventListener('mouseover', handleLetterHover);
    letter.addEventListener('mouseup', handleLetterMouseUp);
});

function handleLetterDown() {
    if (!mouseDown) {
        console.log("Mouse down!");
        mouseDown = true;
        addLetter.call(this);
    }
}

function handleLetterMouseUp() {
    console.log("Mouse up!");
    mouseDown = false;

    for (var key in seen) {
        seen[key].style.backgroundColor = 'white';
        delete seen[key];
    }
    if (current_word.textContent in completed_words) {
        wrong_word.textContent = current_word.textContent + " already entered.";
    } else if (word_dic.hasOwnProperty(current_word.textContent.toLowerCase())) {
        let curr_score = Number(score.textContent);
        ding_audio.play();
        curr_score += current_word.textContent.length
        score.textContent = curr_score.toString();
        completed_words[current_word.textContent] =  1;
        wrong_word.textContent = "";
    } else {
        wrong_word.textContent = current_word.textContent + " is invalid.";
    }
    current_word.textContent = "";
}

let last_hovered = "";
function handleLetterHover() {
    if (last_hovered != this.id) {
        last_hovered = this.id;
        console.log("Mouse Hover!", mouseDown);
        if (mouseDown) {
            addLetter.call(this);
        }
    }
}

function addLetter() {
    this.style.backgroundColor = 'lightgreen';
    id = this.id;
    let char = "", pos_id = "";
    for (let i = 0; i < id.length; i++) {
        if (id.charCodeAt(i) <= 57) {
            pos_id += id[i];
        } else {
            char += id[i];
        }
    }

    if (pos_id in seen) {
        console.log("Im calling mouseUp :)")
        handleLetterMouseUp()
        return;
    } else {
        seen[pos_id] = this;
    }
        

    if (current_word.textContent.length > 0) {
        current_word.textContent += char.toLowerCase();
    } else {
        current_word.textContent += char;
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key == 'Enter') {
        handleLetterMouseUp();
    } else {
        current_word.textContent += event.key;
    }
});