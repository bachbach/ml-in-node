const ml = require('ml-regression')
const csv = require('csvtojson')
const SLR = ml.SLR
const readline = require('readline')

const csvFilePath = 'advertising.csv'
let csvData = [],
    X = [],
    y = []

let regressionModel;

csv()
  .fromFile(csvFilePath)
  .then(jsonObj => {
    csvData = [ ...jsonObj ]
    dressData()
    performRegression()
  })

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const dressData = () => {
  csvData.forEach(row => {
    X.push(parseFloat(row.radio))
    y.push(parseFloat(row.sales))
  })
}

const performRegression = () => {
  regressionModel = new SLR(X, y)
  predictOutput()
}

const predictOutput = () => {
  console.log('predict')
  rl.question('Enter inout X for prediction (predd CTRL+c to exit program): ', (answer) => {
    console.log(`At X = ${answer}, y = ${regressionModel.predict(parseFloat(answer))}`)
    predictOutput()
  })
}