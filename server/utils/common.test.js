const expect = require('expect');
const {
  displayCards, evaluateHands, output, getIcon,
} = require('./common');
const chalk = require('chalk');

describe('displayCards', () => {
  it('should display cards as per input', () => {
    const cards = ['4s', '5h'];
    const dc = displayCards(cards);
    expect(dc).toBeA('string');
    expect(dc).toBe(`4${chalk.green('♠')} 5${chalk.red('♥')}`);
  });
});

describe('getIcon', () => {
  it('should display icon as per input', () => {
    const card = '4s';
    const icon = getIcon(card);
    expect(icon).toBeA('string');
    expect(icon).toBe(`4${chalk.green('♠')}`);
  });
});

describe('evaluateHands', () => {
  it('should evaluateHands and return array of objects with rank and handName', () => {
    const communityCards = ['7d', '5s', '6s', 'Ah', '9h'];
    const players = [
      {
        name: 'Vipul',
        cards: ['4d', '8s'],
      },
      {
        name: 'Manu',
        cards: ['Qh', 'Jh'],
      },
    ];

    const result = evaluateHands({ communityCards, players });
    expect(result).toMatch(players);
    expect(result[0]).toIncludeKeys(['rank', 'handName']);
  });
});
