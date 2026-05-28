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

    // Update instruction text for touch devices
    var narrativeIntro = document.querySelector('#narrative-intro');
    if ('ontouchstart' in window) {
        narrativeIntro.textContent = 'tap on the image to explore';
    }

    // Hotspot captions
    var captions = {
        sunroof: "we stick our heads out on long drives. windows down, music up, nowhere to be.",
        seats: "i wanted room for everyone. my last car only had two real seats. this one always has space.",
        shifter: "my roommate taught me manual in a parking lot. now i can't imagine driving any other way.",
        dash: "it has never once let me down. every time the key turns, it just goes."
    };

    var captionBox = document.querySelector('#caption');
    var hotspots = document.querySelectorAll('.hotspot');

    hotspots.forEach(function (hotspot) {

        // Hover — desktop
        hotspot.addEventListener('mouseenter', function () {
            captionBox.textContent = captions[hotspot.id];
            captionBox.classList.add('visible');
        });

        hotspot.addEventListener('mouseleave', function () {
            captionBox.classList.remove('visible');
            hotspot.classList.remove('active');
        });

        // Tap — mobile
        hotspot.addEventListener('click', function () {
            var isActive = hotspot.classList.contains('active');

            hotspots.forEach(function (h) {
                h.classList.remove('active');
            });
            captionBox.classList.remove('visible');

            if (!isActive) {
                hotspot.classList.add('active');
                captionBox.textContent = captions[hotspot.id];
                captionBox.classList.add('visible');
            }
        });

    });

})();