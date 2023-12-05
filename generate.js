const fs = require('fs')
const { exec } = require('child_process');

const LINK_ADDRESS = 'https://roger-twan.github.io/reading-mind-map/html/'
const MARKDOWN_DIR = './markdown/'

const htmls = fs.readdirSync('./html/').map(file => file.split('.')[0])
const newFiles = []

readFiles()
updateMenu()

function readFiles() {
  fs.readdirSync(MARKDOWN_DIR).forEach(file => {
    const fileName = file.split('.')[0]
    if (!htmls.includes(fileName)) {
      generateHtml(fileName)
      newFiles.push(fileName)
    }
  });
}

function generateHtml(fileName) {
  exec(`markmap ${MARKDOWN_DIR}${fileName}.md -o ./html/${fileName}.html --no-open`, err => {
    if (err) {
      console.error(err)
      return;
    }
  });
}

function updateMenu() {
  if (newFiles.length) {
    const readmeFile = './README.md'
    let readme = fs.readFileSync(readmeFile)
    newFiles.forEach(name => {
      readme += `\n<a target="_blank" href="${LINK_ADDRESS}${name}.html">${name}</a>`
    })
    fs.writeFileSync(readmeFile, readme)
  }
}
