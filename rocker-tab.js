document.body.style.border = "5px solid blue";

var middleWasDown = false;

// function goToNextTab(currentTabInfo) {
//     console.log("in goto next");
//     console.log("Current tab info is ", currentTabInfo);

//     browser.windows.getCurrent({populate: true}).then((windowInfoObj) => {
//         console.log("Window info obj is ", windowInfoObj);
        
//         var currentTabIndex = currentTabInfo.index;
//         console.log("Go to next tab. Current index is ", currentTabIndex);
//     });
// }

// function goToPreviousTab(currentTabInfo) {
//     console.log("Go to previous tab.");
// }

function sendNextTabMessage() {
    console.log("Sending message.");
    browser.runtime.sendMessage({"tabTarget": "next"});
    console.log("Message sent.");
}

function sendPreviousTabMessage() {
    browser.runtime.sendMessage({"tabTarget": "previous"});
}

document.addEventListener("mousedown", function (event) {
    console.log("Mouse down event! Event is: ");
    console.log(event);

    event = event || window.event;

    console.log("Middle status is currently: ");
    console.log(middleWasDown);

    console.log("Browser is", browser);
    console.log("tabs is ", browser.tabs);

    // browser.tabs.getCurrent().then(onGot, onError).catch(function(error) {
    //     console.log ("aaaaah");
    //     console.error(error);
    // });

    console.log("welp")

    switch (event.which) {
        case 1:
            console.log('left');
            if (middleWasDown == true) {
                // var gettingCurrent = browser.tabs.getCurrent();
                // console.log("What even");
                // gettingCurrent.then(goToPreviousTab, onError);
                // getCurrentTabPromise.then(goToPreviousTab);
                console.log("calling background");
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
            console.log("In middle. After: ");
            console.log(middleWasDown);
            break;
        case 3:
            console.log('right');
            if (middleWasDown == true) {
                console.log("Promise time.");
                sendNextTabMessage();
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
