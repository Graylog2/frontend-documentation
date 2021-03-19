"use strict";

exports.__esModule = true;
exports.default = getNameFromFilePath;

var _path = _interopRequireDefault(require("path"));

var _startCase = _interopRequireDefault(require("lodash/startCase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function transformFileNameToDisplayName(displayName) {
  // ex: your-buttonTS -> Your Button TS -> YourButtonTS
  // ex: your_button--TS -> Your Button TS -> YourButtonTS
  return (0, _startCase.default)(displayName).replace(/\s/g, '');
}

function getNameFromFilePath(filePath) {
  let fileName = _path.default.basename(filePath, _path.default.extname(filePath));

  if (fileName === 'index') {
    fileName = _path.default.basename(_path.default.dirname(filePath));
  }

  return transformFileNameToDisplayName(fileName);
}