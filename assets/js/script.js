var userFormEl = document.querySelector('#user-form');
var nameInputEl = document.querySelector('#userinput');
var wikiurl = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search='
var wikipage = 'https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=revisions&titles=Pet_door&formatversion=2&rvprop=content&rvslots=*'
var wikiHead = 'https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=revisions&titles='
var wikiTail = '&formatversion=2&rvprop=content&rvslots=*'
var formSubmitHandler = function (event) {
    event.preventDefault();
    console.log('inside the form submit handler');
    var searchItem = nameInputEl.value.trim();
    if (searchItem) {
        console.log(searchItem);
        searchItem = searchItem.split(' ').join('_')
        console.log('new SearchItem is: ' + searchItem);
        getWiki(searchItem);
    } else {
        alert('nice try buddy');
    }
}

var getWiki = function (artist) {
    var apiURL = wikiurl + artist;
    var apiPage = wikiHead + artist + wikiTail
    //console.log(apiURL);
    console.log(apiPage)
    fetch(apiPage)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    var name = data.query.pages[0].title
                    console.log(data.query.pages[0].title);
                    console.log(data.query.pages[0]);
                    if (name) {
                        document.getElementById("artist-name").textContent = name
                    }
                    var bio = data.query.pages[0].revisions[0].slots.main.content
                    if (bio) {
                        document.getElementById("bio").innerHTML = marked.parse(bio);
                    }
                    console.log(data.query.pages[0].revisions[0].slots.main.content);
                    console.log('The data shown is above')
                })
            }
        })
}

userFormEl.addEventListener('submit', formSubmitHandler);
