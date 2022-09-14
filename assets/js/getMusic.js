var artistSearch = document.getElementById('artistSearch');
var submitBtn = document.getElementById('submitBtn');

var searchResult = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=&type=channel&key=AIzaSyDofZ01q_Qh-baUnjYC0t5fzULoMJw_qNE';

var searchList = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=&type=channel&key=AIzaSyDofZ01q_Qh-baUnjYC0t5fzULoMJw_qNE';

submitBtn.addEventListener('click', function (event) {
    event.preventDefault();
    var artist = artistSearch.value;
    artist = artist.replace(/\s+/g, '');
    searchResult = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=' + artist + '&type=channel&key=AIzaSyDofZ01q_Qh-baUnjYC0t5fzULoMJw_qNE';
    getArtist(searchResult);
})

function getArtist(searchResult) {
    fetch(searchResult).then(function (response) {
        if (response.ok) {           
            return response.json()
            } else {
                alert('Error: ' + response.statusText);
            }
        })
    .then(function(data) {
        console.log(data);
        var channelId = data.items[0].id.channelId;
        fetch('https://www.googleapis.com/youtube/v3/search?key=AIzaSyDofZ01q_Qh-baUnjYC0t5fzULoMJw_qNE&channelId=' + channelId + '&part=snippet,id&type=video&chart=mostPopular&categoryId=10&maxResults=5')
        .then(function (response) {
        return response.json()
        })
        .then(function (data){
            console.log('YouTube Channel Top 5 Videos: \n----------');
            console.log(data)
            for(var i = 0; i < data.items.length; i++) {
                console.log('This is the index ' + i +' most popular video: ' + data.items[i].id.videoId);
            }
        })
    })
}