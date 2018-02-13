const expect = require("expect");
const { Common } = require("./common");
const common = new Common();
const chalk = require('chalk');

describe("fillDeck", () => {
  it("should generate cards and return number of cards as per input size", () => {
    const size = 5;
    const cards = common.fillDeck(size);
    expect(cards.length).toBe(size);
  });
});

describe("displayCards", () => {
  it("should display cards as per input", () => {
    const cards = ["4s", "5h"];
    const displayCards = common.displayCards(cards);
    expect(displayCards).toBeA("string");
    expect(displayCards).toBe(`4${chalk.green('♠')} 5${chalk.red('♥')}`);
  });
});

describe("getIcon", () => {
  it("should display icon as per input", () => {
    const card = "4s";
    const icon = common.getIcon(card);
    expect(icon).toBeA("string");
    expect(icon).toBe(`4${chalk.green('♠')}`);
  });
});

describe("evaluateHands", () => {
  it("should evaluateHands and return array of objects with rank and handName", () => {
    let communityCards = ["7d", "5s", "6s", "Ah", "9h"];
    let players = [
      {
        name: "Vipul",
        cards: ["4d", "8s"]
      },
      {
        name: "Manu",
        cards: ["Qh", "Jh"]
      }
    ];

    const result = common.evaluateHands({ communityCards, players });
    expect(result).toMatch(players);
    expect(result[0]).toIncludeKeys(["rank", "handName"]);
  });
});