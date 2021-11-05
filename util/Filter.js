import {parseHTML} from '../js/utils.js'
import {
  ID_SEARCH_BAR,
  ID_RESET_BUTTON,
  EVNT_CLICK}
from './consts.js'
import { MDCMenuSurface } from "@material/menu-surface";

/**
 * The API is as follows:
 * - render()
 * - getValues()
 * - addEventListener(type, listener, useCapture)
 * - reset()
 * - deselectIf(func, Filter.header)
 *
 * See the docs for each function for full explanations.
 */
class FilterBox {
  /**
   * A FilterBox which sits in the search bar. See the Spells or Psionics page for a live example. Allows selection
   * of multiple sources/spell schools/item types/etc.
   */
  constructor(rootEl, filterList) {
    this.rootEl = rootEl;
    this.inputGroup = rootEl.getElementById(ID_SEARCH_BAR)
    this.resetButton = rootEl.getElementById(ID_RESET_BUTTON)
    this.filterList = filterList;

    this.headers = {};
  }
  

  /**
   * Render the "Filters" button in the inputGroup
   */
  render() {
    this.$list = this.rootEl.querySelector('.list');

    const $filterButton = getFilterButton();
    this.$miniView = getMiniView();
    const $inputGroup = this.inputGroup;
    const $dropdownMenu = $filterButton.querySelector(".mdc-menu-surface");
    for (let i = 0; i < this.filterList.length; ++i) {
      $dropdownMenu.append(makeDropdownRow(i, this, this.filterList[i], this.$miniView));
      if (i < this.filterList.length - 1) {
        $dropdownMenu.append(parseHTML(`<div class="filter-menu-divider"/>`));
      }
    }
    const filterGroupButtons = $inputGroup.querySelector(".filter-group--buttons");
    filterGroupButtons.insertBefore($filterButton, filterGroupButtons.firstChild);
    $inputGroup.insertAdjacentElement("afterend", this.$miniView);
    let materialMenu = new MDCMenuSurface($dropdownMenu);

    this.addDropdownHandlers($filterButton, materialMenu);
    addResetHandler(this);

    function getFilterButton() {
      return parseHTML(`
				<div class="filter-menu mdc-menu-surface--anchor">
					<button class="mdc-button mdc-button--raised dropdown-toggle" data-toggle="dropdown">
						<i class="material-icons mdc-button__icon" aria-hidden="true">filter_list</i>
						<span class="mdc-button__label">Filter</span>
					</button>
					<div class="mdc-menu-surface">
						<button class="mdc-icon-button close-menu material-icons">close</button>
					</div>
				</div>`);
    }

    function getMiniView() {
      return parseHTML(`<div class="mini-view btn-group hidden-mobile-down mdc-chip-set"/>`);
    }

    function makeDropdownRow(i, self, filter, $miniView) {
      const $outI = parseHTML(`<div class="filter-menu-row">`);

      const $grid = makePillGrid();
      const $innerListHeader = makeHeaderLine();

      $outI.append($innerListHeader);
      $outI.append($grid);

      const newHeader = { index: i, size: filter.items.length, ele: $grid, outer: $outI, filter: filter };
      self.headers[filter.header] = newHeader;

      return $outI;

      function makeHeaderLine() {
        const $line = parseHTML(
          `<div class="filter-menu-row__heading">
						<div class="filter-menu-row__heading-label mdc-typography--headline5">${filter.header}</div>
					</div>`
        );

        const $quickBtns = parseHTML(`<div class="filter-menu-row__heading-buttons"/>`);
        const $all = parseHTML(`<div class="filter-button">All</div>`);
        $quickBtns.append($all);
        const $clear = parseHTML(`<div class="filter-button">Clear</div>`);
        $quickBtns.append($clear);
        const $default = parseHTML(`<div ></div>`);
        $quickBtns.append($default);
        $line.append($quickBtns);

        $all.addEventListener(EVNT_CLICK, function(e) {
          e.stopPropagation();
          e.preventDefault();
          let filterPills = $grid.querySelectorAll(".filter-pill");
          for (let el of filterPills) {
            el.setter(FilterBox._PILL_STATES[1]);
          }
        });

        $clear.addEventListener(EVNT_CLICK, function(e) {
          e.stopPropagation();
          e.preventDefault();
          let filterPills = $grid.querySelectorAll(".filter-pill");
          for (let el of filterPills) {
            el.setter(FilterBox._PILL_STATES[0]);
          }
        });

        $default.addEventListener(EVNT_CLICK, function(e) {
          e.stopPropagation();
          e.preventDefault();
          self._reset(filter.header);
        });

        setTimeout(() => {
          $clear.click();
        }, 200);

        return $line;
      }

      function makePillGrid() {
        const $pills = [];
        const $grid = parseHTML(`<div class="filter-menu-grid mdc-chip-set"></div>`);

        function cycleState($pill, $miniPill, forward) {
          const curIndex = FilterBox._PILL_STATES.indexOf($pill.getAttribute("state"));

          let newIndex = forward ? curIndex + 1 : curIndex - 1;
          if (newIndex >= FilterBox._PILL_STATES.length) newIndex = 0;
          else if (newIndex < 0) newIndex = FilterBox._PILL_STATES.length - 1;
          $pill.setAttribute("state", FilterBox._PILL_STATES[newIndex]);
          $miniPill.setAttribute("state", FilterBox._PILL_STATES[newIndex]);
          if ($miniPill.getAttribute("state") === "ignore") {
            $miniPill.style["display"] = "none";
          } else {
            $miniPill.style.display = "inline-block";
          }
        }

        for (const item of filter.items) {
          const $pill = parseHTML(`<div class="filter-pill mdc-chip"/>`);
          const $miniPill = parseHTML(`<div class="mini-pill  mdc-chip group${i}"/>`);

          const display = filter.displayFn ? filter.displayFn(item) : item;

          $pill.value = item;
          $pill.append(parseHTML(`<span class="mdc-chip__text">${display}</span>`));
          $miniPill.append(parseHTML(`<span class="mdc-chip__text">${display}</span>`));

          $pill.setAttribute("state", FilterBox._PILL_STATES[0]);
          $miniPill.setAttribute("state", FilterBox._PILL_STATES[0]);

          $miniPill.addEventListener(EVNT_CLICK, function() {
            $pill.setAttribute("state", FilterBox._PILL_STATES[0]);
            $miniPill.setAttribute("state", FilterBox._PILL_STATES[0]);
            setTimeout(() => {
              $miniPill.style.display = "none";
            }, 200);
            self._fireValChangeEvent();
          });

          $pill.addEventListener(EVNT_CLICK, function(e) {
            cycleState($pill, $miniPill, true);
          });

          $pill.addEventListener("contextmenu", function(e) {
            e.preventDefault();
            cycleState($pill, $miniPill, false);
          });

          $pill.setter = function(toVal) {
            $pill.setAttribute("state", toVal);
            $miniPill.setAttribute("state", toVal);
            if ($miniPill.getAttribute("state") === "ignore") {
              $miniPill.style.display = "none";
            } else {
              $miniPill.style.display = "inline-block";
            }
          };
          $pill.resetter = function() {
            if (filter.selFn && filter.selFn(item)) {
              $pill.setAttribute("state", "yes");
              $miniPill.setAttribute("state", "yes");
            } else {
              $pill.setAttribute("state", "ignore");
              $miniPill.setAttribute("state", "ignore");
            }
            if ($miniPill.getAttribute("state") === "ignore") {
              $miniPill.style.display = "none";
            } else {
              $miniPill.style.display = "inline-block";
            }
          };
          $pill.resetter();

          $grid.append($pill);
          $miniView.append($miniPill);
          $pills.push($pill);
        }

        $grid.getValues = function() {
          const out = {};
          const _totals = { yes: 0, no: 0, ignored: 0 };
          $pills.forEach(function(p) {
            const state = p.getAttribute("state");
            out[p.value] = state === "yes" ? 1 : 0;
            const countName = state === "yes" ? "yes" : "ignored";
            _totals[countName] = _totals[countName] + 1;
          });
          out._totals = _totals;
          return out;
        };

        return $grid;
      }
    }

    function addResetHandler(self) {
      if (self.resetButton !== null && self.resetButton !== undefined) {
        self.resetButton.addEventListener(
          EVNT_CLICK,
          function() {
            self.reset();
          },
          false
        );
      }
    }
  }

  addDropdownHandlers(filterWrap, materialMenu) {
    materialMenu.root_.addEventListener("MDCMenuSurface:closed", e => {
      this._fireValChangeEvent();
    });

    filterWrap.querySelector(".mdc-button").addEventListener("click", () => {
      if (materialMenu.isOpen()) {
        materialMenu.close();
      } else {
        materialMenu.open();
      }
    });

    filterWrap.querySelector(".close-menu").addEventListener("click", e => {
      materialMenu.close();
    });

    filterWrap.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
  }

  /**
   * Get a map of {Filter.header: {map of Filter.items: <1/0/-1> representing the state
   * to each pill}}
   * Additionally, include an element per filter which gives the total of 1/0/-1 entries
   * Note that 1 represents a "required" pill, 0 represents an "ignored" pill, and -1 respresents an "excluded"
   * pill.
   *
   * @returns the map described above e.g.
   *
   * {
   *  "Source": { "PHB": 1, "DMG": 0, "_totals": { "yes": 1, "no": 0, "ignored": 1 } },
   *  "School": { "A": 0, "EV": -1, "_totals": { "yes": 0, "no": 1, "ignored": 1 } }
   * }
   *
   */
  getValues() {
    const outObj = {};
    for (const header in this.headers) {
      if (!this.headers.hasOwnProperty(header)) continue;
      outObj[header] = this.headers[header].ele.getValues();
    }
    return outObj;
  }

  /**
   * Convenience function to cleanly add event listeners
   *
   * @param type should probably always be `FilterBox.EVNT_VALCHANGE` which is fired when the values available
   * from getValues() change
   *
   * @param listener A function to call when the event is fired. See JS addEventListener docs for more.
   * @param useCapture See JS addEventListener docs.
   */
  addEventListener(type, listener, useCapture) {
    this.inputGroup.addEventListener(type, listener, useCapture);
  }

  /**
   * Reset the selected filters to default, applying any `selFn` and `deselFn` functions from the filters
   */
  reset() {
    for (const header in this.headers) {
      if (!this.headers.hasOwnProperty(header)) continue;
      this._reset(header);
    }
    this._fireValChangeEvent();
  }

  /**
   * Helper which resets an section of the filter
   * @param header the name of the section to reset
   * @private
   */
  _reset(header) {
    const cur = this.headers[header];
    let filterPills = cur.ele.querySelectorAll(".filter-pill");
    for (let el of filterPills) {
      el.resetter();
    }
  }

  /**
   * @private
   * Helper which dispatched the event when the filter needs to fire a "changed" event
   */
  _fireValChangeEvent() {
    const eventOut = new Event(FilterBox.EVNT_VALCHANGE);
    this.inputGroup.dispatchEvent(eventOut);
  }
}
FilterBox.CLS_INPUT_GROUP_BUTTON = "input-group-btn";
FilterBox.CLS_DROPDOWN_MENU = "dropdown-menu";
FilterBox.CLS_DROPDOWN_MENU_FILTER = "dropdown-menu-filter";
FilterBox.EVNT_VALCHANGE = "valchange";
FilterBox._PILL_STATES = ["ignore", "yes"];

class Filter {
  /**
   * A single filter category
   *
   * @param options an object with the following properties:
   *
   *   header: the category header e.g. "Source"
   *
   *   (OPTIONAL)
   *   items: a list of items to display (after applying the displayFn) in the FilterBox once `render()`
   *     has been called e.g. ["PHB", "DMG"]
   *     Note that you can pass a pointer to a list, and add items afterwards. Or pass nothing, which is equivalent to
   *     passing an empty list. The contents are only evaluated once `render()` is called.
   *
   *   (OPTIONAL)
   *   displayFn: A function to apply to each item in items when displaying the FilterBox on the page
   *     e.g. Parser.sourceJsonToFull
   *
   *   (OPTIONAL)
   *   selFn: a function, defaults items as "match this" if `selFn(item)` is true
   *
   *   (OPTIONAL)
   *   deselFn: a function, defaults items as "do not match this" if `deselFn(item)` is true
   *
   */
  constructor(options) {
    this.header = options.header;
    this.items = options.items ? options.items : [];
    this.displayFn = options.displayFn;
    this.selFn = options.selFn;
    this.deselFn = options.deselFn;
  }

  /**
   * Add an item if it doesn't already exist in the filter
   * @param item the item to add
   */
  addIfAbsent(item) {
    if (this.items.indexOf(item) === -1) {
      this.items.push(item);
    }
  }

  /**
   * Takes the output of `FilterBox.getValues()` and an item to check or array of items to check, and matches the
   * filter against it/them.
   *
   * @param valObj `FilterBox.getValues()` returned object
   * @param toCheck item or array of items to match against
   * @returns {*} true if this item should be displayed, false otherwise
   */
  toDisplay(valObj, toCheck) {
    const map = valObj[this.header];
    const totals = map._totals;
    if (toCheck instanceof Array) {
      let display = false;
      // default to displaying
      if (totals.yes === 0) {
        display = true;
      }
      let hide = false;
      for (let i = 0; i < toCheck.length; i++) {
        const item = toCheck[i];

        // if any are 1 (green) include if they match
        if (map[item] === 1) {
          display = true;
        }
      }

      return display && !hide;
    } else {
      return doCheck(toCheck);
    }

    function doCheck() {
      if (totals.yes > 0) {
        return map[toCheck] === 1;
      } else {
        return map[toCheck] >= 0;
      }
    }
  }
}

/**
 * An extremely simple deselect function. Simply deselects everything.
 * Useful for creating filter boxes where the default is "everything deselected"
 */
Filter.deselAll = function(val) {
  return true;
};

export { FilterBox, Filter };
