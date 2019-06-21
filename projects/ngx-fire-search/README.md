<p align="center">
  <h1 align="center">NgxFireSearch</h1>
  <p align="center">The goal is very simple! Improve searches on firestore using structure so it can understand and answer queries by strings. Transforming texts into object/map data structure. Pull requests are welcome.</p>
</p>

## Install

```bash
npm install @guiseek/ngx-fire-search --save
```

## Example use:

```ts
//song.model

import { FirestoreSearch, SearchIndex } from '@guiseek/ngx-fire-search';

export class SongModel extends FirestoreSearch {
  title: string
  artist: string
  album = ''
  artist_id?: string
  track_id?: string
  album_id?: string
  cover?: string
  album_api?: string
  artist_api?: string
  search?: {
    [key: string]: boolean
  }
  constructor(
    title: string,
    artist: string,
    album: string
  ) {
    super()
    this.title = title
    this.artist = artist
    this.album = album
    return this
  }
  public getSearchIndexes?(): SearchIndex {
    this.search = this.createSearchIndexes(
      `${this.title} ${this.artist} ${this.album}`
    )
    return this
  }
}
```

```ts
// song.service
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Song } from '../models/song.model';

@Injectable({ providedIn: 'root' })
export class SongService {
  private path = 'songs';
  constructor(
    private afs: AngularFirestore
  ) { }

  getAll() {
    return this.afs.collection<Song>(this.path)
      .valueChanges({ idField: 'id' })
  }
  create({title, artist, album}: Song) {
    const song = new Song(title, artist, album).createIndex()
    return this.afs.collection<Song>(this.path)
      .add(Object.assign({}, song))
  }
  search(value: string): Observable<Song[]> {
    return this.afs.collection<Song>(this.path, ref => {
      
      return ref.where(`search.${value}`, '==', true)

      // Bad way
      // return ref.orderBy('title').startAt(value).endAt(value + '\uf8ff')

    }).valueChanges().pipe(
      catchError(_ => {
        return of(null)
      })
    )
  }
}
```

# TODO
- [ ] Improv object map
- [ ] Pure function

---


This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.1.

## Code scaffolding

Run `ng generate component component-name --project ngx-fire-search` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project ngx-fire-search`.
> Note: Don't forget to add `--project ngx-fire-search` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build ngx-fire-search` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build ngx-fire-search`, go to the dist folder `cd dist/ngx-fire-search` and run `npm publish`.

## Running unit tests

Run `ng test ngx-fire-search` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
