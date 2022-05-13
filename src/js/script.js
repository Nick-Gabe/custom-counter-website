const inputBg = document.getElementById('input-bg')
const inputColor = document.getElementById('input-color')
const inputFont = document.getElementById('input-font')
const counter = document.getElementById('counter')
const inputMax = document.getElementById('input-max');

// execute in function to prevent global variables
; (function () {
    const nps = document.getElementById('input-nps')
    const npsContainer = document.querySelector('.input-nps.container')
    const inputIncrease = document.getElementById('input-increase')
    const inputDecrease = document.getElementById('input-decrease')
    const inputPause = document.getElementById('input-pause')
    let isPaused = false
    nps.value = 0

    let counterUpdater;
    function updateCounter(newTimer) {
        // clear the previous setInterval and create a new one with a new timer
        clearInterval(counterUpdater)
        if (newTimer == 0) return

        let incrementValue = 1
        if (newTimer >= 250) {
            // sets how many numbers can be incremented each time
            incrementValue = Math.floor(newTimer / 125 - 1)
            newTimer /= incrementValue
        } else if (newTimer <= -250) {
            incrementValue = Math.floor(newTimer / -125 + 1)
            newTimer /= incrementValue
        }

        counterUpdater = setInterval(() => {
            // if paused, stop the counter
            if (isPaused) return updateCounter(0)

            // if numbers per second is positive increment the counter
            if (newTimer > 0) {
                // if nps > max, keep the counter at max
                if (inputMax.value
                    && Number(counter.value) + 1 > inputMax.value) {
                    counter.value = inputMax.value
                    return
                }
                // else increment it normally
                counter.value = Math.floor(Number(counter.value) + incrementValue)
            }
            else {
                // if nps < negative max, keep the counter at max
                if (inputMax.value
                    && Number(counter.value) - 1 < -Math.abs(inputMax.value)) {
                    counter.value = -Math.abs(inputMax.value)
                    return
                }
                // else decrement it normally
                counter.value = Math.floor(counter.value - incrementValue)
            }

            // 1000 / newTimer generates how many numbers need to be added per second
        }, Math.round(1000 / Math.abs(newTimer)))
    }

    function pausePlay(action) {
        const options = {
            play() {
                // just some css to adjust the backgrounds and show the paused icon
                inputPause.className = "input--button play paused"
                inputPause.style.backgroundImage = `url("src/resources/pause-svgrepo-com.svg")`
                inputPause.style.backgroundSize = '30px'
                inputPause.style.backgroundPositionX = 'center'
                isPaused = false
                updateCounter(nps.value)
            },
            pause() {
                // just some css to adjust the backgrounds and show the play icon
                inputPause.className = "input--button play playing"
                inputPause.style.backgroundImage = `url("src/resources/play-svgrepo-com.svg")`
                inputPause.style.backgroundSize = 'contain'
                inputPause.style.backgroundPositionX = '2px'
                isPaused = true
                updateCounter(0)
            },
            auto: function () {
                inputPause.classList.contains('paused')
                ? this.pause() : this.play()
            }
        }
        action ? options[action]() : options.auto()
    }

    // listen to the mouse scroll on nps and increases its value based on scrolling delta
    npsContainer.addEventListener('wheel', (event) => {
        nps.value = Math.floor(Number(nps.value) + -event.deltaY / 50)
        updateCounter(nps.value)
    })

    function resizeNps() {
        nps.style.width = nps.value.length + 1 + "ch"
    }
    resizeNps()

    nps.oninput = () => {
        resizeNps()
        updateCounter(nps.value)
    }

    counter.onfocus = () => pausePlay('pause')
    counter.onblur = () => pausePlay('play')

    document.addEventListener('keydown', (key) => key.code === "Space" && pausePlay())
    inputPause.onclick = () => pausePlay()

    // button on click, increase nps
    inputIncrease.onclick = () => {
        nps.value = Math.floor(nps.value) + 1
        resizeNps()
        updateCounter(nps.value)
    }

    // button on click, decrease nps
    inputDecrease.onclick = () => {
        nps.value = Math.floor(nps.value) - 1
        resizeNps()
        updateCounter(nps.value)
    }

    document.querySelectorAll('#input-font>option').forEach((element) => {
        element.style.fontFamily = element.value
    })
})()