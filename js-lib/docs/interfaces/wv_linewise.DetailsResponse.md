[wv-linewise-js-lib](../README.md) / [Modules](../modules.md) / [wv-linewise](../modules/wv_linewise.md) / DetailsResponse

# Interface: DetailsResponse

[wv-linewise](../modules/wv_linewise.md).DetailsResponse

Once a [StreamStartRequest](wv_linewise.StreamStartRequest.md) has been received, we will respond with
the details about that stream before sending [LineResponse](wv_linewise.LineResponse.md)s.

In future streams from files will likely be rewindable, but currently
[rewindable](wv_linewise.DetailsResponse.md#rewindable) is always false.

## Table of contents

### Properties

- [name](wv_linewise.DetailsResponse.md#name)
- [rewindable](wv_linewise.DetailsResponse.md#rewindable)
- [type](wv_linewise.DetailsResponse.md#type)

## Properties

### name

• **name**: `string`

#### Defined in

[wv-linewise.ts:161](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L161)

___

### rewindable

• **rewindable**: `boolean`

#### Defined in

[wv-linewise.ts:162](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L162)

___

### type

• **type**: [`DETAILS`](../enums/wv_linewise.RESPONSE_TYPE.md#details)

#### Defined in

[wv-linewise.ts:160](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L160)
