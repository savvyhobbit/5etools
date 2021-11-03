import { setRouteSelection } from "./routing";
import { encodeForHash, parseHTML } from "../js/utils";

export default function renderList(rootEl, items) {
  const container = rootEl.querySelector('.class-container');
  container.appendChild(parseHTML("<div class='list-container'></div>"))
  const listWrapper = container.querySelector('.list-container');

  let htmlString = "";
	for (let i = 0; i < items.length; i++) {
		const curItem = items[i];
		let svg = curItem.name.replace(/(\s|\(|\))/g, "");

		htmlString += 
			`<div class='list-item history-link grid-item__${svg}'
				data-link='${encodeForHash(curItem.name, curItem.source)}' data-title='${curItem.name}'>
				<dnd-svg id='${svg}' default-color class='list-item--image grid-item__${svg}'></dnd-svg>
				<span class='list-item--text'>${curItem.name}</span>
			</div>`
	}
	let itemElements = parseHTML(htmlString);
	while (itemElements.length > 0) {
		itemElements[0].addEventListener("click", (e) => {
			let tar = e.target.closest(".list-item");
      setRouteSelection(tar.getAttribute("data-link"));
    });
		listWrapper.appendChild(itemElements[0]);
	}
};