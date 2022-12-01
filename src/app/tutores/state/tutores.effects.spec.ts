import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TutoresEffects } from './tutores.effects';

xdescribe('TutoresEffects', () => {
  let actions$: Observable<any>;
  let effects: TutoresEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TutoresEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(TutoresEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
