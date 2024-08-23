import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getProductsByCategories} from '../../apis/apicalls';
import colors from '../../constants/colors';

const windowheight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const HandicraftScreen = () => {
  const [products, setProducts] = useState('');
  const getProductData = () => {
    getProductsByCategories(3)
      .then(res => {
        setProducts(res.data.data);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    getProductData();
  }, []);
  return (
    <ScrollView style={styles.maincontainer}>
      <View style={styles.mainbanner}>
        <View style={styles.mainbannertextcontainer}>
          <Text style={styles.bannerlargetext}>
            Traditional Handicrafts Crafted for you!
          </Text>
          <Text style={styles.bannersmalltext}>Min 30% Off</Text>
          <TouchableOpacity style={styles.bannerbuybutton}>
            <Text>Shop Now!</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mainbannerimagecontainero}>
          <Image
            source={require('../../assests/Handicrafts-banner.webp')}
            style={{width: '100%', height: '100%'}}
          />
        </View>
      </View>

      {/* <View style={styles.electronicproductdisplay}>
        {products.length > 0 &&
          products.slice(0, 4).map(product => (
            <View key={product.product_id} style={styles.card}>
              <TouchableOpacity style={styles.electronicsimagecontainero}>
                <Image
                  source={{uri: product.images[0]}}
                  style={styles.electronicproductimage}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.pricehorizontal}>
                  <Text style={styles.horizontalpricesmalltext}>
                    {product.name.slice(0, 18)}
                    {product.name.length > 4 ? '...' : ''}
                  </Text>
                  <Text style={styles.horizontalo_pricetext}>
                    ₹{product.o_price}
                  </Text>
                  <Text style={styles.horizontalpricetext}>
                    ₹{product.s_price}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
      </View> */}

      <View style={styles.navbarcontainero}>
        <View style={styles.navbarinnercontainero}>
          <TouchableOpacity style={styles.imagecontainero}>
            <Image
              source={require('../../assests/FashionLogo.jpeg')}
              style={styles.navbarImageo}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navbartextcontainer}>
            <Text style={{color: colors.Black}}>Handicraft</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.navbarinnercontainero}>
          <TouchableOpacity style={styles.imagecontainero}>
            <Image
              source={require('../../assests/FashionLogo.jpeg')}
              style={styles.navbarImageo}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navbartextcontainer}>
            <Text style={{color: colors.Black}}>Handicraft</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.navbarinnercontainero}>
          <TouchableOpacity style={styles.imagecontainero}>
            <Image
              source={require('../../assests/FashionLogo.jpeg')}
              style={styles.navbarImageo}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navbartextcontainer}>
            <Text style={{color: colors.Black}}>Handicraft</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.productcontainer}>
        {products &&
          products.slice(1, 5).map(product => (
            <View key={product.product_id} style={styles.productinnercontainer}>
              <TouchableOpacity style={styles.productimagecontainer}>
                <Image
                  source={{uri: product.images[0]}}
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.productextcontainer}>
                <Text>
                  {product.name.slice(0, 18)}
                  {product.name.length > 4 ? '...' : ''}
                </Text>
                <Text style={styles.horizontalo_pricetext}>
                  ₹{product.o_price}
                </Text>
                <Text style={styles.horizontalpricetext}>
                  ₹{product.s_price}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  productinnercontainer: {borderWidth: 1, marginTop: 10},
  productcontainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  productimagecontainer: {
    height: windowheight * 0.2,
    width: windowWidth * 0.45,
  },
  maincontainer: {
    flex: 1,
    backgroundColor: '#FFF4A3',
  },
  electronicproductdisplay: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    backgroundColor: '#C58CED',
    justifyContent: 'center',
    alignItems: 'center',
  },
  electronicsimagecontainero: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    margin: 10,
  },
  electronicproductimage: {
    width: windowWidth * 0.4,
    height: windowheight * 0.23,
    resizeMode: 'contain',
    margin: 5,
  },
  pricehorizontal: {
    borderWidth: 1,
  },
  mainbanner: {
    height: windowheight * 0.3,
    flexDirection: 'row',
  },
  mainbannertextcontainer: {
    padding: 5,
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainbannerimagecontainero: {
    flex: 0.6,
  },
  bannerlargetext: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  bannersmalltext: {
    fontSize: 17,
    color: '#000000',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  bannerbuybutton: {
    backgroundColor: '#000000',
  },
  navbarcontainero: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  navbarImageo: {
    height: '100%',
    width: '100%',
  },
  imagecontainero: {
    borderRadius: 50,
    overflow: 'hidden',
    width: windowWidth * 0.25,
    height: windowheight * 0.12,
  },
  navbarinnercontainero: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navbartextcontainer: {},
});
export default HandicraftScreen;
