import { ReverseAlphabeticalPipe } from './reverse-alphabetical.pipe';

describe('AlphabeticalPipe', () => {
  it('create an instance', () => {
    const pipe = new ReverseAlphabeticalPipe();
    expect(pipe).toBeTruthy();
  });
});
