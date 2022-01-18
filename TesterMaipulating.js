
document.addEventListener('DOMContentLoaded', async () => {


    var myVideo = document.getElementById("myVideo");
    var playBtn = document.getElementById("playBtn");
    var pauseBtn = document.getElementById("pauseBtn");
    var stopBtn = document.getElementById("stopBtn");

// start play with play ()
    playBtn.onclick = function () {
        myVideo.play();
    }

// pause playback
    pauseBtn.onclick = function () {
        myVideo.pause();
    }

// The stop () function does not exist, so we combine pause with currentTime = 0;
    stopBtn.onclick = function () {
        myVideo.pause();
        myVideo.currentTime = 0;
    }


});