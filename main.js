// Import modules:
let modules = require("./modules");
let Pokemon = modules.classModule.Pokemon;
let AttackSkill = modules.classModule.AttackSkill;
let newGameNewLuck = modules.newGameModule.newGameNewLuck;

// __________________________________________________________

// Welcome to the Pokemon Battle Simulator
// Choose the Pokemon and their attacks.

// ---------------Good To Know--------------------
// - Pokemon should attack one after the other
// - ONLY 3 Attacks are possible for every Pokemon
// - choose new Pokemon to start a new fight!
// - you will be informed when to use newGameNewLuck()
// There are not really rules, just Have Fun :)

// ______________________________________________________________________________________

// 1. create a new Pokemon with new Pokemon()

// code: 'let pokemonName = new Pokemon("Name", healthNumber, magicNumber);'

//  Health and Magic-Points are optional, default are 100 points

// For EXAMPLE:
let rayquaza = new Pokemon("Rayquaza");
let jirachi = new Pokemon("Jirachi");
let pikachu = new Pokemon("Pikachu");
let magikarp = new Pokemon("Magikarp");

// ---------------------------------------------------------------------------------------
// 2. create Attacks with new AttackSkill()

// code: 'const skillName = new AttackSkill("Skill Name", damageNumber, magicCostNumber);'

// Damage and Magic is also optional, default are 35 and 45
// if you wanna change the numbers remember that a Pokemon can only attack 3 times

// For EXAMPLE:
const dragonPulse = new AttackSkill("Dragon Pulse", 50, 50);
const meteorMash = new AttackSkill("Meteormash", 10, 10);
const flameWheel = new AttackSkill("Flame Wheel");

// ---------------------------------------------------------------------------------------
// 3. Pokemon learn Attacks with learnAttackSkill()

// code: 'pokemonName.learnAttackSkill(skillName);'

// For EXAMPLE:
rayquaza.learnAttackSkill(dragonPulse);
jirachi.learnAttackSkill(meteorMash);
pikachu.learnAttackSkill(meteorMash);
pikachu.learnAttackSkill(dragonPulse);
magikarp.learnAttackSkill(flameWheel);

// ---------------------------------------------------------------------------------------
// What you can use with your Pokemon:
// - pokemon.attack("Attack Name", opponentName) => ATTACK your opponent
// - pokemon.getMagics() -> if you have not enough magic for the attack
// - pokemon.showStatus() -> to see the status of your Pokemon
// - pokemon.showSkills() -> to see which attack your Pokemon can use (it can learn more than one)
// - newGameNewLuck() -> IF necessary, you will be informed or if you want, have fun!

// For EXAMPLE:
jirachi.attack("Meteormash", rayquaza);
rayquaza.attack("Dragon Pulse", jirachi);
rayquaza.getMagics();
rayquaza.showStatus();
// _________________________________________________________________________________________

// Open your Terminal and let the battle begin:
