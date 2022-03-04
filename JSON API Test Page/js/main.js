//Returns most of what is needed from CSGO Backpack API
function myAPI() {
    fetch('https://raw.githubusercontent.com/jonese1234/Csgo-Case-Data/master/latest.json')
        .then(response => response.json())
        .then(data => console.log(data));
}

//Need to proxy maybe??? to get to work without error, investiate
function myAPI2() {
    fetch('http://csgobackpack.net/api/GetItemPrice/?icon=1&id=AK-47%20|%20Wasteland%20Rebel%20(Battle-Scarred)')
        .then(response => response.json())
        .then(data => console.log(data));
}
