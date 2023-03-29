const findMatchesToPrefix = require('../localUtils');

const STRINGS_CONTAINER = ["apple", "banana", "cherry", "date", "eggplant", "fig", "grape", "honeydew", "kiwi", "lemon"];

describe('matching bills to prefix', () => {
  test('find all matches', () => {
    // simple prefixes
    let matches = findMatchesToPrefix('a', STRINGS_CONTAINER);
    expect(matches.sort()).toEqual(['apple', 'banana', 'date', 'eggplant', 'grape']);
    matches = findMatchesToPrefix('r', STRINGS_CONTAINER);
    expect(matches.sort()).toEqual(['cherry', 'grape']);
    matches = findMatchesToPrefix('e', STRINGS_CONTAINER);
    expect(matches.sort()).toEqual(['apple', 'cherry', 'date', 'eggplant', 'grape', 'honeydew', 'lemon']);
    matches = findMatchesToPrefix('er', STRINGS_CONTAINER);
    expect(matches.sort()).toEqual(['cherry']);
    matches = findMatchesToPrefix('le', STRINGS_CONTAINER);
    expect(matches.sort()).toEqual(['apple', 'lemon']);
    matches = findMatchesToPrefix('pl', STRINGS_CONTAINER);
    expect(matches.sort()).toEqual(['apple', 'eggplant']);

    //whole words matches
    for(const str in STRINGS_CONTAINER){
      matches = findMatchesToPrefix(str, STRINGS_CONTAINER);
      expect(matches).toEqual([str]);
    }
  });

  test('test the result is sorted alphabetical', () => {
    let matches = findMatchesToPrefix('a', STRINGS_CONTAINER);
    expect(matches).toEqual(['apple', 'banana', 'date', 'eggplant', 'grape']);
    matches = findMatchesToPrefix('r', STRINGS_CONTAINER);
    expect(matches).toEqual(['cherry', 'grape']);
    matches = findMatchesToPrefix('e', STRINGS_CONTAINER);
    expect(matches).toEqual(['apple', 'cherry', 'date', 'eggplant', 'grape', 'honeydew', 'lemon']);
    matches = findMatchesToPrefix('er', STRINGS_CONTAINER);
    expect(matches).toEqual(['cherry']);
    matches = findMatchesToPrefix('le', STRINGS_CONTAINER);
    expect(matches).toEqual(['apple', 'lemon']);
    matches = findMatchesToPrefix('pl', STRINGS_CONTAINER);
    expect(matches).toEqual(['apple', 'eggplant']);
  })
})
