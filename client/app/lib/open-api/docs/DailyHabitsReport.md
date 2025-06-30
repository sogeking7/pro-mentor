# DailyHabitsReport

Schema for all habits report for a specific day

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**date** | **string** |  | [default to undefined]
**habit_completions** | [**Array&lt;DailyHabitCompletion&gt;**](DailyHabitCompletion.md) |  | [default to undefined]

## Example

```typescript
import { DailyHabitsReport } from './api';

const instance: DailyHabitsReport = {
    date,
    habit_completions,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
