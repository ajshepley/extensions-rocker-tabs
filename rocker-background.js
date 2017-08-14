// rocker-background.js

// disable console for upload.
console.log = function() {}

browser.runtime.onMessage.addListener(notify);
browser.runtime.onMessage.addListener(setGlobalBool);
browser.runtime.onMessage.addListener(boolUpdateRequesHandler);

var globalBackgroundMiddleSet = false;

function setGlobalBool(message) {

    var messageType = message.messageType;

    switch (messageType) {
        case "globalBoolUpdate":
            globalBackgroundMiddleSet = message.newGlobalBool;
            break;
        default:
            console.log("Unknown message type in setGlobalBool.", messageType);
    }
    
    // Set the global bool here.

    sendUpdatedBoolToContentScripts();
}

function boolUpdateRequesHandler(message) {
    // Send bool status to content scripts
    switch(message.messageType) {
        case "requestGlobalBool":
        sendUpdatedBoolToContentScripts();
            break;
        default:
            console.log("Unknown message type in request global bool.", message.messageType);
    }
    
}

function sendUpdatedBoolToContentScripts() {
    console.log("Sending updated bool to tabs. Value: ", globalBackgroundMiddleSet);
    browser.tabs.query({windowId: browser.windows.WINDOW_ID_CURRENT})
    .then(tabs => {
        for (var i = 0, len = tabs.length; i < len; i++) {
            console.log("Sending new bool to tab ", tabs[i].index, " ", i);
            browser.tabs.sendMessage(tabs[i].id, {"messageType": "boolUpdate",
            "newBoolValue": globalBackgroundMiddleSet});
        }
    });
}

function notify(message) {
    console.log("Notified of global bool to store. Message ", message);
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


