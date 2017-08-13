// rocker-background.js

browser.runtime.onMessage.addListener(notify);
browser.runtime.onMessage.addListener(setGlobalBool);

var globalBackgroundMiddleSet = false;

function notify(message) {
    // Set the global bool here.
}

function notify(message) {
    console.log("Notified. Message ", message);
    var currentTabTarget = message.tabTarget;

    if (currentTabTarget !== undefined && typeof(currentTabTarget) === "string") {
        console.log("Current tab target is ", currentTabTarget);

        switch (currentTabTarget) {
            case 'next':
                console.log("Was next.");
                browser.tabs.query({active: true, windowId: browser.windows.WINDOW_ID_CURRENT})
                    .then(tabs => browser.tabs.get(tabs[0].id))
                    .then(tab => { goToNextTab(tab); });
                break;
            case 'previous':
                console.log("Was previous.");
                browser.tabs.query({active: true, windowId: browser.windows.WINDOW_ID_CURRENT})
                .then(tabs => browser.tabs.get(tabs[0].id))
                .then(tab => { goToPreviousTab(tab); });
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

    var currentTabIndex = currentTabInfo.index;

    console.log("Current tab index is ");
    console.log(currentTabIndex);

    var tabArray;

    browser.tabs.query({currentWindow: true}).then(tabs => {
        var targetTabIndex;

        if (tabs.length - 1 == currentTabIndex) {
            targetTabIndex = 0;
        } else {
            targetTabIndex = currentTabIndex + 1;
        }

        console.log("Tab array size is ", tabs.length);
        console.log("Target tab index is ", targetTabIndex);

        setActiveTab(targetTabIndex);
    });

    // browser.windows.getCurrent({populate: true}).then((windowInfoObj) => {
    //     console.log("Window info obj is ", windowInfoObj);
        
    //     var currentTabIndex = currentTabInfo.index;
    //     console.log("Go to next tab. Current index is ", currentTabIndex);
    // });
    console.log("Done background.");
}

function goToPreviousTab(currentTabInfo) {
    console.log("Go to previous tab.");

    var currentTabIndex = currentTabInfo.index;
    
        console.log("Current tab index is ");
        console.log(currentTabIndex);
    
        var tabArray;
    
        browser.tabs.query({currentWindow: true}).then(tabs => {
            var targetTabIndex;
    
            if (currentTabIndex == 0) {
                targetTabIndex = tabs.length - 1;
            } else {
                targetTabIndex = currentTabIndex - 1;
            }
    
            console.log("Tab array size is ", tabs.length);
            console.log("Target tab index is ", targetTabIndex);
    
            setActiveTab(targetTabIndex);
        });
}

function setActiveTab(targetTabIndex) {
    browser.tabs.query({currentWindow: true}).then(tabs => {
        browser.tabs.update(tabs[targetTabIndex].id, {active: true});
    });

    console.log("done setting active tab.");
}

function onError(msg) {
    console.log("error was ", msg);
}


