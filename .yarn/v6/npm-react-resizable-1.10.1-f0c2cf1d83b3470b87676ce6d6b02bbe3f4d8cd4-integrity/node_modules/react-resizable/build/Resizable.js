"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDraggable = require("react-draggable");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Resizable =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Resizable, _React$Component);

  function Resizable() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      slackW: 0,
      slackH: 0
    });

    return _this;
  }

  var _proto = Resizable.prototype;

  _proto.lockAspectRatio = function lockAspectRatio(width, height, aspectRatio) {
    height = width / aspectRatio;
    width = height * aspectRatio;
    return [width, height];
  } // If you do this, be careful of constraints
  ;

  _proto.runConstraints = function runConstraints(width, height) {
    var _ref = [this.props.minConstraints, this.props.maxConstraints],
        min = _ref[0],
        max = _ref[1];
    if (!min && !max) return [width, height]; // Fit width & height to aspect ratio

    if (this.props.lockAspectRatio) {
      if (height === this.props.height) {
        var ratio = this.props.width / this.props.height;
        height = width / ratio;
        width = height * ratio;
      } else {
        // Take into account vertical resize with N/S handles on locked aspect
        // ratio. Calculate the change height-first, instead of width-first
        var _ratio = this.props.height / this.props.width;

        width = height / _ratio;
        height = width * _ratio;
      }
    }

    var oldW = width,
        oldH = height; // Add slack to the values used to calculate bound position. This will ensure that if
    // we start removing slack, the element won't react to it right away until it's been
    // completely removed.

    var _this$state = this.state,
        slackW = _this$state.slackW,
        slackH = _this$state.slackH;
    width += slackW;
    height += slackH;

    if (min) {
      width = Math.max(min[0], width);
      height = Math.max(min[1], height);
    }

    if (max) {
      width = Math.min(max[0], width);
      height = Math.min(max[1], height);
    } // If the numbers changed, we must have introduced some slack. Record it for the next iteration.


    slackW += oldW - width;
    slackH += oldH - height;

    if (slackW !== this.state.slackW || slackH !== this.state.slackH) {
      this.setState({
        slackW: slackW,
        slackH: slackH
      });
    }

    return [width, height];
  }
  /**
   * Wrapper around drag events to provide more useful data.
   *
   * @param  {String} handlerName Handler name to wrap.
   * @return {Function}           Handler function.
   */
  ;

  _proto.resizeHandler = function resizeHandler(handlerName, axis) {
    var _this2 = this;

    return function (e, _ref2) {
      var node = _ref2.node,
          deltaX = _ref2.deltaX,
          deltaY = _ref2.deltaY;
      deltaX /= _this2.props.transformScale;
      deltaY /= _this2.props.transformScale; // Axis restrictions

      var canDragX = (_this2.props.axis === 'both' || _this2.props.axis === 'x') && ['n', 's'].indexOf(axis) === -1;
      var canDragY = (_this2.props.axis === 'both' || _this2.props.axis === 'y') && ['e', 'w'].indexOf(axis) === -1; // reverse delta if using top or left drag handles

      if (canDragX && axis[axis.length - 1] === 'w') {
        deltaX = -deltaX;
      }

      if (canDragY && axis[0] === 'n') {
        deltaY = -deltaY;
      } // Update w/h


      var width = _this2.props.width + (canDragX ? deltaX : 0);
      var height = _this2.props.height + (canDragY ? deltaY : 0); // Early return if no change

      var widthChanged = width !== _this2.props.width,
          heightChanged = height !== _this2.props.height;
      if (handlerName === 'onResize' && !widthChanged && !heightChanged) return;

      var _this2$runConstraints = _this2.runConstraints(width, height);

      width = _this2$runConstraints[0];
      height = _this2$runConstraints[1];
      // Set the appropriate state for this handler.
      var newState = {};

      if (handlerName === 'onResizeStart') {// nothing
      } else if (handlerName === 'onResizeStop') {
        newState.slackW = newState.slackH = 0;
      } else {
        // Early return if no change after constraints
        if (width === _this2.props.width && height === _this2.props.height) return;
      }

      var hasCb = typeof _this2.props[handlerName] === 'function';

      if (hasCb) {
        // $FlowIgnore isn't refining this correctly to SyntheticEvent
        if (typeof e.persist === 'function') e.persist();

        _this2.setState(newState, function () {
          return _this2.props[handlerName](e, {
            node: node,
            size: {
              width: width,
              height: height
            },
            handle: axis
          });
        });
      } else {
        _this2.setState(newState);
      }
    };
  };

  _proto.renderResizeHandle = function renderResizeHandle(resizeHandle) {
    var handle = this.props.handle;

    if (handle) {
      if (typeof handle === 'function') {
        return handle(resizeHandle);
      }

      return handle;
    }

    return _react.default.createElement("span", {
      className: "react-resizable-handle react-resizable-handle-" + resizeHandle
    });
  };

  _proto.render = function render() {
    var _this3 = this;

    // eslint-disable-next-line no-unused-vars
    var _this$props = this.props,
        children = _this$props.children,
        draggableOpts = _this$props.draggableOpts,
        width = _this$props.width,
        height = _this$props.height,
        handleSize = _this$props.handleSize,
        lockAspectRatio = _this$props.lockAspectRatio,
        axis = _this$props.axis,
        minConstraints = _this$props.minConstraints,
        maxConstraints = _this$props.maxConstraints,
        onResize = _this$props.onResize,
        onResizeStop = _this$props.onResizeStop,
        onResizeStart = _this$props.onResizeStart,
        resizeHandles = _this$props.resizeHandles,
        transformScale = _this$props.transformScale,
        p = _objectWithoutPropertiesLoose(_this$props, ["children", "draggableOpts", "width", "height", "handleSize", "lockAspectRatio", "axis", "minConstraints", "maxConstraints", "onResize", "onResizeStop", "onResizeStart", "resizeHandles", "transformScale"]);

    var className = p.className ? p.className + " react-resizable" : 'react-resizable'; // What we're doing here is getting the child of this element, and cloning it with this element's props.
    // We are then defining its children as:
    // Its original children (resizable's child's children), and
    // One or more draggable handles.

    return (0, _utils.cloneElement)(children, _objectSpread({}, p, {
      className: className,
      children: [children.props.children, resizeHandles.map(function (h) {
        return _react.default.createElement(_reactDraggable.DraggableCore, _extends({}, draggableOpts, {
          key: "resizableHandle-" + h,
          onStop: _this3.resizeHandler('onResizeStop', h),
          onStart: _this3.resizeHandler('onResizeStart', h),
          onDrag: _this3.resizeHandler('onResize', h)
        }), _this3.renderResizeHandle(h));
      })]
    }));
  };

  return Resizable;
}(_react.default.Component);

exports.default = Resizable;

_defineProperty(Resizable, "propTypes", {
  //
  // Required Props
  //
  // Require that one and only one child be present.
  children: _propTypes.default.element.isRequired,
  // Initial w/h
  width: _propTypes.default.number.isRequired,
  height: _propTypes.default.number.isRequired,
  //
  // Optional props
  //
  // Custom resize handle
  handle: _propTypes.default.element,
  // If you change this, be sure to update your css
  handleSize: _propTypes.default.array,
  // Defines which resize handles should be rendered (default: 'se')
  // Allows for any combination of:
  // 's' - South handle (bottom-center)
  // 'w' - West handle (left-center)
  // 'e' - East handle (right-center)
  // 'n' - North handle (top-center)
  // 'sw' - Southwest handle (bottom-left)
  // 'nw' - Northwest handle (top-left)
  // 'se' - Southeast handle (bottom-right)
  // 'ne' - Northeast handle (top-center)
  resizeHandles: _propTypes.default.arrayOf(_propTypes.default.oneOf(['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne'])),
  transformScale: _propTypes.default.number,
  // If true, will only allow width/height to move in lockstep
  lockAspectRatio: _propTypes.default.bool,
  // Restricts resizing to a particular axis (default: 'both')
  // 'both' - allows resizing by width or height
  // 'x' - only allows the width to be changed
  // 'y' - only allows the height to be changed
  // 'none' - disables resizing altogether
  axis: _propTypes.default.oneOf(['both', 'x', 'y', 'none']),
  // Min/max size
  minConstraints: _propTypes.default.arrayOf(_propTypes.default.number),
  maxConstraints: _propTypes.default.arrayOf(_propTypes.default.number),
  // Callbacks
  onResizeStop: _propTypes.default.func,
  onResizeStart: _propTypes.default.func,
  onResize: _propTypes.default.func,
  // These will be passed wholesale to react-draggable's DraggableCore
  draggableOpts: _propTypes.default.object
});

_defineProperty(Resizable, "defaultProps", {
  handleSize: [20, 20],
  lockAspectRatio: false,
  axis: 'both',
  minConstraints: [20, 20],
  maxConstraints: [Infinity, Infinity],
  resizeHandles: ['se'],
  transformScale: 1
});