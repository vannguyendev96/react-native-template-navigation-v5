import React from "react";
import { View, Text, StyleSheet } from "react-native";

class AssetManagermentScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Asset Managerment Screen</Text>
            </View>
        )
    }
}

export default AssetManagermentScreen

const styles = StyleSheet.create({
  container:{
      flex: 1,
      backgroundColor: "#fff",
      alignItems: 'center',
      justifyContent: 'center'
  }
});