"use strict";

exports.__esModule = true;
exports.default = noAutoLinkRemarkPlugin;

var _unistUtilVisit = _interopRequireDefault(require("unist-util-visit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Return a Remark AST link node's link text
const getLinkValue = node => node.children.reduce((value, child) => {
  if (child.type === 'text') {
    value += child.value;
  }

  return value;
}, '');
/**
 * Prevent printing URLs as auto links (<http://example.com>).
 * Remark prints all links without a text as auto links, so we're adding a URL
 * as a title. It has an unfortunate side effect: a link has a title of
 * "http&#x3A;//..."
 *
 * @return {Object}
 */


function noAutoLinkRemarkPlugin() {
  return ast => {
    (0, _unistUtilVisit.default)(ast, 'link', node => {
      const value = getLinkValue(node);

      if (value === node.url) {
        node.title = node.url;
      }
    });
  };
}