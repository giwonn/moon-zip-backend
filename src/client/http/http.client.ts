export interface HttpClient {
  queryParams(params: Record<string, any>): this;
  headers(headers: Record<string, string>): this;
  body(body: Record<string, any>): this;
  send<T = any>(): Promise<T>;
}
