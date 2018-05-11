import React, { Component } from 'react';
import { Text } from 'react-native';

class GameplayScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.navigation.getParam('user', null),
        };
    }

    render() {
        return (
            <Text>Current user: { this.state.user.username }</Text>
        );
    }
}

export default GameplayScreen;