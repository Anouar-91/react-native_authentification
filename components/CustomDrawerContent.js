import { StyleSheet, View } from 'react-native'
import React, { useState, useEffect , useLayoutEffect} from 'react'
import { Text, Avatar, Title, Caption, Paragraph, Drawer, TouchableRipple, Switch } from 'react-native-paper'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CustomDrawerContent = (props) => {
    const [isDark, setIsDark] = useState(false)
    const [lastname, setLastname] = useState()
    const [firstname, setFirstname] = useState()
    const toggleDarkTheme = () => {
        setIsDark(!isDark)
    }

    useLayoutEffect(() => {
        load()
    }, [])

    const load = async() => {
        try{
            let jsonValue = await AsyncStorage.getItem("user");
            if(jsonValue !== null){
                let user = JSON.parse(jsonValue);
                setFirstname(user.firstname)
                setLastname(user.lastname)
            }
        }
        catch(error){
            alert(error)
        }

    }

    const logout = async () => {
        try{
            await AsyncStorage.removeItem("user")
            props.navigation.navigate('Login')
        }catch(error){
            alert(error)
        }
    }
    return (
        <View style={styles.container} >
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContentContainer}>
                    <View style={styles.userInfoContainer}>
                        <View style={styles.userInfoDetails}>
                            <Avatar.Image
                                source={require('../assets/logo.png')}
                                size={90}
                            />
                            <View style={styles.name}>
                                <Title style={styles.title}>{firstname} {lastname}</Title>
                                <Caption style={styles.caption}>@Anouar91</Caption>
                            </View>
                        </View>
                        <View style={styles.followers}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.section]}>
                                    24
                                </Paragraph>
                                <Caption style={styles.caption}>Abonnements</Caption>

                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.section]}>
                                    48
                                </Paragraph>
                                <Caption style={styles.caption}>Abonnées</Caption>

                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>

                        <DrawerItem
                            label='Profil'
                            icon={() => (<MaterialCommunityIcons name="face-man-profile" size={24} color="black" />)}
                            onPress={() => props.navigation.navigate('Profil')}
                        />
                        <DrawerItem
                            label='Listes'
                            icon={() => (<MaterialIcons name="format-list-bulleted" size={24} color="black" />)}
                            onPress={() => props.navigation.navigate('Listes')}

                        />
                        <DrawerItem
                            label='Sujets'
                            icon={() => (<MaterialIcons name="comment" size={24} color="black" />)}
                            onPress={() => props.navigation.navigate('Sujets')}

                        />
                        <DrawerItem
                            label='Signets'
                            icon={() => (<MaterialIcons name="bookmark-border" size={24} color="black" />)}
                            onPress={() => props.navigation.navigate('Signets')}

                        />
                        <DrawerItem
                            label='Moments'
                            icon={() => (<Entypo name="flash" size={24} color="black" />)}
                            onPress={() => props.navigation.navigate('Moments')}

                        />

                    </Drawer.Section>
                    <Drawer.Section title='Réglage'>
                        <DrawerItem
                            label='Paramètre de confidentialité'
                            icon={() => (<MaterialIcons name="settings" size={24} color="black" />)}
                            onPress={() => props.navigation.navigate('Moments')}

                        />
                        <TouchableRipple onPress={toggleDarkTheme}>
                            <View style={styles.settings}>
                                <Text>Mode Sombre</Text>
                                <View pointerEvents="none" >
                                    <Switch value={isDark} onPress={() => setIsDark(!isDark)} />
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.logoutSection}>
                <DrawerItem
                    label='Déconnexion'
                    icon={() => (<MaterialIcons name="logout" size={24} color="black" />)}
                    onPress={() => logout()}

                />
            </Drawer.Section>

        </View>
    )
}

export default CustomDrawerContent

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerContentContainer: {
        flex: 1,
    },
    userInfoContainer: {
        paddingLeft: 20
    },
    userInfoDetails: {
        marginTop: 15
    },
    name: {
        justifyContent: 'center',
        marginTop: 15
    },
    title: {
        fontSize: 16,
        marginTop: 5,
        fontWeight: 'bold'
    },
    caption: {
        fontSize: 16,
    },
    followers: {
        marginTop: 25,
        flexDirection: 'row',
        alignItems: 'center'
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 7

    },
    paragraph: {
        fontWeight: 'bold',

    },
    drawerSection: {
        marginTop: 19,
        borderTopWidth: 0.5,
        borderTopColor: 'black'
    },
    settings: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 15
    },
    logoutSection: {
        marginBottom: 19,
        borderTopWidth: 0.5,
        borderTopColor: 'light'
    }
})