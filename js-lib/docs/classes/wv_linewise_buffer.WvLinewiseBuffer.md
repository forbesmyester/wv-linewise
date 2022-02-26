[wv-linewise-js-lib](../README.md) / [Modules](../modules.md) / [wv-linewise-buffer](../modules/wv_linewise_buffer.md) / WvLinewiseBuffer

# Class: WvLinewiseBuffer

[wv-linewise-buffer](../modules/wv_linewise_buffer.md).WvLinewiseBuffer

## Table of contents

### Constructors

- [constructor](wv_linewise_buffer.WvLinewiseBuffer.md#constructor)

### Properties

- [buffer](wv_linewise_buffer.WvLinewiseBuffer.md#buffer)
- [noSleep](wv_linewise_buffer.WvLinewiseBuffer.md#nosleep)
- [state](wv_linewise_buffer.WvLinewiseBuffer.md#state)

### Methods

- [notify](wv_linewise_buffer.WvLinewiseBuffer.md#notify)
- [request](wv_linewise_buffer.WvLinewiseBuffer.md#request)
- [shift](wv_linewise_buffer.WvLinewiseBuffer.md#shift)

## Constructors

### constructor

• **new WvLinewiseBuffer**(`wvl`, `streamName`, `lowWaterMark`, `countToRequest`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `wvl` | [`WvLinewise`](wv_linewise.WvLinewise.md) |
| `streamName` | `string` |
| `lowWaterMark` | `number` |
| `countToRequest` | `number` |

#### Defined in

[wv-linewise-buffer.ts:35](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise-buffer.ts#L35)

## Properties

### buffer

• `Private` **buffer**: `string`[] = `[]`

#### Defined in

[wv-linewise-buffer.ts:31](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise-buffer.ts#L31)

___

### noSleep

• `Protected` **noSleep**: `boolean` = `false`

#### Defined in

[wv-linewise-buffer.ts:33](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise-buffer.ts#L33)

___

### state

• `Private` **state**: `WvLinewiseBufferState` = `WvLinewiseBufferState.NotStarted`

#### Defined in

[wv-linewise-buffer.ts:32](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise-buffer.ts#L32)

## Methods

### notify

▸ **notify**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Defined in

[wv-linewise-buffer.ts:53](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise-buffer.ts#L53)

___

### request

▸ **request**(): `void`

#### Returns

`void`

#### Defined in

[wv-linewise-buffer.ts:87](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise-buffer.ts#L87)

___

### shift

▸ **shift**(): `Promise`<``null`` \| `string`\>

#### Returns

`Promise`<``null`` \| `string`\>

#### Defined in

[wv-linewise-buffer.ts:103](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise-buffer.ts#L103)
