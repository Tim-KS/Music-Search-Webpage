var artistSearch = document.getElementById('artistSearch');
var submitBtn = document.getElementById('submitBtn');

var searchResult = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=&type=channel&key=AIzaSyDofZ01q_Qh-baUnjYC0t5fzULoMJw_qNE';

var searchList = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=&type=channel&key=AIzaSyDofZ01q_Qh-baUnjYC0t5fzULoMJw_qNE';

var test = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyDofZ01q_Qh-baUnjYC0t5fzULoMJw_qNE&channelId=UCIwFjwMjI0y7PDBVEO9-bkQ&part=snippet,id&chart=mostPopular&categoryId=10&maxResults=5'


//use searchList to find out the channel id, then use the channel ID to be able to go directly to that channel and list that channels top 5 videos, might make the initial song search redundant though

submitBtn.addEventListener('click', function (event) {
    event.preventDefault();
    var artist = artistSearch.value;
    artist = artist.replace(/\s+/g, '');
    searchResult = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=' + artist + '&type=channel&key=AIzaSyDofZ01q_Qh-baUnjYC0t5fzULoMJw_qNE';
//    getSearch(searchResult);
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
        fetch('https://www.googleapis.com/youtube/v3/search?key=AIzaSyDofZ01q_Qh-baUnjYC0t5fzULoMJw_qNE&channelId=' + channelId + '&part=snippet,id&chart=mostPopular&categoryId=10&maxResults=5')
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
    





































    // function getSearch(searchResult) {
//     fetch(searchResult).then(function (response) {
//         if (response.ok) {           
//             response.json().then(function (data) {
//                 console.log('YouTube Video Result: \n----------');
//                 var videoId = data.items[0].id.videoId;
//                 console.log('Video ID is: ' + videoId);
//             })
//             } else {
//                 alert('Error: ' + response.statusText);
//             }
//         })   
//     }  