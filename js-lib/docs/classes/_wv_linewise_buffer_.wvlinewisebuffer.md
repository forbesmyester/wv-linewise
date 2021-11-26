[wv-linewise-js-lib](../README.md) › ["wv-linewise-buffer"](../modules/_wv_linewise_buffer_.md) › [WvLinewiseBuffer](_wv_linewise_buffer_.wvlinewisebuffer.md)

# Class: WvLinewiseBuffer

## Hierarchy

* **WvLinewiseBuffer**

## Index

### Constructors

* [constructor](_wv_linewise_buffer_.wvlinewisebuffer.md#constructor)

### Properties

* [buffer](_wv_linewise_buffer_.wvlinewisebuffer.md#private-buffer)
* [countToRequest](_wv_linewise_buffer_.wvlinewisebuffer.md#private-counttorequest)
* [lowWaterMark](_wv_linewise_buffer_.wvlinewisebuffer.md#private-lowwatermark)
* [noSleep](_wv_linewise_buffer_.wvlinewisebuffer.md#protected-nosleep)
* [state](_wv_linewise_buffer_.wvlinewisebuffer.md#private-state)
* [streamName](_wv_linewise_buffer_.wvlinewisebuffer.md#private-streamname)
* [wvl](_wv_linewise_buffer_.wvlinewisebuffer.md#private-wvl)

### Methods

* [notify](_wv_linewise_buffer_.wvlinewisebuffer.md#notify)
* [request](_wv_linewise_buffer_.wvlinewisebuffer.md#request)
* [shift](_wv_linewise_buffer_.wvlinewisebuffer.md#shift)

## Constructors

###  constructor

\+ **new WvLinewiseBuffer**(`wvl`: [WvLinewise](_wv_linewise_.wvlinewise.md), `streamName`: string, `lowWaterMark`: number, `countToRequest`: number): *[WvLinewiseBuffer](_wv_linewise_buffer_.wvlinewisebuffer.md)*

*Defined in [wv-linewise-buffer.ts:33](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise-buffer.ts#L33)*

**Parameters:**

Name | Type |
------ | ------ |
`wvl` | [WvLinewise](_wv_linewise_.wvlinewise.md) |
`streamName` | string |
`lowWaterMark` | number |
`countToRequest` | number |

**Returns:** *[WvLinewiseBuffer](_wv_linewise_buffer_.wvlinewisebuffer.md)*

## Properties

### `Private` buffer

• **buffer**: *string[]* = []

*Defined in [wv-linewise-buffer.ts:31](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise-buffer.ts#L31)*

___

### `Private` countToRequest

• **countToRequest**: *number*

*Defined in [wv-linewise-buffer.ts:35](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise-buffer.ts#L35)*

___

### `Private` lowWaterMark

• **lowWaterMark**: *number*

*Defined in [wv-linewise-buffer.ts:35](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise-buffer.ts#L35)*

___

### `Protected` noSleep

• **noSleep**: *boolean* = false

*Defined in [wv-linewise-buffer.ts:33](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise-buffer.ts#L33)*

___

### `Private` state

• **state**: *[WvLinewiseBufferState](../enums/_wv_linewise_buffer_.wvlinewisebufferstate.md)* = WvLinewiseBufferState.NotStarted

*Defined in [wv-linewise-buffer.ts:32](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise-buffer.ts#L32)*

___

### `Private` streamName

• **streamName**: *string*

*Defined in [wv-linewise-buffer.ts:35](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise-buffer.ts#L35)*

___

### `Private` wvl

• **wvl**: *[WvLinewise](_wv_linewise_.wvlinewise.md)*

*Defined in [wv-linewise-buffer.ts:35](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise-buffer.ts#L35)*

## Methods

###  notify

▸ **notify**(): *Promise‹unknown›*

*Defined in [wv-linewise-buffer.ts:53](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise-buffer.ts#L53)*

**Returns:** *Promise‹unknown›*

___

###  request

▸ **request**(): *void*

*Defined in [wv-linewise-buffer.ts:87](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise-buffer.ts#L87)*

**Returns:** *void*

___

###  shift

▸ **shift**(): *Promise‹string | null›*

*Defined in [wv-linewise-buffer.ts:103](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise-buffer.ts#L103)*

**Returns:** *Promise‹string | null›*
