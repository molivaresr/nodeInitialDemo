const program = require('commander');
const Find = require('../cmds/find');
const find = new Find()
const message = require('../src/bienvenida')
program.description(message)

  program
  .command('json')
  .alias('j')
  .description('Mostrar todas las tareas en Json')
  .action(find.showJson)  
  program
    .command('sql')
    .alias('s')
    .description('Mostrar todas las tareas en SQL')
    .action(find.sql)
  program
    .command('mongo')
    .alias('m')
    .description('Mostrar todas las tareas en Mongo')
    .action(find.mongo)

program.parse(process.argv);