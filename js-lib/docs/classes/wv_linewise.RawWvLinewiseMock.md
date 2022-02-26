[wv-linewise-js-lib](../README.md) / [Modules](../modules.md) / [wv-linewise](../modules/wv_linewise.md) / RawWvLinewiseMock

# Class: RawWvLinewiseMock

[wv-linewise](../modules/wv_linewise.md).RawWvLinewiseMock

## Hierarchy

- [`RawWvLinewise`](wv_linewise.RawWvLinewise.md)

  ↳ **`RawWvLinewiseMock`**

## Table of contents

### Constructors

- [constructor](wv_linewise.RawWvLinewiseMock.md#constructor)

### Properties

- [params](wv_linewise.RawWvLinewiseMock.md#params)
- [running](wv_linewise.RawWvLinewiseMock.md#running)
- [started](wv_linewise.RawWvLinewiseMock.md#started)
- [startedCounts](wv_linewise.RawWvLinewiseMock.md#startedcounts)
- [streamData](wv_linewise.RawWvLinewiseMock.md#streamdata)

### Methods

- [addParam](wv_linewise.RawWvLinewiseMock.md#addparam)
- [addStreamData](wv_linewise.RawWvLinewiseMock.md#addstreamdata)
- [clear](wv_linewise.RawWvLinewiseMock.md#clear)
- [fire](wv_linewise.RawWvLinewiseMock.md#fire)
- [off](wv_linewise.RawWvLinewiseMock.md#off)
- [on](wv_linewise.RawWvLinewiseMock.md#on)
- [once](wv_linewise.RawWvLinewiseMock.md#once)
- [request](wv_linewise.RawWvLinewiseMock.md#request)
- [start](wv_linewise.RawWvLinewiseMock.md#start)

## Constructors

### constructor

• **new RawWvLinewiseMock**()

#### Overrides

[RawWvLinewise](wv_linewise.RawWvLinewise.md).[constructor](wv_linewise.RawWvLinewise.md#constructor)

#### Defined in

[wv-linewise.ts:288](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L288)

## Properties

### params

• `Private` **params**: [`Param`](../interfaces/wv_linewise.Param.md)[] = `[]`

#### Defined in

[wv-linewise.ts:283](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L283)

___

### running

• `Private` **running**: `Set`<`string`\>

#### Defined in

[wv-linewise.ts:284](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L284)

___

### started

• `Private` **started**: `Set`<`string`\>

#### Defined in

[wv-linewise.ts:285](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L285)

___

### startedCounts

• `Private` **startedCounts**: `Map`<`string`, `number`\>

#### Defined in

[wv-linewise.ts:286](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L286)

___

### streamData

• `Private` **streamData**: `Map`<`string`, `string`[]\>

#### Defined in

[wv-linewise.ts:282](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L282)

## Methods

### addParam

▸ **addParam**(`name`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `value` | `string` |

#### Returns

`void`

#### Defined in

[wv-linewise.ts:299](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L299)

___

### addStreamData

▸ **addStreamData**(`streamName`, `data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `streamName` | `string` |
| `data` | `string`[] |

#### Returns

`void`

#### Defined in

[wv-linewise.ts:292](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L292)

___

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

#### Inherited from

[RawWvLinewise](wv_linewise.RawWvLinewise.md).[clear](wv_linewise.RawWvLinewise.md#clear)

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

#### Inherited from

[RawWvLinewise](wv_linewise.RawWvLinewise.md).[fire](wv_linewise.RawWvLinewise.md#fire)

#### Defined in

[wv-linewise.ts:236](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L236)

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

#### Inherited from

[RawWvLinewise](wv_linewise.RawWvLinewise.md).[off](wv_linewise.RawWvLinewise.md#off)

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

#### Inherited from

[RawWvLinewise](wv_linewise.RawWvLinewise.md).[on](wv_linewise.RawWvLinewise.md#on)

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

#### Inherited from

[RawWvLinewise](wv_linewise.RawWvLinewise.md).[once](wv_linewise.RawWvLinewise.md#once)

#### Defined in

[wv-linewise.ts:254](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L254)

___

### request

▸ **request**(`j`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `j` | [`Request`](../modules/wv_linewise.md#request) |

#### Returns

`Promise`<`void`\>

#### Overrides

[RawWvLinewise](wv_linewise.RawWvLinewise.md).[request](wv_linewise.RawWvLinewise.md#request)

#### Defined in

[wv-linewise.ts:324](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L324)

___

### start

▸ **start**(`name`, `count`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `count` | `number` |

#### Returns

`void`

#### Defined in

[wv-linewise.ts:303](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L303)
