// Module for the Magic trick:
let moduleMagic = require("./magicBox");

// Creates a new Magic-Box but be aware, the Magic-Box is tricky!
function newGameNewLuck() {
  console.log(`
Good Job! You made a new Magic-Box. 
I hope its for a NEW Game, DELETE your previous fights.
Its not allowed to change the results of the battles, thats cheating...

Anyway! This is a temporary order, DELETE 'newGameNewLuck()' immediately.
Remember the Magic-Box is tricky.Change has been achieved.
Good New Luck!
______________
    `);
  moduleMagic.newNumbers();
}

module.exports = { newGameNewLuck };
