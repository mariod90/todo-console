const fs = require("fs");

let listadoTareas = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoTareas);
    fs.writeFile('db/data.json', data, (err) => {
        if(err) throw  new Error("No se pudo guardar", err);
    })
}

const cargarDB = () => {
    try{
        listadoTareas = require("../db/data.json");
    }catch (error){
        listadoTareas = [];
    }

}

const crear = (descripcion) => {
    cargarDB();
    let tarea = {
        descripcion,
        completado: false
    };
    listadoTareas.push(tarea);
    guardarDB();

    return tarea;
}

const getListado = () => {
    cargarDB();
    return listadoTareas;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoTareas.findIndex(tarea => tarea.descripcion === descripcion);
    if(index >= 0) {
        listadoTareas[index].completado = completado;
        guardarDB();
        return true;
    }else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();

    let listadoTemp = listadoTareas.filter(tarea => tarea.descripcion !== descripcion);

    if(listadoTareas.length === listadoTemp.length) {
        return false;
    }else{
        listadoTareas = listadoTemp;
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}