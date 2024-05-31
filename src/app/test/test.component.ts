import { KeyValuePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription, concatMap, debounceTime, distinctUntilChanged, filter, from, fromEvent, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SearchServiceService } from '../search-service.service';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  @ViewChild('btn', { static: true }) button: ElementRef;
  constructor(private http: HttpClient,
    private keyValue: KeyValuePipe,private service:SearchServiceService) { }
    search = new FormControl();
    results: any[] ;
    subscription: Subscription;
public obs:Observable<string>=new Observable((observer) => {
  console.log("Observable starts")
  observer.next("1")
  observer.next("2")
  observer.next("3")
  observer.complete()
  observer.error("some error")
  observer.next("4")
  observer.next("5")
});
getObservableData(){
  console.log('-----Observable-----');
 this.subscription= this.obs.
  subscribe( 
    {
      next: (val) => {
        console.log(val);
      }, //next callback
      error: (error) => {
        console.log('error');
      }, //error callback
      complete:() => {
        console.log('Completed');
       } //complete callback
    }
  );
  
  console.log('-----create-----');
  const obsUsingCreate = Observable.create( (observer:any) => {
    observer.next( '1' )
    observer.next( '2' )
    observer.next( '3' )
    observer.complete()
  })
   obsUsingCreate
     .subscribe((val:any) => console.log(val),
             (error:any)=> console.log("error"),
             () => console.log("complete"))

             console.log('-----Of-----');          
             const obsof3 = of(1, 2, 3);
             obsof3.subscribe(val => console.log(val),
               error => console.log("error"),
               () => console.log("complete"))

             console.log('-----From-----');          
             const array=[1,2,3,4,5,6,7]
  const obsof1=from(array);
  obsof1.subscribe(val => console.log(val),
           error=> console.log("error"),
          () => console.log("complete"))

}
  ngOnInit(): void {
   
    this.getObservableData()
    // this.getAsyncData()
  }
 
  $dogsBreed(): Observable<any> {
    return this.http.get<any>("https://dog.ceo/api/breeds/list/all")
  }
 
  getAsyncData(){
   

    console.log('-----MAP-----');
    let  srcName$ = from(['John', 'Tom', 'Katy'])
   srcName$
   .pipe(map(data => {
     return data.toUpperCase();
   }))
   .subscribe(data => console.log(data))
   console.log('----FILTER-----');
   of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
   .pipe(
     filter((val) => {
       return val % 2 == 0;
     })
   )
   .subscribe({
     next: (val) => console.log(val),
   });

   console.log('----TAP-----');
   of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
   .pipe(
    filter((val) => {
      return val % 2 == 0;
    }),
     tap((val) => {
       console.log('Tap 1->' + val);
     }),
     map((val) => {
      return val * 2 
    }),tap((val) => {
      console.log('Tap 2->' + val);
    }),   )
   .subscribe({ next: (val) => console.log('at Subscriber ' + val) });



   this.search.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((search) => {
          return this.service.searchRepo(search); // Cancel previous requests and switch to the latest one
        }),
        

      )
      .subscribe((results) => {
       this.results =  results ;
      });
    
  }

  fetchDataWithMergeMap() {
    const endpoints = ['/api/data1', '/api/data2', '/api/data3'];

    from(endpoints)
      .pipe(
        mergeMap((endpoint) => this.http.get<string[]>(endpoint))
      )
      .subscribe((result) => {
       // this.data = [...this.data, ...result];
      });

  //    this.data
  // .getUserByName('Carley84')
  // .pipe(
  //   map((users) => {
  //     const user = users[0];
  //     return user;
  //   }),
  //   mergeMap(user => {
  //     const articles = this.data.getArticleByUser(user.id);
  //     const posts = this.data.getPostByUser(user.id);
  //     return forkJoin({articles, posts});
  //   })
  // )
  // .subscribe({
  //   next: (value) => console.log('Final Value:', value),
  //   complete: () => console.log('Completes with Success!'),
  //   error: (err) => console.log(err),
  // });
  }

  dataUpdateWithConcatMap(){
    this.search.valueChanges.pipe(
      filter(() => this.search.valid),
      concatMap((changes) => this.updateRecord(changes))
    ).subscribe(data => console.log('update notification => ', data));

  }
  updateRecord(changes:any): Observable<any> {
    const id = 25;
    return this.http.put(
      `https://dummy.restapiexample.com/public/api/v1/update/${id}`,
      JSON.stringify(changes)
    );
  }

  buttonClick() {
    fromEvent(this.button.nativeElement, 'click').pipe(debounceTime(2000))
        // .pipe(map( ev => (ev as any).clientX))
        .subscribe(res => console.log(res));
  }
  
    
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
