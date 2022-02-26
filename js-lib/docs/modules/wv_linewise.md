[wv-linewise-js-lib](../README.md) / [Modules](../modules.md) / wv-linewise

# Module: wv-linewise

## Table of contents

### Enumerations

- [OUT\_REQUEST\_DESCRIPTOR](../enums/wv_linewise.OUT_REQUEST_DESCRIPTOR.md)
- [REQUEST\_TYPE](../enums/wv_linewise.REQUEST_TYPE.md)
- [RESPONSE\_TYPE](../enums/wv_linewise.RESPONSE_TYPE.md)

### Classes

- [RawWvLinewise](../classes/wv_linewise.RawWvLinewise.md)
- [RawWvLinewiseMock](../classes/wv_linewise.RawWvLinewiseMock.md)
- [WvLinewise](../classes/wv_linewise.WvLinewise.md)

### Interfaces

- [DetailsResponse](../interfaces/wv_linewise.DetailsResponse.md)
- [ErrorResponse](../interfaces/wv_linewise.ErrorResponse.md)
- [ExitRequest](../interfaces/wv_linewise.ExitRequest.md)
- [FinishedResponse](../interfaces/wv_linewise.FinishedResponse.md)
- [LineResponse](../interfaces/wv_linewise.LineResponse.md)
- [MessageErrorResponse](../interfaces/wv_linewise.MessageErrorResponse.md)
- [OutRequest](../interfaces/wv_linewise.OutRequest.md)
- [Param](../interfaces/wv_linewise.Param.md)
- [ParamsRequest](../interfaces/wv_linewise.ParamsRequest.md)
- [ParamsResponse](../interfaces/wv_linewise.ParamsResponse.md)
- [PausedResponse](../interfaces/wv_linewise.PausedResponse.md)
- [ResponseDispatcher](../interfaces/wv_linewise.ResponseDispatcher.md)
- [StreamContinueRequest](../interfaces/wv_linewise.StreamContinueRequest.md)
- [StreamListRequest](../interfaces/wv_linewise.StreamListRequest.md)
- [StreamListResponse](../interfaces/wv_linewise.StreamListResponse.md)
- [StreamStartRequest](../interfaces/wv_linewise.StreamStartRequest.md)

### Type aliases

- [Request](wv_linewise.md#request)
- [Response](wv_linewise.md#response)

### Functions

- [externalInvoke](wv_linewise.md#externalinvoke)
- [runningInWvLinewise](wv_linewise.md#runninginwvlinewise)

## Type aliases

### Request

Ƭ **Request**: [`StreamStartRequest`](../interfaces/wv_linewise.StreamStartRequest.md) \| [`StreamContinueRequest`](../interfaces/wv_linewise.StreamContinueRequest.md) \| [`ParamsRequest`](../interfaces/wv_linewise.ParamsRequest.md) \| [`OutRequest`](../interfaces/wv_linewise.OutRequest.md) \| [`ExitRequest`](../interfaces/wv_linewise.ExitRequest.md) \| [`StreamListRequest`](../interfaces/wv_linewise.StreamListRequest.md)

Communication from the web-view to WV Linewise is sent via a Request and responeded to via a [Response](wv_linewise.md#response)

#### Defined in

[wv-linewise.ts:4](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L4)

___

### Response

Ƭ **Response**: [`ParamsResponse`](../interfaces/wv_linewise.ParamsResponse.md) \| [`PausedResponse`](../interfaces/wv_linewise.PausedResponse.md) \| [`FinishedResponse`](../interfaces/wv_linewise.FinishedResponse.md) \| [`DetailsResponse`](../interfaces/wv_linewise.DetailsResponse.md) \| [`LineResponse`](../interfaces/wv_linewise.LineResponse.md) \| [`MessageErrorResponse`](../interfaces/wv_linewise.MessageErrorResponse.md) \| [`ErrorResponse`](../interfaces/wv_linewise.ErrorResponse.md) \| [`StreamListResponse`](../interfaces/wv_linewise.StreamListResponse.md)

Communication from the WV Linewise to the webview, usually in response to a [Request](wv_linewise.md#request) is sent via a Response.

#### Defined in

[wv-linewise.ts:92](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L92)

## Functions

### externalInvoke

▸ **externalInvoke**(`e`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `any` |

#### Returns

`any`

#### Defined in

[wv-linewise.ts:428](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L428)

___

### runningInWvLinewise

▸ **runningInWvLinewise**(): `boolean`

#### Returns

`boolean`

#### Defined in

[wv-linewise.ts:414](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise.ts#L414)
