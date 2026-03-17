const apiKey = "AIzaSyB-BGMK2osPDfyIhTJ3sfAQmoISZLoV5cQ";

const searchBar = document.getElementById("searchBar");
const resultsDiv = document.getElementById("results");
const playerDiv = document.getElementById("player");

let typingTimer;
const delay = 400;

searchBar.addEventListener("input", () => {

    clearTimeout(typingTimer);

    const query = searchBar.value.trim();

    if(query.length < 2){
        resultsDiv.innerHTML = "";
        return;
    }

    typingTimer = setTimeout(() => {
        searchYouTube(query);
    }, delay);

});

function searchYouTube(query){

fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&maxResults=6&key=${apiKey}`)
.then(res => res.json())
.then(data => {

resultsDiv.innerHTML = "";

data.items.forEach(item => {

const videoId = item.id.videoId;
const title = item.snippet.title;
const thumb = item.snippet.thumbnails.default.url;

const div = document.createElement("div");
div.className = "result";

div.innerHTML = `
<img src="${thumb}">
<span>${title}</span>
`;

div.onclick = () => {
playVideo(videoId);
resultsDiv.innerHTML = "";
};

resultsDiv.appendChild(div);

});

});

}

function playVideo(videoId){

playerDiv.innerHTML = `
<iframe
width="720"
height="405"
src="https://www.youtube.com/embed/${videoId}?autoplay=1"
frameborder="0"
allowfullscreen>
</iframe>
`;

}
