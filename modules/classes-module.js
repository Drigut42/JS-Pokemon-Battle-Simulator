// Module for getMagics-Method:
let moduleMagic = require("./magicBox");

class Pokemon {
  constructor(
    name,
    health = 100,
    magic = 100,
    skills = [],
    counter = 0,
    winner = false
  ) {
    this.name = name;
    this.health = health;
    this.magic = magic;
    this.skills = skills;
    this.counter = counter;
    this.winner = winner;
  }
  //  the object of the Attackskill-Class is added to the array (pokemon.skills)
  learnAttackSkill(newskill) {
    return this.skills.push(newskill);
  }

  // Methods of condition/shortcuts:

  selectSkill(skillName) {
    let skillArr = this.skills.filter((skill) => {
      return skill.attack === skillName;
    });
    return skillArr[0] ? skillArr[0] : false;
  }

  hasEnoughMagic(skillName) {
    let skill = this.selectSkill(skillName);
    return this.magic >= skill.magic;
  }
  isAlive() {
    return this.health > 0;
  }

  // Methods of application:

  showStatus() {
    console.log(`
Status of ${this.name}:`);
    // * Pokemon is alive
    if (this.isAlive()) {
      // # Pokemon won!
      if (this.winner) {
        console.log(`Congratulations! ${this.name} won the battle!`);
      }
      // # Pokemon has not won the battle(yet):
      else {
        // -Pokemon has not battled (yet):
        if (this.counter === 0) {
          console.log(`${this.name} has not battled yet`);
        }
        // -Pokemon made their last attack:
        else if (this.counter === 3) {
          console.log(
            `${this.name} attacked already 3 times and isn't allowed to attack anymore.`
          );
        }
        // -Pokemon is fighting/ in a battle involved:
        else {
          console.log(`${this.name} is involved in a battle!`);
        }
      }
      console.log(
        `${this.name} has ${this.health} Health-Points and ${this.magic} Magic-Points.`
      );
    }
    // * Pokemon is NOT alive
    else {
      console.log(`${this.name} is defeated.`);
    }

    console.log(`${this.counter}. Attack completed. Remaining Attacks: ${
      3 - this.counter
    }
___________________`);
  }

  showSkills() {
    console.log(`
${this.name} has the following skills:`);
    for (let skill of this.skills) {
      console.log(
        // Number of skills:
        `
${this.skills.indexOf(skill) + 1}.`
      );
      // show values of a all 3 Properties/keys(attack, damage, magic):
      for (let i = 0; i < 3; i++) {
        console.log(`${Object.keys(skill)[i]} : ${Object.values(skill)[i]}`);
      }
    }
    console.log("_________________________");
  }

  getMagics() {
    let extraMagic = moduleMagic.magicBox.pop();
    this.magic = this.magic + extraMagic; // + 0 bis 20
    // *if the Magic-Box has at least one Number to give
    if (!isNaN(extraMagic)) {
      // # AND Pokemon is able to attack again
      if (!this.winner && this.isAlive() && this.counter < 3) {
        console.log(`
Get MAGIC:`);
        // How much Magic did the Pokemon get:
        if (extraMagic < 2) {
          console.log(`
WOW...the Magic-Box was not generous this time. ${this.name} got ${
            extraMagic === 0 ? "nothing" : `1 Magic-Point`
          }. Sorry, try again.
Current Magic-score stays: ${this.magic}
__________`);
        } else if (extraMagic <= 10 && extraMagic > 0) {
          console.log(`
${this.name} has received Magic-points: ${extraMagic} 
Current Magic-score: ${this.magic}
              
Could be more, better luck next time.
__________`);
        } else {
          console.log(
            `
Great. ${this.name} has received ${extraMagic} Magic-points!
Current Magic-score: ${this.magic}, hopefully enough for the attack.
__________`
          );
        }
      }
      // # Pokemon already won, isn't alive or isn't allowed to attack
      else {
        console.log(
          `
${this.name} doesn't need Magic-Points, because it can no longer attack.
Look at the status for more Information 'pokemon.showStatus()'
________
`
        );
      }
    }
    // * Magic-Box is empty!!
    else {
      console.log(`
Sorry, the Magic-Box is empty. How much have you been playing???
You can fill it again if you delete all of your last fights.
BUT for a fair game, you should make a new Box with newGameNewLuck(). 
The Magic-Box is tricky...never look in it!
_____
`);
    }
  }
  // Attack-Method-----------------------------------------------------------------------------------
  attack(skillName, opponent) {
    try {
      // MAIN Condition: Is there a winner?
      // !!! Main Conditon: NO, the battel is not over yet-------------------------------
      if (
        this.isAlive() &&
        opponent.isAlive() &&
        !this.winner &&
        !opponent.winner
      ) {
        // Attack-Counter-Condition(0): Is the Pokemon allowed to attack? (under 3 attacks)
        if (this.counter < 3) {
          // 1. Attack-Counter-Condition: Yes, the Pokemon is allowed to attack!
          // Magic Condition(1): Has the pokemon enough magic for the attack?
          if (this.hasEnoughMagic(skillName)) {
            // named skill is selected:
            let skill = this.selectSkill(skillName);

            // 1.1 Magic Condition: Yes, there is enough magic.
            // ATTACK is performed:
            opponent.health = opponent.health - skill.damage;
            this.magic = this.magic - skill.magic;
            this.counter++;

            // Effect on Opponent Condition(1.1): Is the Opponent still alive?
            if (opponent.isAlive()) {
              // 1.1.1 Effect on Opponent: Yes, the Opponent is still ALIVE.
              console.log(` 
${this.counter}. Attack from ${this.name}  
              
--------------------------------------------
${this.name} attacks ${opponent.name} with ${skill.attack}!
--------------------------------------------
        
Remaining Magic-Points of ${this.name} : ${this.magic}
          
${opponent.name} Health-Points drop to ${opponent.health}. 
_____________________________________________
          `);

              // Attack-Counter-Condition(1.1.1): Was that the last attack?
              if (this.counter === 3) {
                // 1.1.1.1 Attack-Counter-Condition: Yes! This was the last attack.
                console.log(`
ATTENTION, please: This was ${this.name}s LAST Attack, 
${this.name} is not allowed to attack again.
__________________
                    `);

                // OPPONENT-Attack-Counter-Condition (1.1.1.1): Opponents last attack too?
                if (opponent.counter === 3) {
                  // 1.1.1.1.1 OPPONENT-Attack-Counter-Condition: Yes, both Pokemon are not allowed to attack.
                  console.log(`
Both Pokemon made their last Attack and are not allowed to attack again. 
The Health-Points will be compared to determine a winner: `);

                  // COMPARE Health and determine a winner! 3 Possibilities
                  // A. Pokemon won!
                  if (this.health > opponent.health) {
                    this.winner = true;
                    console.log(`
${this.name} has ${this.health} Health-Points and wins! 
${opponent.name} has only ${opponent.health} Health-Points.
__________________
                
                          `);
                  }
                  // B. Both won!
                  else if (this.health === opponent.health) {
                    this.winner = true;
                    opponent.winner = true;
                    console.log(`
${this.name} and ${opponent.name} have the same amount of Health-Points: ${this.health}
Both of them won! :D
____________________
                `);
                  }
                  // C.Opponent won!
                  else {
                    opponent.winner = true;
                    console.log(`
${opponent.name} has ${opponent.health} Health-Points and wins! 
${this.name} has only ${this.health} Health-Points.
____________________
                 `);
                  }
                }

                // ELSE - Conditions--------------------------------------------------------------------------
                else {
                  // 1.1.1.1.2 OPPONENT-Attack-Counter-Condition: No, opponent can still attack.
                  console.log(
                    `${opponent.name} can still attack, wait for ${opponent.name}'s next attack.`
                  );
                }
              } else {
                // 1.1.1.2 Attack-Counter-Condition: No, the battle continues!
                return;
              }
            } else {
              // 1.1.2 Effect on Opponent: NOT alive, the battle ends!
              console.log(` 
            ${this.counter}. Attack from ${this.name}  
          
            --------------------------------------------
            ${this.name} attacks ${opponent.name} with ${skill.attack}!
            --------------------------------------------
            
           All of ${opponent.name} Health-Points dropped and ${opponent.name} is now unable to fight!
          
           YOU won! ${this.name} did it! Good job. Now celebrate :) 
          
            `);
              this.winner = true;
            }
          } else {
            let skill = this.selectSkill(skillName);
            if (skill) {
              // 1.2 Magic Condition: No, there is NOT enough magic.
              console.log(`
Attack FAILED:
          
Oh no. Seems like ${this.name} needs more magic for ${skill.attack}. 
Current Magic-score : ${this.magic}
${skill.magic} Magic-Points are necessary for this attack.  
Get magic!! Or use a different attack with max. ${this.magic} Magic-Points. Good Luck :)
______________
                `);
            } else {
              // 1.3 Magic Condition: Your Pokemon doesn't know this attack.
              return console.log(`
Your Pokemon is confused. 
Did it really learn the attack '${skillName}'???
If you are unsure you can look into the skills of your Pokemon -> 'pokemon.showSkills()'
Make sure you write the name of the attack right if you didn't :)`);
            }
          }
        } else {
          // 2. Attack-Counter-Condition: NO, the Pokemon is not allowed to attack! It already had their 3. Attack.
          console.log(`STOP:   ${this.name} attacked already 3 Times! More are not allowed.
        ____________________________________________________________________________________________________
        `);
        }
      } else if (this.winner || opponent.winner) {
        //!!! Main Conditon: Yes, the battel is over. We have a winner!-------------------------------
        console.log(
          `
The Battle is over! For more Information look at the status of the Pokemon.
Choose new Pokemon for a new fight.
${this.winner ? `${this.name}` : `${opponent.name}`} already won.`
        );
      } else {
        // A Pokemon is not alive/able to fight:
        console.log(`
${!this.isAlive() ? `${this.name}` : `${opponent.name}`} is unable to fight.
Always look at the status for more Information -> 'pokemon.showStatus()'.
Sorry, there is no way to recover. Please choose new Pokemon for new fights.
`);
      }
    } catch (error) {
      console.log(`
Oh no. We have a ${error.name}!
Did you write the code right? like this:
'pokemon.attack("Attack Name", opponentPokemon)'
You are the creator of the Pokemon and Attacks. Make sure they exist.`);
    }
  }
}

class AttackSkill {
  constructor(attack, damage = 35, magic = 45) {
    this.attack = attack;
    this.damage = damage;
    this.magic = magic;
  }
}

module.exports = { Pokemon, AttackSkill };
