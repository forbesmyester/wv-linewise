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

Defined in wv-linewise-buffer.ts:22

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

Defined in wv-linewise-buffer.ts:21

___

### `Private` countToRequest

• **countToRequest**: *number*

Defined in wv-linewise-buffer.ts:24

___

### `Private` lowWaterMark

• **lowWaterMark**: *number*

Defined in wv-linewise-buffer.ts:24

___

### `Private` state

• **state**: *[WvLinewiseBufferState](../enums/_wv_linewise_buffer_.wvlinewisebufferstate.md)* = WvLinewiseBufferState.NotStarted

Defined in wv-linewise-buffer.ts:22

___

### `Private` streamName

• **streamName**: *string*

Defined in wv-linewise-buffer.ts:24

___

### `Private` wvl

• **wvl**: *[WvLinewise](_wv_linewise_.wvlinewise.md)*

Defined in wv-linewise-buffer.ts:24

## Methods

###  notify

▸ **notify**(): *Promise‹unknown›*

Defined in wv-linewise-buffer.ts:42

**Returns:** *Promise‹unknown›*

___

###  request

▸ **request**(): *void*

Defined in wv-linewise-buffer.ts:73

**Returns:** *void*

___

###  shift

▸ **shift**(): *Promise‹string | null›*

Defined in wv-linewise-buffer.ts:89

**Returns:** *Promise‹string | null›*
