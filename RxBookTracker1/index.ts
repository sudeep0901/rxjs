import { Observable, of, from, fromEvent, concat, Subscriber, interval } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, filter } from 'rxjs/operators';

import { allBooks, allReaders } from './data';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

// let allBooksObservable$ = Observable.create(subscriber => {

//   if (document.title !== 'RxBookTracker') {
//     subscriber.error('Incorrect page title.');
//   }

//   for (let book of allBooks) {
//     subscriber.next(book);
//   }

//   setTimeout(() => {
//     subscriber.complete();
//   }, 2000);

//   return () => console.log('Executing teardown code.');

// });

// allBooksObservable$.subscribe(book => console.log(book.title));


// let source1$ = of('hello', 10, true, allReaders[0].name);

// //source1$.subscribe(value => console.log(value));

// let source2$ = from(allBooks);

// //source2$.subscribe(book => console.log(book.title));

// concat(source1$, source2$)
//   .subscribe(value => console.log(value));


// let button = document.getElementById('readersButton');

// fromEvent(button, 'click')
//   .subscribe(event => {
//     console.log(event);

//     let readersDiv = document.getElementById('readers');

//     for (let reader of allReaders) {
//       readersDiv.innerHTML += reader.name + '<br>';
//     }
//   });

//#region 


let button = document.getElementById('readersButton');

fromEvent(button, 'click')
  .subscribe(event => {
    ajax('/api/readers')
      .subscribe(ajaxResponse => {
        console.log(ajaxResponse);
        let readers = ajaxResponse.response;

        let readersDiv = document.getElementById('readers');

        for (let reader of readers) {
          readersDiv.innerHTML += reader.name + '<br>';
        }

      });
  });

//#endregion

let books$ = from(allBooks);

let bookObserver = {

  next: book => console.log(`TITLE: ${book.title}`),
  err: err => console.log(`error: ${err}`),
  complete: () => console.log('Completed: All Done')
};

books$.subscribe(bookObserver);

books$.subscribe(
  book => console.log(`TITLE: ${book.title}`),
  err => console.log(`error: ${err}`),
  () => console.log('Completed: All Done')
);


books$.subscribe(
  null,
  null,
  () => console.log('Completed: All Done')
);

//multiple observers for an observables

let currenttime$ = new Observable(subscriber => {

  const timeString = new Date().toLocaleTimeString();
  subscriber.next(timeString);
  subscriber.complete();
});

currenttime$.subscribe(
  currentTime => console.log(`observer 1 : ${currentTime}`)
);

setTimeout(() => {
  currenttime$.subscribe(
    currentTime => console.log(`observer 2 : ${currentTime}`)
  );
}, 1000);

setTimeout(() => {
  currenttime$.subscribe(
    currentTime => console.log(`observer 3 : ${currentTime}`)
  );
}, 1000);


let timerButton = document.getElementById('timerButton');
console.log(timerButton);
let timesDiv = document.getElementById('timers');


// let timer$ = interval(1000); //Creating Observable

let timer$ = new Observable(subscriber => {
  let i = 0;
  let intervalID = setInterval(() => {
    subscriber.next(i++)
  }, 1000);

  return () => {
    console.log("Executing teardown code");
    clearInterval(intervalID);
  }
});

let timerSubscription = timer$.subscribe(
  value => timesDiv.innerHTML += `${new Date().toLocaleTimeString()}  (${value}) <br />`,
  null,
  () => console.log("completed")

);

let timerConsoleSubscription = timer$.subscribe(
  value => console.log(`${new Date().toLocaleTimeString()}  (${value}) <br />`),

);

// can canel more than once suscription at once
timerSubscription.add(timerConsoleSubscription);
fromEvent(timerButton, 'click').subscribe(
  event => timerSubscription.unsubscribe() // wont get completion code when cancelled subs

);





let source$ = of(1, 2, 3, 4);

source$.pipe(
  map(value => value * 2),
  filter(mappedValue => mappedValue > 5)
)
  .subscribe(
    finalValue => console.log(finalValue)
  );
