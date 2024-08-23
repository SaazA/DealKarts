import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import colors from '../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getProducts, getProductsByCategories} from '../../apis/apicalls';
import routes from '../../constants/routes';

const windowheight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export default function HomeScreen({navigation}) {
  const [products, setProducts] = useState([]);
  const [displayedProducts1, setDisplayedProducts1] = useState([]);
  const [displayedProducts2, setDisplayedProducts2] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [loadingTimeExpired, setLoadingTimeExpired] = useState(false);
  const loadingTimeoutRef = useRef(null);
  const [fashionProducts, setFashionProducts] = useState([]);
  const [handicraftProducts, setHandicraftProducts] = useState([]);
  const [electronicProducts, setElectronicProducts] = useState([]);
  const [productsbycategory, setProductsByCategory] = useState([]);

  const categoryProductCounts = {
    1: 4,
    2: 5,
    3: 6,
  };

  const getProductDatabycategory = numb => {
    const count = categoryProductCounts[numb];
    getProductsByCategories(numb)
      .then(res => {
        const products = res.data.data;
        const randomProducts = getRandomProducts(products, count);

        if (numb === 1) {
          setElectronicProducts(randomProducts);
        } else if (numb == 2) {
          setFashionProducts(randomProducts);
        } else {
          setHandicraftProducts(randomProducts);
        }
        console.log(randomProducts);
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (dataLoaded) {
      // Initial update
      const initialProducts1 = getRandomProducts(products, 4);
      const initialProducts2 = getRandomProducts(products, 6);
      setDisplayedProducts1(initialProducts1);
      setDisplayedProducts2(initialProducts2);

      // Interval for updating products
      const interval1 = setInterval(() => {
        const updatedProducts1 = getRandomProducts(products, 4);
        setDisplayedProducts1(updatedProducts1);
      }, 6000);
      const interval2 = setInterval(() => {
        const updatedProducts2 = getRandomProducts(products, 6);
        setDisplayedProducts2(updatedProducts2);
      }, 10000);

      // Cleanup
      return () => {
        clearInterval(interval1);
        clearInterval(interval2);
      };
    }
  }, [dataLoaded, products]);

  const getRandomProducts = (products, count) => {
    const randomIndices = [];
    while (randomIndices.length < count) {
      const randomIndex = Math.floor(Math.random() * products.length);
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
      }
    }
    return randomIndices.map(index => products[index]);
  };

  const getProductData = () => {
    getProducts()
      .then(res => {
        setProducts(res.data.data);
        setDataLoaded(true);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadingTimeoutRef.current = setTimeout(() => {
      setLoadingTimeExpired(true);
    }, 3000); // Set loadingTimeExpired to true after 2 seconds

    getProductData();
    getProductDatabycategory(1);
    getProductDatabycategory(2);
    getProductDatabycategory(3);

    return () => clearTimeout(loadingTimeoutRef.current);
  }, []);

  useEffect(() => {
    if (dataLoaded) {
      clearTimeout(loadingTimeoutRef.current); // Clear the loading timeout if data is loaded before 2 seconds
    }
  }, [dataLoaded]);
  const onClickProduct = (id, images, name, originalprice, sellingprice) => {
    navigation.navigate(routes.PRODUCTDISPLAYSCREEN, {
      id,
      images,
      name,
      originalprice,
      sellingprice,
    });
  };
  return (
    <ScrollView style={styles.maincontainer}>
      <View style={styles.bannercontainer}>
        <View style={styles.textcontainerbanner}>
          <Text style={styles.bannercontainertext}>
            Get your special Products at sale upto 50%
          </Text>
          <TouchableOpacity style={styles.bannerbuttoncontainer}>
            <Text style={styles.bannerbuttontext}>Shop now!</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imagecontainerbanner}>
          <Image
            style={styles.imagebanner}
            resizeMode="contain"
            source={require('../../assests/Logo.png')}></Image>
        </View>
      </View>
      {/*=====*/}
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
            <Text style={styles.navtext}>Fashion</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.navbarinnercontainero}>
          <TouchableOpacity style={styles.imagecontainero}>
            <Image
              source={require('../../assests/HandicraftLogo.jpg')}
              style={styles.navbarImageo}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navbartextcontainer}>
            <Text style={styles.navtext}>Handicrafts</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.navbarinnercontainero}>
          <TouchableOpacity style={styles.imagecontainero}>
            <Image
              source={require('../../assests/ElectronicsLogo.jpg')}
              style={styles.navbarImageo}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navbartextcontainer}>
            <Text style={styles.navtext}>Electronics</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/*=====*/}
      <View style={styles.discountbannercontainer}>
        <View style={styles.innerdiscountone}>
          <Ionicons
            name="pricetags"
            size={24}
            color={colors.Red}
            style={{marginRight: 10}}
          />
          <Text style={styles.discounttext}>Extra 10% off on everything!</Text>
        </View>
        <View style={styles.innerdiscounttwo}>
          <Text style={styles.discounttextbig}>DKFLAT10</Text>
        </View>
      </View>
      {/*=====*/}
      <View style={styles.productdisplay}>
        <Pressable
          style={styles.innerproductcontainer}
          onPress={() => {
            navigation.navigate(routes.FASHIONSCREEN);
          }}>
          <View style={styles.productdisplayone}>
            <Image
              style={styles.productdisplayimage}
              source={require('../../assests/kurtiLogotwo.jpg')}
              resizeMode="cover"
            />
          </View>
          <View style={styles.productdisplaytwo}>
            <Text style={styles.productdisplaytext}>CLOTHING</Text>
            <Text style={styles.panelbuttontext}>Shop Now!</Text>
          </View>
        </Pressable>
        <Pressable
          style={styles.innerproductcontainertwo}
          onPress={() => {
            navigation.navigate(routes.HANDICRAFTSSCREEN);
          }}>
          <View style={styles.productdisplaytwo}>
            <Text style={styles.productdisplaytext}>HANDI-WORK</Text>
            <Text style={styles.panelbuttontext}>Shop Now!</Text>
          </View>
          <View style={styles.productdisplayone}>
            <Image
              style={styles.productdisplayimage}
              source={require('../../assests/buddhahandicraft.jpg')}
              resizeMode="cover"
            />
          </View>
        </Pressable>
        <Pressable
          style={styles.innerproductcontainerthree}
          onPress={() => {
            navigation.navigate(routes.ELECTRONICS);
          }}>
          <View style={styles.productdisplayone}>
            <Image
              style={styles.productdisplayimage}
              source={require('../../assests/Electronicsbannerlogo.jpg')}
              resizeMode="cover"
            />
          </View>
          <View style={styles.productdisplaytwo}>
            <Text style={styles.productdisplaytext}>GADGET'S</Text>
            <Text style={styles.panelbuttontext}>Shop Now!</Text>
          </View>
        </Pressable>
      </View>
      {/*====*/}
      {dataLoaded ? (
        <View style={styles.cardscontainer}>
          <View style={styles.fashioncardcontainer}>
            <View style={styles.fashioncardcontainerheading}>
              <View style={styles.fashioncardcontainerheadinginner}>
                <Text style={styles.fashioncardcontainerheadingtext}>
                  FIND THE BEST CHOICE
                </Text>
              </View>
              <Text style={styles.fashioncardcontainerheadingtext}>
                GET BEST ITEMS AT A DISCOUNTED PRICE
              </Text>
            </View>

            <View style={styles.fashionproductdisplay}>
              {displayedProducts1.map(product => (
                <View key={product.product_id} style={{margin: 5}}>
                  <TouchableOpacity
                    style={styles.imagecontainer}
                    onPress={() =>
                      onClickProduct(
                        product.product_id,
                        product.images,
                        product.name,
                        product.o_price,
                        product.s_price,
                      )
                    }>
                    <Image
                      source={{uri: product.images[0]}}
                      style={{
                        width: 150,
                        height: 150,
                        resizeMode: 'contain',
                      }}
                    />
                    <View style={styles.pricebannerrandom}>
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
            </View>
          </View>

          <View style={styles.productcontainer}>
            {products &&
              products.slice(1, 5).map(product => (
                <View
                  key={product.product_id}
                  style={styles.productinnercontainer}>
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
                  </TouchableOpacity>
                </View>
              ))}
          </View>
          {/* <View style={styles.fashioncardcontainer}>
            <View style={styles.fashioncardcontainerheading}>
              <View style={styles.fashioncardcontainerheadinginner}>
                <Text style={styles.fashioncardcontainerheadingtext}>
                  FLASH SALE ALERT!
                </Text>
              </View>
              <Text style={styles.fashioncardcontainerheadingtext}>
                GET BEST ITEMS AT A DISCOUNTED PRICE
              </Text>
            </View>

            <View style={styles.fashionproductdisplay}>
              {displayedProducts1.map(product => (
                <View key={product.product_id} style={{margin: 5}}>
                  <TouchableOpacity style={styles.imagecontainer}>
                    <Image
                      source={{uri: product.images[0]}}
                      style={{
                        width: 140,
                        height: 180,
                        resizeMode: 'cover',
                        borderRadius: 10,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            
          </View> */}
          <View style={styles.horizontalcontainer}>
            <View style={styles.horizontalheadcontainer}>
              <Text style={styles.smallheading}>DISCOVER</Text>
              <Text style={styles.mediumheading}>
                Specially curated items for you
              </Text>
            </View>
            <View>
              <FlatList
                horizontal
                data={products}
                keyExtractor={item => item.product_id.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.horizontalcardcontainer}
                    onPress={() =>
                      onClickProduct(
                        item.product_id,
                        item.images,
                        item.name,
                        item.o_price,
                        item.s_price,
                      )
                    }>
                    <Image
                      source={{uri: item.images[0]}}
                      style={styles.horizontalimage}
                      resizeMode="cover"
                    />
                    <View style={styles.pricehorizontal}>
                      <Text style={styles.horizontalpricesmalltext}>
                        {item.name.slice(0, 12)}
                        {item.name.length > 2 ? '...' : ''}
                      </Text>
                      <Text style={styles.horizontalo_pricetext}>
                        ₹{item.o_price}
                      </Text>
                      <Text style={styles.horizontalpricetext}>
                        ₹{item.s_price}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
          <View style={styles.fashionbannerproduct}>
            <View style={styles.innerfashionbannerproduct}>
              <View style={styles.innerfashiontextcontainer}>
                <Text style={styles.fashionbannertext}>THE</Text>
                <Text style={styles.fashionbannertext}>INDIANWEAR EDIT</Text>
                <Text style={styles.fashionbannersmalltext}>
                  Easy,breeze elegance to style your summer days!!
                </Text>
                <Text
                  style={[
                    styles.fashionbannerboldtext,
                    styles.fashionbannersmalltext,
                  ]}>
                  MIN 30% OFF
                </Text>
              </View>
              <View style={styles.innerfashionbuttoncontainer}>
                <Pressable
                  style={styles.innerfashionbutton}
                  onPress={() => {
                    navigation.navigate(routes.FASHIONSCREEN);
                  }}>
                  <Text style={styles.innerfashionbuttontext}>Shop Now</Text>
                </Pressable>
              </View>
            </View>
            <FlatList
              horizontal
              data={fashionProducts}
              keyExtractor={item => item.product_id.toString()}
              renderItem={({item}) => (
                <View style={styles.horizontalfashioncardcontainer}>
                  <TouchableOpacity
                    style={styles.mainimage}
                    onPress={() =>
                      onClickProduct(
                        item.product_id,
                        item.images,
                        item.name,
                        item.o_price,
                        item.s_price,
                      )
                    }>
                    <Image
                      source={{uri: item.images[0]}}
                      style={styles.horizontalfashionimage}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.pricehorizontal}
                    onPress={() =>
                      onClickProduct(
                        item.product_id,
                        item.images,
                        item.name,
                        item.o_price,
                        item.s_price,
                      )
                    }>
                    <Text style={styles.horizontalpricefashionsmalltext}>
                      {item.name.slice(0, 18)}
                      {item.name.length > 3 ? '...' : ''}
                    </Text>
                    <Text style={styles.horizontalo_pricetext}>
                      ₹{item.o_price}
                    </Text>
                    <Text style={styles.horizontalpricetext}>
                      ₹{item.s_price}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
          <View style={styles.electronicsProductbanner}>
            <View style={styles.electronicsProductbannertext}>
              <Text style={styles.electronicsproductbannerheadtext}>FWD</Text>
              <Text style={styles.electronicsproductbannermidtext}>
                ELECTRONICS FOR THE NEXT GEN
              </Text>
              <Text style={[styles.textcolor, styles.discountelectronicstext]}>
                ALL AT UPTO 40%
              </Text>
              <TouchableOpacity
                style={styles.fashionbuttoncontianer}
                onPress={() => {
                  navigation.navigate(routes.ELECTRONICS);
                }}>
                <Text style={styles.textcolor}>SHOP NOW!</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.electronicproductdisplay}>
              {electronicProducts.length > 0 &&
                electronicProducts.slice(0, 4).map(product => (
                  <View key={product.product_id} style={styles.card}>
                    <Pressable
                      style={styles.electronicsimagecontainer}
                      onPress={() =>
                        onClickProduct(
                          product.product_id,
                          product.images,
                          product.name,
                          product.o_price,
                          product.s_price,
                        )
                      }>
                      <Image
                        source={{uri: product.images[0]}}
                        style={styles.electronicproductimage}
                      />
                    </Pressable>
                    <TouchableOpacity
                      onPress={() =>
                        onClickProduct(
                          product.product_id,
                          product.images,
                          product.name,
                          product.o_price,
                          product.s_price,
                        )
                      }>
                      <View style={styles.electronicpricehorizontal}>
                        <Text style={styles.horizontalpricesmalltext}>
                          {product.name.slice(0, 16)}
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
            </View>
          </View>
          <View style={styles.handicraftBanner}>
            <View style={styles.innerhandicraftbannerproduct}>
              <View style={styles.innerfashiontextcontainer}>
                <Text style={styles.fashionbannertext}>THE</Text>
                <Text style={styles.fashionbannertext}>HANDICRAFTS COUPE</Text>
                <Text style={styles.fashionbannersmalltext}>
                  Providing elegance to style your Home!!
                </Text>
                <Text
                  style={[
                    styles.fashionbannerboldtext,
                    styles.fashionbannersmalltext,
                  ]}>
                  MIN 30% OFF
                </Text>
              </View>
              <View style={styles.innerfashionbuttoncontainer}>
                <Pressable
                  style={styles.innerfashionbutton}
                  onPress={() => {
                    navigation.navigate(routes.HANDICRAFTSSCREEN);
                  }}>
                  <Text style={styles.innerfashionbuttontext}>Shop Now</Text>
                </Pressable>
              </View>
            </View>
            <View>
              <FlatList
                horizontal
                data={handicraftProducts}
                keyExtractor={item => item.product_id.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.horizontalcardcontainer}
                    onPress={() =>
                      onClickProduct(
                        item.product_id,
                        item.images,
                        item.name,
                        item.o_price,
                        item.s_price,
                      )
                    }>
                    <Image
                      source={{uri: item.images[0]}}
                      style={styles.horizontalimage}
                      resizeMode="cover"
                    />
                    <View style={styles.pricehorizontal}>
                      <Text style={styles.horizontalpricesmalltext}>
                        {item.name.slice(0, 12)}
                        {item.name.length > 2 ? '...' : ''}
                      </Text>
                      <Text style={styles.horizontalo_pricetext}>
                        ₹{item.o_price}
                      </Text>
                      <Text style={styles.horizontalpricetext}>
                        ₹{item.s_price}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </View>
      ) : loadingTimeExpired ? (
        <View>
          <Text>Loading Time Expired</Text>
        </View>
      ) : (
        <ActivityIndicator size={100} />
      )}
    </ScrollView>
  );
}

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
  },
  textcontainerbanner: {
    flex: windowWidth * 0.55,
    padding: windowWidth * 0.03,
  },
  bannercontainertext: {
    fontSize: windowheight * 0.025,
    fontWeight: 'bold',
  },
  bannerbuttoncontainer: {
    backgroundColor: colors.White,
    padding: windowWidth * 0.02,
    borderRadius: windowWidth * 0.05,
    margin: windowWidth * 0.02,
    width: windowWidth * 0.45,
  },
  bannerbuttontext: {
    color: '#5956E9',
    fontSize: windowWidth * 0.04,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bannercontainer: {
    backgroundColor: '#5956E9',
    height: windowheight * 0.2,
    margin: windowWidth * 0.02,
    borderRadius: windowWidth * 0.06,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  imagecontainerbanner: {flex: windowWidth * 0.3},
  imagebanner: {
    width: '100%',
    height: '100%',
  },

  navtext: {
    color: colors.Black,
    fontSize: windowWidth * 0.041,
    fontWeight: 'bold',
  },
  discountbannercontainer: {
    height: windowheight * 0.05,
    marginLeft: windowWidth * 0.07,
    marginRight: windowWidth * 0.07,
    backgroundColor: '#E9B9B4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerdiscountone: {
    flexDirection: 'row',
    borderRightWidth: 1,
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerdiscounttwo: {
    flex: 0.3,
    marginLeft: windowWidth * 0.02,
  },
  discounttextbig: {
    color: colors.Black,
    fontSize: windowWidth * 0.045,
    fontWeight: 'bold',
  },
  discounttext: {
    color: colors.Black,
    fontSize: windowWidth * 0.035,
    fontWeight: 'bold',
  },
  innerproductcontainer: {
    flexDirection: 'row',
    height: windowheight * 0.25,
    backgroundColor: '#EADADB',
  },
  innerproductcontainertwo: {
    flexDirection: 'row',
    height: windowheight * 0.25,
    backgroundColor: '#FFF4A3',
  },
  innerproductcontainerthree: {
    flexDirection: 'row',
    height: windowheight * 0.25,
    backgroundColor: '#C5DAE8',
  },
  productdisplayone: {
    flex: 1,
  },
  productdisplay: {margin: 10, flex: 1},
  productdisplaytwo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productdisplayimage: {
    width: '100%',
    height: '100%',
  },
  productdisplaytext: {
    color: colors.Black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  panelbuttontext: {
    borderWidth: 1,
    color: colors.Black,
    padding: 5,
  },
  fashioncardcontainer: {
    marginBottom: 10,
    backgroundColor: colors.White,
  },
  fashioncardcontainerheading: {
    alignItems: 'center',
    marginBottom: 10,
  },
  fashioncardcontainerheadingtext: {
    color: colors.Black,
    fontSize: 16,
  },
  imagecontainer: {
    width: 165,
    justifyContent: 'center',
    alignItems: 'center',
    height: 230,
  },
  fashionproductdisplay: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },

  fashioncardcontainerheadinginner: {
    backgroundColor: '#E9B9B4',
    margin: 10,
    padding: 5,
  },
  horizontalpricetext: {
    fontWeight: 'bold',
    color: colors.Black,
    fontSize: 16,
  },
  horizontalo_pricetext: {
    textDecorationLine: 'line-through',
    color: colors.Black,
    fontSize: 16,
  },
  horizontalheadcontainer: {
    marginLeft: 15,
  },
  horizontalcontainer: {
    padding: 10,
    backgroundColor: colors.White,
  },
  horizontalcardcontainer: {
    margin: 5,
    marginTop: 15,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  imagecontainerhorizontalslider: {
    width: 130,
    justifyContent: 'center',
    alignItems: 'center',
    height: 180,
  },
  horizontalTouch: {},
  horizontalimage: {
    width: 130,
    height: 180,
    borderRadius: 10,
  },
  pricebannerrandom: {
    justifyContent: 'flex-start',
    marginTop: 5,
    padding: 5,
    width: '100%',
  },
  pricehorizontal: {
    margin: 10,
  },
  horizontalpricesmalltext: {
    color: colors.Black,
    fontSize: 14,
    alignSelf: 'flex-start',
  },
  horizontalpricetext: {
    fontWeight: 'bold',
    color: colors.Black,
    fontSize: 16,
  },
  electronicsproductdisplay: {
    flexDirection: 'row',
    backgroundColor: '#89D79A',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallheading: {
    color: colors.Black,
  },
  mediumheading: {
    color: colors.Black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  innerfashionbannerproduct: {
    backgroundColor: '#F8D5D9',
    flexDirection: 'row',
  },
  fashionbannertext: {
    fontSize: 22,
    color: '#000000',
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  innerfashiontextcontainer: {
    margin: 20,
    flex: 0.7,
  },
  innerfashionbuttoncontainer: {
    flex: 0.3,
    margin: 20,
    justifyContent: 'center',
  },
  innerfashionbutton: {backgroundColor: '#000000', padding: 5},
  innerfashionbuttontext: {
    color: '#FFFFFF',
  },
  fashionbannersmalltext: {
    color: '#000000',
    fontStyle: 'italic',
  },
  fashionbannerboldtext: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  horizontalfashioncardcontainer: {
    margin: 5,
    marginTop: 15,
  },
  mainimage: {
    width: 160,
    height: 180,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#d49f9f',
    elevation: 10,
  },
  horizontalfashionimage: {
    width: 160,
    height: 180,
    backgroundColor: '#FFFFFF',
  },
  fashionbannerproduct: {
    backgroundColor: '#FDDDF2',
  },
  horizontalpricefashionsmalltext: {
    color: colors.Black,
    fontSize: 14,
    fontWeight: 'bold',
  },
  electronicsProductbannertext: {
    backgroundColor: '#89D79A',
    alignItems: 'center',
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderColor: '#FFFFFF',
  },
  electronicsproductbannerheadtext: {
    fontSize: 30,
    color: '#000000',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  electronicsproductbannermidtext: {
    color: colors.White,
    fontSize: 18,
    fontWeight: 'bold',
  },
  fashionbuttoncontianer: {
    backgroundColor: '#268257',
    width: '30%',
    alignItems: 'center',
    margin: '2%',
    borderRadius: 20,
  },
  textcolor: {
    color: '#FFFFFF',
  },
  discountelectronicstext: {
    fontSize: 16,
  },
  electronicsbannercolor: {},
  innerhandicraftbannerproduct: {
    backgroundColor: '#c5c746',
    flexDirection: 'row',
  },
  handicraftBanner: {
    backgroundColor: '#e1e368',
  },
  electronicproductdisplay: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 10,
    backgroundColor: '#89D79A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  electronicsimagecontainer: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
  },
  card: {
    margin: 10,
    width: windowWidth * 0.43,
    height: windowheight * 0.3,
  },
  electronicproductimage: {
    width: windowWidth * 0.4,
    height: windowheight * 0.2,
    resizeMode: 'contain',
    margin: 5,
  },
  electronicpricehorizontal: {
    borderWidth: 2,
    padding: 2,
    borderBottomRightRadius: 20,
    borderColor: '#FFFFFF',
  },
  navbarcontainero: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 10,
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
