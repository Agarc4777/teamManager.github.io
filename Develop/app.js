const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employees = [];
addEmployee();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function addEmployee() {
    inquirer.prompt(
        [
            {
                type: "list",
                name: "type",
                choices: ["Engineer", "Intern", "Manager", "None at the moment"],
                message: "Choose what style of employee you would like to add to your list. If none, choose 'none at the moment' option.",
            }
        ]
    ).then(input => {
        if (input.type === "Engineer") {
            addEngineer();
        }
        else if (input.type === "Intern") {
            addIntern();
        }
        else if (input.type === "Manager") {
            addManager();
        }
        else if (input.type === "None") {
            console.log("All finished.")
        }
    })
};
function addIntern() {
    inquirer.prompt(
        [
            {
                type: 'input',
                name: 'Name',
                message: "What is the Intern's name?",
            },
            {
                type: 'input',
                name: 'id',
                message: "What is the Intern's employee ID?",
            },
            {
                type: 'input',
                name: 'email',
                message: "What is the Intern's email address?",
            },
            {
                type: 'input',
                name: 'school',
                message: "What school does the Intern go to?",
            }
        ]).then(input => {
            const intern = new Intern(input.Name, input.id, input.email, input.school);
            employees.push(intern);
            createEmployee();
        },
    )
}

function addManager() {
    inquirer.prompt(
        [
            {
                type: 'input',
                name: 'Name',
                message: "What is the Manager's name?",
            },
            {
                type: 'input',
                name: 'id',
                message: "What is the Manager's employee ID?",
            },
            {
                type: 'input',
                name: 'email',
                message: "What is the Manager's email address?",
            },
            {
                type: 'input',
                name: 'officeNumber',
                message: "What is the Manager's Office number?",
            }
        ]).then(input => {
            const manager = new Manager(input.Name, input.id, input.email, input.officeNumber);
            employees.push(manager);
            createEmployee();
        },
    )
}

function addEngineer() {
    inquirer.prompt(
        [
            {
                type: 'input',
                name: 'Name',
                message: "What is the Engineer's name?",
            },
            {
                type: 'input',
                name: 'id',
                message: "What is the Engineer's employee ID?",
            },
            {
                type: 'input',
                name: 'email',
                message: "What is the Engineer's email address?",
            },
            {
                type: 'input',
                name: 'github',
                message: "What is the Engineer's Github account?",
            }
        ]).then(input => {
            const engineer = new Engineer(input.Name, input.id, input.email, input.github);
            employees.push(engineer);
            createEmployee();
        },
    )
}

function createEmployee() {
    fs.writeFileSync(outputPath, render(employees), "utf-8");
}
