# PostAPL Mermaid Graph

[![NPM Version][npm-img]][npm-url]

[PostAPL Mermaid Graph] is a [PostAPL] plugin that creates graph data for [Mermaid Live Editor] of the Component tree of your APL or of the AST.

## Input / Output

The plugin is of type Reporter that does not transform the APL in any way.

## Examples

You can find example reports [here](https://github.com/postapl/postapl-mermaid-graph/blob/main/example).

## Usage

**Step 1:** Install plugin:

```sh
npm install --save-dev postapl postapl-mermaid-graph
```

**Step 2:** Use:

```js
'use strict'

const { postapl } = require('postapl');
const graph = require('postapl-mermaid-graph');
const fs = require('fs');

fs.readFile('src/screen.json', (err, apl) => {
  postapl([graph({ componentGraphPath: 'report/screen.componentTree.txt' })])
    .process(apl, { from: 'src/screen.json', to: 'dest/screen.json' })
    .then(result => {
      fs.writeFile(result.opts.to, result.apl, () => true)
    })
});
```


## Options

* `componentGraphPath` - When set, the path to write the graph file for Components. When set to `##messages:myComponentKey` no file is written but the data can be found in `result.messages` as:

  ```js
  {
    type: 'output',
    id: 'myComponentKey',
    plugin: 'postapl-mermaid-graph',
    value: string // the graph data
  }
  ```
* `treeGraphPath` - When set, the path to write the graph file for AST. When set to `##messages:myTreeKey` no file is written but the data can be found in `result.messages` as:

  ```js
  {
    type: 'output',
    id: 'myTreeKey',
    plugin: 'postapl-mermaid-graph',
    value: string // the graph data
  }
  ```


[npm-img]: https://img.shields.io/npm/v/postapl-mermaid-graph.svg
[npm-url]: https://www.npmjs.com/package/postapl-mermaid-graph

[PostAPL]: https://github.com/postapl/postapl
[PostAPL Mermaid Graph]: https://github.com/postapl/postapl-mermaid-graph
[Mermaid Live Editor]: https://mermaid.live
