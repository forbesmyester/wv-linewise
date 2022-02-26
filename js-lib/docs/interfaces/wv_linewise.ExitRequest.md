[wv-linewise-js-lib](../README.md) / [Modules](../modules.md) / [wv-linewise](../modules/wv_linewise.md) / ExitRequest

# Interface: ExitRequest

[wv-linewise](../modules/wv_linewise.md).ExitRequest

[Request](../modules/wv_linewise.md#request) that the program exits (and the web view is closed).

## Table of contents

### Properties

- [msg](wv_linewise.ExitRequest.md#msg)
- [status](wv_linewise.ExitRequest.md#status)

## Properties

### msg

• **msg**: [`EXIT`](../enums/wv_linewise.REQUEST_TYPE.md#exit)

#### Defined in

[wv-linewise.ts:34](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L34)

___

### status

• **status**: `number`

This is the exit status returned to the software which started the webview, 0 is success

#### Defined in

[wv-linewise.ts:36](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L36)
