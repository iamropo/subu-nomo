var musicTracks = document.getElementsByTagName('audio');
// Interface
var playButton = document.getElementById('play');
var pauseButton = document.getElementById('pause');
var prevButton = document.getElementById('prev');
var nextButton = document.getElementById('next');

const RACE_TIMEOUT = 150; 
// For: Uncaught (in promise) DOMException: The play() request was interrupted by a new load request.
const FIRST_TRACK = 1;

function Status (musicTracks) {

	var currentTrack = null; // the index + 1
	var pausedTrack = null;
	return {
		play: function (trackNumber) {
			currentTrack = trackNumber;
			pausedTrack = null;
			playButton.style.display = 'none';
			pauseButton.style.display = 'list-item';	
			musicTracks[trackNumber - 1].play();
			musicTracks[trackNumber - 1].parentElement.style.color = '#ffffff';
			musicTracks[trackNumber - 1].parentElement.style.fontWeight = '500';
			musicTracks[trackNumber - 1].parentElement.style.borderTop = '3px solid #ffffff';
		},
		pause: function (trackNumber) {
			pausedTrack = trackNumber;
			currentTrack = null;
			playButton.style.display = 'list-item';
			pauseButton.style.display = 'none';			
			musicTracks[trackNumber - 1].pause();
		},
		playing: function () {
			// returns the index + 1
			return currentTrack;
		},
		paused: function () {
			return pausedTrack;
		}
 	}
}

var mediaPlayer = Status(musicTracks);

playButton.addEventListener('click', function () {
	if (mediaPlayer.playing() === null && mediaPlayer.paused() === null) {
		mediaPlayer.play(FIRST_TRACK);
	} else if (mediaPlayer.paused() !== null) {
		mediaPlayer.play(mediaPlayer.paused());
	}
});

pauseButton.addEventListener('click', function () {
	if (mediaPlayer.playing() !== null) {
		mediaPlayer.pause(mediaPlayer.playing());
	}
});

function seekToBegining(trackNumber) {
	musicTracks[trackNumber - 1].currentTime = 0;
	musicTracks[trackNumber - 1].parentElement.style.color = '#e0e0e0';
	musicTracks[trackNumber - 1].parentElement.style.fontWeight = 'normal';
	musicTracks[trackNumber - 1].parentElement.style.borderTop = '2px solid #e0e0e0';
}

prevButton.addEventListener('click', function () {

	if (mediaPlayer.playing() !== null || mediaPlayer.paused() !== null) {

		var victimTrackNumber = mediaPlayer.playing() || mediaPlayer.paused();				

		seekToBegining(victimTrackNumber);
		mediaPlayer.pause(victimTrackNumber);

		if (victimTrackNumber === FIRST_TRACK) {
			mediaPlayer.play(FIRST_TRACK);
		} else {	
			mediaPlayer.play(victimTrackNumber - 1);
		}	
	
	}

});


nextButton.addEventListener('click', function () {

	if (mediaPlayer.playing() !== null || mediaPlayer.paused() !== null) {

		var victimTrackNumber = mediaPlayer.playing() || mediaPlayer.paused();

		seekToBegining(victimTrackNumber);
		mediaPlayer.pause(victimTrackNumber);

		if (victimTrackNumber === musicTracks.length) { 
			mediaPlayer.play(FIRST_TRACK);
		} else {
			mediaPlayer.play(victimTrackNumber + 1);
		}

	}

});

Array.prototype.forEach.call(musicTracks, function (track, index) {
	track.parentElement.addEventListener('click', function () {
		var victimTrackNumber =  mediaPlayer.playing() || mediaPlayer.paused();
		if (victimTrackNumber !== null) {
			seekToBegining(victimTrackNumber);
			mediaPlayer.pause(victimTrackNumber);
		}
		mediaPlayer.play(index + 1);
	})
})