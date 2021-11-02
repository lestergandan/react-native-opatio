import * as React from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { colors } from '../../common/colors';
import * as actions from "../../store/common/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import LottieScreen from '../../components/Lottie';
import { p } from '../../common/normalize';
import { Entypo, Ionicons } from '@expo/vector-icons';
import * as BTN from '../../components/Buttons';
import * as ATOM from '../../components/Atoms';


class SignUp extends React.Component {

    state = {
        name: '',
        email: '',
        address: '',
        password: '',
        eye: false,
        isWaiting: false,
    }

    render() {

        const { email, password, name, address, eye, isWaiting } = this.state;

        return (
            <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>

                {
                    isWaiting && <ATOM.Loading />
                }

                <TouchableOpacity style={{ marginLeft: p(4) }} onPress={() => Actions.intro()}>
                    <Entypo name="chevron-left" color={colors.SKY} size={36} />
                </TouchableOpacity>

                <View>
                    <Text style={styles.text}>Crea tu Cuenta</Text>

                    <TextInput
                        style={styles.input}
                        placeholder={'Email de trabajo:'}
                        underlineColorAndroid='transparent'
                        autoCapitalize = 'none'
                        onChangeText={name => this.setState({ name })}
                        value={name}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder={'Nombre:'}
                        underlineColorAndroid='transparent'
                        secureTextEntry={true}
                        onChangeText={email => this.setState({ email })}
                        value={email}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder={'Apellido:'}
                        underlineColorAndroid='transparent'
                        secureTextEntry={true}
                        onChangeText={address => this.setState({ address })}
                        value={address}
                    />

                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder={'Contraseña:'}
                            underlineColorAndroid='transparent'
                            secureTextEntry={!eye}
                            onChangeText={password => this.setState({ password })}
                            value={password}
                        />
                        <TouchableOpacity onPress={()=>this.setState({eye: !eye})} style={styles.eye}>
                            {
                                eye ? <Ionicons name="ios-eye-off" color={colors.TEXT} size={26} /> : <Ionicons name="md-eye" color={colors.TEXT} size={26} />
                            }
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ alignItems: 'center'}}>            
                    <BTN.SkyWhite title={'CREAR'} onClick={()=>console.log('Waiting api...')} top={70} bottom={70}/>
                </View>

            </KeyboardAvoidingView>

        )
    }
}

export default connect(
    state => ({ user: state.common.user, }),
    dispatch => ({
        actions: bindActionCreators(actions, dispatch)
    }))(SignUp);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 24,
        backgroundColor: colors.WHITE,
        justifyContent: 'space-between',
    },
    input: {
        marginHorizontal: p(15),
        borderRadius: 5,
        marginVertical: 3,
        fontSize: p(15),
        paddingTop: 12,
        paddingLeft: 7,
        height: 55,
        color: '#4c4c4c',
        borderBottomWidth: 1,
        borderBottomColor: colors.GREY1
    },
    text: {
        fontWeight: "700",
        marginBottom: p(20),
        color: colors.TEXT,
        fontSize: p(24),
        marginHorizontal: p(15)
    },
    eye: {
        position: 'absolute',
        right: p(18),
        bottom: p(8)
    }
})