import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    private readonly baseUrl = 'https://localhost:7189/api';

  private readonly http = inject(HttpClient);

    get<T>(endpoint: string, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
        return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { params, headers });
    }

    post<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
        return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, { headers });
    }

    put<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
        return this.http.put<T>(`${this.baseUrl}/${endpoint}`, body, { headers });
    }

    delete<T>(endpoint: string, headers?: HttpHeaders): Observable<T> {
        return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, { headers });
    }

    patch<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
        return this.http.patch<T>(`${this.baseUrl}/${endpoint}`, body, { headers });
    }
}
