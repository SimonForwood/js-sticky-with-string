var sh;

window.onload = function () {
    
    sh = new stickyHelper();
    sh.loadFromJson("sampleStickies.json", document.getElementById("stickyPane"));

    sh.addSticky(document.getElementById("stickyPane"), "And Another Note!", "This is a single created note!", null)
}
