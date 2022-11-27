import { NombresPipe } from './nombres.pipe';

describe('NombresPipe', () => {
  it('create an instance', () => {
    const pipe = new NombresPipe();
    expect(pipe).toBeTruthy();
  });
});
