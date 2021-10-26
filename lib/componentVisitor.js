'use strict'

const { Visitor, pluginTools } = require('postapl');

class ComponentVisitor extends Visitor {
  constructor(nodes, edges) {
    super();
    this.nodes = nodes;
    this.edges = edges;
    this.ids = [];
  }

  object(objectNode) {
    const segments = objectNode.path.split('.');
    const isItem = segments[segments.length - 1] === 'item';
    const isItems = segments[segments.length - 2] === 'items'
    if (pluginTools.isComponent(objectNode) && (isItem || isItems)) {
      const id = this.getId(objectNode);
      const typePropNode = objectNode.properties.find(p => p.key.value === 'type');
      const idPropNode = objectNode.properties.find(p => p.key.value === 'id');
      let display = '';

      if (idPropNode) {
        display = `${id}[${typePropNode.value.value} <br /> id:'${idPropNode.value.value}']`;
      } else {
        display = `${id}[${typePropNode.value.value}]`;
      }

      if (this.nodes.length > 0) {
        let parentId;
        if (isItems) {
          parentId = this.getId(objectNode.parent.parent.parent);
        } else {
          parentId = this.getId(objectNode.parent.parent);
        }
        this.edges.push(`${parentId} ---> ${id}`);
      }

      this.nodes.push(display);
    }
  }

  getId(node) {
    let temp = node.path ? node.path : 'x';

    let index = this.ids.indexOf(temp);
    if (index === -1) {
      index = this.ids.length;
      this.ids.push(temp);
    }

    return 'N' + index;
  }
};

module.exports = ComponentVisitor;
