(function () {
    // on bg color input, change the background color
    inputBg.oninput = (x) => {
        document.body.style.backgroundColor = x.target.value
        localStorage.setItem("background", x.target.value)
    }

    // on text color input, change the color of the counter
    inputColor.oninput = (x) => {
        counter.style.color = x.target.value
        localStorage.setItem("textColor", x.target.value)
    }
    
    inputMax.oninput = (x) => {
        inputMax.value = x.target.value
    }
    
    inputFont.oninput = (x) => {
        counter.style.fontFamily = x.target.value
        localStorage.setItem("textFont", x.target.value)
    }
})()