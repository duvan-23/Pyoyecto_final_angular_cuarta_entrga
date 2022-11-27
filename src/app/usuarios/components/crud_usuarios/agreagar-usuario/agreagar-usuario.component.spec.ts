import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreagarUsuarioComponent } from './agreagar-usuario.component';

describe('AgreagarUsuarioComponent', () => {
  let component: AgreagarUsuarioComponent;
  let fixture: ComponentFixture<AgreagarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgreagarUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgreagarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
