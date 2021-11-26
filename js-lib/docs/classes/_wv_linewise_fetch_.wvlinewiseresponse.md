[wv-linewise-js-lib](../README.md) › ["wv-linewise-fetch"](../modules/_wv_linewise_fetch_.md) › [WvLinewiseResponse](_wv_linewise_fetch_.wvlinewiseresponse.md)

# Class: WvLinewiseResponse

## Hierarchy

* **WvLinewiseResponse**

## Implements

* Response

## Index

### Constructors

* [constructor](_wv_linewise_fetch_.wvlinewiseresponse.md#constructor)

### Properties

* [body](_wv_linewise_fetch_.wvlinewiseresponse.md#readonly-body)
* [bodyUsed](_wv_linewise_fetch_.wvlinewiseresponse.md#readonly-bodyused)
* [headers](_wv_linewise_fetch_.wvlinewiseresponse.md#headers)
* [ok](_wv_linewise_fetch_.wvlinewiseresponse.md#readonly-ok)
* [redirected](_wv_linewise_fetch_.wvlinewiseresponse.md#readonly-redirected)
* [resp_text](_wv_linewise_fetch_.wvlinewiseresponse.md#private-readonly-resp_text)
* [status](_wv_linewise_fetch_.wvlinewiseresponse.md#readonly-status)
* [statusText](_wv_linewise_fetch_.wvlinewiseresponse.md#readonly-statustext)
* [trailer](_wv_linewise_fetch_.wvlinewiseresponse.md#readonly-trailer)
* [type](_wv_linewise_fetch_.wvlinewiseresponse.md#readonly-type)
* [url](_wv_linewise_fetch_.wvlinewiseresponse.md#readonly-url)

### Methods

* [arrayBuffer](_wv_linewise_fetch_.wvlinewiseresponse.md#arraybuffer)
* [blob](_wv_linewise_fetch_.wvlinewiseresponse.md#blob)
* [clone](_wv_linewise_fetch_.wvlinewiseresponse.md#clone)
* [formData](_wv_linewise_fetch_.wvlinewiseresponse.md#formdata)
* [getStatusText](_wv_linewise_fetch_.wvlinewiseresponse.md#private-getstatustext)
* [json](_wv_linewise_fetch_.wvlinewiseresponse.md#json)
* [text](_wv_linewise_fetch_.wvlinewiseresponse.md#text)

## Constructors

###  constructor

\+ **new WvLinewiseResponse**(`url`: string, `resp_text`: string, `status`: number, `headers`: object): *[WvLinewiseResponse](_wv_linewise_fetch_.wvlinewiseresponse.md)*

*Defined in [wv-linewise-fetch.ts:51](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise-fetch.ts#L51)*

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |
`resp_text` | string |
`status` | number |
`headers` | object |

**Returns:** *[WvLinewiseResponse](_wv_linewise_fetch_.wvlinewiseresponse.md)*

## Properties

### `Readonly` body

• **body**: *ReadableStream‹Uint8Array› | null* = null

*Defined in [wv-linewise-fetch.ts:47](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise-fetch.ts#L47)*

___

### `Readonly` bodyUsed

• **bodyUsed**: *boolean* = true

*Defined in [wv-linewise-fetch.ts:48](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise-fetch.ts#L48)*

___

###  headers

• **headers**: *Headers*

*Defined in [wv-linewise-fetch.ts:41](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise-fetch.ts#L41)*

___

### `Readonly` ok

• **ok**: *boolean*

*Defined in [wv-linewise-fetch.ts:40](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise-fetch.ts#L40)*

___

### `Readonly` redirected

• **redirected**: *false* = false

*Defined in [wv-linewise-fetch.ts:42](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise-fetch.ts#L42)*

___

### `Private` `Readonly` resp_text

• **resp_text**: *string*

*Defined in [wv-linewise-fetch.ts:53](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise-fetch.ts#L53)*

___

### `Readonly` status

• **status**: *number*

*Defined in [wv-linewise-fetch.ts:53](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise-fetch.ts#L53)*

___

### `Readonly` statusText

• **statusText**: *string*

*Defined in [wv-linewise-fetch.ts:43](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise-fetch.ts#L43)*

___

### `Readonly` trailer

• **trailer**: *Promise‹Headers›* = Promise.resolve(new WvHeaders({}))

*Defined in [wv-linewise-fetch.ts:44](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise-fetch.ts#L44)*

___

### `Readonly` type

• **type**: *ResponseType* = "basic"

*Defined in [wv-linewise-fetch.ts:45](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise-fetch.ts#L45)*

___

### `Readonly` url

• **url**: *string*

*Defined in [wv-linewise-fetch.ts:53](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise-fetch.ts#L53)*

## Methods

###  arrayBuffer

▸ **arrayBuffer**(): *Promise‹ArrayBuffer›*

*Defined in [wv-linewise-fetch.ts:49](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise-fetch.ts#L49)*

**Returns:** *Promise‹ArrayBuffer›*

___

###  blob

▸ **blob**(): *Promise‹Blob›*

*Defined in [wv-linewise-fetch.ts:50](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise-fetch.ts#L50)*

**Returns:** *Promise‹Blob›*

___

###  clone

▸ **clone**(): *Response*

*Defined in [wv-linewise-fetch.ts:59](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise-fetch.ts#L59)*

**Returns:** *Response*

___

###  formData

▸ **formData**(): *Promise‹FormData›*

*Defined in [wv-linewise-fetch.ts:51](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise-fetch.ts#L51)*

**Returns:** *Promise‹FormData›*

___

### `Private` getStatusText

▸ **getStatusText**(`n`: number): *string*

*Defined in [wv-linewise-fetch.ts:76](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise-fetch.ts#L76)*

**Parameters:**

Name | Type |
------ | ------ |
`n` | number |

**Returns:** *string*

___

###  json

▸ **json**(): *Promise‹any›*

*Defined in [wv-linewise-fetch.ts:72](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise-fetch.ts#L72)*

**Returns:** *Promise‹any›*

___

###  text

▸ **text**(): *Promise‹string›*

*Defined in [wv-linewise-fetch.ts:74](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise-fetch.ts#L74)*

**Returns:** *Promise‹string›*
