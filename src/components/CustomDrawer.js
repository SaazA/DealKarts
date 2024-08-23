import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import colors from '../constants/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octions from 'react-native-vector-icons/Octicons';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import routes from '../constants/routes';
import CartScreen from '../screens/CartScreen';
const CustomDrawer = props => {
  const navigation = useNavigation();
  const [isHomeOpen, setIsHomeOpen] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const policyScrollViewRef = useRef();
  const togglePolicy = () => {
    setIsPolicyOpen(!isPolicyOpen);

    if (!isPolicyOpen && policyScrollViewRef.current) {
      policyScrollViewRef.current.scrollToEnd({animated: true});
    }
  };

  return (
    <DrawerContentScrollView
      {...props}
      ref={policyScrollViewRef}
      style={styles.maincontainer}>
        
      <View style={styles.categorycontainer}>
        <Text style={styles.headstatictext}>Shop By</Text>
        <TouchableOpacity
          onPress={() => setIsHomeOpen(!isHomeOpen)}
          style={styles.categorycontent}>
          <Text style={styles.dropdowntext}>Categories</Text>
          {isHomeOpen ? (
            <FontAwesome5 name="caret-up" color={colors.Black} size={22} />
          ) : (
            <FontAwesome5 name="caret-down" color={colors.Black} size={22} />
          )}
        </TouchableOpacity>
        {/* <DrawerItemList {...props} /> */}
        {isHomeOpen && (
          <View style={styles.dropdowncontent}>
            {/* <TouchableOpacity style={styles.subcategorycontainer}>
              <Text style={styles.subcategorycontainertext}>Fashion</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subcategorycontainer}>
              <Text style={styles.subcategorycontainertext}>Handicraft</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subcategorycontainer}>
              <Text style={styles.subcategorycontainertext}>Electronics</Text>
            </TouchableOpacity> */}

<TouchableOpacity style = {styles.categorycontainersubitems} onPress={()=>{
  navigation.navigate(routes.FASHIONSCREEN)
}}>
              <View style={styles.requirementsubitemstext}>
                <Text style={styles.subcategorycontainertext}>
                  Fashion
                </Text>
              </View>
              <View style={styles.requirementsubitemsicon}>
                <FontAwesome
                  name="shirtsinbulk"
                  color={colors.grayshade}
                  size={26}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.categorycontainersubitems} onPress={()=>{
  navigation.navigate(routes.HANDICRAFTSSCREEN)}}>
              <View style={styles.requirementsubitemstext}>
                <Text style={styles.subcategorycontainertext}>
                  Handicraft
                </Text>
              </View>
              <View style={styles.requirementsubitemsicon}>
                <MaterialIcons
                  name="handshake"
                  color={colors.grayshade}
                  size={26}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.categorycontainersubitems} onPress={()=>{
  navigation.navigate(routes.ELECTRONICS)}}>
              <View style={styles.requirementsubitemstext}>
                <Text style={styles.subcategorycontainertext}>
                  Electronics
                </Text>
              </View>
              <View style={styles.requirementsubitemsicon}>
                <MaterialCommunityIcons
                  name="washing-machine"
                  color={colors.grayshade}
                  size={26}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.requirementscontainer}>
        <TouchableOpacity style={styles.requirementsubitems} onPress={()=>{navigation.navigate(routes.CARTSCREEN)}}>
          <View style={styles.requirementsubitemsicon}>
            <FontAwesome5 name="shopping-bag" color={colors.Yellow} size={22} />
          </View>
          <View style={styles.requirementsubitemstext}>
            <Text style={styles.subcategorycontainertext}>My Cart</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.requirementsubitems} onPress={()=>{navigation.navigate(routes.WISHLISTSCREEN)}}>
          <View style={styles.requirementsubitemsicon}>
            <Octions name="heart-fill" color={colors.Red} size={22} />
          </View>
          <View style={styles.requirementsubitemstext}>
            <Text style={styles.subcategorycontainertext}>My WishList</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.requirementsubitems} onPress={()=>{navigation.navigate(routes.ORDERSCREEN)}}>
          <View style={styles.requirementsubitemsicon}>
            <FontAwesome5 name="box" color={colors.Green} size={22} />
          </View>
          <View style={styles.requirementsubitemstext}>
            <Text style={styles.subcategorycontainertext}>My Orders</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.requirementsubitems} onPress={()=>{navigation.navigate(routes.ACCOUNTSCREEN)}}>
          <View style={styles.requirementsubitemsicon}>
            <Ionicons name="person-circle" color={colors.Blue} size={26} />
          </View>
          <View style={styles.requirementsubitemstext}>
            <Text style={styles.subcategorycontainertext}>My Account</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.requirementsubitems} onPress={()=>{navigation.navigate(routes.WALLETSCREEN)}}>
          <View style={styles.requirementsubitemsicon}>
            <FontAwesome5 name="wallet" color={colors.Red} size={20} />
          </View>
          <View style={styles.requirementsubitemstext}>
            <Text style={styles.subcategorycontainertext}>My Wallet</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.contactcontainer}>
        <View style={styles.contactheadtextcontainer}>
          <Text style={styles.contactheadstatictext}>Contact</Text>
        </View>
        <TouchableOpacity style={styles.contactsubitems}>
          <View style={styles.requirementsubitemsicon}>
            <FontAwesome name="comments" color={colors.grayshade} size={26} />
          </View>
          <View style={styles.requirementsubitemstext}>
            <Text style={styles.subcategorycontainertext}>Chat With Us</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactsubitems}>
          <View style={styles.requirementsubitemsicon}>
            <FontAwesome5 name="headset" color={colors.grayshade} size={24} />
          </View>
          <View style={styles.requirementsubitemstext}>
            <Text style={styles.subcategorycontainertext}>Call us</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactsubitems}>
          <View style={styles.requirementsubitemsicon}>
            <MaterialIcons name="email" color={colors.grayshade} size={26} />
          </View>
          <View style={styles.requirementsubitemstext}>
            <Text style={styles.subcategorycontainertext}>Write to us</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactsubitems}>
          <View style={styles.requirementsubitemsicon}>
            <MaterialIcons
              name="contact-mail"
              color={colors.grayshade}
              size={24}
            />
          </View>
          <View style={styles.requirementsubitemstext}>
            <Text style={styles.subcategorycontainertext}>Contact us</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactsubitems}>
          <View style={styles.requirementsubitemsicon}>
            <FontAwesome6
              name="circle-exclamation"
              color={colors.grayshade}
              size={24}
            />
          </View>
          <View style={styles.requirementsubitemstext}>
            <Text style={styles.subcategorycontainertext}>About us</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactsubitems}>
          <View style={styles.requirementsubitemsicon}>
            <MaterialIcons
              name="help-center"
              color={colors.grayshade}
              size={26}
            />
          </View>
          <View style={styles.requirementsubitemstext}>
            <Text style={styles.subcategorycontainertext}>Help</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.policycontainer}>
        <TouchableOpacity
          onPress={() => {
            togglePolicy();
          }}
          style={styles.policycontainerinner}>
          <Text style={styles.policytext}>Policies</Text>
          <FontAwesome5
            name={isPolicyOpen ? 'caret-up' : 'caret-down'}
            color={colors.Black}
            size={22}
          />
        </TouchableOpacity>

        {isPolicyOpen && (
          <View style={styles.dropdowncontent}>
            <TouchableOpacity style={styles.policysubItems}>
              <View style={styles.requirementsubitemsicon}>
                <MaterialIcons
                  name="assignment-return"
                  color={colors.grayshade}
                  size={26}
                />
              </View>
              <View style={styles.requirementsubitemstext}>
                <Text style={styles.subcategorycontainertext}>
                  Cancellation and Returns
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.policysubItems}>
              <View style={styles.requirementsubitemsicon}>
                <MaterialIcons
                  name="airplane-ticket"
                  color={colors.grayshade}
                  size={26}
                />
              </View>
              <View style={styles.requirementsubitemstext}>
                <Text style={styles.subcategorycontainertext}>
                  Shipping Policy
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.policysubItems}>
              <View style={styles.requirementsubitemsicon}>
                <MaterialIcons
                  name="privacy-tip"
                  color={colors.grayshade}
                  size={26}
                />
              </View>
              <View style={styles.requirementsubitemstext}>
                <Text style={styles.subcategorycontainertext}>
                  Privacy Policy
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    margin: 10,
    flex: 1,
  },
  categorycontainer: {},
  categorycontainersubitems:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:10

  },
  headstatictext: {
    color: colors.Red,
    fontSize: 18,
  },
  categorycontent: {
    flexDirection: 'row',
    marginTop: 25,
    justifyContent: 'space-between',
  },
  dropdowntext: {
    color: colors.Black,
    fontSize: 18,
    fontWeight: 'bold',
  },
  dropdowncontent: {
    marginTop: 10,
    margin:15,
    gap:10
  },
  subcategorycontainer: {
    marginLeft: 10,
    borderWidth: 1,
    height: 50,
    justifyContent: 'center',
  },
  subcategorycontainertext: {
    color: colors.Black,
    fontSize: 16,
  },
  requirementscontainer: {
    marginTop: 30,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: colors.Gray,
  },
  requirementsubitems: {
    flexDirection: 'row',
    margin: 15,
    marginBottom: 20,
    marginLeft: 25,
    gap: 20,
  },
  requirementsubitemsicon: {
    width: 40,
  },
  requirementsubitemstext: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  contactheadtextcontainer: {
    margin: 20,
  },
  contactheadstatictext: {
    fontSize: 18,
    color: colors.graylight,
  },
  contactsubitems: {
    flexDirection: 'row',
    margin: 15,
    marginBottom: 18,
    marginLeft: 20,
    gap: 10,
  },
  policycontainer: {
    marginLeft: 15,
    margin: 10,
  },
  policytext: {
    color: colors.Black,
    fontSize: 16,
  },
  policycontainerinner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  policysubItems: {
    flexDirection: 'row',
    marginBottom: 10,
    gap: 5,
    marginTop: 10,
  },
});

export default CustomDrawer;
