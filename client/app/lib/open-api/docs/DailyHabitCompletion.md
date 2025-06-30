# DailyHabitCompletion

Schema for individual habit completion on a specific day

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**habit** | [**HabitOut**](HabitOut.md) |  | [default to undefined]
**completed** | **boolean** |  | [default to undefined]
**completion_id** | **number** |  | [optional] [default to undefined]
**date** | **string** |  | [default to undefined]

## Example

```typescript
import { DailyHabitCompletion } from './api';

const instance: DailyHabitCompletion = {
    habit,
    completed,
    completion_id,
    date,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
