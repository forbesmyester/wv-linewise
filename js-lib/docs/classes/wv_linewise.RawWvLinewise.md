[wv-linewise-js-lib](../README.md) / [Modules](../modules.md) / [wv-linewise](../modules/wv_linewise.md) / RawWvLinewise

# Class: RawWvLinewise

[wv-linewise](../modules/wv_linewise.md).RawWvLinewise

## Hierarchy

- **`RawWvLinewise`**

  ↳ [`RawWvLinewiseMock`](wv_linewise.RawWvLinewiseMock.md)

## Table of contents

### Constructors

- [constructor](wv_linewise.RawWvLinewise.md#constructor)

### Properties

- [respFns](wv_linewise.RawWvLinewise.md#respfns)
- [respFnsOnce](wv_linewise.RawWvLinewise.md#respfnsonce)

### Methods

- [clear](wv_linewise.RawWvLinewise.md#clear)
- [fire](wv_linewise.RawWvLinewise.md#fire)
- [getResponseDispatcher](wv_linewise.RawWvLinewise.md#getresponsedispatcher)
- [off](wv_linewise.RawWvLinewise.md#off)
- [on](wv_linewise.RawWvLinewise.md#on)
- [once](wv_linewise.RawWvLinewise.md#once)
- [request](wv_linewise.RawWvLinewise.md#request)

## Constructors

### constructor

• **new RawWvLinewise**(`external`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `external` | `Object` |
| `external.invoke` | (`e`: `string`) => `void` |

#### Defined in

[wv-linewise.ts:222](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L222)

## Properties

### respFns

• `Private` **respFns**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `details` | [`ResponseDispatcher`](../interfaces/wv_linewise.ResponseDispatcher.md)<[`DetailsResponse`](../interfaces/wv_linewise.DetailsResponse.md)\>[] |
| `error` | [`ResponseDispatcher`](../interfaces/wv_linewise.ResponseDispatcher.md)<[`ErrorResponse`](../interfaces/wv_linewise.ErrorResponse.md)\>[] |
| `finished` | [`ResponseDispatcher`](../interfaces/wv_linewise.ResponseDispatcher.md)<[`FinishedResponse`](../interfaces/wv_linewise.FinishedResponse.md)\>[] |
| `line` | [`ResponseDispatcher`](../interfaces/wv_linewise.ResponseDispatcher.md)<[`LineResponse`](../interfaces/wv_linewise.LineResponse.md)\>[] |
| `messageError` | [`ResponseDispatcher`](../interfaces/wv_linewise.ResponseDispatcher.md)<[`MessageErrorResponse`](../interfaces/wv_linewise.MessageErrorResponse.md)\>[] |
| `params` | [`ResponseDispatcher`](../interfaces/wv_linewise.ResponseDispatcher.md)<[`ParamsResponse`](../interfaces/wv_linewise.ParamsResponse.md)\>[] |
| `paused` | [`ResponseDispatcher`](../interfaces/wv_linewise.ResponseDispatcher.md)<[`PausedResponse`](../interfaces/wv_linewise.PausedResponse.md)\>[] |
| `streamList` | [`ResponseDispatcher`](../interfaces/wv_linewise.ResponseDispatcher.md)<[`StreamListResponse`](../interfaces/wv_linewise.StreamListResponse.md)\>[] |

#### Defined in

[wv-linewise.ts:211](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L211)

___

### respFnsOnce

• `Private` **respFnsOnce**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `details` | [`ResponseDispatcher`](../interfaces/wv_linewise.ResponseDispatcher.md)<[`DetailsResponse`](../interfaces/wv_linewise.DetailsResponse.md)\>[] |
| `error` | [`ResponseDispatcher`](../interfaces/wv_linewise.ResponseDispatcher.md)<[`ErrorResponse`](../interfaces/wv_linewise.ErrorResponse.md)\>[] |
| `finished` | [`ResponseDispatcher`](../interfaces/wv_linewise.ResponseDispatcher.md)<[`FinishedResponse`](../interfaces/wv_linewise.FinishedResponse.md)\>[] |
| `line` | [`ResponseDispatcher`](../interfaces/wv_linewise.ResponseDispatcher.md)<[`LineResponse`](../interfaces/wv_linewise.LineResponse.md)\>[] |
| `messageError` | [`ResponseDispatcher`](../interfaces/wv_linewise.ResponseDispatcher.md)<[`MessageErrorResponse`](../interfaces/wv_linewise.MessageErrorResponse.md)\>[] |
| `params` | [`ResponseDispatcher`](../interfaces/wv_linewise.ResponseDispatcher.md)<[`ParamsResponse`](../interfaces/wv_linewise.ParamsResponse.md)\>[] |
| `paused` | [`ResponseDispatcher`](../interfaces/wv_linewise.ResponseDispatcher.md)<[`PausedResponse`](../interfaces/wv_linewise.PausedResponse.md)\>[] |
| `streamList` | [`ResponseDispatcher`](../interfaces/wv_linewise.ResponseDispatcher.md)<[`StreamListResponse`](../interfaces/wv_linewise.StreamListResponse.md)\>[] |

#### Defined in

[wv-linewise.ts:200](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L200)

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

[wv-linewise.ts:258](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L258)

___

### fire

▸ `Protected` **fire**(`d`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `d` | [`Response`](../modules/wv_linewise.md#response) |

#### Returns

`void`

#### Defined in

[wv-linewise.ts:236](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L236)

___

### getResponseDispatcher

▸ `Private` **getResponseDispatcher**<`T`\>(`e`): [`ResponseDispatcher`](../interfaces/wv_linewise.ResponseDispatcher.md)<`T`\>[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Response`](../modules/wv_linewise.md#response) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `T`[``"type"``] |

#### Returns

[`ResponseDispatcher`](../interfaces/wv_linewise.ResponseDispatcher.md)<`T`\>[]

#### Defined in

[wv-linewise.ts:228](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L228)

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

[wv-linewise.ts:263](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L263)

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

[wv-linewise.ts:250](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L250)

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

[wv-linewise.ts:254](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L254)

___

### request

▸ **request**(`j`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `j` | [`Request`](../modules/wv_linewise.md#request) |

#### Returns

`void`

#### Defined in

[wv-linewise.ts:246](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L246)
