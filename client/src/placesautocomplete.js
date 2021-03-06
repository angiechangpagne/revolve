'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultStyles = {
  autocompleteContainer: {
    position: 'relative',
    paddingBottom: '0px'
  },
  autocompleteWrapper: {
    position: 'absolute',
    top: '100%',
    backgroundColor: 'white',
    border: '1px solid #555',
    width: '100%'
  },
  autocompleteItem: {
    padding: '10px',
    color: '#555',
    cursor: 'pointer'
  }
};

var PlacesAutocomplete = function (_React$Component) {
  _inherits(PlacesAutocomplete, _React$Component);

  function PlacesAutocomplete(props) {
    _classCallCheck(this, PlacesAutocomplete);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PlacesAutocomplete).call(this, props));

    _this.state = {
      autocompleteItems: []
    };

    _this.autocompleteCallback = _this.autocompleteCallback.bind(_this);
    _this.handleAddressKeyDown = _this.handleAddressKeyDown.bind(_this);
    _this.handleAddressChange = _this.handleAddressChange.bind(_this);
    return _this;
  }

  _createClass(PlacesAutocomplete, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.autocompleteService = new google.maps.places.AutocompleteService();
      this.autocompleteOK = google.maps.places.PlacesServiceStatus.OK;
    }
  }, {
    key: 'autocompleteCallback',
    value: function autocompleteCallback(predictions, status) {
      if (status != this.autocompleteOK) {
        console.error('place autocomplete failed');return;
      }
      this.setState({
        autocompleteItems: predictions.map(function (p, idx) {
          return {
            suggestion: p.description,
            placeId: p.place_id,
            active: false,
            index: idx
          };
        })
      });
    }
  }, {
    key: 'clearAutocomplete',
    value: function clearAutocomplete() {
      this.setState({ autocompleteItems: [] });
    }
  }, {
    key: 'selectAddress',
    value: function selectAddress(address) {
      this.clearAutocomplete();
      this.props.setAddress(address);
    }
  }, {
    key: '_setActiveItem',
    value: function _setActiveItem(index) {
      var activeName = this.state.autocompleteItems.find(function (item) {
        return item.index === index;
      }).suggestion;
      this.setState({
        autocompleteItems: this.state.autocompleteItems.map(function (item, idx) {
          if (idx === index) {
            return _extends({}, item, { active: true });
          } else {
            return _extends({}, item, { active: false });
          }
        })
      });
      this.props.setAddress(activeName);
    }
  }, {
    key: '_handleEnterKey',
    value: function _handleEnterKey() {
      var activeItem = this.state.autocompleteItems.find(function (item) {
        return item.active;
      });
      if (activeItem === undefined) {
        return;
      }

      this.clearAutocomplete();
      this.props.setAddress(activeItem.suggestion);
    }
  }, {
    key: '_handleDownKey',
    value: function _handleDownKey() {
      var activeItem = this.state.autocompleteItems.find(function (item) {
        return item.active;
      });
      if (activeItem === undefined) {
        this._setActiveItem(0);
      } else {
        var nextId = (activeItem.index + 1) % this.state.autocompleteItems.length;
        this._setActiveItem(nextId);
      }
    }
  }, {
    key: '_handleUpKey',
    value: function _handleUpKey() {
      var activeItem = this.state.autocompleteItems.find(function (item) {
        return item.active;
      });
      if (activeItem === undefined) {
        this._setActiveItem(this.state.autocompleteItems.length - 1);
      } else {
        var prevId = void 0;
        if (activeItem.index === 0) {
          prevId = this.state.autocompleteItems.length - 1;
        } else {
          prevId = (activeItem.index - 1) % this.state.autocompleteItems.length;
        }
        this._setActiveItem(prevId);
      }
    }
  }, {
    key: 'handleAddressKeyDown',
    value: function handleAddressKeyDown(event) {
      var ARROW_UP = 38;
      var ARROW_DOWN = 40;
      var ENTER_KEY = 13;

      switch (event.keyCode) {
        case ENTER_KEY:
          this._handleEnterKey();
          break;
        case ARROW_DOWN:
          this._handleDownKey();
          break;
        case ARROW_UP:
          this._handleUpKey();
          break;
      }
    }
  }, {
    key: 'handleItemMouseOver',
    value: function handleItemMouseOver(index) {
      this.setState({
        autocompleteItems: this.state.autocompleteItems.map(function (item, idx) {
          if (idx === index) {
            return _extends({}, item, { active: true });
          } else {
            return _extends({}, item, { active: false });
          }
        })
      });
    }
  }, {
    key: 'handleAddressChange',
    value: function handleAddressChange(event) {
      this.props.setAddress(event.target.value);
      if (!event.target.value) {
        this.clearAutocomplete();
        return;
      }
      this.autocompleteService.getPlacePredictions({ input: event.target.value }, this.autocompleteCallback);
    }

    // TODO: this should be customizable.

  }, {
    key: 'autocompleteItemStyle',
    value: function autocompleteItemStyle(active) {
      if (active) {
        return { backgroundColor: '#fafafa' };
      } else {
        return { backgroundColor: '#ffffff' };
      }
    }
  }, {
    key: 'renderLabel',
    value: function renderLabel() {
      if (this.props.hideLabel) {
        return null;
      }
      return _react2.default.createElement(
        'label',
        { className: this.props.classNames.label || '' },
        'Location'
      );
    }
  }, {
    key: 'renderAutocomplete',
    value: function renderAutocomplete() {
      var _this2 = this;

      var autocompleteItems = this.state.autocompleteItems;

      if (autocompleteItems.length === 0) {
        return null;
      }
      return _react2.default.createElement(
        'div',
        {
          id: 'PlacesAutocomplete__autocomplete-container',
          className: this.props.classNames.autocompleteContainer || '',
          style: defaultStyles.autocompleteWrapper },
        autocompleteItems.map(function (p, idx) {
          return _react2.default.createElement(
            'div',
            {
              key: p.placeId,
              onMouseOver: function onMouseOver() {
                return _this2.handleItemMouseOver(p.index);
              },
              onClick: function onClick() {
                return _this2.selectAddress(p.suggestion);
              },
              style: _extends({}, _this2.autocompleteItemStyle(p.active), defaultStyles.autocompleteItem) },
            _this2.props.autocompleteItem({ suggestion: p.suggestion })
          );
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var classNames = _props.classNames;
      var placeholder = _props.placeholder;
      var value = _props.value;

      return _react2.default.createElement(
        'fieldset',
        {
          style: defaultStyles.autocompleteContainer,
          className: classNames.container || ''
        },
        this.renderLabel(),
        _react2.default.createElement('input', {
          type: 'text',
          placeholder: placeholder,
          className: classNames.input || '',
          value: value,
          onChange: this.handleAddressChange,
          onKeyDown: this.handleAddressKeyDown
        }),
        this.renderAutocomplete()
      );
    }
  }]);

  return PlacesAutocomplete;
}(_react2.default.Component);

PlacesAutocomplete.propTypes = {
  value: _react2.default.PropTypes.string.isRequired,
  setAddress: _react2.default.PropTypes.func.isRequired,
  placeholder: _react2.default.PropTypes.string,
  hideLabel: _react2.default.PropTypes.bool,
  autocompleteItem: _react2.default.PropTypes.func,
  classNames: _react2.default.PropTypes.shape({
    container: _react2.default.PropTypes.string,
    label: _react2.default.PropTypes.string,
    input: _react2.default.PropTypes.string,
    autocompleteContainer: _react2.default.PropTypes.string
  })
};

PlacesAutocomplete.defaultProps = {
  placeholder: 'Address',
  hideLabel: false,
  classNames: {},
  autocompleteItem: function autocompleteItem(_ref) {
    var suggestion = _ref.suggestion;
    return _react2.default.createElement(
      'div',
      null,
      suggestion
    );
  }
};

exports.default = PlacesAutocomplete;