var musicTracks = document.getElementsByTagName('audio')
var progressBars = document.querySelectorAll('.progress-bar')
var trackTitles = document.querySelectorAll('.title')

// Interface
var playButton = document.getElementById('play')
var pauseButton = document.getElementById('pause')
var prevButton = document.getElementById('prev')
var nextButton = document.getElementById('next')

const FIRST_TRACK = 1

function Status (musicTracks) {
  var currentTrack = null // the index + 1
  var pausedTrack = null

  function styleActiveParent (trackNumber) {
    var trackTitle = musicTracks[trackNumber - 1].parentElement.parentElement.parentElement.children[1]
    trackTitle.style.fontWeight = '600'
    trackTitle.style.color = '#ffffff'
    mediaPlayer.displayProgressBar(trackNumber)
  }

  return {
    play: function (trackNumber) {
      currentTrack = trackNumber
      pausedTrack = null
      playButton.style.display = 'none'
      pauseButton.style.display = 'list-item'
      musicTracks[trackNumber - 1].play()
      styleActiveParent(trackNumber)
    },
    pause: function (trackNumber) {
      pausedTrack = trackNumber
      currentTrack = null
      playButton.style.display = 'list-item'
      pauseButton.style.display = 'none'
      musicTracks[trackNumber - 1].pause()
    },
    playing: function () {
			// returns the index + 1
      return currentTrack
    },
    paused: function () {
      return pausedTrack
    },
    /*resetting tracks*/
    reset: function () {
    	currentTrack = pausedTrack = null;
    },
    displayProgressBar: function (trackNumber) {
      var progressBar = musicTracks[trackNumber - 1].parentElement.parentElement
      progressBar.style.visibility = 'visible'
      progressBar.parentElement.style.border = 'none'
    },
    hideProgressBar: function (trackNumber) {
      var progressBar = musicTracks[trackNumber - 1].parentElement.parentElement
      progressBar.style.visibility = 'hidden'
      progressBar.parentElement.style.borderTop = '1px dotted #9e9e9e'      
    }
 	}
}

var mediaPlayer = Status(musicTracks)

function play () {
  if (mediaPlayer.playing() === null && mediaPlayer.paused() === null) {
    mediaPlayer.play(FIRST_TRACK)
    mediaPlayer.displayProgressBar(FIRST_TRACK)
  } else if (mediaPlayer.paused() !== null) {
    mediaPlayer.play(mediaPlayer.paused())
  }
}

function pause () {
  if (mediaPlayer.playing() !== null) {
    mediaPlayer.pause(mediaPlayer.playing())
  }
}

function seekToBegining (trackNumber) {
  musicTracks[trackNumber - 1].currentTime = 0
  musicTracks[trackNumber - 1].parentElement.style.color = '#e0e0e0'
  musicTracks[trackNumber - 1].parentElement.parentElement.parentElement.children[1].style.fontWeight = 'normal'
}

function previousTrack () {
  if (mediaPlayer.playing() !== null || mediaPlayer.paused() !== null) {
    var victimTrackNumber = mediaPlayer.playing() || mediaPlayer.paused()
    seekToBegining(victimTrackNumber)
    mediaPlayer.pause(victimTrackNumber)
    mediaPlayer.hideProgressBar(victimTrackNumber)
    if (victimTrackNumber === FIRST_TRACK) {
      mediaPlayer.play(FIRST_TRACK)
      mediaPlayer.displayProgressBar(FIRST_TRACK)
    } else {
      mediaPlayer.play(victimTrackNumber - 1)
      mediaPlayer.displayProgressBar(victimTrackNumber - 1)
    }
  }
}

function nextTrack () {
  if (mediaPlayer.playing() !== null || mediaPlayer.paused() !== null) {
    var victimTrackNumber = mediaPlayer.playing() || mediaPlayer.paused()
    seekToBegining(victimTrackNumber)
    mediaPlayer.pause(victimTrackNumber)
    mediaPlayer.hideProgressBar(victimTrackNumber)
    if (victimTrackNumber === musicTracks.length) {
			// Go back back to the first track (But don't play)
			mediaPlayer.reset();
      return false
    } else {
      mediaPlayer.play(victimTrackNumber + 1)
      mediaPlayer.displayProgressBar(victimTrackNumber + 1)
    }
  }
}

Array.prototype.forEach.call(musicTracks, function (track, index) {
  track.parentElement.addEventListener('click', function () {
    var victimTrackNumber = mediaPlayer.playing() || mediaPlayer.paused()
    if (victimTrackNumber !== null) {
      seekToBegining(victimTrackNumber)
      mediaPlayer.pause(victimTrackNumber)
    }
    mediaPlayer.play(index + 1)
  })
  track.addEventListener('ended', function (index) {
    nextTrack()
    if (index === musicTracks.length - 1) {
    	playButton.style.display = 'list-item'
      pauseButton.style.display = 'none'
    }
  })
})

playButton.addEventListener('click', play)
pauseButton.addEventListener('click', pause)
prevButton.addEventListener('click', previousTrack)
nextButton.addEventListener('click', nextTrack)

Array.prototype.forEach.call(musicTracks, function (track) {
  track.addEventListener('timeupdate', function () {
    var duration =  track.duration;
    if (duration > 0) {
      track.parentElement.style.width = ((track.currentTime / duration)*100) + "%";
    }
  });
})

Array.prototype.forEach.call(progressBars, function (progressBar) {
  progressBar.addEventListener('click', function (e) {
    var parentProperties = this.getBoundingClientRect();
    var percent = ((e.pageX - parentProperties.left) / parentProperties.width) * 100
    progressBar.children[0].style.width = percent + '%'
    var audio = progressBar.children[0].children[0]
    audio.currentTime = (audio.duration * percent) / 100
  })
})

Array.prototype.forEach.call(trackTitles, function (title, index) {
  title.addEventListener('click', function () {
    var victimTrackNumber = mediaPlayer.playing() || mediaPlayer.paused()
    if (victimTrackNumber !== null) {
      seekToBegining(victimTrackNumber)
      mediaPlayer.pause(victimTrackNumber)
      mediaPlayer.hideProgressBar(victimTrackNumber)
    }
    mediaPlayer.play(index + 1)
  })
})