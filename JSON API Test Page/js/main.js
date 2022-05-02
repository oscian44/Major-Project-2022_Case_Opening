//Returns most of what is needed from CSGO Backpack API
function myAPI() {
    fetch('https://raw.githubusercontent.com/jonese1234/Csgo-Case-Data/master/latest.json')
        .then(response => response.json())
        .then(data => console.log(data));
}

/*N̶e̶e̶d̶ t̶o̶ p̶r̶o̶x̶y̶ m̶a̶y̶b̶e̶?̶?̶?̶ t̶o̶ g̶e̶t̶ t̶o̶ w̶o̶r̶k̶ w̶i̶t̶h̶o̶u̶t̶ e̶r̶r̶o̶r̶,̶ i̶n̶v̶e̶s̶t̶i̶a̶t̶e̶ Storing Image hashes directly now in JSON file, no need for API call to CSGO:Backpack
function myAPI2() {
    fetch('http://csgobackpack.net/api/GetItemPrice/?icon=1&id=AK-47%20|%20Wasteland%20Rebel%20(Battle-Scarred)')
        .then(response => response.json())
        .then(data => console.log(data));
} */

//THIS DOES NOT WORK 
function myFile() {
    fetch('https://raw.githubusercontent.com/oscian44/Major-Project-2022_Case_Opening/barebones-testing/JSON%20API%20Test%20Page/json/csgobackpack.json')
        .then(response => response.json())
        .then(data => console.log(data));
}