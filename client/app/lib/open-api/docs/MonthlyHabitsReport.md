# MonthlyHabitsReport

Schema for the complete monthly habits report

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**year** | **number** |  | [default to undefined]
**month** | **number** |  | [default to undefined]
**daily_reports** | [**Array&lt;DailyHabitsReport&gt;**](DailyHabitsReport.md) |  | [default to undefined]
**total_days** | **number** |  | [default to undefined]
**total_habits** | **number** |  | [default to undefined]

## Example

```typescript
import { MonthlyHabitsReport } from './api';

const instance: MonthlyHabitsReport = {
    year,
    month,
    daily_reports,
    total_days,
    total_habits,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
