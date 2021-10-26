'use strict'

const TreeGraph = require('./treeGraph');
const ComponentGraph = require('./componentGraph');

const PLUGIN_NAME = 'postapl-mermaid-graph';

// plugin
module.exports = (opts = {}) => {
  const treeGraphPath = opts.treeGraphPath || ''
  const componentGraphPath = opts.componentGraphPath || ''

  return {
    postaplPlugin: PLUGIN_NAME,
    async process(result) {

      if (treeGraphPath) {
        const treeGraph = new TreeGraph(result, treeGraphPath, PLUGIN_NAME);
        treeGraph.execute();
      }

      if (componentGraphPath) {
        const componentGraph = new ComponentGraph(result, componentGraphPath, PLUGIN_NAME);
        componentGraph.execute();
      }

    }
  }
}
module.exports.postapl = true
