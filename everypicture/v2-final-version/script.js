(function () {
    'use strict';
    console.log("reading js");

    // Mouse parallax on hero
    var hero = document.querySelector('#hero');
    var heroImg = document.querySelector('#hero-img');

    hero.addEventListener('mousemove', function (e) {
        var x = (e.clientX / window.innerWidth - 0.5) * 18;
        var y = (e.clientY / window.innerHeight - 0.5) * 18;
        heroImg.style.transform = 'translate(' + (-x) + 'px, ' + (-y) + 'px)';
    });

    hero.addEventListener('mouseleave', function () {
        heroImg.style.transform = 'translate(0, 0)';
    });

    // Hotspot captions on interior image
    var captions = {
        sunroof: "we stick our heads out on long drives. windows down, music up, nowhere to be.",
        seats: "i wanted room for everyone. my last car only had two real seats. this one always has space.",
        shifter: "my roommate taught me manual in a parking lot. now i can't imagine driving any other way.",
        dash: "it has never once let me down. every time the key turns, it just goes."
    };

    var captionBox = document.querySelector('#caption');
    var hotspots = document.querySelectorAll('.hotspot');

    // Show caption on hover, hide on mouse leave
    hotspots.forEach(function (hotspot) {
        hotspot.addEventListener('mouseenter', function () {
            captionBox.textContent = captions[hotspot.id];
            captionBox.style.display = 'block';
        });

        hotspot.addEventListener('mouseleave', function () {
            captionBox.style.display = 'none';
        });
    });

})();
