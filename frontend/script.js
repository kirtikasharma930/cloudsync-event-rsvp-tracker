
const exploreBtn = document.getElementById("exploreBtn");
const eventMessage = document.getElementById("eventMessage");

exploreBtn.addEventListener("click", function () {
    eventMessage.textContent =
        "Welcome! Upcoming CloudSync events will appear here soon.";
    
    document.getElementById("events").scrollIntoView({
        behavior: "smooth"
    });
});
