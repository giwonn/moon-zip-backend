import type { HttpClient } from '@/client/http/http-client.interface';
import { HttpClientService } from '@/client/http/http-client.service';
import { FetchClient } from '@/client/http/fetch/fetch.client';

export class FetchService extends HttpClientService {
  override get(url: string): Omit<HttpClient, 'body'> {
    return new FetchClient(url, 'GET');
  }

  override post(url: string): HttpClient {
    return new FetchClient(url, 'POST');
  }

  override put(url: string): HttpClient {
    return new FetchClient(url, 'PUT');
  }

  override delete(url: string): HttpClient {
    return new FetchClient(url, 'DELETE');
  }

  override patch(url: string): HttpClient {
    return new FetchClient(url, 'PATCH');
  }
}
