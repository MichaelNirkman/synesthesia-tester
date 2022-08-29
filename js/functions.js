function start() {
    initialize();
    drawColors();

    console.log("we are running");
}

function initialize() {
    localStorage.setItem("currentindex", settings["start-number"]);
    localStorage.setItem("currentchoices", JSON.stringify([]));

    if (JSON.parse(localStorage.getItem("allchoices")) === null) {
        localStorage.setItem("allchoices", JSON.stringify([]));
    }

    setCurrentNumber();
}

function makeSelection(color) {
    var currentIndex = localStorage.getItem("currentindex");
    var currentChoices = JSON.parse(localStorage.getItem("currentchoices"));

    if (currentIndex < settings["end-number"]) {
        currentChoices.push(color);
        currentIndex++;
        localStorage.setItem("currentchoices", JSON.stringify(currentChoices));
        localStorage.setItem("currentindex", currentIndex);
        setCurrentNumber();
    } else {
        addToTotal(currentChoices);
        removeColors();
        displayThankYou();
    }
}

function addToTotal(choices) {
    var allresults = JSON.parse(localStorage.getItem("allchoices"));
    allresults.push(choices);
    localStorage.setItem("allchoices", JSON.stringify(allresults));
    console.log(allresults);
}

function drawColors() {
    var formarea = document.getElementById("form-area");

    colors.forEach(function(color) {
        var newbutton = document.createElement("button");
        newbutton.className = "choice-button";
        newbutton.style.backgroundColor = color.color;
        newbutton.onclick = function() {
            makeSelection(color.color);
        };
        formarea.appendChild(newbutton);
    });

    formarea.appendChild(document.createElement("br"));

    var cancelbutton = document.createElement("button");
    cancelbutton.innerHTML = "Cancel";
    cancelbutton.className = "reset-button";
    cancelbutton.onclick = function() {
        resetForm();
    };
    formarea.appendChild(cancelbutton);
}

function removeColors() {
    document.getElementById("form-area").style.display = "none";
}

function restoreColors() {
    document.getElementById("form-area").style.display = "block";
}

function displayThankYou() {
    document.getElementById("thankyou").style.display = "block";
}

function removeThankYou() {
    document.getElementById("thankyou").style.display = "none";
}

function showResults() {
    removeThankYou();
    removeColors();
    buildResults();
    document.getElementById("results").style.display = "block";
}

function buildResults() {
    var allitems = JSON.parse(localStorage.getItem("allchoices"));
    var resultarea = document.getElementById("result-area");

    for (var i = settings["start-number"]; i < settings["end-number"] + 1; i++) {
        var entry = document.createElement("div");

        var choicelist = [];
        allitems.forEach(function(item) {
            choicelist.push(item[i - 1]);
        });

        var mostcommon = document.createElement("span");
        mostcommon.className = "result-box";
        mostcommon.style.backgroundColor = mode(choicelist);
        mostcommon.innerHTML = i;
        entry.appendChild(mostcommon);

        resultarea.appendChild(entry);
    }
}

function mode(arr) {
    return arr
        .sort(
            (a, b) =>
            arr.filter((v) => v === a).length - arr.filter((v) => v === b).length
        )
        .pop();
}

function setCurrentNumber() {
    document.getElementById("current-number").innerHTML =
        localStorage.getItem("currentindex");
}

function resetForm() {
    removeThankYou();
    restoreColors();
    initialize();
}

var settings = {
    "start-number": 1,
    "end-number": 10,
};

var colors = [{
        color: "#009116",
    },
    {
        color: "#000ea6",
    },
    {
        color: "#a60000",
    },
    {
        color: "#fff200",
    },
    {
        color: "#5800b0",
    },
    {
        color: "#00d5ff",
    },
    {
        color: "#ff7300",
    },
    {
        color: "#000000",
    },
    {
        color: "#616161",
    },
    {
        color: "#ffffff",
    },
];