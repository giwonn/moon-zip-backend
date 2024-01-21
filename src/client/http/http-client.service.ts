import { HttpClient } from '@/client/http/http-client.interface';

export abstract class HttpClientService {
  abstract get(url: string): Omit<HttpClient, 'body'>;
  abstract post(url: string): HttpClient;
  abstract put(url: string): HttpClient;
  abstract delete(url: string): HttpClient;
  abstract patch(url: string): HttpClient;
}
