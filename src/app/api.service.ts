import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/internal/operators";
import { Letter } from "./interfaces";

const Url = "assets/data.json";
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "jwt-token"
  })
};

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public getData() {
    return this.http.get(Url);
  }

  public send(letter: Letter): Observable<Letter> {
    return this.http
      .post<Letter>(Url, letter, httpOptions)
      .pipe(catchError(this.handleError("send", letter)));
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
