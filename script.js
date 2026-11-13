
const nameForm = document.getElementById("nameForm");
const username = document.getElementById("username");

nameForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = username.value.trim();

    if (!name) {
        username.focus();
        return;
    }

    // Keep visitor's name for this browsing session
    sessionStorage.setItem("mdVisitorName", name);

    // Enter the galaxy
    window.location.href = "galaxy.html";
});
