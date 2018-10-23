import axios from 'axios';
var argv = require('minimist')(process.argv.slice(2));
import chalk from 'chalk';
var term = require( 'terminal-kit' ).terminal;
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

  const res = await axios.post(endpoint,
    JSON.stringify({ 'query': introspectionQuery }),
    {
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      responseType: 'json',
      auth: {
          username: 'timon',
          password: '316497*9'
      }
    }
  );

  const schemaString = printSchema(buildClientSchema(res.data.data));
  log( schemaString );
}

main().catch( e => {

  e.response.data.errors.map( _error => {
    error(_error.message);
  });
  process.exitCode = 1;

});
