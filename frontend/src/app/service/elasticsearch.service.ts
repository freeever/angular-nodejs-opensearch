import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ElasticsearchService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.server_URL}/api`;
  }

  search(request: any): Observable<any>{
    return this.http.post(`${this.baseUrl}/geo/documents`, request);
  }
}
