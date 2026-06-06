import { HttpError } from '../api/httpClient';

export function mapApiError(error: unknown): string {
  if (error instanceof HttpError) {
    const payload = error.payload as { message?: string } | null;
    if (payload?.message) {
      return payload.message;
    }

    switch (error.status) {
      case 400:
        return 'Please check the entered data.';
      case 401:
        return 'Please sign in to continue.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'The requested resource was not found.';
      case 409:
        return 'This metric could not be saved because of a conflict.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return 'Server error. Please try again later.';
    }
  }

  if (error instanceof TypeError) {
    return 'Unable to reach the server. Check your connection and try again.';
  }

  return 'Server error. Please try again later.';
}
