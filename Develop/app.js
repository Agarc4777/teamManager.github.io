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

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function Intern() {
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
            addEmployee();
        },
    )
}

function Manager() {
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
            addEmployee();
        },
    )
}

function Engineer() {
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
            addEmployee();
        },
    )
}

function addEmployee() {
    inquirer.prompt(
        [
            {
                type: "list",
                name: "type",
                choices: ["Engineer", "Intern", "Manager", "None at the moment"],
                message: "Choose what style of employee you would like to add to your list. If none, choose 'none at the moment' option.",
            }
    ]).then(input => {
        if (input.choices === "Engineer") {
            Engineer();
        }
        else if (input.choices === "Intern") {
            Intern();
        }
        else if (input.choices === "Manager") {
            Manager();
        }
        else if (input.choices === "None") {
            createEmployee();
        }
        else () => {
            console.log("error");
        }
    })
};
function createEmployee() {
    fs.writeFileSync(outputPath, render(employees), "utf-8");
};


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
