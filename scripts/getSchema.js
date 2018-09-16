import fetch from 'node-fetch';
var argv = require('minimist')(process.argv.slice(2));
import chalk from 'chalk';
import {
  buildClientSchema,
  introspectionQuery,
  printSchema,
} from 'graphql/utilities';

const log = console.log;
const errror = console.error;

const usage = ` Usage: getSchema ENDPOINT_URL > schema.graphql`;

async function main() {

  if (argv._.length < 1) {
    log(chalk.blue(usage));
    return;
  }

  const endpoint = argv._[0]

  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 'query': introspectionQuery }),
  })
  .then(res => res.json())
    .then(res => {
      const schemaString = printSchema(buildClientSchema(res.data));
      log( schemaString );
    });
}

main().catch( e => error(e) );
