import { FirestoreSearch } from './firestore-search';
class FireSearch extends FirestoreSearch {

}
describe('FirestoreSearch', () => {
  it('should create an instance', () => {
    expect(new FireSearch()).toBeTruthy();
  });
});
