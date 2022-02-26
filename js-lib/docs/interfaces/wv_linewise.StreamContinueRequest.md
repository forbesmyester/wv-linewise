[wv-linewise-js-lib](../README.md) / [Modules](../modules.md) / [wv-linewise](../modules/wv_linewise.md) / StreamContinueRequest

# Interface: StreamContinueRequest

[wv-linewise](../modules/wv_linewise.md).StreamContinueRequest

Once a stream has been started, then [PausedResponse](wv_linewise.PausedResponse.md) because
[StreamStartRequest.count](wv_linewise.StreamStartRequest.md#count) lines had been read you can restart it with
this [Request](../modules/wv_linewise.md#request)

## Table of contents

### Properties

- [msg](wv_linewise.StreamContinueRequest.md#msg)
- [name](wv_linewise.StreamContinueRequest.md#name)

## Properties

### msg

• **msg**: [`STREAM_CONTINUE`](../enums/wv_linewise.REQUEST_TYPE.md#stream_continue)

#### Defined in

[wv-linewise.ts:52](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L52)

___

### name

• **name**: `string`

#### Defined in

[wv-linewise.ts:53](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L53)
