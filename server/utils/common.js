var shuffle = require("shuffle-array");
var PokerEvaluator = require("poker-evaluator");
const chalk = require("chalk");

class Common {
  constructor() {
    this.playingCards = {
      K: "King",
      Q: "Queen",
      J: "Jack",
      10: "Ten",
      9: "Nine",
      8: "Eight",
      7: "Seven",
      6: "Six",
      5: "Five",
      4: "Four",
      3: "Three",
      2: "Two",
      A: "Ace"
    };

    this.ranks = [
      "A",
      "K",
      "Q",
      "J",
      "T",
      "9",
      "8",
      "7",
      "6",
      "5",
      "4",
      "3",
      "2"
    ];
  }

  output(players) {
    players.forEach((player, i) => {
      console.log(`${i + 1}. ${player.name} ${player.handName}`);
    });
  }

  evaluateHands({ communityCards, players }) {
    let ranking = [];
    players.forEach(player => {
      const mArray = communityCards.concat(player.cards);
      const res = PokerEvaluator.evalHand(mArray);
      ranking.push({
        name: player.name,
        cards: player.cards,
        rank: res.handRank,
        handName: this.generateHandName(
          res.handName,
          res.handType,
          communityCards,
          player.cards
        )
      });
    });
    ranking.sort((a, b) => {
      return a.rank < b.rank ? -1 : 1;
    });

    return ranking;
  }

  generateHandName(handName, handType, communityCards, playerCards) {
    const suits = communityCards.concat(playerCards);
    switch (handType) {
      case 2: //one pair
        return `Pair ${this.getPairs(suits).join(", ")}`;
      case 3: //two pair
        return `${this.ucfirst(handName)} ${this.getPairs(suits)
          .map(card => {
            return this.getCardName(card);
          })
          .join(" ")}`;
      case 5: //straight
        return `${this.ucfirst(handName)} ${this.sortThemOut(suits)}`;
        break;
    }
  }

  sortThemOut(cards) {
    return this.getCardName(
      cards.map(d => d[0]).sort((a, b) => {
        return this.ranks.indexOf(a) - this.ranks.indexOf(b);
      })[0]
    );
  }
  
  getPairs(cards) {
    return cards
      .map(d => d[0])
      .reduce(function(acc, el, i, arr) {
        if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el);
        return acc;
      }, [])
      .sort((a, b) => b - a);
  }

  getCardName(card) {
    return this.playingCards[card.toUpperCase()];
  }

  fillDeck(size) {
    const deck = [];
    deck.push("As");
    deck.push("Ks");
    deck.push("Qs");
    deck.push("Js");
    deck.push("Ts");
    deck.push("9s");
    deck.push("8s");
    deck.push("7s");
    deck.push("6s");
    deck.push("5s");
    deck.push("4s");
    deck.push("3s");
    deck.push("2s");
    deck.push("Ah");
    deck.push("Kh");
    deck.push("Qh");
    deck.push("Jh");
    deck.push("Th");
    deck.push("9h");
    deck.push("8h");
    deck.push("7h");
    deck.push("6h");
    deck.push("5h");
    deck.push("4h");
    deck.push("3h");
    deck.push("2h");
    deck.push("Ad");
    deck.push("Kd");
    deck.push("Qd");
    deck.push("Jd");
    deck.push("Td");
    deck.push("9d");
    deck.push("8d");
    deck.push("7d");
    deck.push("6d");
    deck.push("5d");
    deck.push("4d");
    deck.push("3d");
    deck.push("2d");
    deck.push("As");
    deck.push("Ks");
    deck.push("Qs");
    deck.push("Js");
    deck.push("Ts");
    deck.push("9s");
    deck.push("8s");
    deck.push("7s");
    deck.push("6s");
    deck.push("5s");
    deck.push("4s");
    deck.push("3s");
    deck.push("2s");

    shuffle(deck);
    var items = deck.slice(0, size).map(i => i);

    return items;
  }

  displayCards(cards) {
    return cards
      .map(card => {
        return this.getIcon(card);
      })
      .join(" ");
  }

  getIcon(cardType) {
    const number = cardType.slice(0, 1);
    const icon = cardType.slice(1, 2);
    switch (cardType.slice(1, 2)) {
      case "s":
        return `${number}${chalk.green("♠")}`;
      case "h":
        return `${number}${chalk.red("♥")}`;
      case "d":
        return `${number}${chalk.yellow("♦")}`;
      case "c":
        return `${number}${chalk.blue("♣")}`;
    }
  }

  ucfirst(str) {
    return str.replace(
      /\w+\s*/g,
      txt => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
    );
  }
}

module.exports = {
  Common
};
