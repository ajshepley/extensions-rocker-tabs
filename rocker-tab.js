document.body.style.border = "5px solid blue";

var middleWasDown = false;

function sendNextTabMessage() {
    console.log("Sending message.");
    browser.runtime.sendMessage({"tabTarget": "next"});
    console.log("Message sent.");
}

function sendPreviousTabMessage() {
    browser.runtime.sendMessage({"tabTarget": "previous"});
}

function disableClicks(event) {
    event.preventDefault();
}

document.addEventListener("mousedown", function (event) {
    console.log("Mouse down event! Event is: ");
    console.log(event);

    event = event || window.event;

    console.log(middleWasDown);

    console.log("welp")

    if (middleWasDown == true) {
        // event.stopPropagation();
        // event.stopImmediatePropagation();
        // event.cancelBubble();
        // event.preventDefault();
    }

    switch (event.which) {
        case 1:
            console.log('left');
            if (middleWasDown == true) {
                console.log("calling background");
                event.stopPropagation();
                sendPreviousTabMessage();
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

            // Prevent context menu and click events from going through while tabbing.
            // document.addEventListener("click", event => disableClicks(event), true);
            event.stopPropagation();

            console.log("In middle. After: ");
            console.log(middleWasDown);
            break;
        case 3:
            console.log('right');
            if (middleWasDown == true) {
                console.log("Promise time.");
                sendNextTabMessage();
                event.stopPropagation();
            }
            break;
    }
});

document.addEventListener("mouseup", function (event) {
    console.log("Mouse up event! Event is: ");
    console.log(event);

    event = event || window.event;

    if (middleWasDown == true) {
        event.stopImmediatePropagation();
    }

    switch (event.which) {
        case 1:
            console.log("left up.");
            break;
        case 2:
            console.log("middle up.");
            middleWasDown = false;
            // Re-enable context menu and click events.
            // document.removeEventListener("click", event => disableClicks(event), true);
            break;
        case 3:
            console.log("right up");
            break;
    }
});

document.addEventListener("click", function (event) {
    if (middleWasDown == true) {
        event.stopImmediatePropagation();
    }
});

document.addEventListener("contextmenu", function (event) {
    if (middleWasDown == true) {
        event.stopImmediatePropagation();
    }
});