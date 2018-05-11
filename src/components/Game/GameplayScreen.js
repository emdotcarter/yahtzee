import React, { Component } from 'react';
import { View, Text, Button, Image } from 'react-native';

class GameplayScreen extends React.Component {
    _diceImages = {
        1: require('./img/die-1.png'),
        2: require('./img/die-2.png'),
        3: require('./img/die-3.png'),
        4: require('./img/die-4.png'),
        5: require('./img/die-5.png'),
        6: require('./img/die-6.png'),
    }

    constructor(props) {
        super(props);

        this.state = {
            user: this.props.navigation.getParam('user', null),
            diceValues: this._diceRoll(),
            rollsRemaining: 2,
        };
    }

    _diceRoll = () => {
        return Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1)
    }

    _onRoll = () => {
        this.setState({
            diceValues: this._diceRoll(),
            rollsRemaining: this.state.rollsRemaining - 1,
        });
    }

    _renderDie = (index) => (
        <Image
            style={{
                flex: 1,
                width: undefined,
                height: undefined,
                resizeMode: 'contain',
            }}
            source={this._diceImages[this.state.diceValues[index]]}
        />
    )

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <Text>Current player: {this.state.user.username}</Text>
                <View style={{ flex: 3 / 4 }}>
                    <Text>Placeholder</Text>
                    <Button
                        title='Score!'
                        onPress={() => {this.setState({ rollsRemaining: 3 })}}
                        disabled={this.state.rollsRemaining > 0}
                    />
                </View>
                <View style={{ flex: 1 / 4, flexDirection: 'row' }}>
                    {this._renderDie(0)}
                    {this._renderDie(1)}
                    {this._renderDie(2)}
                    {this._renderDie(3)}
                    {this._renderDie(4)}
                </View>
                <Button
                    title='Roll!'
                    onPress={this._onRoll}
                    disabled={this.state.rollsRemaining === 0}
                />
            </View>
        );
    }
}

export default GameplayScreen;