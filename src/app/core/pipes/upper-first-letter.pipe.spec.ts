import { UpperFirstLetterPipe } from './upper-first-letter.pipe';

fdescribe('UpperFirstLetterPipe', () => {
  const pipe = new UpperFirstLetterPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform "abc" to "Abc"', () => {
    expect(pipe.transform('abc')).toBe('Abc');
  })

});
