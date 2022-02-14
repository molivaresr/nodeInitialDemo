#!/usr/bin/env node

const program = require('commander');
const message = require('../src/bienvenida')

program
    .description(message)
    .version('0.0.3','-v, --version','Para consultar la versión del programa')
    .command('add','Crear una nueva tarea (ej. todo a json)').alias('a')
    .command('remove','Eliminar una tarea (ej. todo r json)').alias('r')
    .command('state','Modificar el estado de una tarea (ej. todo s json)').alias('s')
    .command('find','Buscar una tarea (ej. todo f json)').alias('f')
    .command('show','Mostrar todas las tareas (ej. todo sh json)').alias('sh')

program.parse(process.argv);