import React, { Component } from 'react';
import { View, Text, Button, Image, TouchableOpacity } from 'react-native';
import Scoring from './Scoring'

class GameplayScreen extends React.Component {
    _diceImages = {
        1: require('./img/die-1.png'),
        2: require('./img/die-2.png'),
        3: require('./img/die-3.png'),
        4: require('./img/die-4.png'),
        5: require('./img/die-5.png'),
        6: require('./img/die-6.png'),
    }

    DICE_COUNT = 5
    N_SIDED_DICE = 6
    MAX_DICE_ROLLS = 3

    constructor(props) {
        super(props);

        this.state = {
            user: this.props.navigation.getParam('user', null),
            dice: Array.from({ length: this.DICE_COUNT }, () => ({
                value: this._rollDie(),
                locked: false,
            })),
            rollsRemaining: this.MAX_DICE_ROLLS,
            turnScored: true,
            score: [
                {
                    key: 'aces',
                    displayName: 'Aces',
                    transientScore: 0,
                    score: undefined,
                    visible: true,
                },
                {
                    key: 'twos',
                    displayName: 'Twos',
                    transientScore: 0,
                    score: undefined,
                    visible: true,
                },
                {
                    key: 'threes',
                    displayName: 'Threes',
                    transientScore: 0,
                    score: undefined,
                    visible: true,
                },
                {
                    key: 'fours',
                    displayName: 'Fours',
                    transientScore: 0,
                    score: undefined,
                    visible: true,
                },
                {
                    key: 'fives',
                    displayName: 'Fives',
                    transientScore: 0,
                    score: undefined,
                    visible: true,
                },
                {
                    key: 'sixes',
                    displayName: 'Sixes',
                    transientScore: 0,
                    score: undefined,
                    visible: true,
                },
                {
                    key: 'topBonus',
                    displayName: 'Top Section Bonus',
                    transientScore: 0,
                    score: false,
                    visible: true,
                },
                {
                    key: 'threeOfAKind',
                    displayName: '3 of a Kind',
                    transientScore: 0,
                    score: undefined,
                    visible: true,
                },
                {
                    key: 'fourOfAKind',
                    displayName: '4 of a Kind',
                    transientScore: 0,
                    score: undefined,
                    visible: true,
                },
                {
                    key: 'fullHouse',
                    displayName: 'Full House',
                    transientScore: 0,
                    score: undefined,
                    visible: true,
                },
                {
                    key: 'smallStraight',
                    displayName: 'Small Straight',
                    transientScore: 0,
                    score: undefined,
                    visible: true,
                },
                {
                    key: 'largeStraight',
                    displayName: 'Large Straight',
                    transientScore: 0,
                    score: undefined,
                    visible: true,
                },
                {
                    key: 'yahtzee',
                    displayName: 'YAHTZEE!',
                    transientScore: 0,
                    score: undefined,
                    visible: true,
                },
                {
                    key: 'chance',
                    displayName: 'Chance',
                    transientScore: 0,
                    score: undefined,
                    visible: true,
                },
            ],
        };
    }

    _rollDie = () => {
        return Math.floor(Math.random() * this.N_SIDED_DICE) + 1;
    }

    _clearTransientScores = () => {
        this.setState((prevState) => ({
            score: prevState.score.map((prevScore) => {
                prevScore.transientScore = 0;
                return prevScore;
            }),
        }));
    }

    _calculateTransientScores = () => {
        transientScores = Scoring.score(this.state.dice.map(x => x.value))

        this.setState((prevState) => ({
            score: prevState.score.map((prevScore) => {
                prevScore.transientScore = transientScores[prevScore.key] || 0;
                return prevScore;
            }),
        }));
    }

    _onLock = (index) => {
        this.setState((prevState) => {
            prevState.dice[index].locked = !prevState.dice[index].locked;
            return prevState;
        });
    }

    _onRoll = () => {
        this.setState((prevState) => ({
            dice: prevState.dice.map((die) => ({
                value: (die.locked ? die.value : this._rollDie()),
                locked: (prevState.rollsRemaining - 1 === 0 ? false : die.locked),
            })),
            rollsRemaining: prevState.rollsRemaining - 1,
            turnScored: false,
        }), this._calculateTransientScores);
    }

    _onScore = (key) => {
        this.setState((prevState) => ({
            dice: prevState.dice.map((prevDie) => ({
                value: prevDie.value,
                locked: false,
            })),
            score: prevState.score.map((prevScore) => {
                prevScore.score = (prevScore.key === key ? prevScore.transientScore : prevScore.score);
                return prevScore;
            }),
            rollsRemaining: this.MAX_DICE_ROLLS,
            turnScored: true,
        }), this._clearTransientScores);
    }

    _renderDie = (index) => (
        <TouchableOpacity
            key={index}
            onPress={() => this._onLock(index)}
            disabled={this.state.rollsRemaining === 0 || this.state.turnScored}
            style={{
                flex: 1,
            }}
        >
            <Image
                style={{
                    flex: 1,
                    height: undefined,
                    width: undefined,
                    resizeMode: 'contain',
                    borderWidth: (this.state.dice[index].locked ? 1 : 0),
                    borderColor: '#FF0000',
                }}
                source={this._diceImages[this.state.dice[index].value]}
                fadeDuration={0}
            />
        </TouchableOpacity>
    )

    _displayScore = (scoreObject) => {
        if (scoreObject.score) {
            return scoreObject.score
        } else {
            return scoreObject.transientScore
        }
    }

    _renderScoreboard = () => (
        this.state.score.filter((scoreObject) => scoreObject.visible).map((scoreObject) => (
            <View key={scoreObject.key} style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={{ flex: 2 / 5 }}>{scoreObject.displayName}</Text>
                <Text style={{ flex: 2 / 5 }}>Score: {this._displayScore(scoreObject)}</Text>
                <Button
                    title='Score'
                    style={{ flex: 1 / 5 }}
                    onPress={() => this._onScore(scoreObject.key)}
                    disabled={scoreObject.score != null}
                />
            </View>
        ))
    )

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <Text>Current player: {this.state.user.username}</Text>
                <View style={{ flex: 3 / 4 }}>
                    {this._renderScoreboard()}
                </View>
                <Text>Total: {this.state.score.map((scoreObject) => scoreObject.score).filter((score) => score || 0).reduce((a, b) => a + b, 0)}</Text>
                <View style={{ flex: 1 / 4, flexDirection: 'row' }}>
                    {Array.from({ length: this.DICE_COUNT }, (x, index) => this._renderDie(index))}
                </View>
                <Button
                    title='Roll!'
                    onPress={this._onRoll}
                    disabled={this.state.rollsRemaining === 0 && !this.state.turnScored}
                />
            </View>
        );
    }
}

export default GameplayScreen;