///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 - 2018 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/on',
  'jimu/BaseWidget',
  './ButtonGroup',
  'jimu/dijit/ViewStack',
  'esri/widgets/DirectLineMeasurement3D',
  'esri/widgets/AreaMeasurement3D',
  'esri/core/watchUtils'

], function (
  declare,
  lang,
  on,
  BaseWidget,
  ButtonGroup,
  ViewStack,
  DirectLineMeasurement3D,
  AreaMeasurement3D,
  watchUtils) {

  var clazz = declare([BaseWidget], {

    baseClass: 'jimu-widget-measurement',
    name: 'Measurement',
    MEASURE_TYPES: {
      DISTANCE: 'distance',
      AREA: 'area',
      LOCATION: 'location'
    },
    measureWidgets: {},
    selectedMeasureType: null,
    buttonGroup: null,

    CSS: {
      // CSS classes taken from API 4. This is only a temporary solution 
      //before all measurement widgets are available.
      clearButton: 'esri-direct-line-measurement-3d__clear-button'
    },

    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------

    postCreate: function () {
      this.inherited(arguments);
      this.measureWidgets = {};
      this.selectedMeasureType = null;
    },

    startup: function () {
      this.inherited(arguments);
      this.initUI();
    },

    destroy: function () {
      if (this.measureWidgets) {
        for (var widgetKey in this.measureWidgets) {
          if (this.measureWidgets.hasOwnProperty(widgetKey)) {
            var measurementWidget = this.measureWidgets[widgetKey];
            if (measurementWidget.destroy) {
              measurementWidget.destroy();
            }
          }
        }
      }
      if (this.buttonGroup && this.buttonGroup.destroy) {
        this.buttonGroup.destroy();
        this.buttonGroup = null;
      }
      this.selectedMeasureType = null;

      this.inherited(arguments);
    },

    onOpen: function () {
      this.activateWidget(this.selectedMeasureType);
    },

    onClose: function () {
      this.deactivateWidget(this.selectedMeasureType);
    },

    onActive: function () {
      this.onOpen();
    },

    onDeActive: function () {
      this.onClose();
    },

    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------

    _applyConfig: function (widget) {
      if (!(this.config && widget)) return;

      var configJson = this.config,
        measureType = widget.measureType,
        unitPropertyname, defaultUnitPropertyName;

      switch (measureType) {
        case this.MEASURE_TYPES.DISTANCE:
          unitPropertyname = 'lengthUnit';
          defaultUnitPropertyName = 'defaultLengthUnit';
          break;
        case this.MEASURE_TYPES.AREA:
          unitPropertyname = 'areaUnit';
          defaultUnitPropertyName = 'defaultAreaUnit';
          break;
      }
      if (configJson.measurement && configJson.measurement[unitPropertyname]) {
        widget.unit = configJson.measurement[unitPropertyname];
      } else if (configJson[defaultUnitPropertyName]) {
        widget.unit = configJson[defaultUnitPropertyName];
      }
      // else condition: let Esri widgets pick up the unit from user's profile
    },

    _createWidget: function (measureType) {
      // make sure the widget has been initialized
      var measureWidget = this._ensureWidget(measureType);
      this._applyConfig(measureWidget);
      return measureWidget;
    },

    _ensureWidget: function (measureType) {
      var measureWidget = this.getWidget(measureType);
      if (!measureWidget) {
        var measureWidgetContainer = document.createElement('div');
        if (measureType === this.MEASURE_TYPES.DISTANCE) {
          this.measureWidgets[measureType] = new DirectLineMeasurement3D({
            container: measureWidgetContainer,
            view: this.sceneView,
            measureType: measureType,
            visible: false
          });
        } else if (measureType === this.MEASURE_TYPES.AREA) {
          this.measureWidgets[measureType] = new AreaMeasurement3D({
            container: measureWidgetContainer,
            view: this.sceneView,
            measureType: measureType
          });
        }
        measureWidget = this.measureWidgets[measureType];
      }
      return measureWidget;
    },

    _initWidget: function (measureType) {
      var measureWidget = this.getWidget(measureType);
      // add the measurement widget if it has not been added yet
      if (!measureWidget) {
        measureWidget = this._createWidget(measureType);
        this._addtoViewStack(measureWidget);
      }
      // activate the selected measurement widget
      measureWidget.visible = true;
      // switch to the new view
      this.viewStack.switchView(measureType);
    },

    _addtoViewStack: function (widget) {
      if (!widget) return;

      var viewDiv = document.createElement('div');
      viewDiv.label = widget.measureType;
      viewDiv.appendChild(widget.domNode);
      this.viewStack.addView(viewDiv);
    },

    _initMeasurements: function (measureTypes) {
      if (!measureTypes) return;

      var buttons = [];
      if (measureTypes instanceof Array) {
        measureTypes.forEach(lang.hitch(this, function (m) {
          var icon = document.createElement('img');
          icon.title = m.value;
          icon.src = this._getMeasurementIconSource(m.value);

          buttons.push({
            value: m.value,
            icon: icon,
            content: m.label
          });
        }));
      }

      var buttonGroup = this.buttonGroup = new ButtonGroup({
        buttons: buttons,
        selected: null
      });

      buttonGroup.placeAt(this.headerNode);

      this.own(
        on(buttonGroup, 'Change', lang.hitch(this, function (newButton) {
          this._toggleWidgetSection(!!newButton);
          this._handleMeasureChanged();
        }))
      );
    },

    _handleMeasureChanged: function () {
      var newMeasureType = this.buttonGroup.getActiveButtonValue();

      // deactivate the current measurement widget first
      var measureWidget = this.getWidget(this.selectedMeasureType);
      if (measureWidget) {
        measureWidget.visible = false;
      }

      if (newMeasureType !== null) {
        this._initWidget(newMeasureType);
      }

      this.selectedMeasureType = newMeasureType;
    },

    _toggleWidgetSection: function (showWidgetSection) {
      if (showWidgetSection) {
        this.measurementNode.classList.remove('hidden');
        this.hintNode.classList.add('hidden');
      } else {
        this.measurementNode.classList.add('hidden');
        this.hintNode.classList.remove('hidden');
      }
    },

    _getMeasurementIconSource: function (measureType) {
      var iconSrc;
      switch (measureType) {
        case this.MEASURE_TYPES.DISTANCE:
          iconSrc = this.folderUrl + 'images/Measure_Distance16.png';
          break;
        case this.MEASURE_TYPES.AREA:
          iconSrc = this.folderUrl + 'images/Measure_Area16.png';
          break;
      }

      return iconSrc;
    },

    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------

    initUI: function () {
      var configJson = this.config,
        enabledMeasureTypes = [];

      this.viewStack = new ViewStack(null, this.measurementNode);

      if (configJson) {
        if (configJson.showArea) {
          enabledMeasureTypes.push({
            label: this.nls.area,
            value: this.MEASURE_TYPES.AREA
          });
        }
        if (configJson.showDistance) {
          enabledMeasureTypes.push({
            label: this.nls.distance,
            value: this.MEASURE_TYPES.DISTANCE
          });
        }
      }

      if (enabledMeasureTypes.length === 0) {
        return;
      }

      this._initMeasurements(enabledMeasureTypes);
    },

    activateWidget: function (measureType) {
      // var measureWidget = this.getWidget(measureType);
      // if (measureWidget && measureWidget.viewModel.tool.model.state !== 'initial') {
      //   measureWidget.viewModel.tool.activate();
      // }
    },

    deactivateWidget: function (measureType) {
      var measureWidget = this.getWidget(measureType);
      var activeButton = this.buttonGroup && this.buttonGroup.getActiveButton();

      if (measureWidget) {
        if (measureWidget.viewModel.tool.model.state !== 'measured') {
          activeButton && activeButton.click();
        } else {
          measureWidget.viewModel.tool._controller.deactivate();
          measureWidget.viewModel.tool._view._sceneView.cursor = null;
          // watch for the state change of the tool's model to activate the tool manually
          // when the "new measurement" button is clicked
          watchUtils.once(measureWidget.viewModel.tool.model, 'state', function (newState) {
            if (newState === 'initial') {
              measureWidget.viewModel.tool.activate();
            }
          });
        }
      }
    },

    getWidget: function (measureType) {
      return measureType && this.measureWidgets[measureType];
    }

  });

  return clazz;

});