// Global variables to retrieve elements in index
var artistSearch = document.getElementById('artistSearch');
var submitBtn = document.getElementById('submitBtn');

// Variables to hold requests
var searchResult = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=&type=channel&key=AIzaSyDofZ01q_Qh-baUnjYC0t5fzULoMJw_qNE';
var searchList = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=&type=channel&key=AIzaSyDofZ01q_Qh-baUnjYC0t5fzULoMJw_qNE';

// Variable to hold the embed link to load youtube videos
var embedLink = 'https://www.youtube.com/embed/'

// Function for click event and calling getArtist function.
submitBtn.addEventListener('click', function (event) {
    event.preventDefault();
    var artist = artistSearch.value;
    artist = artist.replace(/\s+/g, '');
    searchResult = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=' + artist + '&type=channel&key=AIzaSyDofZ01q_Qh-baUnjYC0t5fzULoMJw_qNE';
    getArtist(searchResult);

    // Setting the searched artist to local storage
    localStorage.setItem('You have searched: ', artist);
})


// Function to retrieve 5 media videos related to the searched artist
function getArtist(searchResult) {
    fetch(searchResult).then(function (response) {
        if (!response.ok) {
            errorModal()
        } else {
            return response.json()
        }
    })
        .then(function (data) {
            if (data.items === 0) {
                errorModal()
            } else {
                var channelId = data.items[0].id.channelId;
                fetch('https://www.googleapis.com/youtube/v3/search?key=AIzaSyDofZ01q_Qh-baUnjYC0t5fzULoMJw_qNE&channelId=' + channelId + '&part=snippet,id&type=video&chart=mostPopular&categoryId=10&maxResults=1')
                    .then(function (response) {
                        return response.json()
                    })
                    .then(function (data) {
                        console.log('YouTube Channel Top 5 Videos: \n----------');
                        embedLink = embedLink + data.items[0].id.videoId;
                        console.log(embedLink);
                        document.getElementById("video0").src = embedLink;


                        // for (var i = 0; i < data.items.length; i++) {
                        //     //video loop goes here
                        //     embedLink = embedLink + data.items[i].id.videoId[0];
                        //     console.log(embedLink);
                        //     document.getElementById("video0").src = embedLink;
                        //     embedLink = 'https://www.youtube.com/embed/';
                        //     embedLink = embedLink + data.items[i].id.videoId[1];
                        //     console.log(embedLink);
                        //     document.getElementById("video1").src = embedLink;
                        //     embedLink = 'https://www.youtube.com/embed/';
                        //     embedLink = embedLink + data.items[i].id.videoId[2];
                        //     console.log(embedLink);
                        //     document.getElementById("video2").src = embedLink;
                        //     embedLink = 'https://www.youtube.com/embed/';
                        //     embedLink = embedLink + data.items[i].id.videoId[3];
                        //     console.log(embedLink);
                        //     document.getElementById("video3").src = embedLink;
                        //     embedLink = 'https://www.youtube.com/embed/';
                        //     embedLink = embedLink + data.items[i].id.videoId[4];
                        //     console.log(embedLink);
                        //     document.getElementById("video4").src = embedLink;
                        //     embedLink = 'https://www.youtube.com/embed/';
                        //     console.log('This is the index ' + i + ' most popular video: ' + data.items[i].id.videoId);
                        //     embedLink = 'https://www.youtube.com/embed/';
                        // }
                    })
            }
        })
}

// Function to run the error modal
function errorModal() {
    // Add is-active class on the modal
    document.getElementById("modal-js-error").classList.add("is-active");
}
// Add event listeners to close the modal
// Including whenever user click outside modal
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