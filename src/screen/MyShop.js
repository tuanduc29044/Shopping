import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { colors } from '../assets/color'
import { connect } from 'react-redux';
import AddShop from './page/AddShop';

class MyShop extends Component {
  componentDidMount() {
    console.log('nameShop :' + this.props.user.nameShop);
  }
  render() {
    return (
      <View style={styles.container}>
        {this.props.user.nameShop === undefined || this.props.user.nameShop === "" ? <View>
          <AddShop />
        </View> :
          <View>
            <Text>Đã có shop</Text>
          </View>
        }
      </View>
    )
  }
}
function mapStateToProps(state) {
  return {
    user: state.Auth,
  }
}
export default connect(mapStateToProps)(MyShop);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

})