//Returns most of what is needed from CSGO Backpack API
function myAPI() {
    fetch('https://raw.githubusercontent.com/jonese1234/Csgo-Case-Data/master/latest.json')
        .then(response => response.json())
        .then(data => console.log(data));
}


var mainDiv = document.getElementById("mainsite")
var loadingDiv = document.getElementById("loading")
var imgdata = ''

mainDiv.style.display = "Block"
loadingDiv.style.display = "none"

//This workie no progress bar
function myFile() {

    mainDiv.style.display = "none";
    loadingDiv.style.display = "Block"

    fetch('https://raw.githubusercontent.com/oscian44/Major-Project-2022_Case_Opening/barebones-testing/JSON%20API%20Test%20Page/json/csgobackpack.json')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            imgdata = data
            mainDiv.style.display = "Block"
            loadingDiv.style.display = "none"
        });


}