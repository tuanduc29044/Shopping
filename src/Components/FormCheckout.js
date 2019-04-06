import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Alert
} from 'react-native';
import { connect } from 'react-redux';
import { colors } from "../assets/color";
import { addOrder, doneAdd } from "../redux/actions/Order"


class FromCheckOut extends Component {
    state = {
        name: this.props.user.displayName,
        phone: this.props.user.phoneNumber,
        email: this.props.user.email,
        address: this.props.user.address,
    }

    renderTextfield(options) {
        return (
            <TextInput style={styles.textField} onChangeText={(value) => this.setState({ [options.name]: value })}
                placeholder={options.label} value={this.state[options.name]} keyboardType={options.keyboard || 'default'} />
        );
    }

    onPressButton = () => {
        const { name, phone, email, address } = this.state;
        // const { cartItems, navigation, addOrder, emptyCart } = this.props;
        if (name.length < 3) { return Alert.alert('Nhập họ tên đúng và đầy đủ') }
        else if (phone.length !== 10) { return Alert.alert('Số điện thoại không chính xác') }
        else if (email.length < 5) { return Alert.alert('Email không chính xác') }
        else if (address === '') { return Alert.alert('Địa chỉ không chính xác') }
        else {
            let customer = { name: name, phone: phone, email: email, address: address };
            this.props.addOrder(customer);
            this.setState({ name: '' });
            this.setState({ phone: '' });
            this.setState({ email: '' });
            this.setState({ address: '' });
            Alert.alert(
                'Mua hàng thành công',
                'Bạn có muốn chuyển đến Quản lý đơn hàng?',
                [
                    {
                        text: 'Để sau',
                        onPress: () => {
                            this.props.doneAdd();
                        },
                        style: 'cancel',
                    },
                    {
                        text: 'Chuyển đến', onPress: () => {
                            this.props.doneAdd();
                            this.props.navigation.navigate('ManageOrder')
                        }
                    },
                ],
                { cancelable: false },
            )
        }

    }



    render() {
        return (
            <View style={styles.panel}>
                <Text style={{ fontSize: 20, fontWeight: '400' }}>Điền thông tin người nhận hàng</Text>
                {this.renderTextfield({ name: 'name', label: 'Tên' })}
                {this.renderTextfield({ name: 'phone', label: 'Số điện thoại', keyboard: 'phone-pad' })}
                {this.renderTextfield({ name: 'email', label: 'Email', keyboard: 'email-address' })}
                {this.renderTextfield({ name: 'address', label: 'Địa chỉ' })}
                <View style={{ alignItems: 'flex-end' }}>
                    <TouchableOpacity style={styles.btn} onPress={() => {
                        Alert.alert(
                            'Mua hàng',
                            'Bạn có muốn đặt hàng với thông tin trên?',
                            [
                                {
                                    text: 'Không',
                                    style: 'cancel',
                                },
                                { text: 'Mua ngay', onPress: () => {this.onPressButton()} },
                            ],
                            { cancelable: false },
                        );
                    }
                    }>
                        <Text style={styles.btnText}>Xác nhận</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.Auth
    }
}
export default connect(mapStateToProps, { addOrder, doneAdd })(FromCheckOut);

const styles = StyleSheet.create({
    panel: {
        backgroundColor: '#fff',
        borderRadius: 3,
        padding: 10,
        margin: 10
    },
    textField: {
        height: 40,
        margin: 8,
        borderBottomWidth: 1,
        borderBottomColor: colors.red,
    },
    btn: {
        backgroundColor: colors.red,
        borderRadius: 5,
        padding: 12,
        left: 10,
        width: 150,
        alignItems: 'center',
        marginLeft: 10,
    },
    btnText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    }
});

