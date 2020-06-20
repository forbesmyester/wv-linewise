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

Defined in wv-linewise.ts:219

**Parameters:**

▪ **external**: *object*

Name | Type |
------ | ------ |
`invoke` | function |

**Returns:** *[RawWvLinewise](_wv_linewise_.rawwvlinewise.md)*

## Properties

### `Private` external

• **external**: *object*

Defined in wv-linewise.ts:221

#### Type declaration:

* **invoke**(): *function*

  * (`e`: string): *void*

## Methods

###  clear

▸ **clear**‹**T**›(`type`: T["type"]): *void*

Defined in wv-linewise.ts:257

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

Defined in wv-linewise.ts:235

**Parameters:**

Name | Type |
------ | ------ |
`d` | [Response](../modules/_wv_linewise_.md#response) |

**Returns:** *void*

___

### `Private` getResponseDispatcher

▸ **getResponseDispatcher**‹**T**›(`e`: T["type"]): *[ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹T›[]*

Defined in wv-linewise.ts:227

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

Defined in wv-linewise.ts:262

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

Defined in wv-linewise.ts:249

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

Defined in wv-linewise.ts:253

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

Defined in wv-linewise.ts:245

**Parameters:**

Name | Type |
------ | ------ |
`j` | [Request](../modules/_wv_linewise_.md#request) |

**Returns:** *void*

## Object literals

### `Private` respFns

### ▪ **respFns**: *object*

Defined in wv-linewise.ts:210

###  details

• **details**: *[ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹[DetailsResponse](../interfaces/_wv_linewise_.detailsresponse.md)›[]* = [] as ResponseDispatcher<DetailsResponse>[]

Defined in wv-linewise.ts:216

###  error

• **error**: *[ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹[ErrorResponse](../interfaces/_wv_linewise_.errorresponse.md)›[]* = [] as ResponseDispatcher<ErrorResponse>[]

Defined in wv-linewise.ts:211

###  finished

• **finished**: *[ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹[FinishedResponse](../interfaces/_wv_linewise_.finishedresponse.md)›[]* = [] as ResponseDispatcher<FinishedResponse>[]

Defined in wv-linewise.ts:218

###  line

• **line**: *[ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹[LineResponse](../interfaces/_wv_linewise_.lineresponse.md)›[]* = [] as ResponseDispatcher<LineResponse>[]

Defined in wv-linewise.ts:217

###  messageError

• **messageError**: *[ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹[MessageErrorResponse](../interfaces/_wv_linewise_.messageerrorresponse.md)›[]* = [] as ResponseDispatcher<MessageErrorResponse>[]

Defined in wv-linewise.ts:212

###  params

• **params**: *[ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹[ParamsResponse](../interfaces/_wv_linewise_.paramsresponse.md)›[]* = [] as ResponseDispatcher<ParamsResponse>[]

Defined in wv-linewise.ts:213

###  paused

• **paused**: *[ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹[PausedResponse](../interfaces/_wv_linewise_.pausedresponse.md)›[]* = [] as ResponseDispatcher<PausedResponse>[]

Defined in wv-linewise.ts:215

###  streamList

• **streamList**: *[ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹[StreamListResponse](../interfaces/_wv_linewise_.streamlistresponse.md)›[]* = [] as ResponseDispatcher<StreamListResponse>[]

Defined in wv-linewise.ts:214

___

### `Private` respFnsOnce

### ▪ **respFnsOnce**: *object*

Defined in wv-linewise.ts:199

###  details

• **details**: *[ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹[DetailsResponse](../interfaces/_wv_linewise_.detailsresponse.md)›[]* = [] as ResponseDispatcher<DetailsResponse>[]

Defined in wv-linewise.ts:205

###  error

• **error**: *[ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹[ErrorResponse](../interfaces/_wv_linewise_.errorresponse.md)›[]* = [] as ResponseDispatcher<ErrorResponse>[]

Defined in wv-linewise.ts:200

###  finished

• **finished**: *[ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹[FinishedResponse](../interfaces/_wv_linewise_.finishedresponse.md)›[]* = [] as ResponseDispatcher<FinishedResponse>[]

Defined in wv-linewise.ts:207

###  line

• **line**: *[ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹[LineResponse](../interfaces/_wv_linewise_.lineresponse.md)›[]* = [] as ResponseDispatcher<LineResponse>[]

Defined in wv-linewise.ts:206

###  messageError

• **messageError**: *[ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹[MessageErrorResponse](../interfaces/_wv_linewise_.messageerrorresponse.md)›[]* = [] as ResponseDispatcher<MessageErrorResponse>[]

Defined in wv-linewise.ts:201

###  params

• **params**: *[ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹[ParamsResponse](../interfaces/_wv_linewise_.paramsresponse.md)›[]* = [] as ResponseDispatcher<ParamsResponse>[]

Defined in wv-linewise.ts:202

###  paused

• **paused**: *[ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹[PausedResponse](../interfaces/_wv_linewise_.pausedresponse.md)›[]* = [] as ResponseDispatcher<PausedResponse>[]

Defined in wv-linewise.ts:204

###  streamList

• **streamList**: *[ResponseDispatcher](../interfaces/_wv_linewise_.responsedispatcher.md)‹[StreamListResponse](../interfaces/_wv_linewise_.streamlistresponse.md)›[]* = [] as ResponseDispatcher<StreamListResponse>[]

Defined in wv-linewise.ts:203
