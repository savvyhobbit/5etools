import { escapeHTML } from "../js/utils";

const MAXITEMSINOBJECTPREVIEW = 3;
const MAXITEMSINARRAYPREVIEW = 5;

const STRING_COLOR = "var(--console-string-color)";
const NUMBER_BOOL_COLOR = "var(--console-number-color)";
const OBJECT_ARRAY_COLOR = "var(--console-object-color)";
const NULLISH_COLOR ="var(--console-nullish-color)";
const PUNC_COLOR = "var(--console-punc-color)";

const alphabet = "abcdefghijklmnopqrstuvwxyz0123456798*!@_.()#^&%-=+"

/**
 * https://github.com/karimayachi/html-console-output
 * Serialize an object or primitive to HTML
 * @param o The object to be serialized
 * @param baseLevel true if used as top-level element, false when used in recursive child serialization
 * @param inline true if used in preview for Array or Object
 */
export function createItem(o, baseLevel, inline, propName) {
  let item = document.createElement("div");
  item.classList.add("console-item");

  switch (typeof o) {
    case "string":
      if (baseLevel) {
        item.innerHTML = escapeHTML(o);
      } else {
        item.style.color = STRING_COLOR;
        item.innerHTML = `"${escapeHTML(o)}"`;
      }
      break
    case "number":
    case "boolean":
      item.style.color = NUMBER_BOOL_COLOR;
      item.innerHTML = o.toString()
      break
    case "object":
      if (o === null) {
        item.style.color = NULLISH_COLOR;
        item.innerHTML = "null"
      } else if (o instanceof Error) {
        if (baseLevel) {
          item.innerHTML = escapeHTML(o.message);
        } else {
          item.innerHTML += `<pre>${escapeHTML(o.stack)}</pre>`;
        }
      } else {
        item.style.color = OBJECT_ARRAY_COLOR;
        if (inline) {
          item.innerHTML = `<span style="color:${PUNC_COLOR}">{&mldr;}</span>`
        } else {
          item.appendChild(createObjectItem(o, propName))
        }
      }
      break
    // case "function":
    //   item.style.color = "rgb(238, 151, 39)"
    //   item.innerHTML = "function()"
    //   break
    case "undefined":
      item.style.color = "#777"
      item.innerHTML = "undefined"
      break
  }

  return item
}

function createObjectItem(o, propName) {
  const fragment = document.createDocumentFragment()
  const id =
    "u" +
    Math.random()
      .toString(36)
      .substr(2, 8)
  const toggle = document.createElement("input")
  const label = document.createElement("label")
  const labelText = document.createElement("span")
  const labelTextShort = document.createElement("span")
  const content = document.createElement("div")
  const contentInner = document.createElement("div")

  content.classList.add("collapsible-content")
  contentInner.classList.add("content-inner")

  toggle.classList.add("toggle")
  toggle.type = "checkbox"
  toggle.id = id

  labelText.classList.add("label-text")
  labelTextShort.classList.add("label-text-short")

  if (o instanceof Array) {
    if (propName) {
      labelText.innerHTML = `<span style="font-weight:bold">${propName}</span><span style="color: ${PUNC_COLOR}">:</span> `;
      labelTextShort.innerHTML = `<span style="font-weight:bold">${propName}</span style="color: ${PUNC_COLOR}"><span>:</span> `;
    }
    labelText.appendChild(createLengthSpan(o))
    labelText.appendChild(createArrayPreview(o))
    labelTextShort.appendChild(createLengthSpan(o))
  } else {
    if (propName) {
      labelTextShort.innerHTML = `<span style="font-weight:bold">${propName}</span><span style="color: ${PUNC_COLOR}">:</span> `;
      labelText.innerHTML = `<span style="font-weight:bold">${propName}</span style="color: ${PUNC_COLOR}"><span>:</span> `;
    } else {
      labelTextShort.appendChild(createObjectPreview(o));
    }
    labelText.appendChild(createObjectPreview(o));
  }

  label.classList.add('label-toggle');
  label.setAttribute('for', id);
  label.appendChild(labelText);
  label.appendChild(labelTextShort);


  for (let property of Object.keys(o).sort((a, b) => {
      const index_a = alphabet.indexOf(a[0]),
        index_b = alphabet.indexOf(b[0]);

      if (index_a === index_b) {
          if (a < b) {
              return -1;
          } else if (a > b) {
              return 1;
          }
          return 0;
      } else {
          return index_a - index_b;
      }
  })) {
    if(Object.getOwnPropertyNames(o).indexOf(property) == -1) continue;
    const serializedProperty = document.createElement('div');
    serializedProperty.classList.add('console-property');
    if (typeof o[property] !== 'object') {
      serializedProperty.innerHTML = `<span style="font-weight:bold">${property}</span><span style="color:${PUNC_COLOR}">: </span>`;
    }
    serializedProperty.appendChild(createItem(o[property], false, false, property));
    contentInner.appendChild(serializedProperty);
  }

  // for (let property of getHiddenProperties(o)) {
  //   const serializedProperty = document.createElement('div');
  //   serializedProperty.classList.add('console-property');
  //   let lockIcon = document.createElement('span');
  //   lockIcon.classList.add('fa');
  //   lockIcon.classList.add('fa-lock');
  //   lockIcon.style.color = '#aaa';
  //   serializedProperty.appendChild(lockIcon);
  //   serializedProperty.innerHTML += ` ${property}: `;
  //   serializedProperty.appendChild(createItem(o[property], false, false, property));
  //   contentInner.appendChild(serializedProperty);
  // }

  // let proto = Object.getPrototypeOf(o);
  // if (proto !== null) {
  //   const serializedProperty = document.createElement('div');
  //   serializedProperty.classList.add('console-property');
  //   serializedProperty.style.color = '#777';
  //   serializedProperty.innerHTML = '(prototype): ';
  //   serializedProperty.appendChild(createItem(proto, false, false));
  //   contentInner.appendChild(serializedProperty);
  // }

  content.appendChild(contentInner);

  fragment.appendChild(toggle);
  fragment.appendChild(label);
  fragment.appendChild(content);

  return fragment;
}

function createLengthSpan(a) {
  const span = document.createElement("span")
  span.style.color = "#aaa"
  span.innerHTML = `<span style="color:${NULLISH_COLOR}">(${a.length}) </span>`

  return span
}

export function createObjectPreview(o) {
  const fragment = document.createDocumentFragment()
  const span = document.createElement("span")

  if (!!o) {
    span.innerHTML = `<span style="color:${PUNC_COLOR}">{</span>`;

    let index = 0
    for (let property in o) {
      span.innerHTML += `<span style="color:${NULLISH_COLOR}">${property}<span style="color:${PUNC_COLOR}">:</span> </span>`
      span.appendChild(createItem(o[property], false, true))

      if (
        index >= MAXITEMSINOBJECTPREVIEW - 1 ||
        index == Object.keys(o).length - 1
      ) {
        break
      }

      span.innerHTML += `<span style="color:${PUNC_COLOR}">, </span>`
      index++
    }

    if (Object.keys(o).length > MAXITEMSINOBJECTPREVIEW) {
      span.innerHTML += `<span style="color:${PUNC_COLOR}">, &mldr;</span>`
    }

    span.innerHTML += `<span style="color:${PUNC_COLOR}">}</span>`
  }
  fragment.appendChild(span)
  return fragment
}

export function createArrayPreview(a) {
  const fragment = document.createDocumentFragment()
  const span = document.createElement("span")

  span.innerHTML = `<span style="color:${PUNC_COLOR}">[</span>`;

  for (let i = 0; i < MAXITEMSINARRAYPREVIEW && i < a.length; i++) {
    span.appendChild(createItem(a[i], false, true))

    if (i < a.length - 1 && i < MAXITEMSINARRAYPREVIEW - 1) {
      span.innerHTML += `<span style="color:${PUNC_COLOR}">, </span>`
    }
  }

  if (a.length > MAXITEMSINARRAYPREVIEW) {
    span.innerHTML += `<span style="color:${PUNC_COLOR}">, &mldr;</span>`
  }

  span.innerHTML += `<span style="color:${PUNC_COLOR}">]</span>`

  fragment.appendChild(span)
  return fragment
}

function getHiddenProperties(o) {
  /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames
   */
  let all = Object.getOwnPropertyNames(o)
  let enumOnly = Object.keys(o)

  return all.filter(key => {
    let index = enumOnly.indexOf(key)
    if (index == -1) {
      return true
    } else {
      return false
    }
  })
}
