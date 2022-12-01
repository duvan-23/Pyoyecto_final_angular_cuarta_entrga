import * as fromTutores from './tutores.reducer';
import { selectTutoresState } from './tutores.selectors';

xdescribe('Tutores Selectors', () => {
  it('should select the feature state', () => {
    const result = selectTutoresState({
      [fromTutores.tutoresFeatureKey]: {}
    });

    // expect(result).toEqual(true);
  });
});
