import React from "react";
import { View, Text, StyleSheet } from "react-native";

class HomeScreen extends React.Component {
    
    render() {
        return (
            <View style={styles.container}>
                <Text>Home</Text>
            </View>
        )
    }
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerButtonContainer: {
        padding: 10
    },
    headerButtonImage: {
        justifyContent: 'center',
        width: 35,
        height: 35,
        margin: 6
    },
});