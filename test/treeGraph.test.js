let { postapl } = require('postapl');
const fs = require('fs');

let plugin = require('../lib/plugin')
const data = require('./screen.json')

async function run(input, output, opts, id, graphCode) {
  input = JSON.stringify(input, null, 2);
  output = JSON.stringify(output, null, 2);

  let result = await postapl([plugin(opts)]).process(input, { from: undefined })
  expect(result.apl).toEqual(output)
  expect(result.warnings()).toHaveLength(0)

  if (id) {
    expect(result.messages).toHaveLength(1);
    expect(result.messages[0].id).toEqual(id);
    expect(result.messages[0].value).toEqual(graphCode);
  }
}

it.skip('create tree graph code in messages', async () => {
  // const data = {
  //   "key1": "",
  //   "key2": "value2"
  // }

  const graph = fs.readFileSync('./test/screen.treeGraph.txt');

  await run(data, data, {treeGraphPath: '##messages:foo'}, 'foo', graph.toString());
})

it('create tree graph code as file', async () => {
  // const data = {
  //   "key1": "",
  //   "key2": "value2"
  // }
  await run(data, data, {treeGraphPath: './test/output/screen.treeGraph.txt'});
})
