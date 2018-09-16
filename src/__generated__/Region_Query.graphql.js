/**
 * @flow
 * @relayHash 3559ff11ac49dd2cb1f07a20117f83b4
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type SummaryKind = "CROSS" | "IN" | "OUT" | "PASSENGERS" | "%future added value";
export type Region_QueryVariables = {|
  regionId: number,
  from: any,
  till: any,
|};
export type Region_QueryResponse = {|
  +region: ?{|
    +summaries: ?$ReadOnlyArray<{|
      +id: string,
      +kind: SummaryKind,
      +value: number,
    |}>
  |}
|};
export type Region_Query = {|
  variables: Region_QueryVariables,
  response: Region_QueryResponse,
|};
*/


/*
query Region_Query(
  $regionId: Int!
  $from: Date!
  $till: Date!
) {
  region(objectId: $regionId) {
    summaries(from: $from, till: $till) {
      id
      kind
      value
    }
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "regionId",
    "type": "Int!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "from",
    "type": "Date!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "till",
    "type": "Date!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "objectId",
    "variableName": "regionId",
    "type": "Int!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "summaries",
  "storageKey": null,
  "args": [
    {
      "kind": "Variable",
      "name": "from",
      "variableName": "from",
      "type": "Date!"
    },
    {
      "kind": "Variable",
      "name": "till",
      "variableName": "till",
      "type": "Date!"
    }
  ],
  "concreteType": "Summary",
  "plural": true,
  "selections": [
    v2,
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "kind",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "value",
      "args": null,
      "storageKey": null
    }
  ]
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "Region_Query",
  "id": null,
  "text": "query Region_Query(\n  $regionId: Int!\n  $from: Date!\n  $till: Date!\n) {\n  region(objectId: $regionId) {\n    summaries(from: $from, till: $till) {\n      id\n      kind\n      value\n    }\n    id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "Region_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "region",
        "storageKey": null,
        "args": v1,
        "concreteType": "Region",
        "plural": false,
        "selections": [
          v3
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "Region_Query",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "region",
        "storageKey": null,
        "args": v1,
        "concreteType": "Region",
        "plural": false,
        "selections": [
          v3,
          v2
        ]
      }
    ]
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '9cb0b157f83d6f25833b5b00ff1e98db';
module.exports = node;
