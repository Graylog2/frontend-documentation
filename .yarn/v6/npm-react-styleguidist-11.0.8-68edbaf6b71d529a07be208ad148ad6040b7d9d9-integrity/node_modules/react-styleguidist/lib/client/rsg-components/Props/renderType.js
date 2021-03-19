import "core-js/modules/es.function.name";
import React from 'react';
import Type from 'rsg-components/Type';
import Text from 'rsg-components/Text';
import { getType } from './util';
export function renderType(type) {
  if (!type) {
    return 'unknown';
  }

  var name = type.name;

  switch (name) {
    case 'arrayOf':
      return type.value.name + "[]";

    case 'objectOf':
      return "{" + renderType(type.value) + "}";

    case 'instanceOf':
      return type.value;

    default:
      return name;
  }
}

function renderComplexType(name, title) {
  return /*#__PURE__*/React.createElement(Text, {
    size: "small",
    underlined: true,
    title: title
  }, name);
}

function renderAdvancedType(type) {
  if (!type) {
    return 'unknown';
  }

  switch (type.name) {
    case 'enum':
      return type.name;

    case 'literal':
      return type.value;

    case 'signature':
      return renderComplexType(type.type, type.raw);

    case 'union':
    case 'tuple':
      return renderComplexType(type.name, type.raw);

    default:
      return type.raw || type.name;
  }
}

export default function renderTypeColumn(prop) {
  var type = getType(prop);

  if (!type) {
    return null;
  }

  if (prop.flowType || prop.tsType) {
    return /*#__PURE__*/React.createElement(Type, null, renderAdvancedType(type));
  }

  return /*#__PURE__*/React.createElement(Type, null, renderType(type));
}