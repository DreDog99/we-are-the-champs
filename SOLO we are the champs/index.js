import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://we-are-the-champions-ffa38-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsements")

const inputFieldEl = document.getElementById("input-field")
const postButtonEl = document.getElementById("post-button")
const endorsementsEl = document.getElementById("endorsements")

postButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(endorsementsInDB, inputValue)
    
    clearInputFieldEl()
})

onValue(endorsementsInDB, function(snapshot) {
    
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val())
    
    clearEndorsementsEl()
    
    for (let i = 0; i < itemsArray.length; i++) {
    
    let currentItem = itemsArray[i]
    let currentItemID = currentItem[0]
    let currentItemValue = currentItem[1]
        
    appendItemToEndorsementsEl(currentItem)
    }
  } else {
      endorsementsEl.innerHTML = "waiting for new posts"
  }
})

function clearEndorsementsEl() {
    endorsementsEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value =""
}

function appendItemToEndorsementsEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
       
       let exactLocationOfItemInDB = ref(database, `endorsements/${itemID}`)
     
       remove(exactLocationOfItemInDB)
   })

    endorsementsEl.append(newEl)
}