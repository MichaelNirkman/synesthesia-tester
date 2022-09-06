function start() {
    initialize();
    drawColors();
    //showResults();
}

function initialize() {
    localStorage.setItem("currentindex", settings["start-number"]);
    localStorage.setItem("currentchoices", JSON.stringify([]));

    if (JSON.parse(localStorage.getItem("allchoices")) === null) {
        localStorage.setItem("allchoices", JSON.stringify([]));
    }

    updateTitle("Time for a test");

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
        currentChoices.push(color);
        localStorage.setItem("currentchoices", JSON.stringify(currentChoices));
        localStorage.setItem("currentindex", currentIndex);
        addToTotal(currentChoices);
        removeColors();
        displayThankYou();
    }
}

function addToTotal(choices) {
    var allresults = JSON.parse(localStorage.getItem("allchoices"));
    for (var i = 0; i < choices.length + 1; i++) {
        if (allresults[i]) {
            allresults[i].push(choices[i]);
        } else {
            allresults[i] = [choices[i]];
        }
    }
    localStorage.setItem("allchoices", JSON.stringify(allresults));
}

function drawColors() {
    updateTitle("Time for a test");

    var formarea = document.getElementById("form-area");

    colors.forEach(function(color) {
        var newbutton = document.createElement("button");
        newbutton.className = "choice-button";
        newbutton.style.backgroundColor = color.color;
        newbutton[eventType] = function() {
            makeSelection(color.color);
        };
        formarea.appendChild(newbutton);
    });

    formarea.appendChild(document.createElement("br"));

    var cancelbutton = document.createElement("button");
    cancelbutton.innerHTML = "Cancel";
    cancelbutton.className = "reset-button";
    cancelbutton[eventType] = function() {
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
    updateTitle("Thank you");
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

    updateTitle("Results");

    for (var i = settings["start-number"]; i < settings["end-number"] + 1; i++) {
        var entry = document.createElement("div");
        entry.className = "result-row";

        var choicelist = [];

        var colorRow = allitems[i - 1];
        choicelist.push(getPercentages(colorRow));

        var choiceTitle = createChoiceTitle(i);
        choiceTitle.className = "choice-title";
        entry.appendChild(choiceTitle);

        choicelist.forEach(function(choices) {
            for (
                var u = settings["start-number"]; u < settings["end-number"] + 1; u++
            ) {
                var choice;
                if (choices[u - 1] && u == settings["start-number"]) {
                    choice = choices[u - 1];
                    var choiceElement = createColorBlock(
                        choice.color,
                        choice.percentage,
                        true
                    );
                    entry.appendChild(choiceElement);
                    continue;
                } else if (choices[u - 1]) {
                    choice = choices[u - 1];
                } else {
                    choice = { color: "none", percentage: "" };
                }

                var choiceElement = createColorBlock(choice.color, choice.percentage);
                entry.appendChild(choiceElement);
            }
        });

        entry.appendChild(document.createElement("br"));

        resultarea.appendChild(entry);
    }
    var backbutton = document.createElement("button");
    backbutton.innerHTML = "Return";
    backbutton.className = "reset-button";
    backbutton[eventType] = function() {
        resetForm();
    };

    resultarea.appendChild(backbutton);
}

function removeResults() {
    var resultarea = document.getElementById("result-area");
    document.getElementById("results").style.display = "none";
    resultarea.innerHTML = "";
}

function createChoiceTitle(text) {
    var titleItem = document.createElement("h2");
    titleItem.className = "result-title";
    titleItem.innerHTML = text;
    return titleItem;
}

function createColorBlock(color, text, first = false) {
    var element = document.createElement("span");
    if (first) {
        element.className = "result-box first";
    } else {
        element.className = "result-box";
    }
    element.style.backgroundColor = color;
    element.innerHTML = text;
    return element;
}

function getPercentages(colors) {
    var processedColors = [];
    const totalItems = colors.length;
    const uniqueItems = [...new Set(colors)];
    uniqueItems.forEach((currColor) => {
        const numItems = colors.filter((color) => color === currColor);
        const percentage = Math.round((numItems.length * 100) / totalItems);
        processedColors.push({
            color: currColor,
            percentage: percentage + "%",
            percentageInt: percentage,
        });
    });
    processedColors.sort((a, b) =>
        a.percentageInt < b.percentageInt ?
        1 :
        b.percentageInt < a.percentageInt ?
        -1 :
        0
    );

    return processedColors;
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
    removeResults();
    restoreColors();
    initialize();
}

function updateTitle(text) {
    document.getElementById("main-title").innerHTML = text;
}

var supportsTouch = "ontouchstart" in window || navigator.msMaxTouchPoints;
var eventType = supportsTouch ? "ontouchstart" : "click";

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