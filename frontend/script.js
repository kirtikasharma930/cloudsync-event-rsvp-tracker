
const exploreBtn = document.getElementById("exploreBtn");
const eventMessage = document.getElementById("eventMessage");
const rsvpForm = document.getElementById("rsvpForm");
const rsvpMessage = document.getElementById("rsvpMessage");

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, function (char) {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };
        return entities[char];
    });
}

exploreBtn.addEventListener("click", async function () {
    eventMessage.textContent = "Loading events...";

    try {
        const response = await fetch("http://127.0.0.1:8000/events/");
        const data = await response.json();

        if (!response.ok) {
            throw new Error("Could not fetch events");
        }

        const events = data.events || [];

        if (events.length === 0) {
            eventMessage.textContent = "No events available yet.";
            return;
        }

        eventMessage.innerHTML = events.map(function (event) {
            return `
                <div class="event-card">
                    <h3>${escapeHTML(event.title || "Untitled Event")}</h3>
                    <p><strong>Date:</strong> ${escapeHTML(event.date || "Not specified")}</p>
                    <p>${escapeHTML(event.description || "No description available.")}</p>
                </div>
            `;
        }).join("");

        document.getElementById("events").scrollIntoView({
            behavior: "smooth"
        });

    } catch (error) {
        eventMessage.textContent =
            "Could not load events. Please make sure the backend is running.";
    }
});

rsvpForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("attendeeName").value.trim();
    const status = document.getElementById("rsvpStatus").value;

    if (!name) {
        rsvpMessage.textContent = "Please enter your name.";
        return;
    }

    rsvpMessage.textContent = "Submitting your response...";

    try {
        const response = await fetch("http://127.0.0.1:8000/rsvp/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                event_id: 1,
                status: status
            })
        });

        const data = await response.json();

        if (!response.ok || data.error) {
            throw new Error("RSVP submission failed");
        }

        rsvpMessage.textContent =
            `Thanks, ${name}! Your response: ${status}.`;

        rsvpForm.reset();

    } catch (error) {
        rsvpMessage.textContent =
            "Could not submit RSVP. Please make sure the backend is running.";
    }
});
