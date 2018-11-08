const fs = require('fs');
const chalk = require('chalk')
const Json2csvTransform = require('json2csv').Transform;

const fields = ['_id', 'img', 'memo'];
const opts = { fields };
const inputPath = './input.json'
const outputPath = './output.csv'

function convert(){
  try {
    const inputNotExist = !fs.existsSync(inputPath)

    if (inputNotExist) throw new Error('input file not exist, please check and try again')

    const outputNotExist = !fs.existsSync(outputPath)
    if (outputNotExist) throw new Error('output file not exist, please check and try again')

    // clear output
    fs.writeFileSync(outputPath, '')

    console.log(chalk.blue('Start convert Json!'))
    console.log(chalk.blue('---------------------------'))

    const transformOpts = { highWaterMark: 16384, encoding: 'utf-8' };
     
    const input = fs.createReadStream(inputPath, { encoding: 'utf8' });
    const output = fs.createWriteStream(outputPath, { encoding: 'utf8' });
    const json2csv = new Json2csvTransform(opts, transformOpts);
     
    const processor = input.pipe(json2csv).pipe(output);
     
    // You can also listen for events on the conversion and see how the header or the lines are coming out.
    json2csv
      .on('header', header => console.log(chalk.blue(header)))
      .on('line', line => console.log(chalk.green(line)))
      .on('error', err => console.log(chalk.red(err)));
  } catch (err) {
    console.error(chalk.red(error));
  }
}


convert()
 