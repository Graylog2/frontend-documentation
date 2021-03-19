import "core-js/modules/es.array.filter";
import "core-js/modules/es.array.map";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.assign";
import React from 'react';
import PropTypes from 'prop-types';
import ComponentsListRenderer from 'rsg-components/ComponentsList/ComponentsListRenderer';
import getUrl from '../../utils/getUrl';

var ComponentsList = function ComponentsList(_ref) {
  var items = _ref.items,
      _ref$useRouterLinks = _ref.useRouterLinks,
      useRouterLinks = _ref$useRouterLinks === void 0 ? false : _ref$useRouterLinks,
      useHashId = _ref.useHashId,
      hashPath = _ref.hashPath;
  var mappedItems = items.map(function (item) {
    var href = item.href ? item.href : getUrl({
      name: item.name,
      slug: item.slug,
      anchor: !useRouterLinks,
      hashPath: useRouterLinks ? hashPath : false,
      id: useRouterLinks ? useHashId : false
    });
    return Object.assign({}, item, {
      href: href
    });
  }).filter(function (item) {
    return item.visibleName;
  });
  return mappedItems.length > 0 ? /*#__PURE__*/React.createElement(ComponentsListRenderer, {
    items: mappedItems
  }) : null;
};

ComponentsList.propTypes = {
  items: PropTypes.array.isRequired,
  hashPath: PropTypes.array,
  useRouterLinks: PropTypes.bool,
  useHashId: PropTypes.bool
};
export default ComponentsList;