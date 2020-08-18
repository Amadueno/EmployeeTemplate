const { prompt } = require("inquirer");
const fs = require("fs");
const path = require("path");

const render = require("./lib/htmlRenderer");

const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

let employees = []

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");


// Write code to use inquirer to gather information about the development team members and to create objects for each team member(using the correct classes as blueprints!)

const buildManager = employee => {
  prompt([
    {
      type: 'number',
      name: 'officeNumber',
      message: 'Manager office number:'
    }
  ])
    .then(({ officeNumber }) => {
      employees.push(new Manager(employee.name, employee.id, employee.email, officeNumber))
      subMenu()
    })
    .catch(err => console.log(err))
}

const buildEngineer = employee => {
  prompt([
    {
      type: 'input',
      name: 'github',
      message: 'Engineer GitHub username:'
    }
  ])
    .then(({ github }) => {
      employees.push(new Engineer(employee.name, employee.id, employee.email, github))
      subMenu()
    })
    .catch(err => console.log(err))
}

const buildIntern = employee => {
  prompt([
    {
      type: 'input',
      name: 'school',
      message: 'Intern school name:'
    }
  ])
    .then(({ school }) => {
      employees.push(new Intern(employee.name, employee.id, employee.email, school))
      subMenu()
    })
    .catch(err => console.log(err))
}

const subMenu = () => {
  prompt({
    type: 'list',
    name: 'action',
    choices: ['Add Another Employee', 'Finish'],
    message: 'What would you like to do now?'
  })
    .then(({ action }) => {
      switch (action) {
        case 'Add Another Employee':
          mainMenu()
          break
        case 'Finish':
          console.log(employees)
          const html = render(employees)
          fs.writeFileSync(path.join(__dirname, 'output', 'index.html'), html)
          break
      }
    })
    .catch(err => console.log(err))
}

const mainMenu = () => {
  prompt([
    {
      type: 'list',
      name: 'role',
      choices: ['Employee', 'Manager', 'Engineer', 'Intern'],
      message: 'Choose employee role:'
    },
    {
      type: 'input',
      name: 'name',
      message: 'Enter the employee name:'
    },
    {
      type: 'number',
      name: 'id',
      message: 'Enter employee id number:'
    },
    {
      type: 'input',
      name: 'email',
      message: 'Enter employee email address:'
    }

  ])
    
    .then(employee => {
      switch (employee.role) {
        case 'Employee':
          employees.push(new Employee(employee.name, employee.id, employee.email))
          subMenu()
          break
        case 'Manager':
          buildManager(employee)
          break
        case 'Engineer':
          buildEngineer(employee)
          break
        case 'Intern':
          buildIntern(employee)
          break
      }
    })
    .catch(err => console.log(err))
}

mainMenu()