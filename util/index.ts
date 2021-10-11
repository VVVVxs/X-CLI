import { resolve } from 'path';
import chalk from 'chalk';

export const getCwdPath = (relPath = '') => {
    return resolve(process.cwd(), relPath);
}

export const getDirPath = (relPath = '') => {
    return resolve(__dirname, relPath);
}

export const loggerTiming = (str = '', start = true) => {
    if (start) {
        console.time('Timing');
        console.log(chalk.cyan(`******** ${str} START *******`))
    } else {
        console.log(chalk.cyan(`******** ${str} END *******`))
        console.timeEnd('Timing')
    }
}