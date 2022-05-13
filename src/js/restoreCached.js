(function () {
    const cachedBg = localStorage.getItem("background")
    const cachedFont = localStorage.getItem("textFont")
    const cachedTextColor = localStorage.getItem("textColor")
    
    if(cachedBg) {
        inputBg.value = cachedBg
        document.body.style.backgroundColor = cachedBg
    }
    if(cachedFont) {
        inputFont.value = cachedFont
        counter.style.fontFamily = cachedFont
    }
    if(cachedTextColor) counter.style.color = cachedTextColor
})()