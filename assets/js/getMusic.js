var artistSearch = document.getElementById('artistSearch');
var submitBtn = document.getElementById('submitBtn');
var searchResult = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=&type=channel&key=AIzaSyDofZ01q_Qh-baUnjYC0t5fzULoMJw_qNE';
var searchList = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=&type=channel&key=AIzaSyDofZ01q_Qh-baUnjYC0t5fzULoMJw_qNE';
var embedLink = 'https://www.youtube.com/embed/'

submitBtn.addEventListener('click', function (event) {
    event.preventDefault();
    var artist = artistSearch.value;
    artist = artist.replace(/\s+/g, '');
    searchResult = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=' + artist + '&type=channel&key=AIzaSyDofZ01q_Qh-baUnjYC0t5fzULoMJw_qNE';
    getArtist(searchResult);
    localStorage.setItem('You have searched: ', artist);
})

function getArtist(searchResult) {
    fetch(searchResult).then(function (response) {
        if (!response.ok) { 
            errorModal()
        } else {      
            return response.json()
        }
    })
    .then(function(data) {
        if (data.length === 0) {
            errorModal()
        } else {
        var channelId = data.items[0].id.channelId;
        fetch('https://www.googleapis.com/youtube/v3/search?key=AIzaSyDofZ01q_Qh-baUnjYC0t5fzULoMJw_qNE&channelId=' + channelId + '&part=snippet,id&type=video&chart=mostPopular&categoryId=10&maxResults=5')
        .then(function (response) {
        return response.json()
        })
        .then(function (data){
            console.log('YouTube Channel Top 5 Videos: \n----------');
            for(var i = 0; i < data.items.length; i++) {
                //video loop goes here
                embedLink = embedLink + data.items[i].id.videoId;
                console.log(embedLink);
                document.getElementById("video1").src = embedLink
                console.log('This is the index ' + i +' most popular video: ' + data.items[i].id.videoId);
                embedLink = 'https://www.youtube.com/embed/';
            }
        })}
    })
}

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