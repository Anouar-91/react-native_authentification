import { createStackNavigator } from '@react-navigation/stack'
import Portfolio from '../screens/Portfolio'
import { Entypo } from '@expo/vector-icons';

const PortfolioStack = createStackNavigator();

const PortfolioStackScreen = ({navigation}) => {
    return (
    <PortfolioStack.Navigator>
        <PortfolioStack.Screen name='Portfolio' component={Portfolio} options={{title:"Portfolio", headerLeft: () => (
                <Entypo name="menu" size={24} color="black" 
                onPress={() => navigation.openDrawer()}
                />
            )}}/>
    </PortfolioStack.Navigator>
    )
}


export default PortfolioStackScreen
