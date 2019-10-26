import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Constants } from '../constants';

export class Api {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: Constants.urls.baseServerUrl,
    });
  }

  public async getPublicKey(): Promise<{ publicKey: number[] }> {
    const options: AxiosRequestConfig = {
      method: 'GET',
      url: '/publicKey',
    };

    return this.sendRequest(options);
  }

  public async sendMessage(): Promise<void> {
    const opts: AxiosRequestConfig = {
      method: 'POST',
      url: '/message',
    };

    return this.sendRequest(opts);
  }

  private async sendRequest(options: AxiosRequestConfig): Promise<any> {
    const { data } = await this.instance.request(options);

    return data;
  }
}
