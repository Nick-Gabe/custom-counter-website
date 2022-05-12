// execute in function to prevent global variables
(function () {
    const counter = document.getElementById('counter')
    const inputBg = document.getElementById('input-bg')
    const inputColor = document.getElementById('input-color')
    const nps = document.getElementById('input-nps')
    const inputIncrease = document.getElementById('input-increase')
    const inputDecrease = document.getElementById('input-decrease')
    const inputPause = document.getElementById('input-pause')
    const inputMax = document.getElementById('input-max')
    let isPaused = false
    nps.value = 0

    // listen to the mouse scroll on nps and increases its value based on scrolling delta
    nps.addEventListener('wheel', (event) => {
        const DIVIDE_AMOUNT = 50;
        nps.value += Math.floor(-event.deltaY / DIVIDE_AMOUNT)
        nps.innerText = `${nps.value}ps`
        updateCounter(nps.value)
    });

    // on bg color input, change the background color
    inputBg.oninput = (x) => {
        document.body.style.backgroundColor = x.target.value
    }
    
    // on text color input, change the color of the counter
    inputColor.oninput = (x) => {
        counter.style.color = x.target.value
    }

    inputMax.oninput = (x) => {
        inputMax.value = x.target.value
    }

    // on pause click, change the icon and pause/play
    inputPause.onclick = (x) => {
        if (x.target.classList.contains('paused')) {
            // just some css to adjust the backgrounds
            x.target.className = "input-button play playing"
            x.target.style.backgroundImage = `url("src/resources/play-svgrepo-com.svg")`
            x.target.style.backgroundSize = 'contain'
            x.target.style.backgroundPositionX = '2px'
            isPaused = true
            updateCounter(0)
        } else {
            // just some css to adjust the backgrounds
            x.target.className = "input-button play paused"
            x.target.style.backgroundImage = `url("src/resources/pause-svgrepo-com.svg")`
            x.target.style.backgroundSize = '30px'
            x.target.style.backgroundPositionX = 'center'
            isPaused = false
            updateCounter(nps.value)
        }
    }

    let counterUpdater;

    function updateCounter(newTimer) {
        // clear the previous setInterval and create a new one with a new timer
        clearInterval(counterUpdater)
        if (newTimer == 0) return

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
                counter.value = Math.floor(Number(counter.value) + 1)
            }
            else {
                // if nps < negative max, keep the counter at max
                if (inputMax.value
                    && Number(counter.value) - 1 < -Math.abs(inputMax.value)) {
                    counter.value = -inputMax.value
                    return
                }
                // else decrement it normally
                counter.value = Math.floor(counter.value - 1)
            }

            // 1000 / newTimer generates how many numbers need to be added per second
            // 1000 / 2nps = 1 number every 500ms and so on
        }, 1000 / Math.abs(newTimer))
    }

    // button on click, increase nps (ignore if its above 1000)
    inputIncrease.onclick = () => {
        if (nps.value >= 1000) return
        nps.value = Math.floor(nps.value) + 1
        nps.innerText = `${nps.value}ps`

        updateCounter(nps.value)
    }

    // button on click, decrease nps (ignore if its below -1000)
    inputDecrease.onclick = () => {
        if (nps.value <= -1000) return
        nps.value = Math.floor(nps.value) - 1
        nps.innerText = `${nps.value}ps`

        updateCounter(nps.value)
    }
})()