var music = document.querySelector('#music')
var video = document.querySelector('#video')
var bio = document.querySelector('#bio')

var activeColor = '#e0e0e0'
var inactiveColor = '#9e9e9e'

var musicContainer = document.querySelector('#music-container')
var videoContainer = document.querySelector('#video-container')
var bioContainer = document.querySelector('#bio-container')

function hide (victims, victimContainers) {
	victims.forEach((victim) => {
		victim.style.color = inactiveColor
	})
	victimContainers.forEach((container) => {
		container.style.display = 'none'
	})
}

function navigate (target, victims, targetContainer, victimContainers) {
	target.addEventListener('click', () => {
		hide(victims, victimContainers)
		target.style.color = activeColor
		targetContainer.style.display = 'block'
	})
}

navigate(music, [video, bio], musicContainer, [videoContainer, bioContainer])
navigate(video, [music, bio], videoContainer, [musicContainer, bioContainer])
navigate(bio, [video, music], bioContainer, [videoContainer, musicContainer])
