const readlineSync = require("readline-sync");
const { Common } = require("./utils/common");
const common = new Common();
const chalk = require("chalk");

if (readlineSync.keyInYN("Do you want to play Texas Holdem?")) {
  try {
    console.log(chalk.green("Starting now..."));
    const communityCards = readlineSync
      .question("Get 5 community cards? ")
      .replace(/(\S)(\S)/g, function($$, $1, $2) {
        return $1 + $2.toLowerCase();
      })
      .split(" ");
    console.log(common.displayCards(communityCards) + "\n");
    const playersCount = readlineSync.question("Enter number of players? ");
    console.log("\n");
    if (playersCount) {
      let players = [];
      for (let i = 0; i < playersCount; i++) {
        let playerName = [],
          playerHand = [];
        const playerInput = readlineSync
          .question(`Enter Player ${i + 1}: `)
          .split(" ")
          .map((input, i) => {
            if (i === 0) {
              return playerName.push(input);
            } else {
              return playerHand.push(
                input.replace(/(\S)(\S)/g, function($$, $1, $2) {
                  return $1 + $2.toLowerCase();
                })
              );
            }
          });

        players.push({
          name: playerName,
          cards: playerHand
        });
        console.log(`${playerName} ${common.displayCards(playerHand)}\n`);
      }
      const input = {
        communityCards,
        players
      };

      const result = common.evaluateHands(input);
      common.output(result);
    }
  } catch (e) {
    console.log(chalk.red(`Error: ${e.message}`));
  }
} else {
  console.log(chalk.green("Good bye..."));
}
