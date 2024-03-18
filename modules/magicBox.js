let fs = require("fs");
const fp = "magic.txt";

// the Magic-Box gets 200 randoms Numbers, which can be between 0 to 20
// and correspond to the amount of Magic-Point the Pokemon gets for using the Method: getMagics()
let magicBox;
function createMagicBox() {
  let content = fs.readFileSync(fp);
  // Numbers will be created and saved in the file 'magic.txt' IF the file is empty
  if (content.toString() === "") {
    let randomNumber1 = Math.floor(Math.random() * 21);
    fs.writeFileSync(fp, `${randomNumber1}`);
    for (let i = 0; i < 199; i++) {
      let randomNum = Math.floor(Math.random() * 21);
      fs.appendFileSync(fp, `\n${randomNum}`);
    }
  }
  // Numbers are available now, numbers are read and saved in an array 'the Magic-Box'
  let newContent = fs.readFileSync(fp);
  // String -> Array
  magicBoxStrings = newContent.toString().split("\n"); // => Array
  magicBox = magicBoxStrings.map((x) => {
    // String-Elements -> Number-Elements
    return parseInt(x);
  });
  return magicBox;
}

magicBox = createMagicBox();

function newNumbers() {
  // Delete/Overwrite numbers from the file 'magic.txt'
  fs.writeFileSync(fp, `${Math.floor(Math.random() * 21)}`);
  for (let i = 0; i < 199; i++) {
    let randomNum = Math.floor(Math.random() * 21);
    fs.appendFileSync(fp, `\n${randomNum}`);
  }
  // Transfer new Numbers in an Array -> create the Magic-Box!
  createMagicBox();
}

// Export
module.exports = { magicBox, newNumbers };
