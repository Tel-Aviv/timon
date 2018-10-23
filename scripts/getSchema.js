import fetch from 'node-fetch';
var argv = require('minimist')(process.argv.slice(2));
import chalk from 'chalk';
import {
  buildClientSchema,
  introspectionQuery,
  printSchema,
} from 'graphql/utilities';

const log = console.log;
const error = console.error;

const usage = ` Usage: getSchema ENDPOINT_URL > schema.graphql`;

async function main() {

  if (argv._.length < 1) {
    log(chalk.blue(usage));
    return;
  }

  const endpoint = argv._[0]

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": "Basic dGltb246MzE2NDk3Kjk="
    },
    body: JSON.stringify({ 'query': introspectionQuery }),
  });
  const _res = await res.json();
  if( _res.errors ) {
    _res.errors.map( _error => {
      error(chalk.red(_error.message));
      process.exitCode = 1;
    });
  } else {
    const schemaString = printSchema(buildClientSchema(_res.data));
    log( schemaString );
  }
}

main().catch( e => error(e) );
