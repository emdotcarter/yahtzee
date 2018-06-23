class Scoring {
    static score = (values) => {
        return {
            aces: Scoring._weightedCount(1, values),
            twos: Scoring._weightedCount(2, values),
            threes: Scoring._weightedCount(3, values),
            fours: Scoring._weightedCount(4, values),
            fives: Scoring._weightedCount(5, values),
            sixes: Scoring._weightedCount(6, values),
            threeOfAKind: Scoring._ofAKind(3, values),
            fourOfAKind: Scoring._ofAKind(4, values),
            fullHouse: Scoring._fullHouse(values),
            smallStraight: Scoring._straight(4, values, 30),
            largeStraight: Scoring._straight(5, values, 40),
            yahtzee: Scoring._ofAKind(5, values, 50),
            chance: Scoring._chance(values),
        }
    }

    static _countValue = (value, values) => {
        return values.filter(x => x === value).length;
    }

    static _countValues = (values) => {
        return Array.from({ length: 6 }, (v, k) => k + 1)
            .map((dieValue) => Scoring._countValue(dieValue, values));
    }

    static _valuesAreConsecutive = (values) => {
        for (let i = 1; i < values.length; ++i) {
            if (values[i] !== values[i-1] + 1) return false;
        }
        
        return true;
    }

    static _weightedCount = (value, values) => {
        return value * Scoring._countValue(value, values);
    }

    static _ofAKind = (targetCount, values, pointOverride) => {
        let conditionMet = Scoring._countValues(values)
            .filter((count) => count >= targetCount)
            .length > 0;

        if (conditionMet) {
            return pointOverride || values.reduce((a, b) => a + b, 0);
        }

        return 0;
    }

    static _fullHouse = (values) => {
        let conditionMet = Scoring._countValues(values)
            .filter((count) => count > 0)
            .sort()
            .every((count, index) => [2, 3][index] === count)

        return (conditionMet ? 25 : 0);
    }

    static _straight = (targetLength, values, points) => {
        values = Array.from(new Set(values)).sort();
        let index = 0;
        let conditionMet = false;
        while (index + targetLength <= values.length) {
            conditionMet = Scoring._valuesAreConsecutive(values.slice(index, index + targetLength));
            
            if (conditionMet) break;
            ++index;
        }

        return (conditionMet ? points : 0);
    }

    static _chance = (values) => {
        return values.reduce((a, b) => a + b, 0);
    }
}

export default Scoring