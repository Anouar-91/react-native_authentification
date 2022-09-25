import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Drawer from './routes/DrawerNav'
import HomeStackScreen from './routes/HomeStackNav'
import PortfolioStackScreen from './routes/PortfolioStackNav'
import CustomDrawerContent from './components/CustomDrawerContent'
import DrawerNav from './routes/DrawerNav'
import Login from './screens/Login'
import {createStackNavigator} from '@react-navigation/stack'



const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator
      initialRouteName='Login'
      screenOptions={{headerShown:false}}
      >
        <Stack.Screen name="Login" component={Login} options={{title:"Connexion"}}/>
        <Stack.Screen name="Home" component={DrawerNav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
