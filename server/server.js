var PokerEvaluator = require("poker-evaluator");
const readlineSync = require("readline-sync");
const { Common } = require("./utils/common");
const common = new Common();

const output = players => {
  players.forEach((player, i) => {
    console.log(
      `${i + 1}. ${player.name} (${common.displayCards(player.cards)}) ${
        player.handName
      }`
    );
  });
};

const evaluateHands = ({ communityCards, players }) => {
  let ranking = [];
  players.forEach(player => {
    const mArray = communityCards.concat(player.cards);
    const res = PokerEvaluator.evalHand(mArray);
    ranking.push({
      name: player.name,
      cards: player.cards,
      rank: res.handRank,
      handName: res.handName
    });
  });
  ranking.sort((a, b) => {
    return a.rank < b.rank ? -1 : 1;
  });

  return ranking;
};

if (readlineSync.keyInYN("Do you want to play Texas Holdem?")) {
  console.log("Staring now...");
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
    const result = evaluateHands(input);
    output(result);
  }
} else {
  console.log("Good bye...");
}
