const routingChannel = document.createElement('div');
let isBacking = false,
	prevScrollHeight;

function routeEventChannel() {
	return routingChannel;
}

function initRouting() {
	if (!window.historyScrollHeight) {
		window.historyScrollHeight = [];
	}
	window.addEventListener("hashchange", (e) => {
		hashChangeHandler(e);
	});
	window.addEventListener("popstate", (e) => {
		if (isBacking) {
			isBacking = false;
			window.setTimeout(() => {
				document.scrollingElement.scrollTo(0, prevScrollHeight);
			}, 10);
		}
	});
}

function hashChangeHandler(e) {
	let oldHashView = readRouteView(e.oldURL),
		oldHashSelection = readRouteSelection(e.oldURL),
		newHashView = readRouteView(e.newURL),
		newHashSelection = readRouteSelection(e.newURL),
		eventDetail = {}

	if (newHashView !== oldHashView) {
		window.historyScrollHeight.push(document.scrollingElement.scrollTop);
		let viewChangeEvent = new CustomEvent("view-change", {
			bubbles: true,
			composed: true,
			detail: {
				view: newHashView
			}
		});
		routingChannel.dispatchEvent(viewChangeEvent);
		eventDetail.view = newHashView;
	}

	if (newHashSelection !== oldHashSelection) {
		if (!newHashSelection) {
			let deselectionEvent = new CustomEvent("selection-deselected", {
				bubbles: true,
				composed: true
			});
			routingChannel.dispatchEvent(deselectionEvent);
		} else {
			let selectionChangeEvent = new CustomEvent("selection-change", {
				bubbles: true,
				composed: true,
				detail: {
					selection: newHashSelection
				}
			});
			routingChannel.dispatchEvent(selectionChangeEvent);
		}
		eventDetail.selection = newHashSelection;
	}

	if (Object.keys(eventDetail).length) {
		let routeChangeEvent = new CustomEvent("route-change", {
			bubbles: true,
			composed: true,
			detail: eventDetail
		});
		routingChannel.dispatchEvent(routeChangeEvent);
	}
}

function readHashRouting(newURL) {
	let taskURL = newURL;
    if (!newURL || !newURL.length) {
		taskURL = window.location.href;
	}
	let hashIndex = taskURL.indexOf("#/");

	if (hashIndex > -1) {
		let newPath = taskURL.substring(hashIndex + 2),
			newPathArray = newPath.split("/");

		return newPathArray;
	}
	// default to index view if view isn't defined
	return ["index"];
}

function readRouteView(newURL) {
	let hashArray = readHashRouting(newURL);

	if (hashArray.length) {
		return hashArray[0]
	} else {
		return null;
	}
}

function readRouteSelection(newURL) {
	let hashArray = readHashRouting(newURL);

	if (hashArray.length > 1) {
		return hashArray[1]
	} else {
		return null;
	}
}

function clearRouteSelection(noHistory) {
	let hashView = readRouteView();
	if (noHistory) {
		isBacking = true;
		prevScrollHeight =  window.historyScrollHeight.pop();
		window.history.back();
	} else {
		window.location.hash = "#/" + hashView;
	}
}

function setRouteView(newRoute) {
	window.location.hash = "#/" + newRoute;
}

function setRouteSelection(newSelection, noHistory) {
	let hashView = readRouteView();
	if (noHistory) {
		let oldURL = window.location.href,
			urlSansHash = window.location.href.substring(0, window.location.href.lastIndexOf("#")),
			newURL = urlSansHash + "#/" + hashView + "/" + newSelection;
		window.history.replaceState(null, "", newURL);
		hashChangeHandler({oldURL, newURL});
	} else {
		window.location.hash = "#/" + hashView + "/" + newSelection;
	}
}

export {
	initRouting,
	routeEventChannel,
  readHashRouting,
  readRouteView,
  readRouteSelection,
	clearRouteSelection,
	setRouteView,
	setRouteSelection
}