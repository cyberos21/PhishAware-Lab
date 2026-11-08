
const form = document.getElementById("demoForm");
const result = document.getElementById("result");
const activity = document.getElementById("activity");

let cameraStream = null;

function recordEvent(eventName) {
    const events = JSON.parse(
        localStorage.getItem("labEvents") || "[]"
    );

    events.push({
        event: eventName,
        time: new Date().toISOString()
    });

    localStorage.setItem(
        "labEvents",
        JSON.stringify(events)
    );

    activity.textContent =
        "Activity: " + eventName;
}

recordEvent("simulation_opened");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    // Never read or store the input values.
    recordEvent("dummy_login_attempt");

    result.textContent =
        "Training demonstration: Never enter real passwords into unverified links.";

    form.reset();
});

document.getElementById("cameraButton")
.addEventListener("click", async function() {

    try {
        cameraStream =
            await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false
            });

        const preview =
            document.getElementById("preview");

        preview.srcObject = cameraStream;
        preview.style.display = "block";

        recordEvent("camera_permission_granted");

    } catch (error) {
        recordEvent("camera_permission_denied");
        activity.textContent =
            "Camera unavailable or permission denied.";
    }
});

document.getElementById("stopButton")
.addEventListener("click", function() {

    if (cameraStream) {
        cameraStream.getTracks().forEach(track => {
            track.stop();
        });

        cameraStream = null;
    }

    document.getElementById("preview").srcObject = null;
    document.getElementById("preview").style.display = "none";

    recordEvent("camera_stopped");
});
