document.body.style.border = "5px solid blue";

var middleWasDown = false;

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

    console.log("Middle status is currently: ");
    console.log(middleWasDown);

    switch (event.which) {
        case 1:
            console.log('left');
            if (middleWasDown == true) {
                goToPreviousTab();
            }
            
            break;
        case 2:
            console.log('middle');
            if (middleWasDown == true) {
                console.log("weird...");
            }

            console.log("In middle. Before: ");
            console.log(middleWasDown);
            middleWasDown = true;
            console.log("In middle. After: ");
            console.log(middleWasDown);
            break;
        case 3:
            console.log('right');
            if (middleWasDown == true) {
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
            middleWasDown = false;
            break;
        case 3:
            console.log("right up");
            break;
    }
});
