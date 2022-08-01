var homeDiv = document.getElementById("homesite")
var mainDiv = document.getElementById("mainsite")
var simBarDiv = document.getElementById("menubarSim")
var balanceDiv = document.getElementById("balance")
var openDiv = document.getElementById("openPage")
var gridDiv = document.getElementById("gridDiv")
var loadingDiv = document.getElementById("loading")
var inventoryDiv = document.getElementById("inventory")
var searchDiv = document.getElementById("searchBarDiv")
var imgHashdata;
var itemData;
var dataLoaded;
var nameArray;

//Load localstorage from browser
var siteActive = localStorage.getItem("siteActive")
var inventoryData = JSON.parse(localStorage.getItem("inventoryDat"));
var totalSpend = localStorage.getItem("totalSpend")
var totalSold = localStorage.getItem("totalSold")
var totalProfit = localStorage.getItem("totalProfit")
var inventoryValue = localStorage.getItem("invetoryValue")
var balance = localStorage.getItem("balance")

if (siteActive == null) {
    siteActive = 0
}

//Functions which affect the active site DIVs
function showHome() {
    homeDiv.style.display = "Block"
    openDiv.style.display = "none"
    mainDiv.style.display = "none"
    simBarDiv.style.display = "none"
    loadingDiv.style.display = "none"
    balanceDiv.style.display = "none"
    gridDiv.style.display = "none"
    searchDiv.style.display = "none"
}

function showMain() {
    homeDiv.style.display = "none"
    mainDiv.style.display = "Block"
    simBarDiv.style.display = "Block"
    balanceDiv.style.display = "Block"
    openDiv.style.display = "none"
    gridDiv.style.display = "Block"
    searchDiv.style.display = "Block"
    loadingDiv.style.display = "none"
    updateBalance()
}

function showSearchResult(result) {
    homeDiv.style.display = "none"
    mainDiv.style.display = "Block"
    simBarDiv.style.display = "Block"
    balanceDiv.style.display = "Block"
    loadingDiv.style.display = "none"
    openDiv.style.display = "none"
    gridDiv.style.display = "Block"
    searchDiv.style.display = "Block"
    hideCases()
    let caseId = "case" + result
    document.getElementById(caseId).style.display = "Block"
}

function showInventory() {
    homeDiv.style.display = "none"
    mainDiv.style.display = "Block"
    simBarDiv.style.display = "Block"
    loadingDiv.style.display = "none"
    openDiv.style.display = "none"
    gridDiv.style.display = "none"

}

//Sets page depending on browser stored value
function initPage() {
    if (siteActive == 1) {
        showMain()
    } else {
        showHome()
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  

  function updateBalance(){
    document.getElementById("balanceVal").innerHTML = balance
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

    nameArray = Object.keys(itemData.cases)

    if (isSiteActive == 1) {
        setTimeout(showMain(), 2000)
        populateCases()
    } else {
        setTimeout(showHome(), 2000)
    }




}




//Populates the grid of cases on the main site page
function populateCases() {


    console.log(nameArray)
    const lenCase = (nameArray.length) - 3

    //Resets Case Grid
    document.getElementById("caseGrid").innerHTML = "";


    for (i = 0; i < lenCase; i++) {

        const imgHash = "https://steamcommunity-a.akamaihd.net/economy/image/" + imgHashdata.items_list[nameArray[i]].icon_url
        let caseCost = itemData.cases[nameArray[i]]["cost of case"] + 2.50

        document.getElementById("caseGrid").insertAdjacentHTML("afterbegin", `
        <div id="case` + i + `">
            <img src="` + imgHash + `" alt="" class="caseImg" onclick="viewCase('` + nameArray[i] + `')" id="caseImg` + i + `"> 
            
                <h1 class="caseName" id="caseName` + i + `">` + nameArray[i] + `</h1>
                <h2 class="casePrice">$` + caseCost + `</h2>

        </div>
        `);

    }

    showCases()



}

function hideCases() {

    const lenCase = (nameArray.length) - 3

    for (i = 0; i < lenCase; i++) {
        const id = "case" + i
        document.getElementById(id).style.display = "none"
    }

}

function showCases() {

    const lenCase = (nameArray.length) - 3

    for (i = 0; i < lenCase; i++) {
        const id = "case" + i
        document.getElementById(id).style.display = "Block"
    }

}

function refreshSite() {
    loadItemData(siteActive)
    dataLoaded = 1

}

//Converts term to lowercase
function simpTerm() {
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
    return array.slice(0).sort(compare);

}

//Binary Search
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

//Linear Search
function linearSearch(arr, target) {
    for (let i in arr) {
        if (arr[i] === target) return i
    }
    return -1
}

//Binary Searches a sorted array of the case names to determine
function searchCase() {
    const term = simpTerm()
    let dupeArray = nameArray
    let sortedArray = sortItems(dupeArray)
    const searchResult = binarySearch(sortedArray, term)


    if (searchResult == "-1") {
        alert("Search term not found. Please type the exact name of a case.")

    } else {
        const location = linearSearch(nameArray, sortedArray[searchResult])
        if (location == "-1") {
            alert("Search term not found. Please type the exact name of a case.")
        } else {
            showSearchResult(location)
        }
    }

}

function home() {
    document.getElementById("inventory").setAttribute("class", "");
    initPage()

}

function inventory() {
    document.getElementById("inventory").setAttribute("class", "active");
    showInventory()



}

function viewCase(caseString) {
    document.getElementById("openCaseImgDiv").style.display = "Block"
    document.getElementById("wonItemImgDiv").style.display = "none"
    openDiv.style.display = "Block"
    searchDiv.style.display = "none"
    gridDiv.style.display = "none"
    let caseCost = itemData.cases[caseString]["cost of case"] + 2.50

    let val = linearSearch(nameArray, caseString)

    document.getElementById("openCaseImg").src = "https://steamcommunity-a.akamaihd.net/economy/image/" + imgHashdata.items_list[nameArray[val]].icon_url
    document.getElementById("openName").innerHTML = caseString;
    document.getElementById("openPrice").innerHTML = "$" + caseCost
    let onclickVal = `openCase("` + caseString + `")`
    document.getElementById("openBtn").setAttribute('onclick', onclickVal)



}

function randomizer(values) {
    let i, pickedValue,
        randomNr = Math.random(),
        threshold = 0;

    for (i = 0; i < values.length; i++) {
        if (values[i].probability === '*') {
            continue;
        }

        threshold += values[i].probability;
        if (threshold > randomNr) {
            pickedValue = values[i].value;
            returnVal = values[i]
            break;
        }
    }

    return returnVal;
}

function getRandomItem(arr) {

    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);

    // get random item
    const item = arr[randomIndex];

    return item;
}

function openCase(caseString) {
    document.getElementById("openCaseImgDiv").style.display = "Block"
    document.getElementById("wonItemImgDiv").style.display = "none"
    //Item Rarity Odds
    let rarityWeight = [{
            value: "Special",
            stat: 1,
            probability: 0.0002558
        },

        {
            value: "Covert",
            stat: 1,
            probability: 0.0006394
        },
        {
            value: "Special",
            stat: 0,
            probability: 0.0025575
        },
        {
            value: "Classified",
            stat: 1,
            probability: 0.0031969
        },
        {
            value: "Covert",
            stat: 0,
            probability: 0.0063939
        },
        {
            value: "Restricted",
            stat: 1,
            probability: 0.0159847
        },
        {
            value: "Classified",
            stat: 1,
            probability: 0.0319693
        },
        {
            value: "Mil-Spec Grade",
            stat: 1,
            probability: 0.0799233
        },
        {
            value: "Restricted",
            stat: 0,
            probability: 0.1598465
        },
        {
            value: "Mil-Spec Grade",
            stat: 0,
            probability: 0.7992327
        },
    ]

    //Item Wear odds
    let wearWeight = [{
            value: "Factory New",
            probability: 0.03
        },
        {
            value: "Battle-Scarred",
            probability: 0.16
        },
        {
            value: "Minimal Wear",
            probability: 0.23
        },
        {
            value: "Well-Worn",
            probability: 0.25
        },
        {
            value: "Field-Tested",
            probability: 0.33
        }



    ]

    let itemWear = randomizer(wearWeight)

    let itemRarity = randomizer(rarityWeight)

    let wonItem = {
        name: "",
        wear: "",
        stat: 0
    }

    console.log(itemRarity)
    console.log(itemWear)

    console.log(Object.keys(itemData.cases[caseString]["skin values"][0]))

    console.log(Object.keys(itemData.cases[caseString]["skin values"]))

    let arrLength = Object.keys(itemData.cases[caseString]["skin values"]).length - 1
    

    let SpecialArray = []
    let CovertArray = []
    let ClassifiedArray = []
    let RestrictedArray = []
    let MilSpecArray = []
    let itemNameArray = []


    for (i = 0; i < arrLength; i++) {
        let tempName = Object.keys(itemData.cases[caseString]["skin values"][i])
        itemNameArray[i] = tempName[0]
    }

    for (i = 0; i < arrLength; i++) {

        switch (itemData.cases[caseString]["skin values"][i][itemNameArray[i]].rarity) {
            case "Special":
                SpecialArray.push(itemNameArray[i]) 
                break;
            case "Covert":
                CovertArray.push(itemNameArray[i]) 
                break;
            case "Classified":
                ClassifiedArray.push(itemNameArray[i]) 
                break;
            case "Restricted":
                RestrictedArray.push(itemNameArray[i]) 
                break;
            case "Mil-Spec Grade":
                MilSpecArray.push(itemNameArray[i]) 
                break;

        }
    }


    switch (itemRarity.value) {
        case "Special":
            wonItem.name = getRandomItem(SpecialArray)
            break;
        case "Covert":
            wonItem.name = getRandomItem(CovertArray)
            break;
        case "Classified":
            wonItem.name = getRandomItem(ClassifiedArray)
            break;
        case "Restricted":
            wonItem.name = getRandomItem(RestrictedArray)
            break;
        case "Mil-Spec Grade":
            wonItem.name = getRandomItem(MilSpecArray)
            break;
    }

    wonItem.wear = itemWear.value
    wonItem.stat = itemRarity.stat

    let wonItemFullName = wonItem.name + " (" + wonItem.wear + ")"
    
    console.log(wonItemFullName)
    
    document.getElementById("wonItemImg").src = "https://steamcommunity-a.akamaihd.net/economy/image/" + imgHashdata.items_list[wonItemFullName].icon_url
    document.getElementById("wonItemName").innerHTML = "Congratulations you won: " + wonItemFullName

    console.log("Item Name: " + wonItem.name + " Wear: " + wonItem.wear + " StatTrack: "+ wonItem.stat)
    let caseCost = itemData.cases[caseString]["cost of case"] + 2.50
    let tempBal = balance - caseCost
    let roundBal = (Math.round(tempBal * 100) / 100).toFixed(2)
    setBal(roundBal)
    caseAnimation()
    
}

async function caseAnimation(){
    document.getElementById("openCaseImg").classList.add("caseOpenAnimation1")
    await sleep(3001)
    document.getElementById("openCaseImg").classList.remove("caseOpenAnimation1")
    document.getElementById("openCaseImg").classList.add("caseOpenAnimation2")
    await sleep(1001)
    document.getElementById("openCaseImg").classList.remove("caseOpenAnimation2")
    document.getElementById("openCaseImgDiv").style.display = "none"
    document.getElementById("wonItemImgDiv").style.display = "Block"

}

function closeCase() {
    openDiv.style.display = "none"
    gridDiv.style.display = "Block"
    searchDiv.style.display = "Block"
}

function setBal(bal, a) {
    if (a == 1) {
        siteActive = 1
        localStorage.setItem("siteActive", siteActive)
        initPage()
        refreshSite()
    }
    balance = bal
    localStorage.setItem("balance", balance)
    updateBalance()
    console.log("balance is: " + balance)
}

//Loads objects and cases on page load
window.onload = (event) => {
    initPage()
    refreshSite()
};