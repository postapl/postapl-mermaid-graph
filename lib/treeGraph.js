'use strict'

const AstNodesVisitor = require('./astNodesVisitor');
const fs = require('fs');

class TreeGraph {
  constructor(result, treeGraphPath, pluginName) {
    this.result = result;
    this.treeGraphPath = treeGraphPath;
    this.pluginName = pluginName;
  }

  execute() {
    const nodes = [];
    const edges = [];
    const code = [];
    code.push('graph LR')

    const visitor = new AstNodesVisitor(nodes, edges);
    this.result.root.accept(visitor);

    const result = code.concat(nodes, edges).join('\n');

    if (this.treeGraphPath.startsWith('##messages:')) {
      // save to messages
      const parts = this.treeGraphPath.split(':');
      const id = parts[1];

      this.result.messages.push({
        type: 'output',
        id,
        plugin: this.pluginName,
        value: result
      });
    } else {
      // write to file
      fs.writeFile(this.treeGraphPath, result, () => true)
    }
  }
}

module.exports = TreeGraph;
