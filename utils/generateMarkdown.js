function renderLicenseBadge(license) {
  if (license === 'None') {
    return '';
  }
  return `
  ![License: ${license}](https://img.shields.io/badge/License-${license.replace(' ', '%20')}-blue.svg)`;
}

function renderLicenseLink(license) {
  if (license === 'None') {
    return '';
  }

  switch (license) {
    case 'MIT':
      return 'https://opensource.org/licenses/MIT';
    case 'Apache 2.0':
      return 'https://www.apache.org/licenses/LICENSE-2.0';
    case 'GPL 3.0':
      return 'https://www.gnu.org/licenses/gpl-3.0';
    case 'BSD 3-Clause':
      return 'https://opensource.org/licenses/BSD-3-Clause';
    default:
      return '';
  }
}

function renderLicenseSection(license) {
  if (license === 'None') {
    return '';
  }
  return `## License
This application is covered under the ${license} license. Additional license information is available here:
[${license}](${renderLicenseLink(license)})`;
}

function generateMarkdown(response) {
  return `# ${response.title}

## Table of Contents
- [Description](#description)
- [License](#license)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)
- [Reporting Issues](#reporting-issues)

## Description
${response.description}

${renderLicenseSection(response.license)}

${renderLicenseBadge(response.license)}

## Installation
${response.installation}

## Usage
${response.usage}

## Contributing
${response.contribution}

## Tests
${response.tests}

## Questions
If you have any questions, feel free to reach out via:
- GitHub: [${response.GitHub}](https://github.com/${response.GitHub})
- Email: ${response.email}

## Reporting Issues
${response.reporting}
`;
}

export default generateMarkdown;
