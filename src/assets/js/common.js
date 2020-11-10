import fastClick from 'fastclick'
window.addEventListener('load', function() {
    fastClick.attch(docment.body)
}, false);

document.documentElement.addEventListener('touchmove', function(e) {
    if (e.touches.length > 1) {
        e.preventDefault()
    }
}, false);

document.documentElement.style.fontSize = document.documentElement.clientWidth / 3.75 + 'px'