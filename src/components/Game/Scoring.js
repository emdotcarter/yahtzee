class Scoring {
    static _weighted_count = (value, values) => {
        return value * values.filter(x => x === value).length;
    }

    static score = (values) => {
        return {
            aces: Scoring._weighted_count(1, values),
            twos: Scoring._weighted_count(2, values),
            threes: Scoring._weighted_count(3, values),
            fours: Scoring._weighted_count(4, values),
            fives: Scoring._weighted_count(5, values),
            sixes: Scoring._weighted_count(6, values),
            threeOfAKind: 0,
            fourOfAKind: 0,
            fullHouse: 0,
            smallStraight: 0,
            largeStraight: 0,
            yahtzee: 0,
            chance: 0,
        }
    }
}

export default Scoring