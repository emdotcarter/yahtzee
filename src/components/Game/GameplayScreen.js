import React, { Component } from 'react';
import { View, Text, Button, Image, TouchableOpacity } from 'react-native';

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
                    value: undefined,
                    scorable: true,
                    visible: true,
                },
                {
                    key: 'twos',
                    displayName: 'Twos',
                    value: undefined,
                    scorable: true,
                    visible: true,
                },
                {
                    key: 'threes',
                    displayName: 'Threes',
                    value: undefined,
                    scorable: true,
                    visible: true,
                },
                {
                    key: 'fours',
                    displayName: 'Fours',
                    value: undefined,
                    scorable: true,
                    visible: true,
                },
                {
                    key: 'fives',
                    displayName: 'Fives',
                    value: undefined,
                    scorable: true,
                    visible: true,
                },
                {
                    key: 'sixes',
                    displayName: 'Sixes',
                    value: undefined,
                    scorable: true,
                    visible: true,
                },
                {
                    key: 'topBonus',
                    displayName: 'Top Section Bonus',
                    value: 0,
                    scorable: false,
                    visible: true,
                },
                {
                    key: 'threeOfAKind',
                    displayName: '3 of a Kind',
                    value: 0,
                    scorable: true,
                    visible: true,
                },
                {
                    key: 'fourOfAKind',
                    displayName: '4 of a Kind',
                    value: 0,
                    scorable: true,
                    visible: true,
                },
                {
                    key: 'fullHouse',
                    displayName: 'Full House',
                    value: 0,
                    scorable: true,
                    visible: true,
                },
                {
                    key: 'smallStraight',
                    displayName: 'Small Straight',
                    value: 0,
                    scorable: true,
                    visible: true,
                },
                {
                    key: 'largeStraight',
                    displayName: 'Large Straight',
                    value: 0,
                    scorable: true,
                    visible: true,
                },
                {
                    key: 'yahtzee',
                    displayName: 'YAHTZEE!',
                    value: 0,
                    scorable: true,
                    visible: true,
                },
                {
                    key: 'chance',
                    displayName: 'Chance',
                    value: 0,
                    scorable: true,
                    visible: true,
                },
            ],
        };
    }

    _rollDie = () => {
        return Math.floor(Math.random() * this.N_SIDED_DICE) + 1;
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
        }));
    }

    _onScore = () => {
        this.setState((prevState) => ({
            rollsRemaining: this.MAX_DICE_ROLLS,
            turnScored: true,
        }));
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


    _renderScoreboard = () => (
        this.state.score.filter((scoreEntry) => scoreEntry.visible).map((scoreEntry) => (
            <Text key={scoreEntry.key}>{scoreEntry.displayName}</Text>
        ))
    )

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <Text>Current player: {this.state.user.username}</Text>
                <View style={{ flex: 3 / 4 }}>
                    {this._renderScoreboard()}
                </View>
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