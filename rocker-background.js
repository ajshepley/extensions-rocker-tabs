// rocker-background.js

browser.runtime.onMessage.addListener(notify);

function notify(message) {
    console.log("Notified. Message ", message);
    var currentTabTarget = message.tabTarget;

    if (currentTabTarget !== undefined && typeof(currentTabTarget) === "string") {
        console.log("Current tab target is ", currentTabTarget);

        switch (currentTabTarget) {
            case 'next':
                console.log("Was next.");
                break;
            case 'previous':
                console.log("Was previous.");
                break;
            default:
                console.log("Unknown!");
                break;
        }
    } else {
        console.log("Message was undefined.");
    }
}

function goToNextTab(currentTabInfo) {
    console.log("in goto next");
    console.log("Current tab info is ", currentTabInfo);

    browser.windows.getCurrent({populate: true}).then((windowInfoObj) => {
        console.log("Window info obj is ", windowInfoObj);
        
        var currentTabIndex = currentTabInfo.index;
        console.log("Go to next tab. Current index is ", currentTabIndex);
    });
}

function goToPreviousTab(currentTabInfo) {
    console.log("Go to previous tab.");
}


