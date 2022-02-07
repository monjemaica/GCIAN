import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private url = 'http://localhost:5000/';

  constructor(private http: HttpClient) {
    console.log('Data service is working');
  }

  _httpGetRequest(endpoint) {
    return this.http.get(this.url + endpoint);
  }
  _httpGetRequestById(endpoint, id){
    return this.http.get(this.url + endpoint + id);
  }
  _httpPostRequest(endpoint, data){
    return this.http.post(this.url + endpoint, data);
  }
  _httpPostRequestById(endpoint, id, data){
    return this.http.put(this.url + endpoint + id, data);
  }
  _httpPostRequestNoData(endpoint){
    return this.http.post(this.url + endpoint, null);
  }
  _httpPutRequestById(endpoint, data){
    return this.http.put(this.url + endpoint, data);
  }
  _httpPutRequestByIdNoData(endpoint){
    return this.http.put(this.url + endpoint, null);
  }
  _httpDeleteById(endpoint, id){
    return this.http.delete(this.url + endpoint + id);
  }
}
