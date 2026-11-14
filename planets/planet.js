
const destinations = {
    sakaar: {
        name: "Sakaar",
        subtitle: "THE SCRAP PLANET",
        description:
            "A chaotic world built from the remains of countless spaceships. Explore a strange landscape associated with gladiators, unusual creatures, and the Grandmaster.",

        type: "Junkyard World",
        environment: "Harsh and chaotic",
        knownFor: "The Contest of Champions",

        scan:
            "Scan complete. Metallic debris fields and unusual energy signatures detected.",

        surface:
            "radial-gradient(circle at 35% 30%, #ffbd69, #b94c20 55%, #32130c)",

        glow: "rgba(255, 116, 45, 0.55)"
    },

    xandar: {
        name: "Xandar",
        subtitle: "THE NOVA CORPS WORLD",
        description:
            "An advanced civilization known for its remarkable architecture and its association with the Nova Corps.",

        type: "Advanced World",
        environment: "Urban and technological",
        knownFor: "The Nova Corps",

        scan:
            "Scan complete. Advanced infrastructure and organized energy networks detected.",

        surface:
            "radial-gradient(circle at 35% 30%, #8deaff, #2675c9 55%, #102448)",

        glow: "rgba(0, 170, 255, 0.55)"
    },

    titan: {
        name: "Titan",
        subtitle: "A WORLD OF RUINS",
        description:
            "A once-thriving world associated with Thanos. Its ruined landscape tells the story of a civilization that could not survive its own collapse.",

        type: "Ruined World",
        environment: "Desolate and rocky",
        knownFor: "Thanos's homeworld",

        scan:
            "Scan complete. Abandoned structures and traces of an ancient civilization detected.",

        surface:
            "radial-gradient(circle at 35% 30%, #c8a5d8, #655274 55%, #211b30)",

        glow: "rgba(174, 115, 255, 0.55)"
    },

    vormir: {
        name: "Vormir",
        subtitle: "THE SOUL STONE WORLD",
        description:
            "A mysterious and isolated world known for its connection to the Soul Stone and one of the universe's most significant locations.",

        type: "Remote World",
        environment: "Mountainous and isolated",
        knownFor: "The Soul Stone",

        scan:
            "Scan complete. Unusual energy readings detected near the designated location.",

        surface:
            "radial-gradient(circle at 35% 30%, #ff9b83, #a52b30 55%, #350d19)",

        glow: "rgba(255, 55, 65, 0.55)"
    },

    ego: {
        name: "Ego",
        subtitle: "THE LIVING PLANET",
        description:
            "A celestial being with a planet-sized form. Beneath its extraordinary surface lies a world full of secrets.",

        type: "Living Celestial",
        environment: "Organic and extraordinary",
        knownFor: "The Living Planet",

        scan:
            "Scan complete. Unusual biological and celestial energy signatures detected.",

        surface:
            "radial-gradient(circle at 35% 30%, #fff0a0, #c18a35 55%, #493014)",

        glow: "rgba(255, 190, 70, 0.55)"
    },

    knowhere: {
        name: "Knowhere",
        subtitle: "THE CELESTIAL OUTPOST",
        description:
            "A remarkable settlement built inside the severed head of a Celestial. It serves as a crossroads for travelers from across the galaxy.",

        type: "Celestial Outpost",
        environment: "Industrial and inhabited",
        knownFor: "The Collector's operations",

        scan:
            "Scan complete. Multiple inhabited sectors and industrial activity detected.",

        surface:
            "radial-gradient(circle at 35% 30%, #d2a4ff, #7543a8 55%, #241334)",

        glow: "rgba(180, 90, 255, 0.55)"
    }
};

const page = document.body.dataset.planet;
const destination = destinations[page];

const planetName = document.getElementById("planetName");
const planetSubtitle = document.getElementById("planetSubtitle");
const planetDescription = document.getElementById("planetDescription");
const planetOrb = document.getElementById("planetOrb");

const visitorNameElement = document.getElementById("visitorName");
const scanButton = document.getElementById("scanButton");
const scanResult = document.getElementById("scanResult");

const backButton = document.getElementById("backToGalaxy");

// Display visitor name
const visitorName = sessionStorage.getItem("mdVisitorName");

visitorNameElement.textContent = visitorName || "Explorer";

// Load destination
if (destination) {
    document.title = `${destination.name} | MD's World`;

    planetName.textContent = destination.name;
    planetSubtitle.textContent = destination.subtitle;
    planetDescription.textContent = destination.description;

    document.getElementById("planetType").textContent =
        destination.type;

    document.getElementById("planetEnvironment").textContent =
        destination.environment;

    document.getElementById("planetKnownFor").textContent =
        destination.knownFor;

    planetOrb.style.setProperty(
        "--planet-surface",
        destination.surface
    );

    planetOrb.style.setProperty(
        "--planet-glow",
        destination.glow
    );

} else {
    document.title = "Unknown Destination | MD's World";

    planetName.textContent = "Unknown Destination";
    planetSubtitle.textContent = "LOCATION NOT FOUND";

    planetDescription.textContent =
        "This destination is not available in the current galaxy.";

    document.getElementById("planetType").textContent =
        "Unknown";

    document.getElementById("planetEnvironment").textContent =
        "Unknown";

    document.getElementById("planetKnownFor").textContent =
        "No information available";

    scanButton.disabled = true;
    scanButton.textContent = "SCAN UNAVAILABLE";
}

// Interactive destination scan
scanButton.addEventListener("click", function () {
    if (!destination) return;

    scanButton.disabled = true;
    scanButton.textContent = "SCANNING...";

    scanResult.textContent =
        "Collecting destination information...";

    planetOrb.classList.add("scanning");

    setTimeout(function () {
        planetOrb.classList.remove("scanning");

        scanResult.textContent = destination.scan;

        scanButton.disabled = false;
        scanButton.textContent = "SCAN AGAIN";
    }, 1200);
});

// Return to galaxy
backButton.addEventListener("click", function () {
    window.location.href = "../galaxy.html";
});
