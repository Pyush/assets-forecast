import { AssetForecastElement } from './../datasource/datasource';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, catchError, throwError } from 'rxjs';

@Injectable()
export class HttpService {
  // Define API
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // HttpClient API get() method => Fetch asset list
  getAssets(): Observable<AssetForecastElement[]> {
    return this.http
      .get<AssetForecastElement[]>(this.apiURL + '/assets')
      .pipe(retry(1), catchError(this.handleError));
  }
  // HttpClient API get() method => Fetch assets
  getAssetById(id: any): Observable<AssetForecastElement> {
    return this.http
      .get<AssetForecastElement>(this.apiURL + '/assets/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }
  // HttpClient API post() method => Create Asset
  createAsset(asset: any): Observable<AssetForecastElement> {
    return this.http
      .post<AssetForecastElement>(
        this.apiURL + '/assets',
        JSON.stringify(asset),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  // HttpClient API put() method => Update Asset
  updateAsset(id: any, asset: any): Observable<AssetForecastElement> {
    return this.http
      .put<AssetForecastElement>(
        this.apiURL + '/assets/' + id,
        JSON.stringify(asset),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  // HttpClient API delete() method => Delete Asset
  deleteAsset(id: any) {
    return this.http
      .delete<AssetForecastElement>(this.apiURL + '/assets/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
