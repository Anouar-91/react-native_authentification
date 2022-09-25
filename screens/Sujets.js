import { StyleSheet, Text, View , Pressable, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'

const Sujets = ({navigation}) => {


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Portfolio</Text>
    </View>
  )
}

export default Sujets;

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
})