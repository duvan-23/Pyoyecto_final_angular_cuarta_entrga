import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuitarCursoComponent } from './quitar-curso.component';

describe('QuitarCursoComponent', () => {
  let component: QuitarCursoComponent;
  let fixture: ComponentFixture<QuitarCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuitarCursoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuitarCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
