// Variables to pull elements from index
var userFormEl = document.querySelector('#user-form');
var nameInputEl = document.querySelector('#artistSearch');

// Function to handle the submit event
var formSubmitHandler = function (event) {
    event.preventDefault();
    var searchItem = nameInputEl.value.trim();
    if (searchItem) {
        searchItem = searchItem.split(' ').join('_')
        tryWiki(searchItem);
    } else {
        errorModal();
    }
}

// Function to retrieve the Wikipedia page for the artist search
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
                if (!response.ok) {
                    errorModal()
                } else if (response.ok) {
                    response.json().then(function (data) {
                        var json = data
                        console.log(data)
                        if (data.error) {
                            errorModal()
                        } else {
                            var content = json.parse.text["*"]
                            var element = document.querySelector(".wikiContent");
                            element.innerHTML = content
                        }
                    })
                }
            }
            )

    } catch (e) {
        console.error(e);
    }

}

userFormEl.addEventListener('submit', formSubmitHandler);

// Function to run the errorModal
function errorModal() {
    // Add is-active class on the modal
    document.getElementById("modal-js-error").classList.add("is-active");
}
// Add event listeners to close the modal
// whenever user click outside modal
document.querySelectorAll(
    ".modal-background, .modal-close," +
    ".modal-card-head .delete, .modal-card-foot .button"
)
    .forEach(($el) => {
        const $modal = $el.closest(".modal");
        $el.addEventListener("click", () => {
            // Remove the is-active class from the modal
            $modal.classList.remove("is-active");
        });
    });