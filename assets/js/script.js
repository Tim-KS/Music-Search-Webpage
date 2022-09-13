var userFormEl = document.querySelector('#user-form');
var nameInputEl = document.querySelector('#userinput');

var formSubmitHandler = function (event) {
    event.preventDefault();
    var searchItem = nameInputEl.value.trim();
    if (searchItem) {
        searchItem = searchItem.split(' ').join('_')
        tryWiki(searchItem);
    } else {
        alert('nice try buddy');
    }
}

var tryWiki = function (artist) {

    var url = "https://en.wikipedia.org/w/api.php?" +
        new URLSearchParams({
            origin: "*",
            action: "parse",
            page: artist,
            format: "json",
        });

    try {
        fetch(url)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        var json = data
                        console.log(json);
                        var content = json.parse.text["*"]
                        var element = document.querySelector(".wikipedia");
                        element.innerHTML = content

                    })
                }
            }
            )

    } catch (e) {
        console.error(e);
    }

}


userFormEl.addEventListener('submit', formSubmitHandler);
