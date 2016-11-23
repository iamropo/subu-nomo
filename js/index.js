var music = document.querySelector('#music')
var video = document.querySelector('#video')

var musicContainer = document.querySelector('#music-container')
var videoContainer = document.querySelector('#video-container')

function navigate (target, targetContainer, victimContainer) {
	target.addEventListener('click', () => {
		victimContainer.style.display = 'none'
		targetContainer.style.display = 'block'
	})
}

navigate(music, musicContainer, videoContainer)
navigate(video, videoContainer, musicContainer)