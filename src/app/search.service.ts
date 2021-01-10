import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http:HttpClient) { }

  getSearchResult(SbranchName,branch,searchVal):Observable<any>{
  return this.http.get(`https://api.github.com/search/${branch}?q=${searchVal}+in:${SbranchName}&per_page=15`)
  }
}
