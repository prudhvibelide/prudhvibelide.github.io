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
        id: 0,
        name: "Starboy",
        artist: "The Weeknd",
        file: "songs/Starboy.mp3",
        image: "images/starboy.jpg"
    },
    {
        id: 1,
        name: "FE!N",
        artist: "Travis Scott",
        file: "songs/FEIN.mp3",
        image: "images/fein.jpg"
    },
    {
        id: 2,
        name: "Heat Waves",
        artist: "Glass Animals",
        file: "songs/HeatWaves.mp3",
        image: "images/heatwaves.jpg"
    },
    {
        id: 3,
        name: "Sorry",
        artist: "Justin Bieber",
        file: "songs/Sorry.mp3",
        image: "images/sorry.jpg"
    },
    {
        id: 4,
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
    { id: 0, name: "RunitUp",     artist: "RPi Local", image: "images/local1.jpg" },
    { id: 1, name: "BeatIt",      artist: "RPi Local", image: "images/local2.jpg" },
    { id: 2, name: "ShapeofYou",  artist: "RPi Local", image: "images/local3.jpg" },
    { id: 3, name: "Gasolina",    artist: "RPi Local", image: "images/local4.jpg" },
    { id: 4, name: "RapGod",      artist: "RPi Local", image: "images/local5.jpg" }
];

/* ──────────────────────────────────────────────── */
/*   BUILD CLOUD UI                                */
/* ──────────────────────────────────────────────── */

function loadCloudSongs() {
    const grids = [
        document.getElementById("cloudGrid"),
        document.getElementById("cloudGrid2")
    ];

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

            card.onclick = () => playCloudOnPi(song.id);
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
/*   CLOUD → PLAY ON PI                             */
/*   (Matches daemon: GET /cloud?song=N )           */
/* ──────────────────────────────────────────────── */

function playCloudOnPi(id) {
    if (!PI_IP) return alert("Set your Pi IP first!");

    fetch(`http://${PI_IP}:8888/cloud?song=${id}`)
        .then(() => alert("Pi streaming cloud song: " + cloudSongs[id].name))
        .catch(() => alert("Cannot reach Raspberry Pi"));
}

/* ──────────────────────────────────────────────── */
/*   LOCAL → PLAY ON PI                             */
/*   (Matches daemon: GET /local?song=N )           */
/* ──────────────────────────────────────────────── */

function playLocalSong(id) {
    if (!PI_IP) return alert("Set your Pi IP first!");

    fetch(`http://${PI_IP}:8888/local?song=${id}`)
        .then(() => alert("Pi playing local song: " + localSongs[id].name))
        .catch(() => alert("Cannot reach Raspberry Pi"));
}

/* ──────────────────────────────────────────────── */
/*   OPTIONAL: BROWSER PREVIEW (Cloud only)         */
/*   This does NOT control Pi                       */
/* ──────────────────────────────────────────────── */

const audio = document.getElementById("audioPlayer");
const label = document.getElementById("songLabel");

function previewCloudLocally(id) {
    const song = cloudSongs[id];
    audio.src = song.file;
    audio.play();
    label.textContent = `${song.name} — ${song.artist}`;
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
/*   SHARE-LINK AUTO PLAY                           */
/* ──────────────────────────────────────────────── */

const params = new URLSearchParams(window.location.search);
const shared = params.get("song");

if (shared) previewCloudLocally(shared);

/* ──────────────────────────────────────────────── */
/*   INIT                                          */
/* ──────────────────────────────────────────────── */

loadCloudSongs();
loadLocalSongs();

