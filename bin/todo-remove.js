const program = require('commander');
const Del = require('../cmds/delete');
const del = new Del() 
const message = require('../src/bienvenida')
program.description(message)

program
    .command('json')
    .alias('j')
    .description('Eliminar en Json')
    .action(del.json)
program
    .command('sql')
    .alias('s')
    .description('Eliminar en SQL')
    .action(del.sql)
program
    .command('mongo')
    .alias('m')
    .description('Eliminar en Mongo')
    .action(del.mongo)

program.parse(process.argv);