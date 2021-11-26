[wv-linewise-js-lib](../README.md) › ["wv-linewise-fetch"](_wv_linewise_fetch_.md)

# Module: "wv-linewise-fetch"

## Index

### Classes

* [WvHeaders](../classes/_wv_linewise_fetch_.wvheaders.md)
* [WvLinewiseResponse](../classes/_wv_linewise_fetch_.wvlinewiseresponse.md)

### Interfaces

* [WvLinewiseFetchCurrent](../interfaces/_wv_linewise_fetch_.wvlinewisefetchcurrent.md)
* [WvLinewiseRequest](../interfaces/_wv_linewise_fetch_.wvlinewiserequest.md)
* [ZZZ](../interfaces/_wv_linewise_fetch_.zzz.md)

### Functions

* [getWvLinewiseFetch](_wv_linewise_fetch_.md#getwvlinewisefetch)
* [getWvLinewiseManagedFetch](_wv_linewise_fetch_.md#getwvlinewisemanagedfetch)

## Functions

###  getWvLinewiseFetch

▸ **getWvLinewiseFetch**(`wvl`: [WvLinewise](../classes/_wv_linewise_.wvlinewise.md), `responseStream`: string): *wvLinewiseFetch*

*Defined in [wv-linewise-fetch.ts:149](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise-fetch.ts#L149)*

**Parameters:**

Name | Type |
------ | ------ |
`wvl` | [WvLinewise](../classes/_wv_linewise_.wvlinewise.md) |
`responseStream` | string |

**Returns:** *wvLinewiseFetch*

___

###  getWvLinewiseManagedFetch

▸ **getWvLinewiseManagedFetch**(`wvl`: [WvLinewise](../classes/_wv_linewise_.wvlinewise.md), `responseStream`: string, `getTimeout`: function): *wvLinewiseManagedFetch*

*Defined in [wv-linewise-fetch.ts:298](https://github.com/forbesmyester/wv-linewise/blob/5431908/js-lib/src/wv-linewise-fetch.ts#L298)*

**Parameters:**

▪ **wvl**: *[WvLinewise](../classes/_wv_linewise_.wvlinewise.md)*

▪ **responseStream**: *string*

▪ **getTimeout**: *function*

▸ (`n`: number): *number*

**Parameters:**

Name | Type |
------ | ------ |
`n` | number |

**Returns:** *wvLinewiseManagedFetch*
