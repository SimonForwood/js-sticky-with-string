var sh;

window.onload = function () {
    
    sh = new stickyHelper(document.getElementById("stickyPane"), withString = true);
    sh.loadFromJson("sampleStickies.json");
    sh.addSticky("And Another Note!", "This is a single created note!", 'color1', null);
}

window.addEventListener("resize", fooOnResize)

function fooOnResize() {
    sh.redraw();
}

