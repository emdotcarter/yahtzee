import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, AsyncStorage } from 'react-native';
import { List, ListItem } from 'react-native-elements';

class UserSelectionScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            noUsersLoaded: true,
        };
    }

    componentWillMount() {
        AsyncStorage.getItem('users')
            .then((result) => {
                this.setState({ users: JSON.parse(result) || [] });
                this.setState({ isLoading: false });
                this.setState({ noUsersLoaded: this.state.users == null || this.state.users.length === 0 });
            });
    }

    render() {
        if (this.state.isLoading) {
            return <Text>Loading...</Text>
        } else if (this.state.noUsersLoaded) {
            return <Text>No users found, please create one.</Text>
        }

        return (
            <List>
                <FlatList
                    data={this.state.users}
                    renderItem={({ item }) => (
                        <ListItem
                            title={item.username}
                        />
                    )}
                />
            </List>
        );
    }
}

const styles = StyleSheet.create({
    list: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    item: {
        backgroundColor: '#CCC',
        margin: 10,
        width: 100,
        height: 100,
    }
});

export default UserSelectionScreen;