
const program = require('commander');
const chalk = require('chalk');
const YAML = require('yaml')

const moment = require('moment');
var inquirer = require('inquirer');
var fs = require("fs")
var exec = require('child_process').exec;

function execute(cmd) {
    exec(cmd, function (error, _stdout, _stderr) {
        if (error) {
            console.error(error);
        }
        else {
            console.log("success");
        }
    });
}


const ROOT_PATH = './';
const POST_PATH = ROOT_PATH + 'source/' + '_posts/';

program.version('0.0.1');


function getBlankTemplate(blogName) {

    let createTime = moment().format('YYYY-MM-DD HH:mm:ss')


    header = {
        title: blogName,
        toc: true,
        date: createTime,
        thumbnail: '/images/2021/岁月的童话2.jpg',
        tags: ["other", "blog"],
        categories: ["other"],

    };

    let content = "---\n";
    content += YAML.stringify(header) + "\n";
    content += "---\n";
    content += "\n\n\n<!--more-->\n\n\n";

    return content;
}


inquirer
    .prompt([
        {
            name: 'switchGroup',
            type: 'string',
            message: 'please input group(default:other)',
            default: 'other',
        }, {
            name: 'postName',
            type: 'string',
            message: 'please input PostName',
            default: 'other',
        }
    ]
    )
    .then(answers => {
        let groupName = answers.switchGroup;
        let postName = answers.postName;

        console.log(chalk.blue(groupName));
        console.log(chalk.blue(groupName));

        var content = getBlankTemplate(postName, groupName);
        var haveDir = false
        try {
            var stat = fs.statSync(POST_PATH + groupName);
            haveDir = stat.isDirectory();
        } catch (error) {
            console.log(chalk.redBright("组目录不存在，准备创建"));
        }

        if (!haveDir) {
            fs.mkdirSync(POST_PATH + groupName);
            console.log(chalk.green("组目录创建成功"));
        }

        fs.appendFileSync(POST_PATH + groupName + '/' + postName + '.md', content);

        console.log("写入成功");

        console.log("code " + POST_PATH + groupName + '/' + postName + '.md');

        execute("code " + POST_PATH + groupName + '/' + postName + '.md');

        console.log(chalk.greenBright(content));

    });


