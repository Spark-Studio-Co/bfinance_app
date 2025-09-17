# Centralized Error Handling with Zustand

## Overview

This system provides centralized error handling throughout your React Native app using Zustand for state management.

## Files Created

- `src/shared/stores/errorStore.ts` - Zustand store for error state management
- `src/shared/ui/GlobalErrorDisplay.tsx` - Component to display errors globally
- `src/shared/hooks/useErrorHandler.ts` - Hook for easy error handling
- `src/shared/stores/index.ts` - Store exports

## Usage

### 1. Add GlobalErrorDisplay to your main app component

```tsx
import { GlobalErrorDisplay } from '~/shared/ui';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      {/* Your app content */}
      <YourAppContent />

      {/* Global error display - should be at the top level */}
      <GlobalErrorDisplay />
    </View>
  );
}
```

### 2. Use the error handler hook in components

```tsx
import { useErrorHandler } from '~/shared/hooks';

export const SomeComponent = () => {
  const { showError, showWarning, showInfo, handleAsyncError } = useErrorHandler();

  // Simple error display
  const handleButtonPress = () => {
    showError('Something went wrong!');
  };

  // Show warning
  const handleWarning = () => {
    showWarning('This is a warning message');
  };

  // Show info
  const handleInfo = () => {
    showInfo('Information message', true, 3000);
  };

  // Handle async operations with automatic error handling
  const handleAsyncOperation = async () => {
    const result = await handleAsyncError(
      async () => {
        // Your async operation
        const response = await fetch('/api/data');
        if (!response.ok) throw new Error('Failed to fetch data');
        return response.json();
      },
      'Failed to load data' // Custom error message
    );

    if (result) {
      // Handle success
      console.log('Data loaded:', result);
    }
    // Error is automatically displayed
  };

  return (
    <View>
      <TouchableOpacity onPress={handleButtonPress}>
        <Text>Show Error</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleAsyncOperation}>
        <Text>Load Data</Text>
      </TouchableOpacity>
    </View>
  );
};
```

### 3. Direct store usage (advanced)

```tsx
import { useErrorStore } from '~/shared/stores';

export const AdvancedComponent = () => {
  const { addError, errors, removeError, clearAllErrors } = useErrorStore();

  const showCustomError = () => {
    addError({
      message: 'Custom error with specific settings',
      type: 'error',
      autoDismiss: false, // Won't auto-dismiss
    });
  };

  return (
    <View>
      <Text>Active errors: {errors.length}</Text>
      <TouchableOpacity onPress={showCustomError}>
        <Text>Show Persistent Error</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={clearAllErrors}>
        <Text>Clear All Errors</Text>
      </TouchableOpacity>
    </View>
  );
};
```

## Features

- **Auto-dismiss**: Errors can automatically disappear after a set duration
- **Multiple error types**: Support for error, warning, and info messages
- **Manual dismissal**: Users can close errors manually
- **Async error handling**: Built-in wrapper for async operations
- **Centralized state**: All errors managed in one place
- **TypeScript support**: Full type safety

## Error Types

- `error` - Red background for critical errors
- `warning` - Orange/yellow background for warnings
- `info` - Blue background for informational messages

## Configuration

Each error supports:

- `message`: The error text to display
- `type`: 'error' | 'warning' | 'info'
- `autoDismiss`: Whether to auto-hide (default: true)
- `duration`: How long to show before auto-hiding (default: 5000ms)
