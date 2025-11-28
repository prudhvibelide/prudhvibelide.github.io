const songs = [
    {
        name: "Starboy",
        artist: "The Weeknd",
        file: "songs/Starboy.mp3",
        image: "images/starboy.jpg"
    },
    {
        name: "FE!N",
        artist: "Travis Scott",
        file: "songs/FEIN.mp3",
        image: "images/fein.jpg"
    },
    {
        name: "Heat Waves",
        artist: "Glass Animals",
        file: "songs/HeatWaves.mp3",
        image: "images/heatwaves.jpg"
    },
    {
        name: "Sorry",
        artist: "Justin Bieber",
        file: "songs/Sorry.mp3",
        image: "images/sorry.jpg"
    },
    {
        name: "STAY",
        artist: "The Kid LAROI",
        file: "songs/STAY.mp3",
        image: "images/stay.jpg"
    }
];

const grid = document.getElementById("songGrid");
const audio = document.getElementById("audioPlayer");
const label = document.getElementById("currentSong");

songs.forEach(song => {
    const card = document.createElement("div");
    card.className = "song-card";

    card.innerHTML = `
        <div class="cover" style="background-image:url('${song.image}')"></div>
        <div class="song-info">${song.name}</div>
        <div class="artist">${song.artist}</div>
    `;

    card.onclick = () => {
        audio.src = song.file;
        audio.play();
        label.textContent = `${song.name} — ${song.artist}`;
    };

    grid.appendChild(card);
});

