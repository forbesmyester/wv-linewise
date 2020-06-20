[wv-linewise-js-lib](../README.md) › ["wv-linewise"](../modules/_wv_linewise_.md) › [WvLinewise](_wv_linewise_.wvlinewise.md)

# Class: WvLinewise

## Hierarchy

* **WvLinewise**

## Index

### Constructors

* [constructor](_wv_linewise_.wvlinewise.md#constructor)

### Properties

* [raw](_wv_linewise_.wvlinewise.md#raw)

### Methods

* [clear](_wv_linewise_.wvlinewise.md#clear)
* [exit](_wv_linewise_.wvlinewise.md#exit)
* [off](_wv_linewise_.wvlinewise.md#off)
* [on](_wv_linewise_.wvlinewise.md#on)
* [once](_wv_linewise_.wvlinewise.md#once)
* [out](_wv_linewise_.wvlinewise.md#out)
* [requestParams](_wv_linewise_.wvlinewise.md#requestparams)
* [requestStreamList](_wv_linewise_.wvlinewise.md#requeststreamlist)
* [streamContinue](_wv_linewise_.wvlinewise.md#streamcontinue)
* [streamStart](_wv_linewise_.wvlinewise.md#streamstart)

## Constructors

###  constructor

\+ **new WvLinewise**(`raw`: [RawWvLinewise](_wv_linewise_.rawwvlinewise.md)): *[WvLinewise](_wv_linewise_.wvlinewise.md)*

Defined in wv-linewise.ts:366

**Parameters:**

Name | Type |
------ | ------ |
`raw` | [RawWvLinewise](_wv_linewise_.rawwvlinewise.md) |

**Returns:** *[WvLinewise](_wv_linewise_.wvlinewise.md)*

## Properties

###  raw

• **raw**: *[RawWvLinewise](_wv_linewise_.rawwvlinewise.md)*

Defined in wv-linewise.ts:368

## Methods

###  clear

▸ **clear**‹**T**›(`type`: T["type"]): *void*

Defined in wv-linewise.ts:403

**Type parameters:**

▪ **T**: *[Response](../modules/_wv_linewise_.md#response)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | T["type"] |

**Returns:** *void*

___

###  exit

▸ **exit**(`status`: number): *void*

Defined in wv-linewise.ts:383

**Parameters:**

Name | Type |
------ | ------ |
`status` | number |

**Returns:** *void*

___

###  off

▸ **off**‹**T**›(`type`: T["type"], `f`: [ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹T›): *void*

Defined in wv-linewise.ts:407

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

Defined in wv-linewise.ts:395

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

Defined in wv-linewise.ts:399

**Type parameters:**

▪ **T**: *[Response](../modules/_wv_linewise_.md#response)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | T["type"] |
`f` | [ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹T› |

**Returns:** *void*

___

###  out

▸ **out**(`text`: string, `descriptor`: OutRequest["descriptor"]): *void*

Defined in wv-linewise.ts:391

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`text` | string | - |
`descriptor` | OutRequest["descriptor"] | OUT_REQUEST_DESCRIPTOR.STDOUT |

**Returns:** *void*

___

###  requestParams

▸ **requestParams**(): *void*

Defined in wv-linewise.ts:379

**Returns:** *void*

___

###  requestStreamList

▸ **requestStreamList**(): *void*

Defined in wv-linewise.ts:387

**Returns:** *void*

___

###  streamContinue

▸ **streamContinue**(`streamName`: string): *void*

Defined in wv-linewise.ts:375

**Parameters:**

Name | Type |
------ | ------ |
`streamName` | string |

**Returns:** *void*

___

###  streamStart

▸ **streamStart**(`streamName`: string, `count`: number): *void*

Defined in wv-linewise.ts:371

**Parameters:**

Name | Type |
------ | ------ |
`streamName` | string |
`count` | number |

**Returns:** *void*
