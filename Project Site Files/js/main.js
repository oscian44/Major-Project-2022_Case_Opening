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
var dataLoaded;


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

function showSearchResult(result){
    homeDiv.style.display = "none"
    mainDiv.style.display = "Block"
    simBarDiv.style.display = "Block"
    loadingDiv.style.display = "none"
    hideCases()
    const caseId = "case" + result
    document.getElementById(caseId).style.display = "Block"
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
        <div id="case` + i + `">
            <img src="` + imgHash + `" alt="" class="caseImg" onclick="openCase(` + nameArray[i] + `)" id="caseImg` + i + `"> 
            
                <h1 class="caseName" id="caseName` + i + `">` + nameArray[i] + `</h1>
                <h2 class="casePrice">$` + itemData.cases[nameArray[i]]["cost of case"] + `</h2>

        </div>
        `);

    }

    showCases()

    

}

function hideCases(){
    const nameArray = Object.keys(itemData.cases)
    const lenCase = (nameArray.length) - 1

    for (i=0; i<lenCase; i++){
        const id = "case" + i
        document.getElementById(id).style.display = "none"
    }
    
}

function showCases(){
    const nameArray = Object.keys(itemData.cases)
    const lenCase = (nameArray.length) - 1

    for (i=0; i<lenCase; i++){
        const id = "case" + i
        document.getElementById(id).style.display = "Block"
    }
    
}

function refreshSite() {
    loadItemData(siteActive)
    dataLoaded = 1

}

//Converts term to lowercase
function simpTerm(){
    const input = document.getElementById("searchBar").value
    const simpTerm = input.toLowerCase()
    return simpTerm;
    
}

//Sorts item name array
function sortItems(array) {

    function compare(a, b) {
        const thingA = a.toUpperCase();
        const thingB = b.toUpperCase();

        let comparison = 0;
        if (thingA > thingB) {
            comparison = 1;
        } else if (thingA < thingB) {
            comparison = -1;
        }
        return comparison;
    }
    return array.sort(compare);

}

var binarySearch = function (items, value) {
    var startIndex = 0,
        stopIndex = items.length - 1,
        middle = Math.floor((stopIndex + startIndex) / 2);
        item = items[middle].toLowerCase()

    while (item != value && startIndex < stopIndex) {

        //adjust search area
        if (value < item) {
            stopIndex = middle - 1;
        } else if (value > item) {
            startIndex = middle + 1;
        }

        //recalculate middle
        middle = Math.floor((stopIndex + startIndex) / 2);
        item = items[middle].toLowerCase()
    }

    //make sure it's the right value
    item = items[middle].toLowerCase()
    return (item != value) ? -1 : middle;
}

function linearSearch(arr, key){
    for(let i = 0; i < arr.length; i++){
        if(arr[i] === key){
            return i
        }
    }
    return -1
}

//Binary Searches a sorted array of the case names to determine
function searchCase(){
    const term = simpTerm()
    const nameArray = Object.keys(itemData.cases)
    const sortedArray = sortItems(nameArray)
    const searchResult = binarySearch(sortedArray, term)
    

    if (searchResult == "-1"){
        alert("Search term not found. Please type the exact name of a case.")

    }else{
        const location = linearSearch(nameArray, sortedArray[searchResult])
        showSearchResult(location)
    }

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