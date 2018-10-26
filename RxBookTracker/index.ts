import { Observable } from 'rxjs';
import { allBooks } from './data';

 let books = [];


function subscribe1(subscriber) {
    for (let book of allBooks) {
        subscriber.next(book);
    }
}

// let allBooksObservable$ = new Observable(subscribe1);

// let allBooksObservable$ = new Observable(subscriber1 => {
let allBooksObservable$ =  Observable.create(subscriber1 => {


    if (document.title !== "RxBookTracker") {
        subscriber1.error("incorret page title");
    }
    for (let book of allBooks) {
        subscriber1.next(book);
    }

    setTimeout(() => {
        subscriber1.complete();
    }, 2000)

    return () => { console.log("Executing Observable Finished. . . . "); }
});


allBooksObservable$.subscribe(book => { 
    console.log(book.title);
    books.push(book);
    console.log(books);

 });


 console.log(books);


