/* ──────────────────────────────────────────────── */
/*   PI IP STORAGE                                 */
/* ──────────────────────────────────────────────── */

let PI_IP = localStorage.getItem("PI_IP") || "";

function setPiIP() {
    const ip = prompt("Enter Raspberry Pi IP:", PI_IP);
    if (ip) {
        PI_IP = ip;
        localStorage.setItem("PI_IP", ip);
        alert("Pi IP saved!");
    }
}

/* ──────────────────────────────────────────────── */
/*   CLOUD SONG LIST                               */
/* ──────────────────────────────────────────────── */

const cloudSongs = [
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
        artist: "The Kid LAROI & Justin Bieber",
        file: "songs/STAY.mp3",
        image: "images/stay.jpg"
    }
];

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
/*   BUILD CLOUD UI                                */
/* ──────────────────────────────────────────────── */

function loadCloudSongs() {
    const grids = [document.getElementById("cloudGrid"),
                   document.getElementById("cloudGrid2")];

    grids.forEach(grid => {
        grid.innerHTML = "";
        cloudSongs.forEach(song => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <div class="cover" style="background-image:url('${song.image}')"></div>
                <div class="title">${song.name}</div>
                <div class="artist">${song.artist}</div>
            `;
            card.onclick = () => playCloudSong(song.id);
            grid.appendChild(card);
        });
    });
}

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
/*   CLOUD SONG PLAYBACK (UPDATED)                 */
/* ──────────────────────────────────────────────── */

const audio = document.getElementById("audioPlayer");
const label = document.getElementById("songLabel");

function playCloudSong(id) {
    const song = cloudSongs.find(s => s.id === id);
    if (!song) return;

    /* If no Pi IP configured → play in browser */
    if (!PI_IP) {
        audio.src = song.file;
        audio.play();
        label.textContent = `${song.name} — ${song.artist} (Browser)`;

        const newURL = `${window.location.pathname}?song=${id}`;
        window.history.pushState({}, "", newURL);
        return;
    }

    /* Convert string ID → numeric index (0–4) */
    const index = cloudSongs.findIndex(s => s.id === id);

    /* Try to play on the Pi */
    fetch(`http://${PI_IP}:8888/cloud?song=${index}`)
        .then(response => {
            if (!response.ok) throw new Error("Pi rejected request");

            /* Stop browser audio */
            audio.pause();
            audio.src = "";

            label.textContent = `${song.name} — ${song.artist} (Playing on Pi)`;
        })
        .catch(err => {
            console.error("Pi unreachable, falling back", err);

            /* Browser fallback */
            audio.src = song.file;
            audio.play();
            label.textContent = `${song.name} — ${song.artist} (Browser Fallback)`;
        });

    const newURL = `${window.location.pathname}?song=${id}`;
    window.history.pushState({}, "", newURL);
}

/* ──────────────────────────────────────────────── */
/*   LOCAL RPI SONG PLAYBACK CONTROL               */
/* ──────────────────────────────────────────────── */

function playLocalSong(id) {
    if (!PI_IP) return alert("Set your Pi IP first!");

    fetch(`http://${PI_IP}:8888/local?song=${id}`)
        .then(() => {
            label.textContent = `${localSongs[id].name} — Playing on Pi`;
            audio.pause();
            audio.src = "";
        })
        .catch(() => alert("Cannot reach Raspberry Pi"));
}

/* ──────────────────────────────────────────────── */
/*   TABS                                          */
/* ──────────────────────────────────────────────── */

function switchTab(tab) {
    document.querySelectorAll(".tabPage")
        .forEach(t => t.style.display = "none");

    document.getElementById(tab).style.display = "block";
}

/* ──────────────────────────────────────────────── */
/*   AUTO-PLAY FROM SHARE LINK                     */
/* ──────────────────────────────────────────────── */

const params = new URLSearchParams(window.location.search);
const shared = params.get("song");

if (shared) playCloudSong(shared);

/* ──────────────────────────────────────────────── */
/*   INIT                                          */
/* ──────────────────────────────────────────────── */

loadCloudSongs();
loadLocalSongs();

