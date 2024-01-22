//  получить данные по апи
//  вставить слово в контейнер
//  добавить функционал для воспроизведения звука
//  вставить в контейнер с результатами
 
const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

// СОБЫТИЯ 

const inputWord = document.getElementById("word-input"); 
const formText = document.querySelector(".form"); 
const resultWord = document.querySelector(".results-word");
const resultSound = document.querySelector(".results-sound");
const results = document.querySelector(".results");
const resultsList = document.querySelector(".results-list");
const error = document.querySelector(".error");

let state = {
    wordObject: ''
}

const inputWordCallBack = function () {

}

const submitForm = async function (a) {
    a.preventDefault();

    try {
        let word = await fetch(`${url}${inputWord.value}`);
        let wordJSON = await word.json();
        state.wordObject = wordJSON[0];
        console.log(wordJSON[0]);
        resultWord.innerHTML = wordJSON[0].word;
        addWordElements();
        results.style.display = 'block';
    } catch (e) {
        console.error('Произошла ошибка в получении Слова: ' + e);
        results.style.display = 'none';
        error.style.display = 'block';
        
    }

    return state;
}

const addWordElements = function () {
    results.style.display = 'block';
    resultsList.innerHTML = '';
    error.style.display = 'none';

    for (let i = 0; i < state.wordObject.meanings.length; i++) {
        resultsList.insertAdjacentHTML('beforeend',
         `
            <div class="results-item">
                <div class="results-item-part">
                    <p>${state.wordObject.meanings[i].partOfSpeech}</p>
                </div>
            </div>
         `);

         var resultsItem = resultsList.lastElementChild;

         for (let j = 0; j < state.wordObject.meanings[i].definitions.length; j++) {
             resultsItem.insertAdjacentHTML('beforeend', 
             `
             <div class="results-item__definitions">
                <div class="results-item__definition">
                    <p>${state.wordObject.meanings[i].definitions[j].definition}</p>
                </div>
             </div>
             `);
             var defExample = state.wordObject.meanings[i].definitions[j].example;
             if (defExample) {
                resultsItem.insertAdjacentHTML('beforeend', 
                `
                    <div class="results-item__example">
                        <p>Example: <span>${defExample}</span></p>
                    </div>               
                `);
             }
         }
    }
}

const getSound = function () {
    const audioElement = new Audio(state.wordObject.phonetics[0].audio);
    audioElement.play();
}

inputWord.addEventListener("keyup", inputWordCallBack);
formText.addEventListener("submit", submitForm);
resultSound.addEventListener("click", getSound);
