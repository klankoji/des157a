// The captions for each hotspot
var captions = {
  sunroof: "we stick our heads out on long drives. windows down, music up, nowhere to be.",
  seats: "i wanted room for everyone. my last car only had two real seats. this one always has space.",
  shifter: "my roommate taught me manual in a parking lot. now i can't imagine driving any other way.",
  dash: "it has never once let me down. every time the key turns, it just goes."
};

// Get the caption box
var captionBox = document.getElementById("caption");

// Get all hotspots
var hotspots = document.querySelectorAll(".hotspot");

// Loop through each hotspot and add mouseenter / mouseleave events
hotspots.forEach(function(hotspot) {

  hotspot.addEventListener("mouseenter", function() {
    var id = hotspot.id;
    captionBox.textContent = captions[id];
    captionBox.style.display = "block";
  });

  hotspot.addEventListener("mouseleave", function() {
    captionBox.style.display = "none";
  });

});