import type { HttpClient } from '@/client/http/http-client.interface';
import * as qs from 'qs';

export class FetchClient implements HttpClient {
  private readonly _url: string;
  private readonly _method: string;
  private readonly _defaultHeaders = {};
  private _headers?: Record<string, string>;
  private _queryParams?: Record<string, any>;
  private _body: Record<string, any> = {};

  constructor(url: string, method: string) {
    this._url = url;
    this._method = method;
  }

  headers(headers: Record<string, string>): this {
    this._headers = { ...headers };
    return this;
  }
  queryParams(params: Record<string, any>): this {
    this._queryParams = { ...params };
    return this;
  }

  body(body: Record<string, any>): this {
    this._body = { ...body };
    return this;
  }

  async send<T>(): Promise<T> {
    return await fetch(this._getUri(), this._getOptions()).then((res) =>
      res.json(),
    );
  }

  private _getUri() {
    return this._queryParams
      ? `${this._url}?${qs.stringify(this._queryParams, {
          arrayFormat: 'repeat',
        })}`
      : this._url;
  }

  private _getOptions() {
    const options: Record<string, any> = {
      method: this._method,
      headers: this._headers && { ...this._defaultHeaders, ...this._headers },
    };

    if (this._method !== 'GET') {
      options.body = JSON.stringify(this._body);
    }

    return options;
  }
}
