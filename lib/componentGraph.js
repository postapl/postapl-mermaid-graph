'use strict'

const ComponentVisitor = require('./componentVisitor');
const { pluginTools } = require('postapl');
const fs = require('fs');

class ComponentGraph {
  constructor(result, componentGraphPath, pluginName) {
    this.result = result;
    this.componentGraphPath = componentGraphPath;
    this.pluginName = pluginName;
  }

  execute() {
    let code = [];
    code.push('graph');

    let nodes = [];
    let edges = [];

    const visitor = new ComponentVisitor(nodes, edges);

    // graph for APL mainTemplate
    const mainTemplateNode = pluginTools.findNode(this.result.root, 'mainTemplate');
    if (mainTemplateNode) {
      // const visitor = new ComponentVisitor(nodes, edges);
      mainTemplateNode.accept(visitor);

      if (nodes.length > 0) {
        code.push('subgraph mainTemplate');
        code = code.concat(nodes, edges);
        code.push('end');
      }
    }


    // graph for APL layouts
    const layoutsNode = pluginTools.findNode(this.result.root, 'layouts');

    if (layoutsNode) {
      nodes = [];
      edges = [];

      // const visitor = new ComponentVisitor(nodes, edges);
      layoutsNode.accept(visitor);

      if (nodes.length > 0) {
        code.push('subgraph layouts');
        code = code.concat(nodes, edges);
        code.push('end');
      }
    }

    const result = code.join('\n');

    if (this.componentGraphPath.startsWith('##messages:')) {
      // save to messages
      const parts = this.componentGraphPath.split(':');
      const id = parts[1];

      this.result.messages.push({
        type: 'output',
        id,
        plugin: this.pluginName,
        value: result
      });
    } else {
      // write to file
      fs.writeFile(this.componentGraphPath, result, () => true)
    }
  }
}

module.exports = ComponentGraph;
