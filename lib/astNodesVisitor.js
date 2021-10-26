'use strict'

const { Visitor, nodeTypes } = require('postapl');

class AstNodesVisitor extends Visitor {
  constructor(nodes, edges) {
    super();
    this.nodes = nodes;
    this.edges = edges;
    this.ids = [];

  }

  node(node) {
    const id = this.getId(node);

    let display = '';

    if (node.type === nodeTypes.PROPERTY) {
      display = `${id}[${node.type} <br /> '${node.path}']`;
    } else {
      display = `${id}[${node.type}]`
    }

    if (node.parent) {
      if (node.parent.type === nodeTypes.ARRAY) {
        display = `${id}[${node.type} <br /> '${node.path}']`;
      }

      const parentId = this.getId(node.parent);
      this.edges.push(`${parentId} ---> ${id}`);
    }

    this.nodes.push(display);
  }

  getId(node) {
    let temp;
    if (node.path) {
      temp = `${node.type}.${node.path}`;
    } else {
      temp = node.type
    }

    let index = this.ids.indexOf(temp);
    if (index === -1) {
      index = this.ids.length;
      this.ids.push(temp);
    }

    return 'N' + index;
  }

};

module.exports = AstNodesVisitor;
