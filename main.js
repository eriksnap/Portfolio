//Loads saved values from localStorage, or start at 0/1 if nothing saved yet
let xp = parseInt(localStorage.getItem("xp")) || 0;
let level = parseInt(localStorage.getItem("level")) || 1;

//Updates the display as soon as the page loads
document.addEventListener("DOMContentLoaded", function() {
    updateDisplay();
    //Grants once-off XP for visiting different pages
    grantOnce("visited_projects", 10);
    grantOnce("visited_about", 5);
});

//Grants XP only if this key has never been granted before
function grantOnce(key, amount) {
    //Checks the current page so we only grant on the correct page
    var page = window.location.pathname.split("/").pop();

    if (key === "visited_projects" && page !== "projects.html") return;
    if (key === "visited_about" && page !== "about.html") return;

    if (!localStorage.getItem("action_" + key)) {
        localStorage.setItem("action_" + key, "true");
        gainXP(amount);
        console.log("One-off XP granted for:", key);
    }
}

//Called from when the buttons and links are clicked
//Key is used so that each action only rewards once
function gainXPOnce(key, amount) {
    if (!localStorage.getItem("action_" + key)) {
        localStorage.setItem("action_" + key, "true");
        gainXP(amount);
        console.log("One-off XP granted for:", key);
    }
}

function gainXP(amount) {
    xp += amount;

    if (xp >= 100) {
        level++;
        xp = xp - 100;
        alert("Level Up! You are now Level " + level);
    }

    //Saves to localStorage so it can recall across the pages
    localStorage.setItem("xp", xp);
    localStorage.setItem("level", level);

    updateDisplay();
    console.log("XP:", xp, "Level:", level);
}

function updateDisplay() {
    document.querySelectorAll("#xp-display").forEach(function(el) {
        el.textContent = "Level " + level + " | XP " + xp + "/100";
    });
}
