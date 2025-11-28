const songs = [
    {
        id: "Starboy",
        name: "Starboy",
        artist: "The Weeknd",
        file: "songs/Starboy.mp3",
        image: "images/starboy.jpg"
    },
    {
        id: "FEIN",
        name: "FE!N",
        artist: "Travis Scott",
        file: "songs/FEIN.mp3",
        image: "images/fein.jpg"
    },
    {
        id: "HeatWaves",
        name: "Heat Waves",
        artist: "Glass Animals",
        file: "songs/HeatWaves.mp3",
        image: "images/heatwaves.jpg"
    },
    {
        id: "Sorry",
        name: "Sorry",
        artist: "Justin Bieber",
        file: "songs/Sorry.mp3",
        image: "images/sorry.jpg"
    },
    {
        id: "STAY",
        name: "STAY",
        artist: "The Kid LAROI",
        file: "songs/STAY.mp3",
        image: "images/stay.jpg"
    }
];

const grid = document.getElementById("songGrid");
const audio = document.getElementById("audioPlayer");
const label = document.getElementById("songLabel");

// Create cards
songs.forEach(song => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
        <div class="cover" style="background-image:url('${song.image}')"></div>
        <div class="title">${song.name}</div>
        <div class="artist">${song.artist}</div>
    `;

    card.onclick = () => playSong(song.id);

    grid.appendChild(card);
});

// Play function + update URL like Spotify
function playSong(id) {
    const song = songs.find(s => s.id === id);
    if (!song) return;

    audio.src = song.file;
    audio.play();
    label.textContent = `${song.name} — ${song.artist}`;

    // Update URL without reloading
    const newURL = `${window.location.pathname}?song=${id}`;
    window.history.pushState({}, "", newURL);
}

// Auto-play when shared link is used
const urlParams = new URLSearchParams(window.location.search);
const sharedSong = urlParams.get("song");

if (sharedSong) {
    playSong(sharedSong);
}

