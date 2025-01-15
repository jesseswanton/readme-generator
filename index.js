import inquirer from 'inquirer';
import colors from 'colors';
import fs from 'fs';
import generateMarkdown from './utils/generateMarkdown.js';

const questions = [
    "What is the title of the app?",
    "What is the app for (description)?",
    "How do you use the app?",
    "How do you install the app?",
    "How do you report issues with the app?",
    "What is the license for the app?",
    "How do you contribute to the app?",
    "What are some tests for the app?",
    "What is your GitHub username?",
    "What is your email address?"
];

function askColorChoice() {
    return inquirer.prompt([
        {
            type: 'list',
            message: 'Please select a color to use for the questions:',
            name: 'color',
            choices: [
                'cyan',
                'green',
                'magenta',
                'red',
                'blue',
                'yellow'
            ],
        }
    ]);
}

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) =>
        err ? console.error(err) : console.log(colors.green('Success! File written:', fileName))
    );
}

function init() {
    askColorChoice().then((colorResponse) => {
        const selectedColor = colorResponse.color;

        const prompts = questions.map((question, index) => {
            if (index === 5) {
                return {
                    type: 'list',
                    message: colors[selectedColor](question),
                    name: 'license',
                    choices: [
                        'MIT',
                        'Apache 2.0',
                        'GPL 3.0',
                        'BSD 3-Clause',
                        'None',
                    ],
                };
            }
            return {
                type: 'input',
                message: colors[selectedColor](question),
                name: [
                    'title',
                    'description',
                    'usage',
                    'installation',
                    'reporting',
                    'license',
                    'contribution',
                    'tests',
                    'GitHub',
                    'email',
                ][index],
            };
        });

        inquirer.prompt(prompts).then((response) => {
            const markdownContent = generateMarkdown(response);
            writeToFile('README.md', markdownContent);
        });
    });
}

init();