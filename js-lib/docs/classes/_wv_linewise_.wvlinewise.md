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

*Defined in [wv-linewise.ts:367](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise.ts#L367)*

**Parameters:**

Name | Type |
------ | ------ |
`raw` | [RawWvLinewise](_wv_linewise_.rawwvlinewise.md) |

**Returns:** *[WvLinewise](_wv_linewise_.wvlinewise.md)*

## Properties

###  raw

• **raw**: *[RawWvLinewise](_wv_linewise_.rawwvlinewise.md)*

*Defined in [wv-linewise.ts:369](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise.ts#L369)*

## Methods

###  clear

▸ **clear**‹**T**›(`type`: T["type"]): *void*

*Defined in [wv-linewise.ts:404](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise.ts#L404)*

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

*Defined in [wv-linewise.ts:384](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise.ts#L384)*

**Parameters:**

Name | Type |
------ | ------ |
`status` | number |

**Returns:** *void*

___

###  off

▸ **off**‹**T**›(`type`: T["type"], `f`: [ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹T›): *void*

*Defined in [wv-linewise.ts:408](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise.ts#L408)*

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

*Defined in [wv-linewise.ts:396](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise.ts#L396)*

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

*Defined in [wv-linewise.ts:400](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise.ts#L400)*

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

*Defined in [wv-linewise.ts:392](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise.ts#L392)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`text` | string | - |
`descriptor` | OutRequest["descriptor"] | OUT_REQUEST_DESCRIPTOR.STDOUT |

**Returns:** *void*

___

###  requestParams

▸ **requestParams**(): *void*

*Defined in [wv-linewise.ts:380](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise.ts#L380)*

**Returns:** *void*

___

###  requestStreamList

▸ **requestStreamList**(): *void*

*Defined in [wv-linewise.ts:388](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise.ts#L388)*

**Returns:** *void*

___

###  streamContinue

▸ **streamContinue**(`streamName`: string): *void*

*Defined in [wv-linewise.ts:376](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise.ts#L376)*

**Parameters:**

Name | Type |
------ | ------ |
`streamName` | string |

**Returns:** *void*

___

###  streamStart

▸ **streamStart**(`streamName`: string, `count`: number): *void*

*Defined in [wv-linewise.ts:372](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise.ts#L372)*

**Parameters:**

Name | Type |
------ | ------ |
`streamName` | string |
`count` | number |

**Returns:** *void*
