import React from 'react';
import { StyleSheet, Button, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import UserSelectionScreen from './src/components/Users/UserSelectionScreen';
import UserCreationScreen from './src/components/Users/UserCreationScreen';
import GameplayScreen from './src/components/Game/GameplayScreen';

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button 
          title="Create User"
          onPress={() => this.props.navigation.navigate('UserCreation')}
        />
        <Button 
          title="Select User"
          onPress={() => this.props.navigation.navigate('UserSelection')}
        />
      </View>
    );
  }
}

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    UserSelection: {
      screen: UserSelectionScreen,
    },
    UserCreation: {
      screen: UserCreationScreen,
    },
    Gameplay: {
      screen: GameplayScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});