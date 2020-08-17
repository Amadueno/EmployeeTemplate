const fs = require('fs')
const path = require('path')
​
const render = employees => {
  let html = []
  employees.forEach(employee => {
    if (employee.getRole() === 'Intern') {
      let template = fs.readFileSync(path.join(__dirname, '..', 'templates', 'intern.html'), 'utf8')
      template = template.replace('{{ name }}', employee.getName())
      template = template.replace('{{ id }}', employee.getId())
      template = template.replace('{{ email }}', employee.getEmail())
      template = template.replace('{{ employee.email }}', employee.getEmail())
      template = template.replace('{{ school }}', employee.getSchool())
      html.push(template)
    } else if (employee.getRole() === 'Engineer') {
      let template = fs.readFileSync(path.join(__dirname, '..', 'templates', 'engineer.html'), 'utf8')
      template = template.replace('{{ name }}', employee.getName())
      template = template.replace('{{ id }}', employee.getId())
      template = template.replace('{{ email }}', employee.getEmail())
      template = template.replace('{{ github }}', employee.getGithub())
      template = template.replace('{{ employee.email }}', employee.getEmail())
      template = template.replace('{{ employee.github }}', employee.getGithub())
      html.push(template)
    } else {
      let template = fs.readFileSync(path.join(__dirname, '..', 'templates', 'manager.html'), 'utf8')
      template = template.replace('{{ name }}', employee.getName())
      template = template.replace('{{ id }}', employee.getId())
      template = template.replace('{{ email }}', employee.getEmail())
      template = template.replace('{{ employee.email }}', employee.getEmail())
      template = template.replace('{{ officeNumber }}', employee.getOfficeNumber())
      html.push(template)
    }
  })
​
  let template = fs.readFileSync(path.join(__dirname, '..', 'templates', 'main.html'), 'utf8')
  template = template.replace('{{ team }}', html.join(''))
​
  return template
​
}
​
module.exports = render
