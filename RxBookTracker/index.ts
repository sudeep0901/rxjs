import { Observable, of, from , fromEvent, concat, merge } from 'rxjs';
import { allBooks, allReaders } from './data';

 let books = [];


function subscribe1(subscriber) {
    for (let book of allBooks) {
        subscriber.next(book);
    }
}

// let allBooksObservable$ = new Observable(subscribe1);

// let allBooksObservable$ = new Observable(subscriber1 => {
// let allBooksObservable$ =  Observable.create(subscriber1 => {


//     if (document.title !== "RxBookTracker") {
//         subscriber1.error("incorret page title");
//     }
//     for (let book of allBooks) {
//         subscriber1.next(book);
//     }

//     setTimeout(() => {
//         subscriber1.complete();
//     }, 2000)

//     return () => { console.log("Executing Observable Finished. . . . "); }
// });


// allBooksObservable$.subscribe(book => { 
//     console.log(book.title);
//     books.push(book);
//     console.log(books);

//  });


//  console.log(books);


// using "of" function to create observable

let source1$ = of('hello', 10 , true , allReaders[0].name);

// source1$.subscribe(value=>console.log(value));
// console.log("Using of function to create observable");


let source2$ = from(allBooks);

// source2$.subscribe(books=>console.log(books.title));

//combine observable
concat(source1$, source2$).subscribe(values=> console.log(values));

merge(source1$, source2$).subscribe(values=> console.log(values));





