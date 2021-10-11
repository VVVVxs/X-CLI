#! /usr/bin/env node
import program from 'commander';
import ora from 'ora';
import figlet from 'figlet';
import cretae from '../lib/create.js'

const spinner = ora('请耐心等待')
program
    .version('0.1.0')
    .command('create <name>')
    .option('-t,--template', 'choose different development template')
    .option('-f,--force', 'overwrite target directory if it exist')
    .description('create a new project')
    .action(async (name, option) => {
        await cretae(name, option)
        spinner.start();
        setTimeout(() => {
            spinner.stop();
            console.log('\r\n' + figlet.textSync('Complete!', {
                horizontalLayout: 'default',
                verticalLayout: 'default',
                width: 80,
                whitespaceBreak: true
            }));
        }, 2000)

    })
program.parse();