import { createStackNavigator } from '@react-navigation/stack'
import Home from '../screens/Home'
import Portfolio from '../screens/Portfolio'
import Listes from '../screens/Listes'
import Signets from '../screens/Signets'
import Moments from '../screens/Moments'
import Sujets from '../screens/Sujets'
import { Entypo } from '@expo/vector-icons';

const HomeStack = createStackNavigator();

const HomeStackScreen = ({navigation}) => {
    return (
    <HomeStack.Navigator 
    screenOptions={{headerLeft: () => (
        <Entypo name="menu" size={24} color="black" 
        onPress={() => navigation.openDrawer()}
        />
    )}}
    
    >
        <HomeStack.Screen name='home' component={Home} options={{
            title:"Accueil",
           
            }}/>
                    <HomeStack.Screen name='Profil' component={Portfolio} options={{
            title:"Portfolio"
            }}/>
                    <HomeStack.Screen name='Listes' component={Listes} options={{
            title:"Listes"
            }}/>
                    <HomeStack.Screen name='Signets' component={Signets} options={{
            title:"Signets"
            }}/>
                    <HomeStack.Screen name='Moments' component={Moments} options={{
            title:"Moments"
            }}/>
                    <HomeStack.Screen name='Sujets' component={Sujets} options={{
            title:"Sujets"
            }}/>
    </HomeStack.Navigator>
    )
}


export default HomeStackScreen
