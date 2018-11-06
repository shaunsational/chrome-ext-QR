var disabled = /chrome\.google\.com\/webstore/gi;

function devNull() {
	if (chrome.runtime.lastError) {
		alert('Sorry, this extension is not allowed to run here.\n\nChrome Error:\n' + chrome.runtime.lastError.message);
	}
}

function updateIcon(tab) {
	var icon = 'icon';
	if (tab && tab.url && tab.url.match(disabled) || typeof tab.url == 'undefined') {
		icon += '_disabled';
	}
	return icon + '.png';
}

chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript({file: "qr.js"}, devNull);
});

chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
	var icon = updateIcon(tab);
	chrome.browserAction.setIcon({path: icon, tabId: tab.id});
});

chrome.tabs.onActivated.addListener(function(info){
	chrome.tabs.get(info.tabId, function(tab){
		var icon = updateIcon(tab);
		chrome.browserAction.setIcon({path: icon, tabId: tab.id});
	});
});