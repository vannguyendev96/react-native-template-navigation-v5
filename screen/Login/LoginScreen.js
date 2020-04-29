import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TextInput, Keyboard, Alert } from 'react-native';

import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, PanGestureHandler, State } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window');
//import Svg, { Image, Circle, ClipPath } from 'react-native-svg';
import { KeyboardAvoidingView } from 'react-native';
import AnimateLoadingButton from 'react-native-animate-loading-button';

const {
    Value,
    event,
    block,
    cond,
    eq,
    set,
    Clock,
    startClock,
    stopClock,
    debug,
    timing,
    clockRunning,
    interpolate,
    Extrapolate,
    concat
} = Animated;

function runTiming(clock, value, dest) {
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0)
    };

    const config = {
        duration: 1000,
        toValue: new Value(0),
        easing: Easing.inOut(Easing.ease)
    };

    return block([
        cond(clockRunning(clock), 0, [
            set(state.finished, 0),
            set(state.time, 0),
            set(state.position, value),
            set(state.frameTime, 0),
            set(config.toValue, dest),
            startClock(clock)
        ]),
        timing(clock, state, config),
        cond(state.finished, debug('stop clock', stopClock(clock))),
        state.position
    ]);
}

export default class LoginScreen extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            isSignin: false,
            url: '',
            placeholderUsername: 'USERNAME',
            placeholderPassword: 'PASSWORD'
        };

        this.buttonOpacity = new Value(1);


        this.onStateChange = event([
            {
                nativeEvent: ({ state }) =>
                    block([
                        cond(
                            eq(state, State.END),
                            set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
                        )
                    ])
            }
        ]);

        this.onStateChangeSetting = event([
            {
                nativeEvent: ({ state }) =>
                    block([
                        cond(
                            eq(state, State.END),
                            set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
                        )
                    ])
            }
        ]);

        this.onCloseSate = event([
            {
                nativeEvent: ({ state }) =>
                    block([
                        cond(
                            eq(state, State.END),
                            set(this.buttonOpacity, runTiming(new Clock(), 0, 1))
                        )
                    ])
            }
        ]);

        this.buttonY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [100, 0],
            extrapolate: Extrapolate.CLAMP
        });

        this.bgY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [-height / 3 - 50, 0],
            extrapolate: Extrapolate.CLAMP
        });

        this.textInputZindex = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, -1],
            extrapolate: Extrapolate.CLAMP
        });

        this.textInputY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [0, 100],
            extrapolate: Extrapolate.CLAMP
        });

        this.textInputOpacity = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, 0],
            extrapolate: Extrapolate.CLAMP
        });

        this.rotateCross = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [180, 360],
            extrapolate: Extrapolate.CLAMP
        });

        this.loginAPI = this.loginAPI.bind(this);
        this.saveURL_API = this.saveURL_API.bind(this);
    }

    async componentDidMount() {
    }



    async loginAPI() {
        // Keyboard.dismiss();
        // const { navigation } = this.props;
        // this.loadingButton1.showLoading(true);
        // await this.props.Login(this.state.username, this.state.password, this.props.api);
        // if (this.props.isAuthentication === true) {
        //     this.loadingButton1.showLoading(false);
        //     navigation.navigate("Home");
        // }
        // else {
        //     this.loadingButton1.showLoading(false);
        //     showMessage({
        //         message: "Username hoặc password sai!",
        //         type: "danger",
        //     });
        // }
        console.log("Login")
        this.props.onLogin({username:'vannt',password:'van123'});
    }

    async saveURL_API() {
        // this.loadingButton1.showLoading(true);

        // await this.props.SetURL(this.state.url);
        // if (this.props.errorURL === "") {
        //     this.loadingButton1.showLoading(false);
        //     showMessage({
        //         message: "Lưu đường dẫn thành công ",
        //         type: "success",
        //     });
        // }
        // else {
        //     this.loadingButton1.showLoading(false);
        //     showMessage({
        //         message: "Có lỗi khi lưu dường dẫn API!",
        //         type: "danger",
        //     });
        // }
        console.log("Login")
    }

    renderElement() {
        if (this.state.isSignin == false) {
            return (
                <Animated.View style={{
                    zIndex: this.textInputZindex,
                    opacity: this.textInputOpacity,
                    transform: [{ translateY: this.textInputY }],
                    height: height / 3,
                    ...StyleSheet.absoluteFill,
                    top: null,
                    justifyContent: 'center'
                }}>

                    <TapGestureHandler onHandlerStateChange={this.onCloseSate}>
                        <Animated.View style={styles.closeButton}>
                            <Animated.Text style={{
                                fontSize: 15,
                                transform: [{ rotate: concat(this.rotateCross, 'deg') }]
                            }}>
                                X
                        </Animated.Text>
                        </Animated.View>
                    </TapGestureHandler>

                    <TextInput
                        placeholder={this.props.api}
                        style={styles.textinput}
                        autoComplete="username"
                        //placeholderTextColor="black"
                        onChangeText={(e) => this.setState({ url: e })}
                    />


                    <AnimateLoadingButton
                        ref={c => (this.loadingButton1 = c)}
                        width={width / 2}
                        height={height / 15}
                        title="Save"
                        titleFontSize={16}
                        titleColor="rgb(255,255,255)"
                        backgroundColor="rgb(29,18,121)"
                        borderRadius={35}
                        onPress={this.saveURL_API.bind(this)}
                    />
                </Animated.View>
            );
        }
        else {
            return (
                <Animated.View style={{
                    zIndex: this.textInputZindex,
                    opacity: this.textInputOpacity,
                    transform: [{ translateY: this.textInputY }],
                    height: height / 3,
                    ...StyleSheet.absoluteFill,
                    top: null,
                    justifyContent: 'center'
                }}>

                    <TapGestureHandler onHandlerStateChange={this.onCloseSate}>
                        <Animated.View style={styles.closeButton}>
                            <Animated.Text style={{
                                fontSize: 15,
                                transform: [{ rotate: concat(this.rotateCross, 'deg') }]
                            }}>
                                X
                        </Animated.Text>
                        </Animated.View>
                    </TapGestureHandler>

                    <TextInput
                        placeholder={this.state.placeholderUsername}
                        style={styles.textinput}
                        autoComplete="username"
                        placeholderTextColor="black"
                        onChangeText={(e) => this.setState({ username: e })}
                    />
                    <TextInput
                        placeholder={this.state.placeholderPassword}
                        secureTextEntry={true}
                        autoComplete="password"
                        style={styles.textinput}
                        placeholderTextColor="black"
                        onChangeText={(e) => this.setState({ password: e })}
                    />

                    <AnimateLoadingButton
                        ref={c => (this.loadingButton1 = c)}
                        width={width / 2}
                        height={height / 15}
                        title="SIGN IN"
                        titleFontSize={16}
                        titleColor="rgb(255,255,255)"
                        backgroundColor="rgb(29,18,121)"
                        borderRadius={35}
                        onPress={this.loginAPI.bind(this)}
                    />
                </Animated.View>
            );
        }
    }




    render() {
        return (
            <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'white', justifyContent: 'flex-end' }} keyboardVerticalOffset={100} behavior="height" enabled>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'white',
                        justifyContent: 'flex-end'
                    }}
                >
                    <Animated.View
                        style={{
                            ...StyleSheet.absoluteFill,
                            transform: [{ translateY: this.bgY }]
                        }}
                    >
                        <Image
                            source={require('../../assets/PATC-67.jpg')}
                            style={{ flex: 1, height: null, width: null }}
                        >
                        </Image>
                    </Animated.View>
                    <View style={{ height: height / 3, justifyContent: 'center' }}>
                        <TapGestureHandler onHandlerStateChange={this.onStateChange}>
                            <Animated.View>
                                <PanGestureHandler
                                    onHandlerStateChange={() => this.setState({ isSignin: true })}
                                >
                                    <Animated.View
                                        style={{
                                            ...styles.button,
                                            opacity: this.buttonOpacity,
                                            transform: [{ translateY: this.buttonY }]
                                        }}
                                    >
                                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>SIGN IN</Text>
                                    </Animated.View>
                                </PanGestureHandler>
                            </Animated.View>

                        </TapGestureHandler>
                        <TapGestureHandler onHandlerStateChange={this.onStateChangeSetting}>
                            <Animated.View>
                                <PanGestureHandler
                                    onHandlerStateChange={() => this.setState({ isSignin: false })}
                                >
                                    <Animated.View
                                        style={{
                                            ...styles.button,
                                            backgroundColor: '#2E71DC',
                                            opacity: this.buttonOpacity,
                                            transform: [{ translateY: this.buttonY }]
                                        }}
                                    >
                                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }} >
                                            SETTING
                  </Text>
                                    </Animated.View>
                                </PanGestureHandler>
                            </Animated.View>
                        </TapGestureHandler>

                        {this.renderElement()}
                    </View>
                </View>
                <View style={styles.version}>
                    <Text >V.4.2.0</Text>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    version: {
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        color: 'black'
    },
    button: {
        backgroundColor: 'white',
        height: 70,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 3
    },
    closeButton: {
        height: 40,
        width: 40,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: -70,
        left: width / 2 - 20,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 3
    },
    textinput: {
        height: 50,
        borderRadius: 25,
        borderWidth: 0.5,
        marginHorizontal: 20,
        paddingLeft: 10,
        marginVertical: 5,
        borderColor: 'rgba(0,0,0,0.2)',
        backgroundColor: 'white',
    }
});