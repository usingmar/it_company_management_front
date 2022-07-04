import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { Company } from './company';
import { CompanyService } from './company.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort, Sort} from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import { catchError, map, merge, startWith, switchMap } from 'rxjs';
import {MatProgressSpinner} from '@angular/material/progress-spinner';


export interface CompanyApi {
  items: Company[];
  total_count: number;
}

@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    styleUrls: [
        './company.component.css'
    ]
})

export class CompanyComponent implements /*OnInit,*/ AfterViewInit{
    displayedColumns: string[] = ['companyname', 'companytype', 'numberofworkers', 'countries', 'departments'];
    dataSource : MatTableDataSource<Company>;
    public companies: Company[];

    resultsLength = 0;
    isLoadingResults = true;
    isRateLimitReached = false;
    
    @ViewChild(MatSort) sort: MatSort;
    //@ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private companyService: CompanyService, private _liveAnnouncer: LiveAnnouncer){}

     ngAfterViewInit() {
      //this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
      merge(this.sort.sortChange /* this.paginator.page */)
        .pipe(
          startWith({}),
          switchMap(() => {
            this.isLoadingResults = true;
            return this.companyService.getCompanies().pipe(catchError(() => observableOf(null)));
          }),
          map((data)=> {
            // Flip flag to show that loading has finished.
            this.isLoadingResults = false;
            this.isRateLimitReached = data === null;
  
            if (data === null) {
              return [];
            }
  
            // Only refresh the result length if there is new data. In case of rate
            // limit errors, we do not want to reset the paginator to zero, as that
            // would prevent users from re-triggering requests.
            //this.resultsLength = data.length;
            return data;
          }),
        )
        .subscribe((companies: any) => this.companies = companies);
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }
    /* public getCompanies(): MatTableDataSource<Company>{

      let recievedCompanies: Company[] = [];
      this.companyService.getCompanies().subscribe({
        next: (response: Company[]) => {
          recievedCompanies = response;
          console.log(new MatTableDataSource<Company>(recievedCompanies));
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }});
        this.companies = recievedCompanies;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        return new MatTableDataSource<Company>(recievedCompanies);
    } */

    announceSortChange(sortState: Sort) {
      switch(sortState.active){
        case "companyname":  this.companies.sort((a,b) => {
          return a.companyname > b.companyname ? 1 : 0;
        }); break;
      }
      this.companies.sort((a,b) => {
        return a.companyname > b.companyname ? 1 : 0;
      })
    }
    
}  

function observableOf(arg0: null): any {
  throw new Error('Error occured');
}

