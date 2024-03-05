import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-89bfa-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListinDB = ref(database, "shoppingList")

const btnEl = document.getElementById("add-button");
const inpEl = document.getElementById("input-field");
const listEl = document.getElementById("shopping-list")

btnEl.addEventListener('click', function() {
    let inputVal = inpEl.value

    push(shoppingListinDB,inputVal)

    clearInputField(inpEl)
})

onValue(shoppingListinDB, function(snapshot){

    if (snapshot.exists()) {
        let shoppingItems = Object.entries(snapshot.val())

        clearListEl(listEl);
        
        for (let i = 0; i < shoppingItems.length; i++) {
            let currentItem = shoppingItems[i];
            
            addListEl(listEl, currentItem)
        }
    } else {
        listEl.innerHTML = "";
    }

})

function addListEl(listEl, item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue

    listEl.append(newEl);

    newEl.addEventListener("dblclick", function() {

        let locationOfItem = ref(database, `shoppingList/${itemID}`)
        remove(locationOfItem)

    })
}

function clearListEl(listEl) {
    listEl.innerHTML = ""
}

function clearInputField(inpEl) {
    inpEl.value = ""
}
