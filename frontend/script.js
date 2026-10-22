
const exploreBtn = document.getElementById("exploreBtn");
const eventMessage = document.getElementById("eventMessage");
const rsvpForm = document.getElementById("rsvpForm");
const rsvpEvent = document.getElementById("rsvpEvent");
const rsvpMessage = document.getElementById("rsvpMessage");
const createEventForm = document.getElementById("createEventForm");
const createEventMessage = document.getElementById("createEventMessage");

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

async function loadEvents() {
    eventMessage.textContent = "Loading events...";

    try {
        const response = await fetch("https://cloudsync-event-rsvp-tracker.onrender.com/events/");
        const data = await response.json();

        if (!response.ok) {
            throw new Error("Could not fetch events");
        }

        // API may return either an array or an object containing events.
        const events = Array.isArray(data) ? data : (data.events || []);

        // Fill the RSVP dropdown.
        rsvpEvent.innerHTML = '<option value="">Select an event</option>';

        events.forEach(function (event) {
            const option = document.createElement("option");
            option.value = event.id || event.event_id || "";
            option.textContent = event.title || "Untitled Event";
            rsvpEvent.appendChild(option);
        });

        if (events.length === 0) {
            eventMessage.textContent = "No events available yet.";
            return;
        }

        eventMessage.innerHTML = events.map(function (event) {
            return `
                <div class="event-card">
                    <h3>${escapeHTML(event.title || "Untitled Event")}</h3>
                    <p><strong>Date:</strong> ${escapeHTML(event.date || "Not specified")}</p>
                    <p><strong>Venue:</strong> ${escapeHTML(event.venue || "Not specified")}</p>
                    <p><strong>Maximum attendees:</strong> ${escapeHTML(event.capacity ?? "Not specified")}</p>
                    <p>${escapeHTML(event.description || "No description available.")}</p>
                </div>
            `;
        }).join("");

    } catch (error) {
        console.error("Load events error:", error);
        eventMessage.textContent =
            "Could not load events. Check that the backend is running.";
    }
}

exploreBtn.addEventListener("click", async function () {
    await loadEvents();
    document.getElementById("events").scrollIntoView({
        behavior: "smooth"
    });
});

createEventForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const newEvent = {
        title: document.getElementById("eventTitle").value.trim(),
        date: document.getElementById("eventDate").value,
        venue: document.getElementById("eventVenue").value.trim(),
        capacity: Number(document.getElementById("eventCapacity").value),
        description: document.getElementById("eventDescription").value.trim()
    };

    if (
        !newEvent.title ||
        !newEvent.date ||
        !newEvent.venue ||
        !newEvent.description ||
        !Number.isInteger(newEvent.capacity) ||
        newEvent.capacity < 1
    ) {
        createEventMessage.textContent =
            "Please fill in all fields correctly.";
        return;
    }

    createEventMessage.textContent = "Creating event...";

    try {
        const response = await fetch("https://cloudsync-event-rsvp-tracker.onrender.com/events/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEvent)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.detail || "Could not create event");
        }

        createEventMessage.textContent = "Event created successfully!";
        createEventForm.reset();
        await loadEvents();

    } catch (error) {
        console.error("Create event error:", error);
        createEventMessage.textContent =
            "Could not create event. Check the backend and try again.";
    }
});

rsvpForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("attendeeName").value.trim();
    const status = document.getElementById("rsvpStatus").value;
    const selectedEventId = rsvpEvent.value;

    if (!name) {
        rsvpMessage.textContent = "Please enter your name.";
        return;
    }

    if (!selectedEventId) {
        rsvpMessage.textContent = "Please choose an event.";
        return;
    }

    rsvpMessage.textContent = "Submitting your response...";

    try {
        const response = await fetch("https://cloudsync-event-rsvp-tracker.onrender.com/rsvp/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                event_id: selectedEventId,
                status: status
            })
        });

        const data = await response.json();

        if (!response.ok || data.error) {
            throw new Error(data.detail || "RSVP submission failed");
        }

        rsvpMessage.textContent =
            `Thanks, ${name}! Your response: ${status}.`;

        rsvpForm.reset();

    } catch (error) {
        console.error("RSVP error:", error);
        rsvpMessage.textContent =
            "Could not submit RSVP. Check the backend and try again.";
    }
});

loadEvents();
