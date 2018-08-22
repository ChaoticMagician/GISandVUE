define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/_base/array',
  'dojo/query',
  'dojo/dom-class',
  'dojo/on',
  'dijit/_WidgetBase'
],
function(declare, lang, array, query, domClass, on, _WidgetBase){
  return declare([_WidgetBase], {
    baseClass: 'jimu-button-group',
    CSS: {
      ACTIVE: 'jimu-state-active'
    },
    buttons: [],
    activeButton: null,

    postCreate: function(){
      this.inherited(arguments);
      this._initUI();
    },

    buttonClicked: function(button) {
      if(this.activeButton === button) {
        // deactivate the button UI
        domClass.remove(button, this.CSS.ACTIVE);
        this.activeButton = null;
      } else {
        // activate the button UI
        query('button', this.domNode).removeClass(this.CSS.ACTIVE);
        domClass.add(button, this.CSS.ACTIVE);
        this.activeButton = button;
      }
      this.onChange(this.activeButton);
    },

    getActiveButton: function() {
      return this.activeButton;
    },

    getActiveButtonValue: function() {
      var activeButton = this.getActiveButton();
      return activeButton && activeButton.getAttribute('data-value');
    },

    _initUI:function(){
      array.forEach(this.buttons, function(buttonConfig){
        this._createButton(buttonConfig);
      }, this);
    },

    _createButton:function(buttonConfig) {
      var buttonElem = document.createElement('button');
      buttonElem.type = 'button';
      buttonElem.title = buttonConfig.value;
      buttonElem.setAttribute('data-value', buttonConfig.value);
      if(buttonConfig.icon) {
        buttonElem.appendChild(buttonConfig.icon);
      }
      buttonElem.appendChild(document.createTextNode(buttonConfig.content || buttonConfig.value));
      this.domNode.appendChild(buttonElem);

      this.own(on(buttonElem, 'click', lang.hitch(this, function(evt) {
        this.buttonClicked(evt.target);
      })));
    },

    onChange: function() {}

  });
});