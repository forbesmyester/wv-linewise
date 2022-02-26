[wv-linewise-js-lib](../README.md) / [Modules](../modules.md) / [wv-linewise-fetch](../modules/wv_linewise_fetch.md) / WvLinewiseResponse

# Class: WvLinewiseResponse

[wv-linewise-fetch](../modules/wv_linewise_fetch.md).WvLinewiseResponse

## Implements

- `Response`

## Table of contents

### Constructors

- [constructor](wv_linewise_fetch.WvLinewiseResponse.md#constructor)

### Properties

- [body](wv_linewise_fetch.WvLinewiseResponse.md#body)
- [bodyUsed](wv_linewise_fetch.WvLinewiseResponse.md#bodyused)
- [headers](wv_linewise_fetch.WvLinewiseResponse.md#headers)
- [ok](wv_linewise_fetch.WvLinewiseResponse.md#ok)
- [redirected](wv_linewise_fetch.WvLinewiseResponse.md#redirected)
- [status](wv_linewise_fetch.WvLinewiseResponse.md#status)
- [statusText](wv_linewise_fetch.WvLinewiseResponse.md#statustext)
- [trailer](wv_linewise_fetch.WvLinewiseResponse.md#trailer)
- [type](wv_linewise_fetch.WvLinewiseResponse.md#type)
- [url](wv_linewise_fetch.WvLinewiseResponse.md#url)

### Methods

- [arrayBuffer](wv_linewise_fetch.WvLinewiseResponse.md#arraybuffer)
- [blob](wv_linewise_fetch.WvLinewiseResponse.md#blob)
- [clone](wv_linewise_fetch.WvLinewiseResponse.md#clone)
- [formData](wv_linewise_fetch.WvLinewiseResponse.md#formdata)
- [getStatusText](wv_linewise_fetch.WvLinewiseResponse.md#getstatustext)
- [json](wv_linewise_fetch.WvLinewiseResponse.md#json)
- [text](wv_linewise_fetch.WvLinewiseResponse.md#text)

## Constructors

### constructor

• **new WvLinewiseResponse**(`url`, `resp_text`, `status`, `headers`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `resp_text` | `string` |
| `status` | `number` |
| `headers` | `Object` |

#### Defined in

[wv-linewise-fetch.ts:53](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise-fetch.ts#L53)

## Properties

### body

• `Readonly` **body**: ``null`` \| `ReadableStream`<`Uint8Array`\> = `null`

#### Implementation of

Response.body

#### Defined in

[wv-linewise-fetch.ts:47](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise-fetch.ts#L47)

___

### bodyUsed

• `Readonly` **bodyUsed**: `boolean` = `true`

#### Implementation of

Response.bodyUsed

#### Defined in

[wv-linewise-fetch.ts:48](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise-fetch.ts#L48)

___

### headers

• **headers**: `Headers`

#### Implementation of

Response.headers

#### Defined in

[wv-linewise-fetch.ts:41](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise-fetch.ts#L41)

___

### ok

• `Readonly` **ok**: `boolean`

#### Implementation of

Response.ok

#### Defined in

[wv-linewise-fetch.ts:40](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise-fetch.ts#L40)

___

### redirected

• `Readonly` **redirected**: ``false``

#### Implementation of

Response.redirected

#### Defined in

[wv-linewise-fetch.ts:42](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise-fetch.ts#L42)

___

### status

• `Readonly` **status**: `number`

#### Implementation of

Response.status

___

### statusText

• `Readonly` **statusText**: `string`

#### Implementation of

Response.statusText

#### Defined in

[wv-linewise-fetch.ts:43](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise-fetch.ts#L43)

___

### trailer

• `Readonly` **trailer**: `Promise`<`Headers`\>

#### Defined in

[wv-linewise-fetch.ts:44](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise-fetch.ts#L44)

___

### type

• `Readonly` **type**: `ResponseType` = `"basic"`

#### Implementation of

Response.type

#### Defined in

[wv-linewise-fetch.ts:45](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise-fetch.ts#L45)

___

### url

• `Readonly` **url**: `string`

#### Implementation of

Response.url

## Methods

### arrayBuffer

▸ **arrayBuffer**(): `Promise`<`ArrayBuffer`\>

#### Returns

`Promise`<`ArrayBuffer`\>

#### Implementation of

Response.arrayBuffer

#### Defined in

[wv-linewise-fetch.ts:49](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise-fetch.ts#L49)

___

### blob

▸ **blob**(): `Promise`<`Blob`\>

#### Returns

`Promise`<`Blob`\>

#### Implementation of

Response.blob

#### Defined in

[wv-linewise-fetch.ts:50](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise-fetch.ts#L50)

___

### clone

▸ **clone**(): `Response`

#### Returns

`Response`

#### Implementation of

Response.clone

#### Defined in

[wv-linewise-fetch.ts:59](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise-fetch.ts#L59)

___

### formData

▸ **formData**(): `Promise`<`FormData`\>

#### Returns

`Promise`<`FormData`\>

#### Implementation of

Response.formData

#### Defined in

[wv-linewise-fetch.ts:51](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise-fetch.ts#L51)

___

### getStatusText

▸ `Private` **getStatusText**(`n`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

`string`

#### Defined in

[wv-linewise-fetch.ts:76](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise-fetch.ts#L76)

___

### json

▸ **json**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Implementation of

Response.json

#### Defined in

[wv-linewise-fetch.ts:72](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise-fetch.ts#L72)

___

### text

▸ **text**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

#### Implementation of

Response.text

#### Defined in

[wv-linewise-fetch.ts:74](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise-fetch.ts#L74)
