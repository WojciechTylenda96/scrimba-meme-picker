
import { catsData } from "./data.js"

const emotionRadios = document.getElementById("emotion-radios")
const getImage = document.getElementById("get-image-btn")

emotionRadios.addEventListener('change', highlightCheckedOption)
getImage.addEventListener('click', getMatchingCatsArray)

function highlightCheckedOption(e){
    const radios = document.getElementsByClassName("radio")
    for (let radio of radios){
        radio.classList.remove("highlight")
    }
    document.getElementById(e.target.id).parentElement.classList.add("highlight")
}

function getMatchingCatsArray(){
    const checkedEmotion = document.querySelector("input[type='radio']:checked").value
    console.log(checkedEmotion)
}

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

