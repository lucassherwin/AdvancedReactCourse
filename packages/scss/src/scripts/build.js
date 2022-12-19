const Fs = require('fs')
const Path = require('path')
const Sass = require('node-sass')

const getComponents = () => {
  let all_components = []

  const types = ['atoms', 'molecules', 'organisms']

  types.forEach(type => {
    const all_files = Fs.readdirSync(`src/${type}`).map(file => ({
      input: `src/${type}/${file}`,
      output: `lib/${file.slice(0, -4) + 'css'}`
    }))

    all_components = [
      ...all_components,
      ...all_files
    ]
  })

  return all_components
}

const compile = (path, fileName) => {
  const result = Sass.renderSync({
    data: Fs.readFileSync(
      Path.resolve(path)
    ).toString(),
    outputStyle: 'expanded',
    outFile: 'global.scss',
    includePaths: [Path.resolve('src')]
  })

  Fs.writeFileSync(
    Path.resolve(fileName),
    result.css.toString()
  )
}

compile('src/global.scss', 'lib/global.css')

console.log(getComponents())

getComponents().forEach(component => {
  compile(component.input, component.output)
})
