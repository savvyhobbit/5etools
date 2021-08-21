import { setRouteSelection } from "./routing";
import { encodeForHash, parseHTML } from "../js/utils";

export default function renderGrid(rootEl, items) {
  const container = rootEl.querySelector('.class-container');
  container.appendChild(parseHTML("<div class='grid-container'></div>"))
  const gridWrapper = container.querySelector('.grid-container');

  let htmlString = "";
	for (let i = 0; i < items.length; i++) {
		const curItem = items[i];
		let svg = curItem.name.replace(/(\s|\(|\))/g, "");

		htmlString += 
			`<div class='grid-item history-link grid-item__${svg}'
				data-link='${encodeForHash(curItem.name, curItem.source)}' data-title='${curItem.name}'>
				<span class='grid-item--text'>${curItem.name}</span>
				<dnd-svg id='${svg}' default-color class='grid-item--image grid-item__${svg}'></dnd-svg>
			</div>`
	}
	let itemElements = parseHTML(htmlString);
	while (itemElements.length > 0) {
		itemElements[0].addEventListener("click", (e) => {
			let tar = e.target.closest(".grid-item");
      setRouteSelection(tar.getAttribute("data-link"));
    });
		gridWrapper.appendChild(itemElements[0]);
	}
}