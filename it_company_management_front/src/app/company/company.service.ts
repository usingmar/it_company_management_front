import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http'
import { Observable } from "rxjs";
import { Company } from "./company";
import { CreateCompanyDTO } from "./dto/createCompanyDTO";
import { UpdateCompanyDTO } from "./dto/updateCompany.DTO";
import { environment } from "src/environments/environment";

@Injectable()
export class CompanyService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}

    public getCompanies(): Observable<Company[]>{
        return this.http.get<Company[]>(`${this.apiServerUrl}/company`);
    }

    public getCompany(id: number): Observable<Company>{
        return this.http.get<Company>(`${this.apiServerUrl}/company/${id}`)
    }

    public addCompany(company: CreateCompanyDTO): Observable<Company>{
        return this.http.post<Company>(`${this.apiServerUrl}/company`, company);
    }

    public deleteCompany(id: number){
        return this.http.delete(`${this.apiServerUrl}/company/${id}`)
    }

    public putCompany(id: number, company: CreateCompanyDTO){
        return this.http.put(`${this.apiServerUrl}/company/${id}`, company);
    }

    public patchCompany(id: number, company: UpdateCompanyDTO){
        return this.http.patch(`${this.apiServerUrl}/company/${id}`, company);
    }
}