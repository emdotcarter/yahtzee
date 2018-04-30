import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, AsyncStorage } from 'react-native';
import uuidv4 from 'uuid/v4';

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
            // await AsyncStorage.removeItem('users');

            let users = JSON.parse(await AsyncStorage.getItem('users')) || [];
            if (users.map((u) => u.username).indexOf(this.state.username) === -1) {
                users.push({
                    key: uuidv4(),
                    username: this.state.username
                });
    
                await AsyncStorage.setItem('users', JSON.stringify(users));
            }
            
            this.props.navigation.goBack();
        } catch (error) {
            console.log(error);
        }
    }
}

export default UserCreationScreen;