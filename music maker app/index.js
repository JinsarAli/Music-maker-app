//// Initials
// songs
let songs = [
    "music/music_Faded.mp3",
    "music/music_fallingdown.mp3",
    "music/music_Rather Be.mp3",
    "music/music_stay.mp3"
];
let currentSongIndex = 0;

// global variables
const audioElem = document.getElementById("audioElem");
const seekSlider = document.querySelector('.seek_slider');

// getting total duration and showing on UI
let duration = Math.floor(audioElem.duration);
let mins = Math.floor(duration / 60);
let sec = Math.floor(duration % 60);
document.querySelector(".total-duration").textContent = `${mins}:${sec}`;

//// events
// Next Track function/event
let i = 0;
const nextTrack = () => {
    // Change background color
    let color1 = Math.round(Math.random() * 1000000).toString()
    let color2 = Math.round(Math.random() * 1000000).toString()

    let positions = ["left", "right", "top", "bottom"];

    let generateIndex = () => {
        let random = Math.floor(Math.random() * positions.length)
        if (random != i) {
            return random
        } else {
            generateIndex();
        }
    }

    i = generateIndex();
    document.body.style.background = `linear-gradient(to ${positions[i]},#${color1}, #${color2})`;

    // change song

    // song increment by 1 to the current song
    currentSongIndex++;

    // when the song list has reaches to its length ,then start from first song
    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }

    // set the source to audio as current song
    audioElem.setAttribute("src", songs[currentSongIndex]);
    seekSlider.value = 0;
    audioElem.play()

    document.getElementById("pauseIcon").classList.remove("d-none");
    // document.getElementById("playIcon").classList.add("d-none");
}

// setting the previous track 
const prevTrack = () => {

    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1; // wrap around to the last song
    }

    audioElem.setAttribute("src", songs[currentSongIndex]);

    audioElem.play();
    document.getElementById("pauseIcon").classList.remove("d-none");
    // document.getElementById("playIcon").classList.add("d-none");
    seekSlider.value = 0;

};

// setting the repeat function

const repeatTrack = () => {
    // repeat the song when click its current time will be zero
    audioElem.currentTime = 0;

}

// setting the randomtrack  function
const randomTrack = () => {
  let j = 0;
  const songIndex = () => {
    const randomIndex = Math.floor(Math.random() * songs.length);
    if (randomIndex !== j) {
      return randomIndex;
    } else {
      return songIndex();
    }
  };
  j = songIndex();
  audioElem.setAttribute("src", songs[j]);
  audioElem.play();
};


// play and pause function 
const playPauseTrack = () => {
    audioElem.paused == true ? audioElem.play() : audioElem.pause();
    document.getElementById("pauseIcon").classList.toggle("d-none");
    document.getElementById("playIcon").classList.toggle("d-none");
}

// space event - play pause function
document.addEventListener("keyup", (e) => e.code == "Space" ? playPauseTrack() : null);

// Seekto Function
const seekTo = () => {
    const newTime = audioElem.duration * (seekSlider.value / 100);
    audioElem.currentTime = newTime;
}

// Show current time of track
audioElem.addEventListener('timeupdate', () => {
    const progress = (audioElem.currentTime / audioElem.duration) * 100;
    if (!audioElem.paused);
    seekSlider.value = progress;


    let currentTime = Math.floor(audioElem.currentTime);
    let mins = Math.floor(currentTime / 60);
    let sec = Math.floor(currentTime % 60);

    document.querySelector(".current-time").textContent = `${mins}:${sec}`;
});

// event - on track ended/finished - change icon from pause to play
audioElem.addEventListener('ended', () => {
    document.getElementById("pauseIcon").classList.toggle("d-none");
    document.getElementById("playIcon").classList.toggle("d-none");
});

// setVolume function
const setVolume = () => {
    let sliderValue = document.getElementById("volume_slider").value;
    audioElem.volume = sliderValue / 100;
}

// event key "+" and "-" - increase or decrease the volume
document.addEventListener("keyup", (e) => {
    audioElem.volume = e.code == "Equal" && audioElem.volume <= 0.9 ? audioElem.volume + 0.1 :
        e.code == "Minus" && audioElem.volume >= 0.1 ? audioElem.volume - 0.1 :
            audioElem.volume;

    document.getElementById("volume_slider").value = (audioElem.volume / 1) * 100
});
