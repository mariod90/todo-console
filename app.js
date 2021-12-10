const argv = require("./config/yargs").argv;
const colors = require("colors");

const tarea = require('./tareas/tareas');

console.log(argv);

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let todo = tarea.crear(argv.descripcion);
        console.log(todo);
        break;
    case 'listar':
        let listado = tarea.getListado();
        for(let tarea of listado) {
            console.log('========== Tarea =========='.green);
            console.log(tarea.descripcion);
            console.log("Estado", tarea.completado);
            console.log('============================'.green);
        }
        break;
    case 'actualizar':
        let actualizado = tarea.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
        break;
    case 'borrar':
        let borrado = tarea.borrar(argv.descripcion);
        console.log(borrado);
        break;
    default:
        console.log("Comando no válido.");
}