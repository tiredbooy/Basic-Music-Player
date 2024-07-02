//     Music Array
const musics = [
  {
    name: "Biseda",
    singer: "Chvrsi",
    img: "./Covers/biseda.png",
    music: "./Musics/biseda.mp3",
  },
  {
    name: "boro",
    singer: "Chvrsi",
    img: "./Covers/boro.png",
    music: "./Musics/boro.mp3",
  },
  {
    name: "Damn Things",
    singer: "Dorcci",
    img: "./Covers/DamnThings.jpg",
    music: "./Musics/DamnThings.mp3",
  },
  {
    name: "Kash Begi",
    singer: "Dorcci && Poobon",
    img: "./Covers/kashBegi.jpg",
    music: "./Musics/kashBegi.mp3",
  },
  {
    name: "Keshidi Par",
    singer: "Chvrsi",
    img: "./Covers/keshidipar.jpg",
    music: "./Musics/keshidiPar.mp3",
  },
  {
    name: "Telesm",
    singer: "Shayan Eshraghi && Chvrsi",
    img: "./Covers/telesm.png",
    music: "./Musics/Telesm.mp3",
  },
];

//     Variables

const cards = document.querySelector(".card");
const cardImage = document.querySelector("#cardImage");
const singerName = document.querySelector(".singer-name");
const musicName = document.querySelector(".music-name");
const pervBtn = document.querySelector("#perv-btn");
const playBtn = document.querySelector("#play-btn");
const nextBtn = document.querySelector("#next-btn");
const volumeBtn = document.querySelector("#volume-btn");
const shuffleBtn = document.querySelector("#shuffle-btn");
const themeSwitcherBtn = document.querySelector("#flexSwitchCheckDefault");
const range = document.querySelector("#customRange2");
const volumeRange = document.getElementById("customRange1");

let currentMusic = musics[0];
const musicCover = currentMusic.img;
const singer = currentMusic.singer;
const songName = currentMusic.name;
let song = new Audio(currentMusic.music);

// set music info
cardImage.src = musicCover;
singerName.textContent = singer;
musicName.textContent = songName;

var songIndex = 0;
range.value = 0;

// Event Listeners
pervBtn.addEventListener("click", () => {
  changeMusic("pre");
});
playBtn.addEventListener("click", playPause);
nextBtn.addEventListener("click", () => {
  changeMusic("next");
});

song.addEventListener("timeupdate", progressBar);
range.addEventListener("input", () => {
  const seekTime = (range.value / 100) * song.duration;
  song.currentTime = seekTime;
});

volumeRange.value = 100;
volumeControl();

shuffleBtn.addEventListener("click", () => {
  const shuffledMusics = shuffle(musics);
  shuffleBtn.style.color = "blue";
  currentMusic = shuffledMusics[songIndex];
  changeMusic("pre");
  song.play();
  playBtn.classList.remove("fa-play");
  playBtn.classList.add("fa-pause");
});

// functions
function playPause() {
  if (playBtn.classList.contains("fa-play")) {
    song.play();
    cardImage.classList.add("img-animate");
    playBtn.classList.remove("fa-play");
    playBtn.classList.add("fa-pause");
  } else {
    song.pause();
    cardImage.classList.remove("img-animate");
    playBtn.classList.remove("fa-pause");
    playBtn.classList.add("fa-play");
  }
}

function shuffle(musics) {
  for (let i = musics.length - 1; i >= 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [musics[i], musics[j]] = [musics[j], musics[i]];
  }
  return musics;
}

function changeMusic(state) {
  song.pause();
  cardImage.classList.remove("img-animate");
  range.value = 0;
  playBtn.classList.replace("fa-pause", "fa-play");

  if (state == "next") {
    songIndex = (songIndex + 1) % musics.length;
  } else {
    songIndex = (songIndex - 1 + musics.length) % musics.length;
  }

  currentMusic = musics[songIndex];
  song.src = currentMusic.music; // Update the audio source
  updateSongInfo();
}

//  Volume Control
function volumeControl() {
  volumeRange.style.display = "inline-block";

  let storedUserVolume = localStorage.getItem("userVol");

  if (storedUserVolume !== null) {
    if (storedUserVolume === "0") song.volume = 0;
    else song.volume = storedUserVolume / 100;

    volumeRange.value = storedUserVolume;
  }

  volumeRange.addEventListener("change", () => {
    let userVolume = volumeRange.value;

    if (userVolume === "0") {
      song.volume = 0;
    } else {
      song.volume = userVolume / 100;
      localStorage.setItem("userVol", userVolume);
    }
    volumeBtn.classList.replace("fa-volume-off", "fa-volume-low");
  });
}

// Progress Bar
function progressBar() {
  if (song.duration > 0) {
    range.value = (song.currentTime / song.duration) * 100;
  }
}
// Display Song Information
function updateSongInfo() {
  cardImage.src = currentMusic.img;
  singerName.textContent = currentMusic.singer;
  musicName.textContent = currentMusic.name;
}

// save the current Song To Local Storage
function saveToLocal() {
  let songInformation = {
    song: song,
  };
  localStorage.setItem("saveSong", songInformation);
}
saveToLocal();

// Handle End of Track
function musicsEnd() {
  song.addEventListener("timeupdate", () => {
    if (song.currentTime == song.duration) {
      changeMusic("next");
      song.play();
      playBtn.classList.remove("fa-play");
      playBtn.classList.add("fa-pause");
    }
  });
}

musicsEnd();
