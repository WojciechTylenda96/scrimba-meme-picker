
import { catsData } from "./data.js"

const emotionRadios = document.getElementById("emotion-radios")
const getImageBtn = document.getElementById("get-image-btn")
const gifsOnlyOption = document.getElementById("gifs-only-option")

emotionRadios.addEventListener('change', highlightCheckedOption)
getImageBtn.addEventListener('click', renderCat)

// dodaje klasę css dla aktywnego wyboru
function highlightCheckedOption(e){
    const radios = document.getElementsByClassName("radio")
    for (let radio of radios){
        radio.classList.remove("highlight")
    }
    document.getElementById(e.target.id).parentElement.classList.add("highlight")
}

// zwraca tabelę zawierającą memy pasujące do wybranych kryteriów
function getMatchingCatsArray(){
    if(document.querySelector("input[type='radio']:checked")){
        const checkedEmotion = document.querySelector("input[type='radio']:checked").value
        const isGif = gifsOnlyOption.checked
        const matchingCatsArray = catsData.filter(function(cat){
            if(isGif){
                return cat.emotionTags.includes(checkedEmotion) && cat.isGif
            } else {
                return cat.emotionTags.includes(checkedEmotion) 
            }
        })
        return matchingCatsArray
    }
}

function getSingleCatObject(){
    const catsArray = getMatchingCatsArray()

    if (catsArray.length === 1){
        console.log(catsArray[0])
    } else {
        const index = Math.floor(Math.random()*catsArray.length)
        console.log(catsArray[index])
    }
}

// function getRandomNumber(){
//     let number = Math.floor(Math.random()*6)
//     console.log(number)
// }

function renderCat(){
    getSingleCatObject() // tymczasowo
}

// tworzy tabele z emocjami na podstawie dostępnych memów
function getEmotionsArray(cats){
    const emotionsArray = []
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if(!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

// renderuje pola wyboru emocji na podstawie wcześniej stworzonej tabeli emocji
function renderEmotionsRadios(cats){
    const emotions = getEmotionsArray(cats)
    let radioItems = ""
    for (let emotion of emotions) {
        radioItems += `
            <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input type="radio" id="${emotion}" value="${emotion}" name="emotion-choice">
            </div>
            
        `
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(catsData)

