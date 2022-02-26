[wv-linewise-js-lib](../README.md) / [Modules](../modules.md) / [wv-linewise](../modules/wv_linewise.md) / WvLinewise

# Class: WvLinewise

[wv-linewise](../modules/wv_linewise.md).WvLinewise

## Table of contents

### Constructors

- [constructor](wv_linewise.WvLinewise.md#constructor)

### Properties

- [raw](wv_linewise.WvLinewise.md#raw)

### Methods

- [clear](wv_linewise.WvLinewise.md#clear)
- [exit](wv_linewise.WvLinewise.md#exit)
- [off](wv_linewise.WvLinewise.md#off)
- [on](wv_linewise.WvLinewise.md#on)
- [once](wv_linewise.WvLinewise.md#once)
- [out](wv_linewise.WvLinewise.md#out)
- [requestParams](wv_linewise.WvLinewise.md#requestparams)
- [requestStreamList](wv_linewise.WvLinewise.md#requeststreamlist)
- [streamContinue](wv_linewise.WvLinewise.md#streamcontinue)
- [streamStart](wv_linewise.WvLinewise.md#streamstart)

## Constructors

### constructor

• **new WvLinewise**(`raw`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `raw` | [`RawWvLinewise`](wv_linewise.RawWvLinewise.md) |

#### Defined in

[wv-linewise.ts:369](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L369)

## Properties

### raw

• **raw**: [`RawWvLinewise`](wv_linewise.RawWvLinewise.md)

## Methods

### clear

▸ **clear**<`T`\>(`type`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Response`](../modules/wv_linewise.md#response) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `T`[``"type"``] |

#### Returns

`void`

#### Defined in

[wv-linewise.ts:404](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L404)

___

### exit

▸ **exit**(`status`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `status` | `number` |

#### Returns

`void`

#### Defined in

[wv-linewise.ts:384](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L384)

___

### off

▸ **off**<`T`\>(`type`, `f`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Response`](../modules/wv_linewise.md#response) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `T`[``"type"``] |
| `f` | [`ResponseDispatcher`](../interfaces/wv_linewise.ResponseDispatcher.md)<`T`\> |

#### Returns

`void`

#### Defined in

[wv-linewise.ts:408](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L408)

___

### on

▸ **on**<`T`\>(`type`, `f`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Response`](../modules/wv_linewise.md#response) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `T`[``"type"``] |
| `f` | [`ResponseDispatcher`](../interfaces/wv_linewise.ResponseDispatcher.md)<`T`\> |

#### Returns

`void`

#### Defined in

[wv-linewise.ts:396](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L396)

___

### once

▸ **once**<`T`\>(`type`, `f`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Response`](../modules/wv_linewise.md#response) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `T`[``"type"``] |
| `f` | [`ResponseDispatcher`](../interfaces/wv_linewise.ResponseDispatcher.md)<`T`\> |

#### Returns

`void`

#### Defined in

[wv-linewise.ts:400](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L400)

___

### out

▸ **out**(`text`, `descriptor?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `text` | `string` | `undefined` |
| `descriptor` | [`OUT_REQUEST_DESCRIPTOR`](../enums/wv_linewise.OUT_REQUEST_DESCRIPTOR.md) | `OUT_REQUEST_DESCRIPTOR.STDOUT` |

#### Returns

`void`

#### Defined in

[wv-linewise.ts:392](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L392)

___

### requestParams

▸ **requestParams**(): `void`

#### Returns

`void`

#### Defined in

[wv-linewise.ts:380](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L380)

___

### requestStreamList

▸ **requestStreamList**(): `void`

#### Returns

`void`

#### Defined in

[wv-linewise.ts:388](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L388)

___

### streamContinue

▸ **streamContinue**(`streamName`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `streamName` | `string` |

#### Returns

`void`

#### Defined in

[wv-linewise.ts:376](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L376)

___

### streamStart

▸ **streamStart**(`streamName`, `count`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `streamName` | `string` |
| `count` | `number` |

#### Returns

`void`

#### Defined in

[wv-linewise.ts:372](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L372)
