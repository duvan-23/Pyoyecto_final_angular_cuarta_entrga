import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuitarEstudianteComponent } from './quitar-estudiante.component';

describe('QuitarEstudianteComponent', () => {
  let component: QuitarEstudianteComponent;
  let fixture: ComponentFixture<QuitarEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuitarEstudianteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuitarEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
