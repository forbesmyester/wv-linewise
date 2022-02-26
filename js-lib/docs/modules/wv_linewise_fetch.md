[wv-linewise-js-lib](../README.md) / [Modules](../modules.md) / wv-linewise-fetch

# Module: wv-linewise-fetch

## Table of contents

### Classes

- [WvLinewiseResponse](../classes/wv_linewise_fetch.WvLinewiseResponse.md)

### Interfaces

- [WvLinewiseFetchCurrent](../interfaces/wv_linewise_fetch.WvLinewiseFetchCurrent.md)
- [WvLinewiseRequest](../interfaces/wv_linewise_fetch.WvLinewiseRequest.md)

### Functions

- [getWvLinewiseFetch](wv_linewise_fetch.md#getwvlinewisefetch)
- [getWvLinewiseManagedFetch](wv_linewise_fetch.md#getwvlinewisemanagedfetch)

## Functions

### getWvLinewiseFetch

▸ **getWvLinewiseFetch**(`wvl`, `responseStream`): (`url`: `string`, `opts`: `RequestInit`) => `Promise`<`Response`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `wvl` | [`WvLinewise`](../classes/wv_linewise.WvLinewise.md) |
| `responseStream` | `string` |

#### Returns

`fn`

▸ (`url`, `opts`): `Promise`<`Response`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `opts` | `RequestInit` |

##### Returns

`Promise`<`Response`\>

| Name | Type |
| :------ | :------ |
| `parse` | (`current`: [`WvLinewiseFetchCurrent`](../interfaces/wv_linewise_fetch.WvLinewiseFetchCurrent.md), `command`: `string`, `lineStripped`: `string`) => [`WvLinewiseFetchCurrent`](../interfaces/wv_linewise_fetch.WvLinewiseFetchCurrent.md) |
| `process` | () => `Promise`<`boolean`\> |
| `request` | (`url`: `string`, `opts`: `RequestInit`) => [`WvLinewiseRequest`](../interfaces/wv_linewise_fetch.WvLinewiseRequest.md) |
| `serialize` | (`request`: [`WvLinewiseRequest`](../interfaces/wv_linewise_fetch.WvLinewiseRequest.md)) => `string` |
| `pendingCount` | () => `number` |

#### Defined in

[wv-linewise-fetch.ts:149](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise-fetch.ts#L149)

___

### getWvLinewiseManagedFetch

▸ **getWvLinewiseManagedFetch**(`wvl`, `responseStream`, `getTimeout`): (`url`: `string`, `opts`: `RequestInit`) => `Promise`<`Response`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `wvl` | [`WvLinewise`](../classes/wv_linewise.WvLinewise.md) |
| `responseStream` | `string` |
| `getTimeout` | (`n`: `number`) => `number` |

#### Returns

`fn`

▸ (`url`, `opts`): `Promise`<`Response`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `opts` | `RequestInit` |

##### Returns

`Promise`<`Response`\>

| Name | Type |
| :------ | :------ |
| `running` | () => `boolean` |

#### Defined in

[wv-linewise-fetch.ts:298](https://github.com/forbesmyester/wv-linewise/blob/2999a94/js-lib/src/wv-linewise-fetch.ts#L298)
