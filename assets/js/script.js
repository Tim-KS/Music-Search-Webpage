var userFormEl = document.querySelector('#user-form');
var nameInputEl = document.querySelector('#userinput');
var wikiurl = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search='
var formSubmitHandler = function (event) {
    event.preventDefault();
    console.log('inside the form submit handler');
    var searchItem = nameInputEl.value.trim();
    if (searchItem) {
        console.log(searchItem);
        getWiki(searchItem);
    } else {
        alert('nice try buddy');
    }
}

var getWiki = function (artist) {
    var apiURL = wikiurl + artist;
    console.log(apiURL);
    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                })
            }
        })
}


var getWikiAPI = function (user) {
    var apiUrl = 'https://api.github.com/users/' + user + '/repos';
    //  https://www.mediawiki.org/w/api.php?action=query&format=json&prop=info&generator=search&gsrsearch=meaning
    //  https://www.mediawiki.org/w/api.php?action=opensearch&format=json&search=Te

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data)
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to GitHub');
        });
};
userFormEl.addEventListener('submit', formSubmitHandler);
