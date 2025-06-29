# HabitsApi

All URIs are relative to *http://localhost:8000*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createUserHabit**](#createuserhabit) | **POST** /api/v1/habits/ | Create User Habit|
|[**deleteUserHabit**](#deleteuserhabit) | **DELETE** /api/v1/habits/{habit_id} | Delete User Habit|
|[**readHabitTypes**](#readhabittypes) | **GET** /api/v1/habits/habit_types | Read Habit Types|
|[**readUserHabits**](#readuserhabits) | **GET** /api/v1/habits/ | Read User Habits|
|[**saveHabitCompletion**](#savehabitcompletion) | **POST** /api/v1/habits/save_habit_completion/{habit_id} | Save Habit Completion|
|[**todayHabitCompletions**](#todayhabitcompletions) | **POST** /api/v1/habits/today_habit_completions | Today Habit Completions|
|[**updateUserHabit**](#updateuserhabit) | **PUT** /api/v1/habits/{habit_id} | Update User Habit|

# **createUserHabit**
> HabitOut createUserHabit(habitCreate)


### Example

```typescript
import {
    HabitsApi,
    Configuration,
    HabitCreate
} from './api';

const configuration = new Configuration();
const apiInstance = new HabitsApi(configuration);

let habitCreate: HabitCreate; //

const { status, data } = await apiInstance.createUserHabit(
    habitCreate
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **habitCreate** | **HabitCreate**|  | |


### Return type

**HabitOut**

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

# **deleteUserHabit**
> deleteUserHabit()


### Example

```typescript
import {
    HabitsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new HabitsApi(configuration);

let habitId: number; // (default to undefined)

const { status, data } = await apiInstance.deleteUserHabit(
    habitId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **habitId** | [**number**] |  | defaults to undefined|


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

# **readHabitTypes**
> Array<HabitTypeOut> readHabitTypes()


### Example

```typescript
import {
    HabitsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new HabitsApi(configuration);

const { status, data } = await apiInstance.readHabitTypes();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<HabitTypeOut>**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **readUserHabits**
> Array<HabitOut> readUserHabits()


### Example

```typescript
import {
    HabitsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new HabitsApi(configuration);

const { status, data } = await apiInstance.readUserHabits();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<HabitOut>**

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

# **saveHabitCompletion**
> HabitCompletionOut saveHabitCompletion(habitCompletionSave)


### Example

```typescript
import {
    HabitsApi,
    Configuration,
    HabitCompletionSave
} from './api';

const configuration = new Configuration();
const apiInstance = new HabitsApi(configuration);

let habitId: number; // (default to undefined)
let habitCompletionSave: HabitCompletionSave; //

const { status, data } = await apiInstance.saveHabitCompletion(
    habitId,
    habitCompletionSave
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **habitCompletionSave** | **HabitCompletionSave**|  | |
| **habitId** | [**number**] |  | defaults to undefined|


### Return type

**HabitCompletionOut**

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

# **todayHabitCompletions**
> Array<HabitCompletionOut> todayHabitCompletions()


### Example

```typescript
import {
    HabitsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new HabitsApi(configuration);

let timezone: string; //User\'s timezone (optional) (default to 'UTC')

const { status, data } = await apiInstance.todayHabitCompletions(
    timezone
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **timezone** | [**string**] | User\&#39;s timezone | (optional) defaults to 'UTC'|


### Return type

**Array<HabitCompletionOut>**

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

# **updateUserHabit**
> HabitOut updateUserHabit(habitUpdate)


### Example

```typescript
import {
    HabitsApi,
    Configuration,
    HabitUpdate
} from './api';

const configuration = new Configuration();
const apiInstance = new HabitsApi(configuration);

let habitId: number; // (default to undefined)
let habitUpdate: HabitUpdate; //

const { status, data } = await apiInstance.updateUserHabit(
    habitId,
    habitUpdate
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **habitUpdate** | **HabitUpdate**|  | |
| **habitId** | [**number**] |  | defaults to undefined|


### Return type

**HabitOut**

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

