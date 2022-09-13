var artistSearch = document.getElementById('artistSearch');
var submitBtn = document.getElementById('submitBtn');
var searchResult = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=&type=video&key=AIzaSyDofZ01q_Qh-baUnjYC0t5fzULoMJw_qNE';
var embedLink = 'https://www.youtube.com/embed/'

submitBtn.addEventListener('click', function (event) {
    event.preventDefault();
    var artist = artistSearch.value;
    artist = artist.replace(/\s+/g, '');
    searchResult = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=' + artist + '&type=video&key=AIzaSyDofZ01q_Qh-baUnjYC0t5fzULoMJw_qNE';
    getSearch(searchResult);
})

function getSearch(searchResult) {
    fetch(searchResult).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log('YouTube Video Result: \n----------');
                console.log(data.items[0].id.videoId);
                var videoId = data.items[0].id.videoId;
                console.log('Video ID is: ' + videoId);

                embedLink = embedLink + videoId;

                console.log(embedLink);

                document.getElementById("video1").src = embedLink;
            })
        } else {
            alert('Error: ' + response.statusText);
        }
    })
}