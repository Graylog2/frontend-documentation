"use strict";

exports.__esModule = true;
exports.default = void 0;

var _astTypes = require("ast-types");

var _requireIt = _interopRequireDefault(require("./requireIt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Resolve ES5 requires for export default, named export and module.exports
 *
 * @param requireRequest the argument of the `require` function
 * @param name the name of the resulting variable
 * @returns AST
 */
var _default = (requireRequest, name) => [// const name$0 = require(path);
_astTypes.builders.variableDeclaration('const', [_astTypes.builders.variableDeclarator(_astTypes.builders.identifier(`${name}$0`), (0, _requireIt.default)(requireRequest).toAST())]), // const name = name$0.default || name$0[name] || name$0;
_astTypes.builders.variableDeclaration('const', [_astTypes.builders.variableDeclarator(_astTypes.builders.identifier(name), _astTypes.builders.logicalExpression('||', _astTypes.builders.identifier(`${name}$0.default`), _astTypes.builders.logicalExpression('||', _astTypes.builders.identifier(`${name}$0['${name}']`), _astTypes.builders.identifier(`${name}$0`))))])];

exports.default = _default;