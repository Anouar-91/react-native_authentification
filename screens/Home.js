import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'

const Home = ({navigation}) => {

    let dataObj = {
        name: 'Selma',
        age: 28, 
        color: 'royalblue'
    }
    const handlePress = () => {
       navigation.navigate('Portfolio',dataObj )
/*         navigation.setOptions({
            title: "Accueil"
        }) */
    }   
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
      <Pressable
      style={({pressed}) => ({backgroundColor: pressed ? 'lightseagreen' : 'rebeccapurple'})}
      onPress={handlePress}
      >
        <Text style={styles.btn}>Vers Portfolio</Text>
      </Pressable>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container:{
        backgroundColor: "lightblue",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text:{
        fontSize:24,

    },
    btn: {
        padding:12,
        color:"white",
    }

})