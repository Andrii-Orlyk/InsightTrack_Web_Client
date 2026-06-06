export interface ApiErrorResponse {
  statusCode: number;
  code: string;
  message: string;
  errors: string[];
}

export interface PagedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}
