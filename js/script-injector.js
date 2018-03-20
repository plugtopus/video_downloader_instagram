let showLog = false;

function init() {

    injectFile(chrome.extension.getURL('../js/main.js'), "script").then(() => {

    });
}

function removeElement(ele) {
    if (ele && ele.parentNode) {
        ele.parentNode.removeChild(ele);
    }
}

function removeElementAsync(ele) {
    setTimeout(() => {
        removeElement(ele);
    }, 15);
}

function injectFile(url, type, autoRemoveElement) {
    return new Promise(function (resolve, reject) {
        const elem = document.createElement(type);
        switch (type) {
            case 'link':
                elem.href = url;
                elem.rel  = 'stylesheet';
                elem.type = 'text/css';
                break;
            case 'script':
                elem.src = url;
                break;
            default:
                throw new Error("Unhandled switch case:" + type);
        }

        elem.onload = function() {
            resolve();
            if (autoRemoveElement) {
                removeElementAsync(elem);
            }
        };
        elem.onerror = () => {
            reject();
            removeElementAsync(elem);
        };

        (document.head || document.documentElement).appendChild(elem);
    });
}

function log() {
    showLog && console.log.apply(console, arguments);
}

function scriptDataUrl(scriptContents) {
    return "data:text/javascript;base64," + btoa(scriptContents);
}

init();