var music = document.querySelector('#music')
var discography = document.querySelector('#discography')
var bio = document.querySelector('#bio')

var activeColor = '#efefef'
var inactiveColor = '#9e9e9e'

var musicContainer = document.querySelector('#music-container')
var discographyContainer = document.querySelector('#discography-container')
var bioContainer = document.querySelector('#bio-container')

function hide (victims, victimContainers) {
	victims.forEach((victim) => {
		victim.style.color = inactiveColor
		victim.style.border = 'none'
	})
	victimContainers.forEach((container) => {
		container.style.display = 'none'
	})
}

function navigate (target, victims, targetContainer, victimContainers) {
	target.addEventListener('click', () => {
		hide(victims, victimContainers)
		target.style.color = activeColor
		target.style.borderBottom = '2px solid ' + activeColor
		targetContainer.style.display = 'block'
	})
}

navigate(music, [discography, bio], musicContainer, [discographyContainer, bioContainer])
navigate(discography, [music, bio], discographyContainer, [musicContainer, bioContainer])
navigate(bio, [discography, music], bioContainer, [discographyContainer, musicContainer])
