[wv-linewise-js-lib](../README.md) › ["wv-linewise"](../modules/_wv_linewise_.md) › [DetailsResponse](_wv_linewise_.detailsresponse.md)

# Interface: DetailsResponse

Once a [StreamStartRequest](_wv_linewise_.streamstartrequest.md) has been received, we will respond with
the details about that stream before sending [LineResponse](_wv_linewise_.lineresponse.md)s.

In future streams from files will likely be rewindable, but currently
[rewindable](_wv_linewise_.detailsresponse.md#rewindable) is always false.

## Hierarchy

* **DetailsResponse**

## Index

### Properties

* [name](_wv_linewise_.detailsresponse.md#name)
* [rewindable](_wv_linewise_.detailsresponse.md#rewindable)
* [type](_wv_linewise_.detailsresponse.md#type)

## Properties

###  name

• **name**: *string*

Defined in wv-linewise.ts:160

___

###  rewindable

• **rewindable**: *boolean*

Defined in wv-linewise.ts:161

___

###  type

• **type**: *[DETAILS](../enums/_wv_linewise_.response_type.md#details)*

Defined in wv-linewise.ts:159
