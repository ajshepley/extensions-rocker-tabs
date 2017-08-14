// rocker-tab.js

// disable console for upload.
console.log = function() {}

browser.runtime.onMessage.addListener(handleGlobalBoolUpdate);

// Used for checking load times.
// document.body.style.border = "5px solid blue";

var middleWasDown = false;
requestCurrentBoolUpdate();

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

function sendUpdateMessage(newBoolValue) {
    browser.runtime.sendMessage({"messageType": "globalBoolUpdate", "newGlobalBool": newBoolValue});
}

function requestCurrentBoolUpdate() {
    console.log("Requesting global bool update from background.");
    browser.runtime.sendMessage({"messageType": "requestGlobalBool"});
}

function handleGlobalBoolUpdate(event) {
    console.log("Received global bool update: ", event);

    var messageType = event.messageType;

    switch (messageType) {
        case "boolUpdate":
            middleWasDown = event.newBoolValue;
            console.log("Set new global bool value in content script: ", middleWasDown);
            break;
        default:
            console.log("Unknown message type received: ", messageType);
    }
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
            sendUpdateMessage(middleWasDown);

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
        // event.stopPropagation();
        // event.cancelBubble();
        event.preventDefault();
        // event.stopImmediatePropagation();
    }

    switch (event.which) {
        case 1:
            console.log("left up.");
            break;
        case 2:
            console.log("middle up.");
            middleWasDown = false;
            sendUpdateMessage(middleWasDown);
            // Re-enable context menu and click events.
            // document.removeEventListener("click", event => disableClicks(event), true);
            break;
        case 3:
            console.log("right up");
            break;
    }
}, false); // Enable preventDefault.

document.addEventListener("click", function (event) {
    if (middleWasDown == true) {
        console.log("stopping propagation of click");
        // event.stopPropagation();
        // event.cancelBubble();
        event.preventDefault();
        // event.stopImmediatePropagation();
    } else {
        console.log("Middle was not down during click.")
    }
}, false);

document.addEventListener("contextmenu", function (event) {
    if (middleWasDown == true) {
        event.preventDefault();
        // event.cancelBubble();
        // event.preventDefault();
        // event.stopImmediatePropagation();
    }
}, false);