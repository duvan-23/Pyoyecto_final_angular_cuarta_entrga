# Proyecto_final_angular_cuarta_parte
## Agrega Lazy loading, Autenticación, Guards y pruebas unitarias
## Ngrx actions,effects,reducer,selectors
###### -los usuarios,tutores y cursos se consumen la Api Rest de https://mockapi.io/  y los estudaintes de manera local
###### -los modulos estan con lazy loading por lo cual cargan hasta cuando entran al modulo
###### -se tienen 3 tipos de usuarios, el que solo tiene permisos de cliente, el que tiene permisos de Admin y Super Admin
  ###### &ensp; &ensp; cliente: podra acceder la seccion de inicio, estudiantes, admin cursos y cursos pero solo podra consultar, no podra  realizar las acciones de editar, eliminar  o agregar
  ###### &ensp; &ensp; Adim: podra acceder la seccion de inicio, estudiantes, admin cursos y cursos , podra realizar las acciones de editar, eliminar  o agregar
  ###### &ensp; &ensp; Super Admin: podra ingresar a la sección de Usuarios
 ###### A un Usuario se le podra habilitar Admin y Super Admin para que tenga acceso a todas las funcionalidades 
###### -se crea Test unitario para el servicio CursosService, donde se simula el httpClient, el consumo del Api Rest y retorno de datos
###### -se crea Test unitario para el componente EditarEstudiantesComponent, donde se valida:
  ###### &ensp; &ensp; si no se diligencian todos los campos requeridos el formulario sea invalido
  ###### &ensp; &ensp; si se diligencian todos los campos requeridos en el formulario y el formato de los campos es correcto sea valido
  ###### &ensp; &ensp; si se escribe el correo sin el formato requerido el formulario sea invalido
  ###### &ensp; &ensp; si se llama la funcion guardar se cierra el Dialogo correctamente
  ###### &ensp; &ensp; si retorna bien los datos del formulario
###### -se crea un Logout para salir de la session
###### -se crean 3 Guards:
  ###### &ensp; &ensp; validar si es Admin
  ###### &ensp; &ensp; validar si esta Autenticado
  ###### &ensp; &ensp; validar si es Super Admin
###### -sección Estudiantes: podra ver los estudiantes en una tabla y si tiene permisos puede crear,editar,eliminar y visualizar un estudiante, si se oprime Agregar, icono editar o icono eliminar muestra un dialogo para realizar la acción, si oprime el icono de visualizar lo redirige a la ruta child de estudiantes la cual se llama   vista, ahi podra ver la información personal del estudiante y los cursos a los que esta inscrito, hay dos botones para poder agregar o quitar Cursos, para agregar un    curso se debe tener en cuenta que solo listara los cursos que esten con matricula abierta.
###### -sección Admin Cursos: podra ver los cursos en una tabla y si tiene permisos puede crear,editar y visualizar un curso, si se oprime Agregar o icono editar muestra un dialogo para realizar la acción, si oprime el icono de visualizar lo redirige a la ruta child de cursos la cual se llama vista, ahi podra ver la información del curso  y los estudiante que estan inscritos a ese curso, hay un boton de quitar estudiantes que esten inscritos a ese curso.
###### -sección Cursos: muestra Cards con todos los cursos que hay y con el icono de visualizar para poder ver el curso en especifico y poder quitar estudiantes
###### -sección Usuarios: solo se habilitara para el que tenga habilitado Super Admin, ahi podra ver los usuarios en una tabla y agregar o editar usuarios existentes.
###### -sección Tutores : podra ver los tutores en una tabla y si tiene permisos puede crear,editar y eliminar un tutor, hay un formulario para inscribir a un tutor a un curso, si oprime el icono editar muestra un dialogo para realizar la acción de editar y guardar los nuevos datos, tambien hay un icono de eliminar para eliminar el tutor.
###### Para la parte de Tutores se utilizo Ngrx, se crearon los effects,actions,reducer y selectors para manejar el servicio de tutores y realizar las acciones crear,editar,eliminar y visualizar  tutores
###### En el formulario de Login en la parte inferior hay 3 usuarios de prueba para que pueda probar el proyecto
###### para los test unitarios se habilitan solo para el servicio CursosService y componente EditarEstudiantesComponent con fdescribe, se corre el test con ng test
