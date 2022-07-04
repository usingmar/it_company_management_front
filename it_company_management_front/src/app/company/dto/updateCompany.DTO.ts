import { Country } from "../../country/country";
import { Department } from "../../department/department";

export class UpdateCompanyDTO{
    companyname?: string;
    companytype?: string;
    numberofworkers?: number;
    countries?: Country[];
    departments?: Department[];
}