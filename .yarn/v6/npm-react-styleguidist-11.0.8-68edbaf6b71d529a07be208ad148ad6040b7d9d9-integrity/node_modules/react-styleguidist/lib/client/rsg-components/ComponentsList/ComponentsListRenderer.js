import "core-js/modules/es.array.map";
import "core-js/modules/es.object.assign";
import "core-js/modules/es.string.small";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';
import Link from 'rsg-components/Link';
import Styled from 'rsg-components/Styled';
import { useStyleGuideContext } from 'rsg-components/Context';

var styles = function styles(_ref) {
  var _isChild;

  var color = _ref.color,
      fontFamily = _ref.fontFamily,
      fontSize = _ref.fontSize,
      space = _ref.space,
      mq = _ref.mq;
  return {
    list: {
      margin: 0,
      paddingLeft: space[2]
    },
    item: {
      color: color.base,
      display: 'block',
      margin: [[space[1], 0, space[1], 0]],
      fontFamily: fontFamily.base,
      fontSize: fontSize.base,
      listStyle: 'none',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    isChild: (_isChild = {}, _isChild[mq.small] = {
      display: 'inline-block',
      margin: [[0, space[1], 0, 0]]
    }, _isChild),
    heading: {
      color: color.base,
      marginTop: space[1],
      fontFamily: fontFamily.base,
      fontWeight: 'bold'
    },
    isSelected: {
      fontWeight: 'bold'
    }
  };
};

export var ComponentsListRenderer = function ComponentsListRenderer(_ref2) {
  var classes = _ref2.classes,
      items = _ref2.items;
  return /*#__PURE__*/React.createElement("ul", {
    className: classes.list
  }, items.map(function (item) {
    return /*#__PURE__*/React.createElement(ComponentsListSectionRenderer, _extends({
      key: item.slug,
      classes: classes
    }, item));
  }));
};

var ComponentsListSectionRenderer = function ComponentsListSectionRenderer(_ref3) {
  var _cx;

  var classes = _ref3.classes,
      heading = _ref3.heading,
      visibleName = _ref3.visibleName,
      href = _ref3.href,
      content = _ref3.content,
      shouldOpenInNewTab = _ref3.shouldOpenInNewTab,
      selected = _ref3.selected,
      initialOpen = _ref3.initialOpen,
      forcedOpen = _ref3.forcedOpen;

  var _useStyleGuideContext = useStyleGuideContext(),
      tocMode = _useStyleGuideContext.config.tocMode;

  var _ref4 = tocMode !== 'collapse' ? [true, function () {}] : React.useState(!!initialOpen),
      open = _ref4[0],
      setOpen = _ref4[1];

  return /*#__PURE__*/React.createElement("li", {
    className: cx(classes.item, (_cx = {}, _cx[classes.isChild] = !content && !shouldOpenInNewTab, _cx[classes.isSelected] = selected, _cx)),
    key: href
  }, /*#__PURE__*/React.createElement(Link, {
    className: cx(heading && classes.heading),
    href: href,
    onClick: function onClick() {
      return setOpen(!open);
    },
    target: shouldOpenInNewTab ? '_blank' : undefined
  }, visibleName), open || forcedOpen ? content : null);
};

ComponentsListRenderer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  items: PropTypes.array.isRequired
};
export default Styled(styles)(ComponentsListRenderer);