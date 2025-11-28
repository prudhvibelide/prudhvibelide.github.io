/* ──────────────────────────────────────────────── */
/*   LOCAL RPI SONG LIST                           */
/* ──────────────────────────────────────────────── */

const localSongs = [
    { id: 0, name: "RunitUp", artist: "RPi Local", image: "images/local1.jpg" },
    { id: 1, name: "BeatIt", artist: "RPi Local", image: "images/local2.jpg" },
    { id: 2, name: "ShapeofYou", artist: "RPi Local", image: "images/local3.jpg" },
    { id: 3, name: "Gasolina", artist: "RPi Local", image: "images/local4.jpg" },
    { id: 4, name: "RapGod", artist: "RPi Local", image: "images/local5.jpg" }
];

/* ──────────────────────────────────────────────── */
/*   BUILD LOCAL SONG UI                           */
/* ──────────────────────────────────────────────── */

function loadLocalSongs() {
    const grid = document.getElementById("localGrid");
    grid.innerHTML = "";

    localSongs.forEach(song => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <div class="cover" style="background-image:url('${song.image}')"></div>
            <div class="title">${song.name}</div>
            <div class="artist">${song.artist}</div>
        `;

        card.onclick = () => playLocalSong(song.id);
        grid.appendChild(card);
    });
}

/* ──────────────────────────────────────────────── */
/*   LOCAL RPI SONG PLAYBACK CONTROL               */
/* ──────────────────────────────────────────────── */

function playLocalSong(id) {
    if (!PI_IP) return alert("Set your Pi IP first!");

    fetch(`http://${PI_IP}:8888/local?song=${id}`)
        .then(() => alert("Pi playing local song " + (id + 1)))
        .catch(() => alert("Cannot reach Raspberry Pi"));
}

/* ──────────────────────────────────────────────── */
/*   INIT                                           */
/* ──────────────────────────────────────────────── */

loadLocalSongs();

