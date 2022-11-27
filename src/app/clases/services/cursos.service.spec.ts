import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CursosService } from './cursos.service';
import { of } from 'rxjs';

fdescribe('CursosService', () => {
  let httpClientSpy: {get: jasmine.Spy}
  let service: CursosService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [
      HttpClientTestingModule
    ]});
    httpClientSpy = jasmine.createSpyObj('httpClientSpy', ['get']);
    service = new CursosService(httpClientSpy as any);
  });

  it('El servicio se instancia correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('El servicio retorna un arreglo de cursos mockeados', (done: DoneFn) => {
    const mockDatos =[
      {"nombre":"Angular","profesor":"Clementina","fechaInicio":"2022-11-07T03:07:27.103Z","fechaFinal":"2023-03-27T04:20:06.964Z","inscripcionAbierta":true,"imagen":"https://parentesis.com/imagesPosts/coder00.jpg","comision":"58979-0670","id":"1"},
      {"nombre":"JavaScript","profesor":"Hilda","fechaInicio":"2022-11-07T03:07:27.103Z","fechaFinal":"2023-03-27T04:20:06.964Z","inscripcionAbierta":true,"imagen":"https://parentesis.com/imagesPosts/coder00.jpg","comision":"30142-7907","id":"2"},
      {"nombre":"React Js","profesor":"Florian","fechaInicio":"2022-11-06T18:02:03.822Z","fechaFinal":"2023-10-16T17:49:05.926Z","inscripcionAbierta":true,"imagen":"https://parentesis.com/imagesPosts/coder00.jpg","comision":"31041-1850","id":"3"},
      {"nombre":"TypeScript","profesor":"Jack","fechaInicio":"2022-11-06T16:13:02.149Z","fechaFinal":"2023-07-28T07:31:04.669Z","inscripcionAbierta":false,"imagen":"https://parentesis.com/imagesPosts/coder00.jpg","comision":"34054","id":"4"}
    ];

    httpClientSpy.get.and.returnValue(of(mockDatos));// of para convertir el arreglo en tipo observable
    service.obtenerCursos().subscribe((cursos:Object) =>{
      const mockDatos2 =[
        {"nombre":"Angular","profesor":"Clementina","fechaInicio":"2022-11-07T03:07:27.103Z","fechaFinal":"2023-03-27T04:20:06.964Z","inscripcionAbierta":true,"imagen":"https://parentesis.com/imagesPosts/coder00.jpg","comision":"58979-0670","id":"1"},
        {"nombre":"JavaScript","profesor":"Hilda","fechaInicio":"2022-11-07T03:07:27.103Z","fechaFinal":"2023-03-27T04:20:06.964Z","inscripcionAbierta":true,"imagen":"https://parentesis.com/imagesPosts/coder00.jpg","comision":"30142-7907","id":"2"},
        {"nombre":"React Js","profesor":"Florian","fechaInicio":"2022-11-06T18:02:03.822Z","fechaFinal":"2023-10-16T17:49:05.926Z","inscripcionAbierta":true,"imagen":"https://parentesis.com/imagesPosts/coder00.jpg","comision":"31041-1850","id":"3"},
        {"nombre":"TypeScript","profesor":"Jack","fechaInicio":"2022-11-06T16:13:02.149Z","fechaFinal":"2023-07-28T07:31:04.669Z","inscripcionAbierta":false,"imagen":"https://parentesis.com/imagesPosts/coder00.jpg","comision":"34054","id":"4"}
      ];
      expect(cursos).toEqual(mockDatos2);
      done();
    });
  });
});
