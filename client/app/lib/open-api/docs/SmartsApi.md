# SmartsApi

All URIs are relative to *http://localhost:8000*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createUserSmart**](#createusersmart) | **POST** /api/v1/smarts/ | Create User Smart|
|[**deleteUserSmart**](#deleteusersmart) | **DELETE** /api/v1/smarts/{smart_id} | Delete User Smart|
|[**readUserSmarts**](#readusersmarts) | **GET** /api/v1/smarts/ | Read User Smarts|

# **createUserSmart**
> SmartOut createUserSmart(smartSave)


### Example

```typescript
import {
    SmartsApi,
    Configuration,
    SmartSave
} from './api';

const configuration = new Configuration();
const apiInstance = new SmartsApi(configuration);

let smartSave: SmartSave; //

const { status, data } = await apiInstance.createUserSmart(
    smartSave
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **smartSave** | **SmartSave**|  | |


### Return type

**SmartOut**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteUserSmart**
> deleteUserSmart()


### Example

```typescript
import {
    SmartsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SmartsApi(configuration);

let smartId: number; // (default to undefined)

const { status, data } = await apiInstance.deleteUserSmart(
    smartId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **smartId** | [**number**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**204** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **readUserSmarts**
> Array<SmartOut> readUserSmarts()


### Example

```typescript
import {
    SmartsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SmartsApi(configuration);

const { status, data } = await apiInstance.readUserSmarts();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<SmartOut>**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

