document.body.style.border = "5px solid blue";

var middleWasDown = new Boolean(false);

function goToNextTab() {
    console.log("Go to next tab.");
}

function goToPreviousTab() {
    console.log("Go to previous tab.");
}

document.addEventListener("mousedown", function (event) {
    console.log("Mouse down event! Event is: ");
    console.log(event);

    event = event || window.event;

    switch (event.which) {
        case 1:
            console.log('left');
            if (middleWasDown === true) {
                goToPreviousTab();
            }
            
            break;
        case 2:
            console.log('middle');
            if (middleWasDown === true) {
                console.log("weird...");
            }

            middleWasDown = new Boolean(true);
            break;
        case 3:
            console.log('right');
            if (middleWasDown === true) {
                goToNextTab();
            }
            break;
    }
});

document.addEventListener("mouseup", function (event) {
    console.log("Mouse up event! Event is: ");
    console.log(event);

    event = event || window.event;

    switch (event.which) {
        case 1:
            console.log("left up.");
            break;
        case 2:
            console.log("middle up.");
            middleWasDown = new Boolean(false);
            break;
        case 3:
            console.log("right up");
            break;
    }
});
