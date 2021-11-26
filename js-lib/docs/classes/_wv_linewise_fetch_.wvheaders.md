[wv-linewise-js-lib](../README.md) › ["wv-linewise-fetch"](../modules/_wv_linewise_fetch_.md) › [WvHeaders](_wv_linewise_fetch_.wvheaders.md)

# Class: WvHeaders

## Hierarchy

* **WvHeaders**

## Implements

* Headers
* [ZZZ](../interfaces/_wv_linewise_fetch_.zzz.md)

## Indexable

* \[ **k**: *string*\]: any

## Index

### Constructors

* [constructor](_wv_linewise_fetch_.wvheaders.md#constructor)

### Methods

* [append](_wv_linewise_fetch_.wvheaders.md#append)
* [delete](_wv_linewise_fetch_.wvheaders.md#delete)
* [forEach](_wv_linewise_fetch_.wvheaders.md#foreach)
* [get](_wv_linewise_fetch_.wvheaders.md#get)
* [has](_wv_linewise_fetch_.wvheaders.md#has)
* [set](_wv_linewise_fetch_.wvheaders.md#set)

## Constructors

###  constructor

\+ **new WvHeaders**(`kv`: object): *[WvHeaders](_wv_linewise_fetch_.wvheaders.md)*

*Defined in [wv-linewise-fetch.ts:29](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise-fetch.ts#L29)*

**Parameters:**

Name | Type |
------ | ------ |
`kv` | object |

**Returns:** *[WvHeaders](_wv_linewise_fetch_.wvheaders.md)*

## Methods

###  append

▸ **append**(`_name`: string, `_value`: string): *void*

*Defined in [wv-linewise-fetch.ts:8](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise-fetch.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`_name` | string |
`_value` | string |

**Returns:** *void*

___

###  delete

▸ **delete**(`_name`: string): *void*

*Defined in [wv-linewise-fetch.ts:9](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise-fetch.ts#L9)*

**Parameters:**

Name | Type |
------ | ------ |
`_name` | string |

**Returns:** *void*

___

###  forEach

▸ **forEach**(`callbackfn`: function, `thisArg?`: any): *void*

*Defined in [wv-linewise-fetch.ts:18](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise-fetch.ts#L18)*

**Parameters:**

▪ **callbackfn**: *function*

▸ (`this`: Headers, `value`: string, `key`: string, `parent`: Headers): *void*

**Parameters:**

Name | Type |
------ | ------ |
`this` | Headers |
`value` | string |
`key` | string |
`parent` | Headers |

▪`Optional`  **thisArg**: *any*

**Returns:** *void*

___

###  get

▸ **get**(`name`: string): *null | string*

*Defined in [wv-linewise-fetch.ts:10](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise-fetch.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *null | string*

___

###  has

▸ **has**(`name`: string): *boolean*

*Defined in [wv-linewise-fetch.ts:16](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise-fetch.ts#L16)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *boolean*

___

###  set

▸ **set**(`_name`: string, `_value`: string): *void*

*Defined in [wv-linewise-fetch.ts:17](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise-fetch.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`_name` | string |
`_value` | string |

**Returns:** *void*
