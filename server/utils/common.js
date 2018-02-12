var shuffle = require("shuffle-array");

class Common {
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
    const number = cardType.slice(0,1);
    const icon = cardType.slice(1,2);
    switch (cardType.slice(1,2)) {
      case "s":
        return `${number}♠`;
      case "h":
        return `${number}♥`;
      case "d":
        return `${number}♦`;
      case "c":
        return `${number}♣`;
    }
  }
}

module.exports = {
  Common
};
