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
    'dojo/Deferred',
    'dojo/on',
    'dojo/mouse',    
    'jimu/BaseWidgetSetting',
    'jimu/portalUtils',
    'dijit/_WidgetsInTemplateMixin',
    'dijit/Tooltip',    
    'dijit/form/Select',
    'jimu/dijit/CheckBox'
  ],
  function (
    declare,
    lang,
    Deferred,
    on,
    mouse,
    BaseWidgetSetting,
    portalUtils,
    _WidgetsInTemplateMixin,
    Tooltip) {

    return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {

      baseClass: 'jimu-widget-measurement-setting',

      startup: function () {
        this.inherited(arguments);

        if (!this.config.measurement) {
          this.config.measurement = {};
        }
        
        this._showToolsItems = [];
        Tooltip.position = "below";
        this._initShowToolItem(this.showArea);
        this._initShowToolItem(this.showDistance);
        // this._initShowToolItem(this.showLocation);

        this.setConfig(this.config);
      },

      setConfig: function (config) {
        if (!config) return;

        this.config = config;

        this._processConfig(config).then(lang.hitch(this, function (configJson) {
          // set length unit dropdown
          if (configJson.measurement && configJson.measurement.lengthUnit) {
            this.selectLengthUnit.set('value', configJson.measurement.lengthUnit);
          } else {
            this.selectLengthUnit.set('value', configJson.defaultLengthUnit);
          }
          // set area unit dropdown
          if (configJson.measurement && configJson.measurement.areaUnit) {
            this.selectAreaUnit.set('value', configJson.measurement.areaUnit);
          } else {
            this.selectAreaUnit.set('value', configJson.defaultAreaUnit);
          }

          this.showDistance.setValue(configJson.showDistance);
          this.showArea.setValue(configJson.showArea);
        }));


      },

      getConfig: function () {
        this.config.measurement.lengthUnit = this.selectLengthUnit.value;
        this.config.measurement.areaUnit = this.selectAreaUnit.value;

        this.config.showArea = this.showArea.checked;
        this.config.showDistance = this.showDistance.checked;

        return this.config;
      },

      _initShowToolItem: function(item) {
        if (item) {
          item.setValue(true);
          this._showToolsItems.push(item);
          this.own(on(item, 'change', lang.hitch(this, this._onShowToolItemsChange, item)));
        }
      },

      _onShowToolItemsChange: function(obj) {
        if (obj) {
          if (false === obj.checked && this._isItemsAllHide()) {
            obj.check();
            Tooltip.hide();
            Tooltip.show(this.nls.allHidedTips, obj.domNode);
            this.own(on.once(obj.domNode, mouse.leave,
              lang.hitch(this, function() {
                Tooltip.hide(obj.domNode);
              }))
            );
          }
        }
      },

      _isItemsAllHide: function() {
        for (var i = 0, len = this._showToolsItems.length; i < len; i++) {
          var item = this._showToolsItems[i];
          if (true === item.checked) {
            return false;
          }
        }
        return true;
      },

      _processConfig: function (configJson) {
        var def = new Deferred();
        if (configJson.defaultLengthUnit && configJson.defaultAreaUnit) {
          def.resolve(configJson);
        } else {
          portalUtils.getUnits(this.appConfig.portalUrl).then(function (units) {
            configJson.defaultAreaUnit = configJson.defaultLengthUnit =
              units === 'english' ? 'imperial' : 'metric';
            def.resolve(configJson);
          });
        }

        return def;
      }

    });
  });