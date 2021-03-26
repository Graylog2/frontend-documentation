import { fireEvent, waitFor, findAllByText, findByText } from '@testing-library/dom';

/**
 * A simple compatibility method for react's "act".
 * If a recent version of @testing-library/react is already installed,
 * we just use their implementation - it's complete and has useful warnings.
 * Otherwise, we just default to a noop.
 *
 * We need this because react-select-event doesn't actually pin a
 * dependency version for @testing-library/react!
 */
let act;

try {
  act = require("@testing-library/react").act;
} catch (_) {
  // istanbul ignore next
  act = callback => {
    callback();
  };
}

var act$1 = act;

/** Simulate user events on react-select dropdowns */

function getReactSelectContainerFromInput(input) {
  return input.parentNode.parentNode.parentNode.parentNode.parentNode;
}
/**
 * Utility for opening the select's dropdown menu.
 * @param {HTMLElement} input The input field (eg. `getByLabelText('The label')`)
 */


const openMenu = input => {
  fireEvent.focus(input);
  fireEvent.keyDown(input, {
    key: "ArrowDown",
    keyCode: 40,
    code: 40
  });
}; // type text in the input field

const type = (input, text) => {
  fireEvent.change(input, {
    target: {
      value: text
    }
  });
}; // press the "clear" button, and reset various states


const clear = async (input, clearButton) => {
  await act$1(async () => {
    fireEvent.mouseDown(clearButton);
    fireEvent.click(clearButton); // react-select will prevent the menu from opening, and asynchronously focus the select field...

    await waitFor(() => {});
    input.blur();
  });
};

/**
 * Utility for selecting a value in a `react-select` dropdown.
 * @param {HTMLElement} input The input field (eg. `getByLabelText('The label')`)
 * @param {Matcher|Matcher[]} optionOrOptions The display name(s) for the option(s) to select
 * @param {Object} config Optional config options
 * @param {HTMLElement | (() => HTMLElement)} config.container A container for the react-select and its dropdown (defaults to the react-select container)
 *            Useful when rending the dropdown to a portal using react-select's `menuPortalTarget`.
 *            Can be specified as a function if it needs to be lazily evaluated.
 */
const select = async (input, optionOrOptions, config = {}) => {
  const options = Array.isArray(optionOrOptions) ? optionOrOptions : [optionOrOptions];
  await act$1(async () => {
    // Select the items we care about
    for (const option of options) {
      openMenu(input);
      let container;

      if (typeof config.container === "function") {
        // when specified as a function, the container needs to be lazily evaluated, so
        // we have to wait for it to be visible:
        await waitFor(config.container);
        container = config.container();
      } else if (config.container) {
        container = config.container;
      } else {
        container = getReactSelectContainerFromInput(input);
      } // only consider visible, interactive elements


      const matchingElements = await findAllByText(container, option, {
        // @ts-ignore invalid rtl types :'(
        ignore: "[aria-live] *,[style*='visibility: hidden']"
      }); // When the target option is already selected, the react-select display text
      // will also match the selector. In this case, the actual dropdown element is
      // positionned last in the DOM tree.

      const optionElement = matchingElements[matchingElements.length - 1];
      fireEvent.click(optionElement);
    }
  });
};

/**
 * Utility for creating and selecting a value in a Creatable `react-select` dropdown.
 * @async
 * @param {HTMLElement} input The input field (eg. `getByLabelText('The label')`)
 * @param {String} option The display name for the option to type and select
 * @param {Object} config Optional config options
 * @param {HTMLElement} config.container A container for the react-select and its dropdown (defaults to the react-select container)
 *                         Useful when rending the dropdown to a portal using react-select's `menuPortalTarget`
 * @param {boolean} config.waitForElement Whether create should wait for new option to be populated in the select container
 * @param {String|RegExp} config.createOptionText Custom label for the "create new ..." option in the menu (string or regexp)
 */
const create = async (input, option, {
  waitForElement = true,
  ...config
} = {}) => {
  const createOptionText = config.createOptionText || /^Create "/;
  openMenu(input);
  type(input, option);
  fireEvent.change(input, {
    target: {
      value: option
    }
  });
  await select(input, createOptionText, config);

  if (waitForElement) {
    await findByText(getReactSelectContainerFromInput(input), option);
  }
};
/**
 * Utility for clearing the first value of a `react-select` dropdown.
 * @param {HTMLElement} input The input field (eg. `getByLabelText('The label')`)
 */

const clearFirst = async input => {
  const container = getReactSelectContainerFromInput(input); // The "clear" button is the first svg element that is hidden to screen readers

  const clearButton = container.querySelector('svg[aria-hidden="true"]');
  await clear(input, clearButton);
};
/**
 * Utility for clearing all values in a `react-select` dropdown.
 * @param {HTMLElement} input The input field (eg. `getByLabelText('The label')`)
 */

const clearAll = async input => {
  const container = getReactSelectContainerFromInput(input); // The "clear all" button is the penultimate svg element that is hidden to screen readers
  // (the last one is the dropdown arrow)

  const elements = container.querySelectorAll('svg[aria-hidden="true"]');
  const clearAllButton = elements[elements.length - 2];
  await clear(input, clearAllButton);
};
const selectEvent = {
  select,
  create,
  clearFirst,
  clearAll,
  openMenu
};

export default selectEvent;
export { clearAll, clearFirst, create, openMenu, select };
