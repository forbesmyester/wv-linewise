[wv-linewise-js-lib](../README.md) › ["wv-linewise"](_wv_linewise_.md)

# Module: "wv-linewise"

## Index

### Enumerations

* [OUT_REQUEST_DESCRIPTOR](../enums/_wv_linewise_.out_request_descriptor.md)
* [REQUEST_TYPE](../enums/_wv_linewise_.request_type.md)
* [RESPONSE_TYPE](../enums/_wv_linewise_.response_type.md)

### Classes

* [RawWvLinewise](../classes/_wv_linewise_.rawwvlinewise.md)
* [RawWvLinewiseMock](../classes/_wv_linewise_.rawwvlinewisemock.md)
* [WvLinewise](../classes/_wv_linewise_.wvlinewise.md)

### Interfaces

* [DetailsResponse](../interfaces/_wv_linewise_.detailsresponse.md)
* [ErrorResponse](../interfaces/_wv_linewise_.errorresponse.md)
* [ExitRequest](../interfaces/_wv_linewise_.exitrequest.md)
* [FinishedResponse](../interfaces/_wv_linewise_.finishedresponse.md)
* [LineResponse](../interfaces/_wv_linewise_.lineresponse.md)
* [MessageErrorResponse](../interfaces/_wv_linewise_.messageerrorresponse.md)
* [OutRequest](../interfaces/_wv_linewise_.outrequest.md)
* [Param](../interfaces/_wv_linewise_.param.md)
* [ParamsRequest](../interfaces/_wv_linewise_.paramsrequest.md)
* [ParamsResponse](../interfaces/_wv_linewise_.paramsresponse.md)
* [PausedResponse](../interfaces/_wv_linewise_.pausedresponse.md)
* [ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)
* [StreamContinueRequest](../interfaces/_wv_linewise_.streamcontinuerequest.md)
* [StreamListRequest](../interfaces/_wv_linewise_.streamlistrequest.md)
* [StreamListResponse](../interfaces/_wv_linewise_.streamlistresponse.md)
* [StreamStartRequest](../interfaces/_wv_linewise_.streamstartrequest.md)

### Type aliases

* [Request](_wv_linewise_.md#request)
* [Response](_wv_linewise_.md#response)

### Functions

* [runningInWvLinewise](_wv_linewise_.md#runninginwvlinewise)

## Type aliases

###  Request

Ƭ **Request**: *[StreamStartRequest](../interfaces/_wv_linewise_.streamstartrequest.md) | [StreamContinueRequest](../interfaces/_wv_linewise_.streamcontinuerequest.md) | [ParamsRequest](../interfaces/_wv_linewise_.paramsrequest.md) | [OutRequest](../interfaces/_wv_linewise_.outrequest.md) | [ExitRequest](../interfaces/_wv_linewise_.exitrequest.md) | [StreamListRequest](../interfaces/_wv_linewise_.streamlistrequest.md)*

*Defined in [wv-linewise.ts:4](https://github.com/forbesmyester/wv-linewise/blob/65da995/js-lib/src/wv-linewise.ts#L4)*

Communication from the web-view to WV Linewise is sent via a Request and responeded to via a [Response](_wv_linewise_.md#response)

___

###  Response

Ƭ **Response**: *[ParamsResponse](../interfaces/_wv_linewise_.paramsresponse.md) | [PausedResponse](../interfaces/_wv_linewise_.pausedresponse.md) | [FinishedResponse](../interfaces/_wv_linewise_.finishedresponse.md) | [DetailsResponse](../interfaces/_wv_linewise_.detailsresponse.md) | [LineResponse](../interfaces/_wv_linewise_.lineresponse.md) | [MessageErrorResponse](../interfaces/_wv_linewise_.messageerrorresponse.md) | [ErrorResponse](../interfaces/_wv_linewise_.errorresponse.md) | [StreamListResponse](../interfaces/_wv_linewise_.streamlistresponse.md)*

*Defined in [wv-linewise.ts:92](https://github.com/forbesmyester/wv-linewise/blob/65da995/js-lib/src/wv-linewise.ts#L92)*

Communication from the WV Linewise to the webview, usually in response to a [Request](_wv_linewise_.md#request) is sent via a Response.

## Functions

###  runningInWvLinewise

▸ **runningInWvLinewise**(): *boolean*

*Defined in [wv-linewise.ts:414](https://github.com/forbesmyester/wv-linewise/blob/65da995/js-lib/src/wv-linewise.ts#L414)*

**Returns:** *boolean*
