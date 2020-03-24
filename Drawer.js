import React from "react";
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from "react-native";
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItem,
} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from './screen/Home/HomeScreen';
import AssetManagermentScreen from './screen/AssetManagerment/AssetManagermentScreen';
import Animated from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Screens = ({ navigation, style }) => {
    return (
        <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
            <Stack.Navigator
                screenOptions={{
                    headerTransparent: true,
                    headerTitle: null,
                    headerLeft: () => (
                        <TouchableOpacity style={styles.headerButtonContainer} onPress={() => navigation.openDrawer()}>
                            <Image
                                style={styles.headerButtonImage}
                                source={require('./assets/icons/menu.png')}
                            />
                        </TouchableOpacity>
                    )
                }}>
                <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }}/>
                <Stack.Screen name="AssetManagerment" component={AssetManagermentScreen} options={{ title: 'Home' }}/>
            </Stack.Navigator>
        </Animated.View>
    )
}

function DrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            {/* <DrawerItemList {...props} /> */}
            <View>
                <View style={{ marginTop: 10, paddingLeft: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={require('./assets/imgs/profile.jpg')}
                        resizeMode='center'
                        ///style={{ flex: 1, height: 100, width: 100, borderRadius: 300 }}
                        style={styles.avatar}
                    ></Image>
                    <Text style={{ fontSize: 15, marginTop: 5,color: 'white' }}>Epicor Executive Extention</Text>
                    <Text style={{ fontSize: 9, marginTop: 5,color: 'white' }}>VANNT</Text>
                </View >
                <DrawerItem
                    label="Home"
                    labelStyle={styles.drawerLabel}
                    style={styles.drawerItem}
                    onPress={() => props.navigation.navigate("Home")}
                    icon={() => <Image source={require('./assets/icons/home.png')} style={styles.btnIcon} />}
                />
                <DrawerItem
                    label="Asset Managerment"
                    labelStyle={styles.drawerLabel}
                    style={styles.drawerItem}
                    onPress={() => props.navigation.navigate("AssetManagerment")}
                    icon={() => <Image source={require('./assets/icons/category.png')} style={styles.btnIcon} />}
                />
            </View>
        </DrawerContentScrollView>
    );
}

export default () => {
    const [progress, setProgres] = React.useState(new Animated.Value(0));

    const scale = Animated.interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [1, 0.8],
    });

    const borderRadius = Animated.interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [0, 16],
    });

    const animatedStyle = { borderRadius, transform: [{ scale }] };
    return (
        <LinearGradient style={{ flex: 1 }} colors={['#E94057', '#4A00E0']}>
            <Drawer.Navigator
                drawerType="slide"
                overlayColor="transparent"
                drawerStyle={styles.drawerStyles}
                contentContainerStyle={{ flex: 1 }}
                drawerContentOptions={{
                    activeBackgroundColor: 'transparent',
                    activeTintColor: 'white',
                    inactiveTintColor: 'white',
                }}
                sceneContainerStyle={{ backgroundColor: 'transparent' }}
                drawerContent={props => {
                    setProgres(props.progress);
                    return <DrawerContent {...props} />;

                }}>
                <Drawer.Screen name="Screens">
                    {props => <Screens {...props} style={animatedStyle} />}
                </Drawer.Screen>
            </Drawer.Navigator >
        </LinearGradient>

    )
}


const styles = StyleSheet.create({
    btnIcon: {
        height: 25,
        width: 25
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
    stack: {
        flex: 1,
        shadowColor: '#FFF',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 5,
        // overflow: 'scroll',
        // borderWidth: 1,
    },
    drawerStyles: { flex: 1, width: '60%', backgroundColor: 'transparent' },
    drawerItem: { alignItems: 'flex-start', marginVertical: 0 },
    drawerLabel: { color: 'white', marginLeft: -16 },
    avatar: {
        marginBottom: 16,
        borderWidth: StyleSheet.hairlineWidth,
        flex: 1, height: 100, width: 100, borderRadius: 300
    },
});