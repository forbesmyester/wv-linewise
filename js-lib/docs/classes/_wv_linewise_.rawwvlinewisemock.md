[wv-linewise-js-lib](../README.md) › ["wv-linewise"](../modules/_wv_linewise_.md) › [RawWvLinewiseMock](_wv_linewise_.rawwvlinewisemock.md)

# Class: RawWvLinewiseMock

## Hierarchy

* [RawWvLinewise](_wv_linewise_.rawwvlinewise.md)

  ↳ **RawWvLinewiseMock**

## Index

### Constructors

* [constructor](_wv_linewise_.rawwvlinewisemock.md#constructor)

### Properties

* [params](_wv_linewise_.rawwvlinewisemock.md#private-params)
* [running](_wv_linewise_.rawwvlinewisemock.md#private-running)
* [started](_wv_linewise_.rawwvlinewisemock.md#private-started)
* [startedCounts](_wv_linewise_.rawwvlinewisemock.md#private-startedcounts)
* [streamData](_wv_linewise_.rawwvlinewisemock.md#private-streamdata)

### Methods

* [addParam](_wv_linewise_.rawwvlinewisemock.md#addparam)
* [addStreamData](_wv_linewise_.rawwvlinewisemock.md#addstreamdata)
* [clear](_wv_linewise_.rawwvlinewisemock.md#clear)
* [fire](_wv_linewise_.rawwvlinewisemock.md#protected-fire)
* [off](_wv_linewise_.rawwvlinewisemock.md#off)
* [on](_wv_linewise_.rawwvlinewisemock.md#on)
* [once](_wv_linewise_.rawwvlinewisemock.md#once)
* [request](_wv_linewise_.rawwvlinewisemock.md#request)
* [start](_wv_linewise_.rawwvlinewisemock.md#start)

## Constructors

###  constructor

\+ **new RawWvLinewiseMock**(): *[RawWvLinewiseMock](_wv_linewise_.rawwvlinewisemock.md)*

*Overrides [RawWvLinewise](_wv_linewise_.rawwvlinewise.md).[constructor](_wv_linewise_.rawwvlinewise.md#constructor)*

Defined in wv-linewise.ts:285

**Returns:** *[RawWvLinewiseMock](_wv_linewise_.rawwvlinewisemock.md)*

## Properties

### `Private` params

• **params**: *[Param](../interfaces/_wv_linewise_.param.md)[]* = []

Defined in wv-linewise.ts:282

___

### `Private` running

• **running**: *Set‹StreamStartRequest["name"]›* = new Set()

Defined in wv-linewise.ts:283

___

### `Private` started

• **started**: *Set‹StreamStartRequest["name"]›* = new Set()

Defined in wv-linewise.ts:284

___

### `Private` startedCounts

• **startedCounts**: *Map‹LineResponse["name"], number›* = new Map()

Defined in wv-linewise.ts:285

___

### `Private` streamData

• **streamData**: *Map‹LineResponse["name"], LineResponse["data"][]›* = new Map()

Defined in wv-linewise.ts:281

## Methods

###  addParam

▸ **addParam**(`name`: Param["name"], `value`: Param["value"]): *void*

Defined in wv-linewise.ts:298

**Parameters:**

Name | Type |
------ | ------ |
`name` | Param["name"] |
`value` | Param["value"] |

**Returns:** *void*

___

###  addStreamData

▸ **addStreamData**(`streamName`: LineResponse["name"], `data`: LineResponse["data"][]): *void*

Defined in wv-linewise.ts:291

**Parameters:**

Name | Type |
------ | ------ |
`streamName` | LineResponse["name"] |
`data` | LineResponse["data"][] |

**Returns:** *void*

___

###  clear

▸ **clear**‹**T**›(`type`: T["type"]): *void*

*Inherited from [RawWvLinewise](_wv_linewise_.rawwvlinewise.md).[clear](_wv_linewise_.rawwvlinewise.md#clear)*

Defined in wv-linewise.ts:257

**Type parameters:**

▪ **T**: *[Response](../modules/_wv_linewise_.md#response)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | T["type"] |

**Returns:** *void*

___

### `Protected` fire

▸ **fire**(`d`: [Response](../modules/_wv_linewise_.md#response)): *void*

*Inherited from [RawWvLinewise](_wv_linewise_.rawwvlinewise.md).[fire](_wv_linewise_.rawwvlinewise.md#protected-fire)*

Defined in wv-linewise.ts:235

**Parameters:**

Name | Type |
------ | ------ |
`d` | [Response](../modules/_wv_linewise_.md#response) |

**Returns:** *void*

___

###  off

▸ **off**‹**T**›(`type`: T["type"], `f`: [ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹T›): *void*

*Inherited from [RawWvLinewise](_wv_linewise_.rawwvlinewise.md).[off](_wv_linewise_.rawwvlinewise.md#off)*

Defined in wv-linewise.ts:262

**Type parameters:**

▪ **T**: *[Response](../modules/_wv_linewise_.md#response)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | T["type"] |
`f` | [ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹T› |

**Returns:** *void*

___

###  on

▸ **on**‹**T**›(`type`: T["type"], `f`: [ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹T›): *void*

*Inherited from [RawWvLinewise](_wv_linewise_.rawwvlinewise.md).[on](_wv_linewise_.rawwvlinewise.md#on)*

Defined in wv-linewise.ts:249

**Type parameters:**

▪ **T**: *[Response](../modules/_wv_linewise_.md#response)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | T["type"] |
`f` | [ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹T› |

**Returns:** *void*

___

###  once

▸ **once**‹**T**›(`type`: T["type"], `f`: [ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹T›): *void*

*Inherited from [RawWvLinewise](_wv_linewise_.rawwvlinewise.md).[once](_wv_linewise_.rawwvlinewise.md#once)*

Defined in wv-linewise.ts:253

**Type parameters:**

▪ **T**: *[Response](../modules/_wv_linewise_.md#response)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | T["type"] |
`f` | [ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹T› |

**Returns:** *void*

___

###  request

▸ **request**(`j`: [Request](../modules/_wv_linewise_.md#request)): *Promise‹void›*

*Overrides [RawWvLinewise](_wv_linewise_.rawwvlinewise.md).[request](_wv_linewise_.rawwvlinewise.md#request)*

Defined in wv-linewise.ts:323

**Parameters:**

Name | Type |
------ | ------ |
`j` | [Request](../modules/_wv_linewise_.md#request) |

**Returns:** *Promise‹void›*

___

###  start

▸ **start**(`name`: string, `count`: number): *Promise‹void›*

Defined in wv-linewise.ts:302

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`count` | number |

**Returns:** *Promise‹void›*
