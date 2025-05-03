const fs = require("fs")
const filewatcher = require("filewatcher")

function requireUncached(module) {
  delete require.cache[require.resolve(module)]
  return require(module)
}

function generateTheme() {
  const { supa, schema, zandromeda } = requireUncached("./theme")
  fs.writeFile("themes/simple-theme-supa.json", schema(supa), (err) => err && console.log(err))
  fs.writeFile("themes/simple-theme-zandromeda.json", schema(zandromeda), (err) => err && console.log(err))
  console.log("themes generated")
}

const watcher = filewatcher()
watcher.add("src/theme.js")

watcher.on("change", (file) => {
  generateTheme()
})

generateTheme()