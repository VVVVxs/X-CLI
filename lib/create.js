#! /usr/bin/env node

import path from 'path';
import { fileURLToPath } from 'url'
import fs from 'fs-extra';
import inquirer from 'inquirer';

export default async function (name, option) {
    // 获取当前目录
    const cwd = process.cwd();
    // 需要创建的目录地址
    const targetAir = path.join(cwd, name);
    // 目录是否已经存在
    if (fs.existsSync(targetAir)) {

        // 是否为强制创建
        if (option.force) {
            await fs.remove(targetAir);
        } else {
            // 询问是否要覆盖
            const { action } = await inquirer.prompt([
                {
                    name: 'action',
                    type: 'list',
                    message: '目标文件夹已存在，请选择操作',
                    choices: [
                        {
                            name: '覆盖',
                            value: 'overwrite',
                        }, {
                            name: '退出',
                            value: false
                        }
                    ]
                }
            ]);
            if (!action) {
                return;
            } else if (action === 'overwrite') {
                console.log('\r\n 删除文件夹中...');
                fs.removeSync(targetAir);
                fs.mkdirSync(targetAir);
                console.log('\r\n 已删除');
            }
        }
    } else {
        fs.mkdirSync(targetAir);
    }

    // 询问要选择的模板
    if (option.template) {
        const { action } = await inquirer.prompt([
            {
                name: 'action',
                type: 'list',
                message: '请选择模板',
                choices: [
                    {
                        name: 'webpack-react-template',
                        value: 'webpack-react-template',
                    }, {
                        name: '退出',
                        value: false
                    }
                ]
            }
        ]);
        if (action) {
            const templatePath = path.resolve(fileURLToPath(import.meta.url), '../../templates', action)
            const copyFolderAndFile = (templateFolderPath, targetFolderPath) => {
                // 从文件模版目录中读取文件
                fs.readdir(templateFolderPath, (err, files) => {
                    if (err) throw err;

                    files.forEach((file) => {
                        fs.stat(path.join(templateFolderPath, file), (err, stats) => {
                            console.log('copy', path.join(targetFolderPath, file));
                            if (err) throw err;
                            if (stats.isFile()) {
                                const data = fs.readFileSync(path.join(templateFolderPath, file));
                                fs.writeFileSync(path.join(targetFolderPath, file), data);
                            } else {
                                fs.mkdir(path.join(targetFolderPath, file), () => {//创建目录
                                    copyFolderAndFile(path.join(templateFolderPath, file), path.join(targetFolderPath, file))
                                })
                            }
                        })
                    })
                })
            }
            copyFolderAndFile(templatePath, targetAir)
        }
    }else{
        console.log('请使用命令 -t 或者template 来选择脚手架模板')
    }
}