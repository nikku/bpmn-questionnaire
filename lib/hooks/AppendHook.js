'use strict';

// bpmn-js
var BpmnViewer = require('bpmn-js');

/**
 * Hook that runs after a virtual DOM node has been turned into a DOM node.
 */
var AppendHook = function(diagram) {
  this.diagram = diagram;
};

AppendHook.prototype.hook = function hook(node) {

  var that = this;

  if(!this.diagram.element.children.length) {

    // Import
    this.diagram.viewer = new BpmnViewer({container: this.diagram.element});

    this.diagram.viewer.importXML(this.diagram.xml, function(err) {

      if (!err) {
        that.diagram.viewer.get('canvas').zoom('fit-viewport');

        // Adjust height of container element
        var height = that.diagram.viewer.get('canvas')._svg.getBBox().height;

        that.diagram.element.style.height = height + 100 + 'px';
        that.diagram.element.closest('ul').style.height = height + 100 + 'px';

      } else {
        throw new Error('Failed to load diagram', err);
      }

      if(that.diagram.options.interactive === true) {
        that.diagram.addInteraction();
      }

    });

  }

  node.appendChild(this.diagram.element);

};

module.exports = AppendHook;
