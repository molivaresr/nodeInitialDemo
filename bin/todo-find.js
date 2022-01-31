const program = require('commander');
const Find = require('../cmds/find');
const find = new Find()
const message = require('../src/bienvenida')
program.description(message)

  program
    .command('json')
    .alias('j')
    .description('Buscar una tarea en Json')
    .action(find.json)
  program
    .command('sql')
    .alias('s')
    .description('Buscar en SQL')
    .action(find.sql)
  program
    .command('mongo')
    .alias('m')
    .description('Buscar en Mongo')
    .action(find.mongo)

program.parse(process.argv);