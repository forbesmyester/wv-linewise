[wv-linewise-js-lib](../README.md) / [Modules](../modules.md) / [wv-linewise](../modules/wv_linewise.md) / StreamStartRequest

# Interface: StreamStartRequest

[wv-linewise](../modules/wv_linewise.md).StreamStartRequest

[Request](../modules/wv_linewise.md#request) to start a named stream.

## Table of contents

### Properties

- [count](wv_linewise.StreamStartRequest.md#count)
- [msg](wv_linewise.StreamStartRequest.md#msg)
- [name](wv_linewise.StreamStartRequest.md#name)

## Properties

### count

• **count**: `number`

How many lines to read before the stream is [PausedResponse](wv_linewise.PausedResponse.md)

#### Defined in

[wv-linewise.ts:27](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L27)

___

### msg

• **msg**: [`STREAM_START`](../enums/wv_linewise.REQUEST_TYPE.md#stream_start)

#### Defined in

[wv-linewise.ts:23](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L23)

___

### name

• **name**: `string`

The name of the stream to start

#### Defined in

[wv-linewise.ts:25](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L25)
