'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tab = exports.Sidebar = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactLeaflet = require('react-leaflet');

var _propTypes = require('prop-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tab = function (_React$Component) {
  _inherits(Tab, _React$Component);

  function Tab() {
    _classCallCheck(this, Tab);

    return _possibleConstructorReturn(this, (Tab.__proto__ || Object.getPrototypeOf(Tab)).apply(this, arguments));
  }

  _createClass(Tab, [{
    key: 'render',
    value: function render() {
      var active = this.props.active ? ' active' : '';
      var closeIcon;
      if (typeof this.props.closeIcon === 'string') closeIcon = _react2.default.createElement('i', { className: this.props.closeIcon });else if (_typeof(this.props.closeIcon) === 'object') closeIcon = this.props.closeIcon;else {
        var closecls = this.props.position === 'right' ? "fa fa-caret-right" : "fa fa-caret-left";
        closeIcon = _react2.default.createElement('i', { className: closecls });
      }
      return _react2.default.createElement(
        'div',
        { id: this.props.id, className: "sidebar-pane" + active },
        _react2.default.createElement(
          'h1',
          { className: 'sidebar-header' },
          this.props.header,
          _react2.default.createElement(
            'div',
            { className: 'sidebar-close', onClick: this.props.onClose },
            closeIcon
          )
        ),
        this.props.children
      );
    }
  }]);

  return Tab;
}(_react2.default.Component);

// https://github.com/facebook/react/issues/2979#issuecomment-222379916


Tab.propTypes = {
  id: _propTypes.PropTypes.string.isRequired,
  header: _propTypes.PropTypes.string.isRequired,
  icon: _propTypes.PropTypes.oneOfType([_propTypes.PropTypes.string, _propTypes.PropTypes.element]).isRequired,
  anchor: _propTypes.PropTypes.oneOf(['top', 'bottom']),
  disabled: _propTypes.PropTypes.bool,
  // Provided by the Sidebar; don't mark as required (user doesn't need to include them):
  onClose: _propTypes.PropTypes.func,
  closeIcon: _propTypes.PropTypes.oneOfType([_propTypes.PropTypes.string, _propTypes.PropTypes.element]),
  position: _propTypes.PropTypes.oneOf(['left', 'right']),
  active: _propTypes.PropTypes.bool,
  title: _propTypes.PropTypes.string
};
var TabType = _propTypes.PropTypes.shape({
  type: _propTypes.PropTypes.oneOf([Tab])
});

var Sidebar = function (_MapComponent) {
  _inherits(Sidebar, _MapComponent);

  function Sidebar(props) {
    _classCallCheck(this, Sidebar);

    var _this2 = _possibleConstructorReturn(this, (Sidebar.__proto__ || Object.getPrototypeOf(Sidebar)).call(this, props));

    _this2.state = {
      largeMenu: true
    };
    return _this2;
  }

  _createClass(Sidebar, [{
    key: 'onClose',
    value: function onClose(e) {
      e.preventDefault();
      e.stopPropagation();
      this.props.onClose && this.props.onClose();
    }
  }, {
    key: 'onOpen',
    value: function onOpen(e, tabid) {
      e.preventDefault();
      e.stopPropagation();
      this.props.onOpen && this.props.onOpen(tabid);
    }
  }, {
    key: 'onSwitchLargeMenu',
    value: function onSwitchLargeMenu(e) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({ largeMenu: !this.state.largeMenu });
    }
  }, {
    key: 'renderTab',
    value: function renderTab(tab) {
      var _this3 = this;

      var icon;
      if (typeof tab.props.icon === 'string') icon = _react2.default.createElement('i', { className: tab.props.icon });else if (_typeof(tab.props.icon) === 'object') icon = tab.props.icon;
      var active = tab.props.id === this.props.selected ? ' active' : '';
      var disabled = tab.props.disabled ? ' disabled' : '';
      var title = tab.props.title || tab.props.header;
      return _react2.default.createElement(
        'li',
        { className: active + disabled, key: tab.props.id },
        _react2.default.createElement(
          'a',
          { href: '#' + tab.props.id, title: title, role: 'tab', onClick: function onClick(e) {
              return tab.props.disabled || _this3.onOpen(e, tab.props.id);
            } },
          icon,
          _react2.default.createElement(
            'span',
            null,
            title
          )
        )
      );
    }
  }, {
    key: 'renderPanes',
    value: function renderPanes(children) {
      var _this4 = this;

      return _react2.default.Children.map(children, function (p) {
        return _react2.default.cloneElement(p, { onClose: _this4.onClose.bind(_this4),
          closeIcon: _this4.props.closeIcon,
          active: p.props.id === _this4.props.selected,
          position: _this4.props.position || 'left' });
      });
    }

    // Override render() so the <Map> element contains a div we can render to

  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var position = ' sidebar-' + (this.props.position || 'left');
      var collapsed = this.props.collapsed ? ' collapsed' : '';
      var largeMenu = this.state.largeMenu ? ' large-menu' : ' small-menu';
      var switcherIcon = this.state.largeMenu ? 'fa fa-lg fa-angle-double-left' : 'fa fa-lg fa-angle-double-right';

      var tabs = _react2.default.Children.toArray(this.props.children);
      var bottomtabs = tabs.filter(function (t) {
        return t.props.anchor === 'bottom';
      });
      var toptabs = tabs.filter(function (t) {
        return t.props.anchor !== 'bottom';
      });
      return _react2.default.createElement(
        'div',
        { id: this.props.id, className: "sidebar leaflet-touch" + position + collapsed + largeMenu,
          ref: function ref(el) {
            return _this5.rootElement = el;
          } },
        _react2.default.createElement(
          'div',
          { className: 'sidebar-tabs' },
          _react2.default.createElement(
            'ul',
            { role: 'tablist' },
            '   ',
            toptabs.map(function (t) {
              return _this5.renderTab(t);
            })
          ),
          _react2.default.createElement(
            'ul',
            { role: 'tablist' },
            '   ',
            bottomtabs.map(function (t) {
              return _this5.renderTab(t);
            }),
            _react2.default.createElement(
              'li',
              { className: 'switcher-menu' },
              _react2.default.createElement(
                'a',
                { href: '#', onClick: function onClick(e) {
                    return _this5.onSwitchLargeMenu(e);
                  } },
                _react2.default.createElement('i', { className: switcherIcon })
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'sidebar-content' },
          this.renderPanes(this.props.children)
        )
      );
    }
  }]);

  return Sidebar;
}(_reactLeaflet.MapComponent);

Sidebar.propTypes = {
  id: _propTypes.PropTypes.string.isRequired,
  collapsed: _propTypes.PropTypes.bool,
  largeMenu: _propTypes.PropTypes.bool,
  position: _propTypes.PropTypes.oneOf(['left', 'right']),
  lected: _propTypes.PropTypes.string,
  closeIcon: _propTypes.PropTypes.oneOfType([_propTypes.PropTypes.string, _propTypes.PropTypes.element]).isRequired,
  onClose: _propTypes.PropTypes.func,
  onOpen: _propTypes.PropTypes.func,
  onSwitchLargeMenu: _propTypes.PropTypes.func,
  children: _propTypes.PropTypes.oneOfType([_propTypes.PropTypes.arrayOf(TabType), TabType]).isRequired
};
exports.Sidebar = Sidebar;
exports.Tab = Tab;