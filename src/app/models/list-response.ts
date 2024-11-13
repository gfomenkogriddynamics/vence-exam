export interface ListResponse<T> {
  offset: number;
  limit: number;
  total: number;
  result: T[];
}
