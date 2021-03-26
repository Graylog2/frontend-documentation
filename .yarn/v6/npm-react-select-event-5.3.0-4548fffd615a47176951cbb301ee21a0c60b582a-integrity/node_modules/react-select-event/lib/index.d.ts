/** Simulate user events on react-select dropdowns */
import { Matcher } from "@testing-library/dom";
/**
 * Utility for opening the select's dropdown menu.
 * @param {HTMLElement} input The input field (eg. `getByLabelText('The label')`)
 */
export declare const openMenu: (input: HTMLElement) => void;
interface Config {
    /** A container where the react-select dropdown gets rendered to.
     *  Useful when rendering the dropdown in a portal using `menuPortalTarget`.
     */
    container?: HTMLElement | (() => HTMLElement);
}
/**
 * Utility for selecting a value in a `react-select` dropdown.
 * @param {HTMLElement} input The input field (eg. `getByLabelText('The label')`)
 * @param {Matcher|Matcher[]} optionOrOptions The display name(s) for the option(s) to select
 * @param {Object} config Optional config options
 * @param {HTMLElement | (() => HTMLElement)} config.container A container for the react-select and its dropdown (defaults to the react-select container)
 *            Useful when rending the dropdown to a portal using react-select's `menuPortalTarget`.
 *            Can be specified as a function if it needs to be lazily evaluated.
 */
export declare const select: (input: HTMLElement, optionOrOptions: Matcher | Array<Matcher>, config?: Config) => Promise<void>;
interface CreateConfig extends Config {
    createOptionText?: string | RegExp;
    waitForElement?: boolean;
}
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
export declare const create: (input: HTMLElement, option: string, { waitForElement, ...config }?: CreateConfig) => Promise<void>;
/**
 * Utility for clearing the first value of a `react-select` dropdown.
 * @param {HTMLElement} input The input field (eg. `getByLabelText('The label')`)
 */
export declare const clearFirst: (input: HTMLElement) => Promise<void>;
/**
 * Utility for clearing all values in a `react-select` dropdown.
 * @param {HTMLElement} input The input field (eg. `getByLabelText('The label')`)
 */
export declare const clearAll: (input: HTMLElement) => Promise<void>;
declare const selectEvent: {
    select: (input: HTMLElement, optionOrOptions: Matcher | Array<Matcher>, config?: Config) => Promise<void>;
    create: (input: HTMLElement, option: string, { waitForElement, ...config }?: CreateConfig) => Promise<void>;
    clearFirst: (input: HTMLElement) => Promise<void>;
    clearAll: (input: HTMLElement) => Promise<void>;
    openMenu: (input: HTMLElement) => void;
};
export default selectEvent;
