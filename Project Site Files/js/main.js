var homeDiv = document.getElementById("homesite")
var mainDiv = document.getElementById("mainsite")
var simBarDiv = document.getElementById("menubarSim")
var loadingDiv = document.getElementById("loading")
var inventoryDiv = document.getElementById("inventory")
var imgHashdata;
var itemData;
var siteActive = 1



//Load localstorage from browser



function showHome() {
    homeDiv.style.display = "Block"
    mainDiv.style.display = "none"
    simBarDiv.style.display = "none"
    loadingDiv.style.display = "none"
}

function showMain() {
    homeDiv.style.display = "none"
    mainDiv.style.display = "Block"
    simBarDiv.style.display = "Block"
    loadingDiv.style.display = "none"
}

function showInventory(){
    homeDiv.style.display = "none"
    mainDiv.style.display = "Block"
    simBarDiv.style.display = "Block"
    loadingDiv.style.display = "none"

}

//Sets page depending on browser stored value
if (siteActive == 1) {
    showMain()
} else {
    showHome()
}


//Loads gargantuan image hash json on page load 
window.onload = (event) => {
    loadImgHash(siteActive)
    loadItemData(siteActive)
};

//Returns most of what is needed from CSGO Backpack API
function loadItemData(isSiteActive) {

    homeDiv.style.display = "none"
    mainDiv.style.display = "none";
    loadingDiv.style.display = "Block"

    fetch('https://raw.githubusercontent.com/jonese1234/Csgo-Case-Data/master/latest.json')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            itemData = data

            //Prevents users with faster internet connections from having the loading gif flash on screen for a split second during loading times
            if (isSiteActive == 1) {
                setTimeout(showMain(), 2000)
            } else {
                setTimeout(showHome(), 2000)
            }
        });
}

//Returns JSON object with image hashes
function loadImgHash(isSiteActive) {

    homeDiv.style.display = "none"
    mainDiv.style.display = "none";
    loadingDiv.style.display = "Block"

    fetch('https://raw.githubusercontent.com/oscian44/Major-Project-2022_Case_Opening/main/Project%20Site%20Files/json/csgobackpack.json')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            imgHashdata = data

            if (isSiteActive == 1) {
                setTimeout(showMain(), 2000)
            } else {
                setTimeout(showHome(), 2000)
            }
        });
}

function inventory() {
    document.getElementById("inventory").setAttribute("class", "active");



}

function home() {
    document.getElementById("inventory").setAttribute("class", "");


}