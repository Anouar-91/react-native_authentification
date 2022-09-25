import React from 'react';
import HomeStackScreen from './HomeStackNav'
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from '../components/CustomDrawerContent'

const Drawer = createDrawerNavigator();
const DrawerNav = () => {
    return (
        <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen component={HomeStackScreen} name="Home" />
      </Drawer.Navigator>
    )
}

export default DrawerNav