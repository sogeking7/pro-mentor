# PlansApi

All URIs are relative to *http://localhost:8000*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createUserPlan**](#createuserplan) | **POST** /api/v1/plans/ | Create User Plan|
|[**deleteUserPlan**](#deleteuserplan) | **DELETE** /api/v1/plans/{plan_id} | Delete User Plan|
|[**readUserPlans**](#readuserplans) | **GET** /api/v1/plans/ | Read User Plans|

# **createUserPlan**
> PlanOut createUserPlan(planSave)


### Example

```typescript
import {
    PlansApi,
    Configuration,
    PlanSave
} from './api';

const configuration = new Configuration();
const apiInstance = new PlansApi(configuration);

let planSave: PlanSave; //

const { status, data } = await apiInstance.createUserPlan(
    planSave
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **planSave** | **PlanSave**|  | |


### Return type

**PlanOut**

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

# **deleteUserPlan**
> deleteUserPlan()


### Example

```typescript
import {
    PlansApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PlansApi(configuration);

let planId: number; // (default to undefined)

const { status, data } = await apiInstance.deleteUserPlan(
    planId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **planId** | [**number**] |  | defaults to undefined|


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

# **readUserPlans**
> Array<PlanOut> readUserPlans()


### Example

```typescript
import {
    PlansApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PlansApi(configuration);

const { status, data } = await apiInstance.readUserPlans();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<PlanOut>**

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

