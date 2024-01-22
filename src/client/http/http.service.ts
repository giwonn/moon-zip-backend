import { HttpClient } from '@/client/http/http.client';
import { Type } from '@nestjs/common';

export class HttpService {
  constructor(private readonly httpClient: Type<HttpClient>) {}

  get(url: string): Omit<HttpClient, 'body'> {
    return new this.httpClient(url, 'GET');
  }

  post(url: string): HttpClient {
    return new this.httpClient(url, 'POST');
  }

  put(url: string): HttpClient {
    return new this.httpClient(url, 'PUT');
  }

  delete(url: string): HttpClient {
    return new this.httpClient(url, 'DELETE');
  }
  patch(url: string): HttpClient {
    return new this.httpClient(url, 'PATCH');
  }
}
