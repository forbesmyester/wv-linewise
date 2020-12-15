[wv-linewise-js-lib](../README.md) › ["wv-linewise"](../modules/_wv_linewise_.md) › [RawWvLinewise](_wv_linewise_.rawwvlinewise.md)

# Class: RawWvLinewise

## Hierarchy

* **RawWvLinewise**

  ↳ [RawWvLinewiseMock](_wv_linewise_.rawwvlinewisemock.md)

## Index

### Constructors

* [constructor](_wv_linewise_.rawwvlinewise.md#constructor)

### Properties

* [external](_wv_linewise_.rawwvlinewise.md#private-external)

### Methods

* [clear](_wv_linewise_.rawwvlinewise.md#clear)
* [fire](_wv_linewise_.rawwvlinewise.md#protected-fire)
* [getResponseDispatcher](_wv_linewise_.rawwvlinewise.md#private-getresponsedispatcher)
* [off](_wv_linewise_.rawwvlinewise.md#off)
* [on](_wv_linewise_.rawwvlinewise.md#on)
* [once](_wv_linewise_.rawwvlinewise.md#once)
* [request](_wv_linewise_.rawwvlinewise.md#request)

### Object literals

* [respFns](_wv_linewise_.rawwvlinewise.md#private-respfns)
* [respFnsOnce](_wv_linewise_.rawwvlinewise.md#private-respfnsonce)

## Constructors

###  constructor

\+ **new RawWvLinewise**(`external`: object): *[RawWvLinewise](_wv_linewise_.rawwvlinewise.md)*

*Defined in [wv-linewise.ts:220](https://github.com/forbesmyester/wv-linewise/blob/65da995/js-lib/src/wv-linewise.ts#L220)*

**Parameters:**

▪ **external**: *object*

Name | Type |
------ | ------ |
`invoke` | function |

**Returns:** *[RawWvLinewise](_wv_linewise_.rawwvlinewise.md)*

## Properties

### `Private` external

• **external**: *object*

*Defined in [wv-linewise.ts:222](https://github.com/forbesmyester/wv-linewise/blob/65da995/js-lib/src/wv-linewise.ts#L222)*

#### Type declaration:

* **invoke**(): *function*

  * (`e`: string): *void*

## Methods

###  clear

▸ **clear**‹**T**›(`type`: T["type"]): *void*

*Defined in [wv-linewise.ts:258](https://github.com/forbesmyester/wv-linewise/blob/65da995/js-lib/src/wv-linewise.ts#L258)*

**Type parameters:**

▪ **T**: *[Response](../modules/_wv_linewise_.md#response)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | T["type"] |

**Returns:** *void*

___

### `Protected` fire

▸ **fire**(`d`: [Response](../modules/_wv_linewise_.md#response)): *void*

*Defined in [wv-linewise.ts:236](https://github.com/forbesmyester/wv-linewise/blob/65da995/js-lib/src/wv-linewise.ts#L236)*

**Parameters:**

Name | Type |
------ | ------ |
`d` | [Response](../modules/_wv_linewise_.md#response) |

**Returns:** *void*

___

### `Private` getResponseDispatcher

▸ **getResponseDispatcher**‹**T**›(`e`: T["type"]): *[ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹T›[]*

*Defined in [wv-linewise.ts:228](https://github.com/forbesmyester/wv-linewise/blob/65da995/js-lib/src/wv-linewise.ts#L228)*

**Type parameters:**

▪ **T**: *[Response](../modules/_wv_linewise_.md#response)*

**Parameters:**

Name | Type |
------ | ------ |
`e` | T["type"] |

**Returns:** *[ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹T›[]*

___

###  off

▸ **off**‹**T**›(`type`: T["type"], `f`: [ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹T›): *void*

*Defined in [wv-linewise.ts:263](https://github.com/forbesmyester/wv-linewise/blob/65da995/js-lib/src/wv-linewise.ts#L263)*

**Type parameters:**

▪ **T**: *[Response](../modules/_wv_linewise_.md#response)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | T["type"] |
`f` | [ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹T› |

**Returns:** *void*

___

###  on

▸ **on**‹**T**›(`type`: T["type"], `f`: [ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹T›): *void*

*Defined in [wv-linewise.ts:250](https://github.com/forbesmyester/wv-linewise/blob/65da995/js-lib/src/wv-linewise.ts#L250)*

**Type parameters:**

▪ **T**: *[Response](../modules/_wv_linewise_.md#response)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | T["type"] |
`f` | [ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹T› |

**Returns:** *void*

___

###  once

▸ **once**‹**T**›(`type`: T["type"], `f`: [ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹T›): *void*

*Defined in [wv-linewise.ts:254](https://github.com/forbesmyester/wv-linewise/blob/65da995/js-lib/src/wv-linewise.ts#L254)*

**Type parameters:**

▪ **T**: *[Response](../modules/_wv_linewise_.md#response)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | T["type"] |
`f` | [ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹T› |

**Returns:** *void*

___

###  request

▸ **request**(`j`: [Request](../modules/_wv_linewise_.md#request)): *void*

*Defined in [wv-linewise.ts:246](https://github.com/forbesmyester/wv-linewise/blob/65da995/js-lib/src/wv-linewise.ts#L246)*

**Parameters:**

Name | Type |
------ | ------ |
`j` | [Request](../modules/_wv_linewise_.md#request) |

**Returns:** *void*

## Object literals

### `Private` respFns

### ▪ **respFns**: *object*

*Defined in [wv-linewise.ts:211](https://github.com/forbesmyester/wv-linewise/blob/65da995/js-lib/src/wv-linewise.ts#L211)*

###  details

• **details**: *[ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹[DetailsResponse](../interfaces/_wv_linewise_.detailsresponse.md)›[]* = [] as ResponseDispatcher<DetailsResponse>[]

*Defined in [wv-linewise.ts:217](https://github.com/forbesmyester/wv-linewise/blob/65da995/js-lib/src/wv-linewise.ts#L217)*

###  error

• **error**: *[ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹[ErrorResponse](../interfaces/_wv_linewise_.errorresponse.md)›[]* = [] as ResponseDispatcher<ErrorResponse>[]

*Defined in [wv-linewise.ts:212](https://github.com/forbesmyester/wv-linewise/blob/65da995/js-lib/src/wv-linewise.ts#L212)*

###  finished

• **finished**: *[ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹[FinishedResponse](../interfaces/_wv_linewise_.finishedresponse.md)›[]* = [] as ResponseDispatcher<FinishedResponse>[]

*Defined in [wv-linewise.ts:219](https://github.com/forbesmyester/wv-linewise/blob/65da995/js-lib/src/wv-linewise.ts#L219)*

###  line

• **line**: *[ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹[LineResponse](../interfaces/_wv_linewise_.lineresponse.md)›[]* = [] as ResponseDispatcher<LineResponse>[]

*Defined in [wv-linewise.ts:218](https://github.com/forbesmyester/wv-linewise/blob/65da995/js-lib/src/wv-linewise.ts#L218)*

###  messageError

• **messageError**: *[ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹[MessageErrorResponse](../interfaces/_wv_linewise_.messageerrorresponse.md)›[]* = [] as ResponseDispatcher<MessageErrorResponse>[]

*Defined in [wv-linewise.ts:213](https://github.com/forbesmyester/wv-linewise/blob/65da995/js-lib/src/wv-linewise.ts#L213)*

###  params

• **params**: *[ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹[ParamsResponse](../interfaces/_wv_linewise_.paramsresponse.md)›[]* = [] as ResponseDispatcher<ParamsResponse>[]

*Defined in [wv-linewise.ts:214](https://github.com/forbesmyester/wv-linewise/blob/65da995/js-lib/src/wv-linewise.ts#L214)*

###  paused

• **paused**: *[ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹[PausedResponse](../interfaces/_wv_linewise_.pausedresponse.md)›[]* = [] as ResponseDispatcher<PausedResponse>[]

*Defined in [wv-linewise.ts:216](https://github.com/forbesmyester/wv-linewise/blob/65da995/js-lib/src/wv-linewise.ts#L216)*

###  streamList

• **streamList**: *[ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹[StreamListResponse](../interfaces/_wv_linewise_.streamlistresponse.md)›[]* = [] as ResponseDispatcher<StreamListResponse>[]

*Defined in [wv-linewise.ts:215](https://github.com/forbesmyester/wv-linewise/blob/65da995/js-lib/src/wv-linewise.ts#L215)*

___

### `Private` respFnsOnce

### ▪ **respFnsOnce**: *object*

*Defined in [wv-linewise.ts:200](https://github.com/forbesmyester/wv-linewise/blob/65da995/js-lib/src/wv-linewise.ts#L200)*

###  details

• **details**: *[ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹[DetailsResponse](../interfaces/_wv_linewise_.detailsresponse.md)›[]* = [] as ResponseDispatcher<DetailsResponse>[]

*Defined in [wv-linewise.ts:206](https://github.com/forbesmyester/wv-linewise/blob/65da995/js-lib/src/wv-linewise.ts#L206)*

###  error

• **error**: *[ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹[ErrorResponse](../interfaces/_wv_linewise_.errorresponse.md)›[]* = [] as ResponseDispatcher<ErrorResponse>[]

*Defined in [wv-linewise.ts:201](https://github.com/forbesmyester/wv-linewise/blob/65da995/js-lib/src/wv-linewise.ts#L201)*

###  finished

• **finished**: *[ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹[FinishedResponse](../interfaces/_wv_linewise_.finishedresponse.md)›[]* = [] as ResponseDispatcher<FinishedResponse>[]

*Defined in [wv-linewise.ts:208](https://github.com/forbesmyester/wv-linewise/blob/65da995/js-lib/src/wv-linewise.ts#L208)*

###  line

• **line**: *[ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹[LineResponse](../interfaces/_wv_linewise_.lineresponse.md)›[]* = [] as ResponseDispatcher<LineResponse>[]

*Defined in [wv-linewise.ts:207](https://github.com/forbesmyester/wv-linewise/blob/65da995/js-lib/src/wv-linewise.ts#L207)*

###  messageError

• **messageError**: *[ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹[MessageErrorResponse](../interfaces/_wv_linewise_.messageerrorresponse.md)›[]* = [] as ResponseDispatcher<MessageErrorResponse>[]

*Defined in [wv-linewise.ts:202](https://github.com/forbesmyester/wv-linewise/blob/65da995/js-lib/src/wv-linewise.ts#L202)*

###  params

• **params**: *[ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹[ParamsResponse](../interfaces/_wv_linewise_.paramsresponse.md)›[]* = [] as ResponseDispatcher<ParamsResponse>[]

*Defined in [wv-linewise.ts:203](https://github.com/forbesmyester/wv-linewise/blob/65da995/js-lib/src/wv-linewise.ts#L203)*

###  paused

• **paused**: *[ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹[PausedResponse](../interfaces/_wv_linewise_.pausedresponse.md)›[]* = [] as ResponseDispatcher<PausedResponse>[]

*Defined in [wv-linewise.ts:205](https://github.com/forbesmyester/wv-linewise/blob/65da995/js-lib/src/wv-linewise.ts#L205)*

###  streamList

• **streamList**: *[ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹[StreamListResponse](../interfaces/_wv_linewise_.streamlistresponse.md)›[]* = [] as ResponseDispatcher<StreamListResponse>[]

*Defined in [wv-linewise.ts:204](https://github.com/forbesmyester/wv-linewise/blob/65da995/js-lib/src/wv-linewise.ts#L204)*
