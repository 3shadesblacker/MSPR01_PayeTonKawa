import React, {useState} from 'react';
import {
StyleSheet,
View,
Text,
Linking,
StyleProp,
TextStyle,
Modal,
Pressable,
ViewStyle,
} from 'react-native';
import { Header as HeaderRNE, HeaderProps, Icon } from '@rneui/themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Header = (props) => {


  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaProvider>
      <HeaderRNE
        leftComponent={
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon name="menu" color="white" />
        </TouchableOpacity>
      }
        rightComponent={
            <View style={styles.headerRight}>
              <TouchableOpacity>
                <Icon name="description" color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginLeft: 10 }}
              >
                <Icon type="antdesign" name="rocket1" color="white" />
              </TouchableOpacity>
            </View>
        }
        centerComponent={{ text: 'Paye Ton Kawa', style: styles.heading }}
      />

      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Close menu</Text>
              </Pressable>
            </View>
            <View>
            
            </View>
          </View>
        </Modal>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
headerContainer: {
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#397af8',
  marginBottom: 20,
  width: '100%',
  paddingVertical: 15,
},
heading: {
  color: 'white',
  fontSize: 22,
  fontWeight: 'bold',
},
headerRight: {
  display: 'flex',
  flexDirection: 'row',
  marginTop: 5,
},
subheaderText: {
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold',
},
centeredView: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'left',
},
modalView: {
  height: '100%',
  width: '75%',
  backgroundColor: 'white',
  borderRadius: 20,
  padding: 35,
  alignItems: 'left',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
},
button: {
  borderRadius: 20,
  padding: 10,
  elevation: 2,
},
buttonOpen: {
  backgroundColor: '#F194FF',
},
buttonClose: {
  backgroundColor: '#2196F3',
},
textStyle: {
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
},
modalText: {
  marginBottom: 15,
  textAlign: 'center',
},
});

export default Header;