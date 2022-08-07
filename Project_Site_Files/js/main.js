//All divs that are regularly modified by the JS code
var homeDiv = document.getElementById("homesite")
var mainDiv = document.getElementById("mainsite")
var simBarDiv = document.getElementById("menubarSim")
var balanceDiv = document.getElementById("balance")
var openDiv = document.getElementById("openPage")
var gridDiv = document.getElementById("gridDiv")
var loadingDiv = document.getElementById("loading")
var inventoryDiv = document.getElementById("inventory")
var searchDiv = document.getElementById("searchBarDiv")
var casePageDiv = document.getElementById("casePage")
var endScreenDiv = document.getElementById("simulationEnd")

//Defining variables for data of items that are populated later in project
var imgHashdata;
var itemData;
var dataLoaded;
var nameArray;

//Item Rarity Odds
var rarityWeight = [{
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
var wearWeight = [{
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

//Load localstorage from browser
var siteActive = localStorage.getItem("siteActive")
var inventoryData = JSON.parse(localStorage.getItem("inventoryData"));
var totalSpend = localStorage.getItem("totalSpend")
var totalSold = localStorage.getItem("totalSold")
var totalProfit = localStorage.getItem("totalProfit")
var inventoryValue = localStorage.getItem("invetoryValue")
var balance = localStorage.getItem("balance")

if (siteActive == null) {
    siteActive = 0
    inventoryData = []
    totalSpend = 0
    totalSold = 0
    totalProfit = 0
    inventoryValue = 0
    balance = 0

    localStorage.setItem("siteActive", siteActive)
    localStorage.setItem("inventoryData", JSON.stringify(inventoryData))
    localStorage.setItem("totalSpend", totalSpend)
    localStorage.setItem("totalSold", totalSold)
    localStorage.setItem("totalProfit", totalProfit)
    localStorage.setItem("inventoryValue", inventoryValue)
    localStorage.setItem("balance", balance)
}

//Ran to reset all variables at end of simulaiton
function resetSim(){
    siteActive = 0
    inventoryData = []
    totalSpend = 0
    totalSold = 0
    totalProfit = 0
    inventoryValue = 0
    balance = 0

    localStorage.setItem("siteActive", siteActive)
    localStorage.setItem("inventoryData", JSON.stringify(inventoryData))
    localStorage.setItem("totalSpend", totalSpend)
    localStorage.setItem("totalSold", totalSold)
    localStorage.setItem("totalProfit", totalProfit)
    localStorage.setItem("inventoryValue", inventoryValue)
    localStorage.setItem("balance", balance)
    location.reload();
}

//Functions which affect the active site DIVs

//Shows Divs for home page
function showHome() {
    homeDiv.style.display = "Block"
    openDiv.style.display = "none"
    mainDiv.style.display = "none"
    simBarDiv.style.display = "none"
    loadingDiv.style.display = "none"
    balanceDiv.style.display = "none"
    gridDiv.style.display = "none"
    searchDiv.style.display = "none"
    casePageDiv.style.display = "none"
    inventoryDiv.style.display = "none"
    endScreenDiv.style.display = "none"
}

//Shows Divs for main case grid page
function showMain() {
    homeDiv.style.display = "none"
    mainDiv.style.display = "Block"
    simBarDiv.style.display = "Block"
    balanceDiv.style.display = "Block"
    openDiv.style.display = "none"
    gridDiv.style.display = "Block"
    searchDiv.style.display = "Block"
    loadingDiv.style.display = "none"
    casePageDiv.style.display = "Block"
    inventoryDiv.style.display = "none"
    endScreenDiv.style.display = "none"
    updateBalance()
}

//Shows Divs for search results
function showSearchResult(result) {
    homeDiv.style.display = "none"
    mainDiv.style.display = "Block"
    simBarDiv.style.display = "Block"
    balanceDiv.style.display = "Block"
    loadingDiv.style.display = "none"
    openDiv.style.display = "none"
    gridDiv.style.display = "Block"
    searchDiv.style.display = "Block"
    casePageDiv.style.display = "Block"
    inventoryDiv.style.display = "none"
    endScreenDiv.style.display = "none"
    hideCases()
    let caseId = "case" + result
    document.getElementById(caseId).style.display = "Block"
}

//Shows Divs for inventory
function showInventory() {
    homeDiv.style.display = "none"
    mainDiv.style.display = "Block"
    inventoryDiv.style.display = "Block"
    casePageDiv.style.display = "none"
    simBarDiv.style.display = "Block"
    balanceDiv.style.display = "Block"
    openDiv.style.display = "none"
    gridDiv.style.display = "none"
    searchDiv.style.display = "none"
    loadingDiv.style.display = "none"
    endScreenDiv.style.display = "none"
}

//Shows Divs for simulation end
function endSim(){
    endScreenDiv.style.display = "Block"
    homeDiv.style.display = "none"
    mainDiv.style.display = "Block"
    inventoryDiv.style.display = "none"
    casePageDiv.style.display = "none"
    simBarDiv.style.display = "none"
    balanceDiv.style.display = "none"
    openDiv.style.display = "none"
    gridDiv.style.display = "none"
    searchDiv.style.display = "none"
    loadingDiv.style.display = "none"

    document.getElementById("totalSpend").innerHTML = "$" + totalSpend
    document.getElementById("totalSold").innerHTML = "$" + totalSold
    inventoryValCalc()
    document.getElementById("inventoryValue").innerHTML = "$" + inventoryValue
    document.getElementById("balEnd").innerHTML = "$" + balance
    let profitNoInven = (Math.round(((parseFloat(totalSold) + parseFloat(balance)) - parseFloat(totalSpend)) * 100) / 100).toFixed(2)
    document.getElementById("profitNoInven").innerHTML = "$" + profitNoInven
    let profitInven = (Math.round(((parseFloat(totalSold) + parseFloat(balance) + parseFloat(inventoryValue)) - parseFloat(totalSpend)) * 100) / 100).toFixed(2)
    document.getElementById("profitInven").innerHTML = "$" + profitInven
}

//Sets page depending on browser stored value
function initPage() {
    if (siteActive == 1) {
        showMain()
    } else {
        showHome()
    }
}


//JS implementation of sleep function for animations
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//Updates the balance on the HTML page
function updateBalance() {
    document.getElementById("balanceVal").innerHTML = "$" + balance
}


//Returns JSON object with image hashes
function loadImgHash(isSiteActive) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            homeDiv.style.display = "none";
            mainDiv.style.display = "none";
            simBarDiv.style.display = "none";
            loadingDiv.style.display = "Block";

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

    homeDiv.style.display = "none";
    mainDiv.style.display = "none";
    simBarDiv.style.display = "none";
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
    const lenCase = (nameArray.length) - 3

    //Resets Case Grid
    document.getElementById("caseGrid").innerHTML = "";

    //Inserts HTML to caseGrid
    for (i = 0; i < lenCase; i++) {

        const imgHash = "https://steamcommunity-a.akamaihd.net/economy/image/" + imgHashdata.items_list[nameArray[i]].icon_url
        let caseCost = (Math.round((itemData.cases[nameArray[i]]["cost of case"] + 2.50) * 100) / 100).toFixed(2)

        document.getElementById("caseGrid").insertAdjacentHTML("afterbegin", `
        <div id="case` + i + `">
            <img src="` + imgHash + `" alt="" class="caseImg" onclick="viewCase('` + nameArray[i] + `')" id="caseImg` + i + `">  
                <h1 class="caseName" id="caseName` + i + `">` + nameArray[i] + `</h1>
                <h2 class="casePrice">$` + caseCost + `</h2>
        </div>
        `);
    }
    //Shows Case Divs
    showCases()

}

//Populates the grid for the inventory
function populateInventory() {
    let array = inventoryData
    let lenItem = inventoryData.length

    //Resets Item Grid
    document.getElementById("inventoryGrid").innerHTML = "";

    if (lenItem == 0) {
        document.getElementById("inventoryGrid").insertAdjacentHTML("afterbegin", `
        <div id="itemTemp">
            <h1>Inventory Empty</h1>
        </div>
        `);
    } else {
        for (i = 0; i < lenItem; i++) {
            const imgHash = "https://steamcommunity-a.akamaihd.net/economy/image/" + imgHashdata.items_list[array[i].name].icon_url
            document.getElementById("inventoryGrid").insertAdjacentHTML("afterbegin", `
             <div id="name` + i + `">
                 <img src="` + imgHash + `" alt="" class="itemImg" id="itemImg` + i + `"> 
                 
                     <h1 class="inventoryItemName" id="inventoryItemName` + i + `">` + array[i].name + `</h1>
                     <h2 class="inventoryItemPrice">$` + (Math.round((array[i].price) * 100) / 100).toFixed(2) + `</h2>
                     <button class="whiteBtn" onclick="sellItem(` + i + `)">Sell Item?</button>
     
             </div>
             `);
        }
    }
}

//Sells selected item from inventory
function sellItem(num) {
    let tempBal = parseFloat(balance) + inventoryData[num].price
    let roundBal = (Math.round((tempBal) * 100) / 100).toFixed(2)
    setBal(roundBal)
    totalSold = parseFloat(totalSold) + parseFloat(inventoryData[num].price)
    localStorage.setItem("totalSold", totalSold)
    inventoryValCalc()
    inventoryData.splice(num, 1)
    localStorage.setItem("inventoryData", JSON.stringify(inventoryData))
    populateInventory()
}

//Calculates value of inventory and stores in localStorage
function inventoryValCalc(){
    inventoryValue = 0
    for(i=0; i<inventoryData.length;i++){
        inventoryValue = (Math.round((parseFloat(inventoryValue) + parseFloat(inventoryData[i].price)) * 100) / 100).toFixed(2)
    }
    localStorage.setItem("inventoryValue", inventoryValue)
}

//Hides all Case Divs
function hideCases() {

    const lenCase = (nameArray.length) - 3

    for (i = 0; i < lenCase; i++) {
        const id = "case" + i
        document.getElementById(id).style.display = "none"
    }

}

//Displays all case divs
function showCases() {

    const lenCase = (nameArray.length) - 3

    for (i = 0; i < lenCase; i++) {
        const id = "case" + i
        document.getElementById(id).style.display = "Block"
    }

}

//Refreshes the site when needed
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

//Insertion sort for item name array
function sortItems(inputArr) {

    let n = inputArr.length;
    for (let i = 1; i < n; i++) {
        // Choosing the first element in our unsorted subarray
        let current = inputArr[i];
        // The last element of our sorted subarray
        let j = i - 1;
        while ((j > -1) && (current < inputArr[j])) {
            inputArr[j + 1] = inputArr[j];
            j--;
        }
        inputArr[j + 1] = current;
    }
    return inputArr

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
    let dupeArray = nameArray.slice(0)
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

//Returns user to the main page on the site
function home() {
    //sets inventory tab to inactive
    document.getElementById("inventoryBar").setAttribute("class", "");
    initPage()

}

//Runs functions to display inventory
function inventory() {
    //sets inventory tab to active
    document.getElementById("inventoryBar").setAttribute("class", "active");
    populateInventory()
    showInventory()
}

//Displays the case data when a case is clicked on
function viewCase(caseString) {
    document.getElementById('caseView').play();
    document.getElementById("openCaseImgDiv").style.display = "Block"
    document.getElementById("wonItemImgDiv").style.display = "none"
    openDiv.style.display = "Block"
    searchDiv.style.display = "none"
    gridDiv.style.display = "none"

    let caseCost = (Math.round((itemData.cases[caseString]["cost of case"] + 2.50) * 100) / 100).toFixed(2)
    let val = linearSearch(nameArray, caseString)

    document.getElementById("openCaseImg").src = "https://steamcommunity-a.akamaihd.net/economy/image/" + imgHashdata.items_list[nameArray[val]].icon_url
    document.getElementById("openName").innerHTML = caseString;
    document.getElementById("openPrice").innerHTML = "Case Price: $" + caseCost
    let onclickVal = `openCase("` + caseString + `")`
    document.getElementById("openBtn").setAttribute('onclick', onclickVal)



}

//Randomises a item based on the predetermined odds for rarities
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

//Used when deciding on which item within the determined wear and rarity stats is given to the user
function getRandomItem(arr) {

    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);

    // get random item
    const item = arr[randomIndex];

    return item;
}

//Takes input of case and generates an item from its contents, playing an animation and sound to the user
function openCase(caseString) {

    let caseCost = (Math.round((itemData.cases[caseString]["cost of case"] + 2.50) * 100) / 100).toFixed(2)
    let ifBal = parseFloat(balance)
    let ifCost = parseFloat(caseCost)
    if ( ifBal > ifCost) {
        //Hides buttons to open case as animation plays
        document.getElementById("openCaseImgDiv").style.display = "Block"
        document.getElementById("wonItemImgDiv").style.display = "none"
        document.getElementById("openBtnDiv").style.display = "none"

        let itemWear = randomizer(wearWeight)
        let itemRarity = randomizer(rarityWeight)

        let wonItem = {
            name: "",
            wear: "",
            stat: 0
        }

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

        //Populates item pool for case
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

        //Ensures the given item comes from the correct item pool for the generated rarity
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

        //Sets stattrack identifier
        if (itemRarity.stat == 1) {
            wonItem.stat = "StatTrak™ "
        } else {
            wonItem.stat = ""
        }

        //Creates full won item name
        let wonItemFullName = wonItem.stat + wonItem.name + " (" + wonItem.wear + ")"

        //Workaround for cases such as the CS:GO weapon case where items do not exist in all four wear values
        if (imgHashdata.items_list[wonItemFullName] != null) {
            //Logs Won Item name to console
            console.log(wonItemFullName);

            //Adds won Item to inventory array
            let obj = {
                name: wonItemFullName,
                price: imgHashdata.items_list[wonItemFullName].price["7_days"].average
            };
            inventoryData.push(obj);
            localStorage.setItem("inventoryData", JSON.stringify(inventoryData));

            //Pushes Won Item Data to HTML
            document.getElementById("wonItemImg").src = "https://steamcommunity-a.akamaihd.net/economy/image/" + imgHashdata.items_list[wonItemFullName].icon_url
            document.getElementById("wonItemName").innerHTML = "Congratulations you won: " + wonItemFullName
            document.getElementById("wonItemPrice").innerHTML = "Item Price: " + "$" + imgHashdata.items_list[wonItemFullName].price["7_days"].average


            let caseCost = (Math.round((itemData.cases[caseString]["cost of case"] + 2.50) * 100) / 100).toFixed(2)
            let tempBal = balance - caseCost
            let roundBal = (Math.round(tempBal * 100) / 100).toFixed(2)
            let roundSpend = (Math.round((parseFloat(totalSpend) + parseFloat(caseCost)) * 100) / 100).toFixed(2)

            totalSpend = roundSpend
            localStorage.setItem("totalSpend", totalSpend)

            setBal(roundBal)

            caseAnimation()
        } else {
            console.log("Item with abnormal wear value detected, re-rolling case")
            openCase(caseString)
        }

    } else {
        alert("Balance Insufficient, Please Sell Items To Continue or End Simulation")
    }


}

//Plays case animation in full, async is used to ensure no code runs until animation is finished
async function caseAnimation() {
    document.getElementById('caseOpen').play();
    document.getElementById("openCaseImg").classList.add("caseOpenAnimation1");
    await sleep(3001);
    document.getElementById("openCaseImg").classList.remove("caseOpenAnimation1");
    document.getElementById("openCaseImg").classList.add("caseOpenAnimation2");
    await sleep(1001);
    document.getElementById("openCaseImg").classList.remove("caseOpenAnimation2");
    document.getElementById("openCaseImgDiv").style.display = "none";
    document.getElementById("wonItemImgDiv").style.display = "Block";
    document.getElementById("openBtnDiv").style.display = "Block";

}

//Closes an open case
function closeCase() {
    openDiv.style.display = "none";
    gridDiv.style.display = "Block";
    searchDiv.style.display = "Block";
}

//Updates the balance on screen and in local storage when changes are made
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