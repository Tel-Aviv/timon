/**
 * @flow
 * @relayHash becf3483360dbde91284d471d365bfe1
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
      +kind: SummaryKind,
      +value: number,
    |}>,
    +center: ?{|
      +lat: ?number,
      +lon: ?number,
    |},
    +cameras: ?$ReadOnlyArray<?{|
      +objectId: ?number,
      +name: string,
      +location: {|
        +lat: ?number,
        +lon: ?number,
      |},
    |}>,
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
      kind
      value
      id
    }
    center {
      lat
      lon
    }
    cameras {
      objectId
      name
      location {
        lat
        lon
      }
      id
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
v2 = [
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
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "kind",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "value",
  "args": null,
  "storageKey": null
},
v5 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "lat",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "lon",
    "args": null,
    "storageKey": null
  }
],
v6 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "center",
  "storageKey": null,
  "args": null,
  "concreteType": "GeoCenter",
  "plural": false,
  "selections": v5
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "objectId",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "location",
  "storageKey": null,
  "args": null,
  "concreteType": "GeoCenter",
  "plural": false,
  "selections": v5
},
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "Region_Query",
  "id": null,
  "text": "query Region_Query(\n  $regionId: Int!\n  $from: Date!\n  $till: Date!\n) {\n  region(objectId: $regionId) {\n    summaries(from: $from, till: $till) {\n      kind\n      value\n      id\n    }\n    center {\n      lat\n      lon\n    }\n    cameras {\n      objectId\n      name\n      location {\n        lat\n        lon\n      }\n      id\n    }\n    id\n  }\n}\n",
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
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "summaries",
            "storageKey": null,
            "args": v2,
            "concreteType": "Summary",
            "plural": true,
            "selections": [
              v3,
              v4
            ]
          },
          v6,
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "cameras",
            "storageKey": null,
            "args": null,
            "concreteType": "Camera",
            "plural": true,
            "selections": [
              v7,
              v8,
              v9
            ]
          }
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
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "summaries",
            "storageKey": null,
            "args": v2,
            "concreteType": "Summary",
            "plural": true,
            "selections": [
              v3,
              v4,
              v10
            ]
          },
          v6,
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "cameras",
            "storageKey": null,
            "args": null,
            "concreteType": "Camera",
            "plural": true,
            "selections": [
              v7,
              v8,
              v9,
              v10
            ]
          },
          v10
        ]
      }
    ]
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'fe3bd721a2eb682163efbd13eadd7e8e';
module.exports = node;
