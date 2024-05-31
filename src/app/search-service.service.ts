import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {

  constructor(private http: HttpClient) {}

  searchRepo(query: string) {
    return this.http.get(
      `https://api.github.com/search/repositories?q=${query}`
    ).pipe(  map((data:any) => {
      return data.items;
    }),);
  }
  getGridData() :Observable<any>{
    return this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/space-mission-data.json')
      
   }
}
