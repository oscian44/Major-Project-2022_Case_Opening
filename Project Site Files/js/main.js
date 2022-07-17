var homeDiv = document.getElementById("homesite")
var mainDiv = document.getElementById("mainsite")
var simBarDiv = document.getElementById("menubarSim")
var loadingDiv = document.getElementById("loading")
var inventoryDiv = document.getElementById("inventory")
var imgHashdata;
var itemData;
var siteActive = 1
var inventoryData = []
var totalSpend;
var totalSold;
var totalProfit;
var inventoryValue;


//Load localstorage from browser


//Functions which affect the active site DIVs
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

function showInventory() {
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

//Returns JSON object with image hashes
function loadImgHash(isSiteActive) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            homeDiv.style.display = "none"
            mainDiv.style.display = "none";
            loadingDiv.style.display = "Block"

            fetch('https://raw.githubusercontent.com/oscian44/Major-Project-2022_Case_Opening/main/Project%20Site%20Files/json/csgobackpack.json')
                .then(response => response.json())
                .then(data => {

                    imgHashdata = data
                    console.log(imgHashdata)


                    if (isSiteActive == 1) {
                        setTimeout(showMain(), 2000)
                    } else {
                        setTimeout(showHome(), 2000)
                    }
                    resolve();

                });
        }, 3000);
    });


}

//Returns most of what is needed from a mirror of the CSGO Backpack API
async function loadItemData(isSiteActive) {

    homeDiv.style.display = "none"
    mainDiv.style.display = "none";
    loadingDiv.style.display = "Block"

    fetch('https://raw.githubusercontent.com/jonese1234/Csgo-Case-Data/master/latest.json')
        .then(response => response.json())
        .then(data => {

            itemData = data
            console.log(itemData)

        });
    //Prevents users with faster internet connections from having the loading gif flash on screen for a split second during loading times
    await loadImgHash(isSiteActive);
    if (isSiteActive == 1) {
        setTimeout(showMain(), 2000)
        populateCases()
    } else {
        setTimeout(showHome(), 2000)
    }


}




//Populates the grid of cases on the main site page
function populateCases() {

    const nameArray = Object.keys(itemData.cases)
    console.log(nameArray)
    const lenCase = (nameArray.length) - 1

    //Resets Case Grid
    document.getElementById("caseGrid").innerHTML = "";


    for (i = 0; i < lenCase; i++) {

        const imgHash = "https://steamcommunity-a.akamaihd.net/economy/image/" + imgHashdata.items_list[nameArray[i]].icon_url

        document.getElementById("caseGrid").insertAdjacentHTML("afterbegin", `
        <div>
            <img src="` + imgHash + `" alt="" class="caseImg" onclick="openCase(` + nameArray[i] + `)" id="caseImg` + i + `"> 
            
                <h1 class="caseName" id="caseName` + i + `">` + nameArray[i] + `</h1>
                <h2 class="casePrice">$` + itemData.cases[nameArray[i]]["cost of case"] + `</h2>

        </div>
        `);

    }

}

function refreshSite() {
    loadItemData(siteActive)

}

function inventory() {
    document.getElementById("inventory").setAttribute("class", "active");




}

function home() {
    document.getElementById("inventory").setAttribute("class", "");


}

//Loads objects and cases on page load
window.onload = (event) => {
    refreshSite()
};