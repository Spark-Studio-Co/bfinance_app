# User Balance API Integration

This document describes the integration of the `/total` endpoint for fetching user's total balance.

## API Endpoint

**GET** `/api/v1/user/total`

**Headers:**

```
x-auth-token: {JWT_TOKEN}
Content-Type: application/json
```

**Response:**

```json
{
  "balance": {
    "totalBalance": 1348.75,
    "currency": "USD",
    "lastUpdated": "2025-01-25T10:30:00.000Z"
  }
}
```

## Components Affected

### TotalBalanceTab Component

- **Location**: `src/widgets/ui/TotalBalanceTab.tsx`
- **Changes**:
  - Replaced hardcoded balance with API data
  - Added loading state
  - Added error handling
  - Added currency symbol support

### New Custom Hook

- **Location**: `src/widgets/ui/hooks/useTotalBalance.ts`
- **Purpose**: Encapsulates balance logic with refresh functionality

## API Service

### AuthService

- **Location**: `src/shared/api/services/auth.ts`
- **New Method**: `getUserBalance()`
- **Mock Support**: Uses mock data in development mode

### React Query Hook

- **Location**: `src/shared/hooks/useApi.ts`
- **New Hook**: `useUserBalance(enabled)`
- **Cache**: 5-minute stale time
- **Auto-refresh**: On successful transactions

## Types

### UserBalance Interface

```typescript
interface UserBalance {
  totalBalance: number;
  currency: string;
  lastUpdated: string;
}
```

### UserBalanceResponse Interface

```typescript
interface UserBalanceResponse {
  balance: UserBalance;
}
```

## Features

1. **Loading States**: Shows loading indicator while fetching
2. **Error Handling**: Displays error message if API fails
3. **Currency Support**: Supports USD, EUR, GBP, JPY symbols
4. **Mock Data**: Uses mock data in development (`__DEV__`)
5. **Auto-refresh**: Balance updates after transactions
6. **Caching**: React Query caching with 5-minute stale time

## Mock Data

In development mode, the component uses mock data:

- Default balance: $15,348.75 USD
- Variants available: high, medium, low, zero, euro
- Simulated network delay: 500ms

## Usage

The `TotalBalanceTab` component now automatically:

1. Fetches balance on mount (if user is authenticated)
2. Shows loading state during fetch
3. Displays formatted balance with currency symbol
4. Handles errors gracefully
5. Refreshes data after successful transactions

No additional setup required - the integration is automatic when the user is authenticated.
