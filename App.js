import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SourcesScreen from './src/screens/SourcesScreen';
import SourceDetailsScreen from './src/screens/SourceDetails'
import NewsScreen from './src/screens/NewsScreen';
import SavesScreen from './src/screens/SavesScreen';


function DetailsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Details!</Text>
    </View>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const SourcesStack = createStackNavigator();

function SourceStackScreen() {
  return (
    <SourcesStack.Navigator>
      <SourcesStack.Screen name="Sources" component={SourcesScreen} />
      <SourcesStack.Screen name="SourceDetails" component={SourceDetailsScreen} />
    </SourcesStack.Navigator>
  );
}

const NewsStack = createStackNavigator();

function NewsStackScreen() {
  return (
    <NewsStack.Navigator>
      <NewsStack.Screen name="News" component={NewsScreen} />
    </NewsStack.Navigator>
  );
}

const SavesStack = createStackNavigator();

function SavesStackScreen() {
  return (
    <SavesStack.Navigator>
      <SavesStack.Screen name="News" component={SavesScreen} />
    </SavesStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Sources') {
              iconName = focused
                ? 'ios-book'
                : 'ios-book';
            } else if (route.name === 'News') {
              iconName = focused ? 'ios-paper' : 'ios-paper';
            } else if (route.name === 'Saves') {
              iconName = focused ? 'ios-bookmark' : 'ios-bookmark';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'black',
          inactiveTintColor: 'gray',
        }}
      >

        <Tab.Screen name="Sources" component={SourceStackScreen} />
        <Tab.Screen name="News" component={NewsStackScreen} />
        <Tab.Screen name="Saves" component={SavesStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}