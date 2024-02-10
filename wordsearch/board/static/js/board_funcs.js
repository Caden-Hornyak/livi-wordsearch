
let current_word = document.getElementById("current_word");
let score = document.getElementById("score");
let score_adjust = document.getElementById("score_adjust");
let wrong_word = document.getElementById("wrong_word");
let word_dic;
let mouseDown = false;
let seen = {};
let completed_words = {};

// var ding_audio = new Audio('C:/Users/19494/Desktop/Coding/Python/WordSearchWeb/wordsearch/board/static/sounds/ding.mp3');


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
        mouseDown = true;
        addLetter.call(this);
    }
}

function handleLetterMouseUp() {
    mouseDown = false;

    for (var key in seen) {
        seen[key].style.backgroundColor = 'white';
        delete seen[key];
    }
    if (current_word.textContent in completed_words || !word_dic.hasOwnProperty(current_word.textContent.toLowerCase())) {
        var $curr_word = $("#current_word");

        // Set the color to red
        $curr_word.css("color", "red");

        // Add the class that includes the animation properties after a delay
        setTimeout(function() {
            $curr_word.addClass("animate__animated animate__shakeX animate_faster");

            // You can remove the class after the animation is complete
            setTimeout(function() {
                $curr_word.removeClass("animate__animated animate__shakeX animate_faster");

                // Set the color back to black
                $curr_word.css("color", "black");
                }, 500); // Adjust the timeout based on your animation duration
            }, 10); // Adjust the delay before applying the animation
            setTimeout(function() {current_word.textContent = "";
            }, 500);
    } else {
        var $score_change = $("score_adjust");
        score_adjust.textContent = current_word.textContent;
        $score_change.css("color", "green");

        setTimeout(function() {
            $score_change.addClass("animate__animated animate__fadeOutUp animate_faster");

            // You can remove the class after the animation is complete
            setTimeout(function() {
                $score_change.removeClass("animate__animated animate__fadeOutUp animate_faster");

                // Set the color back to black

                }, 500); // Adjust the timeout based on your animation duration
            }, 10); // Adjust the delay before applying the animation
            setTimeout(function() {
                score_adjust.textContent = "";
                current_word.textContent = "";
        }, 500);

        let curr_score = Number(score.textContent);
        // ding_audio.play();
        curr_score += current_word.textContent.length
        score.textContent = curr_score.toString();
        completed_words[current_word.textContent] =  1;
    }
    
}

let last_hovered = "";
function handleLetterHover() {
    if (last_hovered != this.id) {
        last_hovered = this.id;
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

function isAlpha(str) {
    return str.match(/^[a-zA-Z]+$/) !== null;
}

document.addEventListener('keydown', function(event) {
    if (event.key == 'Enter') {
        handleLetterMouseUp();
    } else if (event.key == 'Backspace') {
        current_word.textContent = current_word.textContent.slice(0, -1);
    }
    else if (event.key.length == 1 && isAlpha(event.key)) {
        current_word.textContent += event.key;
    }
});