import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, AsyncStorage } from 'react-native';

const styles = StyleSheet.create({});

class UserCreationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            createButtonDisabled: true,
        };
    }
    render() {
        return (
            <View>
                <Text>Username:</Text>
                <TextInput
                    editable={true}
                    onChangeText={(username) => this.onUsernameChange(username)}
                />
                <Button
                    title='Create'
                    disabled={this.state.createButtonDisabled}
                    onPress={() => this.persistUser()}
                />
            </View>
        );
    }

    onUsernameChange(username) {
        this.setState({ username: username });
        this.setState({ createButtonDisabled: (username == null) });
    }

    async persistUser() {
        this.setState({ createButtonDisabled: true });

        try {
            let usernames = JSON.parse(await AsyncStorage.getItem('users')) || [];
            usernames.push(this.state.username);
            let usernameObjects = Array.from(new Set(usernames)).map((un, i) => ({ key: i, username: un }));

            await AsyncStorage.setItem('users', JSON.stringify(usernameObjects));
            this.props.navigation.goBack();
        } catch (error) {
            console.log(error);
        }
    }
}

export default UserCreationScreen;