import { StyleSheet, Text, View , Pressable, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'

const Listes = ({navigation}) => {


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Portfolio</Text>
    </View>
  )
}

export default Listes

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