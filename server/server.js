const readlineSync = require("readline-sync");
const { Common } = require("./utils/common");
const common = new Common();
const chalk = require('chalk');

if (readlineSync.keyInYN("Do you want to play Texas Holdem?")) {
  console.log(chalk.green("Staring now..."));
  readlineSync.question("Get 5 community cards?");
  const communityCards = common.fillDeck(5);
  console.log(common.displayCards(communityCards) + "\n");
  const playersCount = readlineSync.question("Enter number of players? ");
  console.log("\n");
  if (playersCount) {
    let players = [];
    for (let i = 0; i < playersCount; i++) {
      const playerName = readlineSync.question(`Enter Player ${i + 1}: `);
      const playerHand = common.fillDeck(2);
      let playerData = {
        name: playerName,
        cards: playerHand
      };
      players.push(playerData);
      console.log(`${playerName} ${common.displayCards(playerHand)}\n`);
    }
    const input = {
      communityCards,
      players
    };
    const result = common.evaluateHands(input);
    common.output(result);
  }
} else {
  console.log("Good bye...");
}
