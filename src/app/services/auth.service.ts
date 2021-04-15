import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_BASE_URL } from '../config/app.config';

@Injectable()

export class AuthService {
  constructor(private http: HttpClient) { }
    login(username: string, password: string) {
        return this.http.post<any>(`${API_BASE_URL}/family/login/`, { username: username, password: password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', user.token);
                }
                return user;
            }));
    }
    userdetail(id: number) {
        const token = localStorage.getItem('currentUser');
        return this.http.get<any>(`${API_BASE_URL}/family/user/${id}`,{
            headers: token ? { 
                Authorization: `token ${token}`
            } : null
        })
            .pipe(map(data => {
                return data
            }));
    }
    relationship() {
        const token = localStorage.getItem('currentUser');
        return this.http.get<any>(`${API_BASE_URL}/family/family_relative/relations/`,{
            headers: token ? { 
                Authorization: `token ${token}`
            } : null
        })
            .pipe(map(data => {
                return data
            }));
    }
    relative(relative: number, relation: number, ) {
        const token = localStorage.getItem('currentUser');
        return this.http.get<any>(`${API_BASE_URL}/family/family_relative/?relation=${relation}&added_by=${relative}`,{
            headers: token ? { 
                Authorization: `token ${token}`
            } : null
        })
            .pipe(map(data => {
                return data
            }));
    }
    deleterelative(id: number) {
        const token = localStorage.getItem('currentUser');
        return this.http.delete<any>(`${API_BASE_URL}/family/family_relative/${id}/`,{
            headers: token ? { 
                Authorization: `token ${token}`
            } : null
        })
            .pipe(map(data => {
                return data
            }));
    }
      updaterelation(id: number,relation : number) {
        const token = localStorage.getItem('currentUser');
        return this.http.patch<any>(`${API_BASE_URL}/family/family_relative/${id}/`,{relation: relation},{
            headers: token ? { 
                Authorization: `token ${token}`
            } : null
        })
            .pipe(map(data => {
                return data
            }));
    }
    userlist() {
        const token = localStorage.getItem('currentUser');
        return this.http.get<any>(`${API_BASE_URL}/family/family_member/`,{
            headers: token ? { 
                Authorization: `token ${token}`
            } : null
        })
            .pipe(map(data => {
                return data
            }));
    }
}
