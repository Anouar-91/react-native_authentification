import { StyleSheet, Text, View , Pressable, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'

const Portfolio = ({navigation}) => {
    const [count, setCount] = useState(0)
    const handlePress = () => {
        navigation.navigate('Home')
    }  
    const more = () => {
        setCount(count + 1)
    }  
    const less = () => {
        setCount(count - 1)
    }  

/*     navigation.setOptions({
        headerRight: (props) => (
            <View style={styles.headerBtn}>
              <TouchableOpacity onPress={more} style={{padding:9, backgroundColor: "red"}}>
                <Text>+1</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={less} style={{padding:9, backgroundColor: "blue"}}>
                <Text> -1</Text>
              </TouchableOpacity>
            </View>
          ),
    }) */
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Portfolio</Text>
      <Text style={styles.text}>{count}</Text>

      <Pressable
      style={({pressed}) => ({backgroundColor: pressed ? 'lightseagreen' : 'rebeccapurple'})}
      onPress={handlePress}
      >
        <Text style={styles.btn}>Vers Home</Text>
      </Pressable>
    </View>
  )
}

export default Portfolio

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
    },
    headerBtn:{
        flexDirection: "row",

    }
})