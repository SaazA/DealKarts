import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  ImageBackground,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../constants/colors';

import {getProductsByCategories} from '../../apis/apicalls';

const FashionScreen = () => {
  const [products, setProducts] = useState([]);
  const [displayedProducts1, setDisplayedProducts1] = useState([]);
  const [displayedProducts2, setDisplayedProducts2] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
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
    getProductsByCategories(2)
      .then(res => {
        setProducts(res.data.data);
        setDataLoaded(true);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  // useEffect(() => {
  //   if (dataLoaded) {
  //     // Initial update
  //     const initialProducts2 = getRandomProducts(products, 6);
  //     setDisplayedProducts2(initialProducts2);
  //     const interval2 = setInterval(() => {
  //       const updatedProducts2 = getRandomProducts(products, 6);
  //       setDisplayedProducts2(updatedProducts2);
  //     }, 6000)
  //     return () => {
  //       clearInterval(interval2);
  //     };
  //   }
  // }, [dataLoaded, products]);

  useEffect(() => {
    if (dataLoaded) {
      const initialProducts1 = getRandomProducts(products, 4);
      const initialProducts2 = getRandomProducts(products, 6);
      setDisplayedProducts1(initialProducts1);
      setDisplayedProducts2(initialProducts2);

      const interval1 = setInterval(() => {
        const updatedProducts1 = getRandomProducts(products, 4);
        setDisplayedProducts1(updatedProducts1);
      }, 6000);
      const interval2 = setInterval(() => {
        const updatedProducts2 = getRandomProducts(products, 6);
        setDisplayedProducts2(updatedProducts2);
      }, 10000);

      return () => {
        clearInterval(interval1);
        clearInterval(interval2);
      };
    }
  }, [dataLoaded, products]);

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <ScrollView style={styles.maincontainer}>
      <View style={styles.bannerContainer}>
        <View style={styles.innerbannerone}>
          <View style={styles.textcontaineronebanner}>
            <Text style={styles.bannertext}>
              WELCOME TO FASHION SENSE, FIND YOUR FASHION!
            </Text>
            <Text style={styles.bannertexto}>
              WITH OUR SELECTIVE BEST FINDS!
            </Text>
          </View>
          <View style={styles.bannerbuttoncontainer}>
            <Pressable>
              <Text style={styles.bannerbuttontext}>SHOP NOW!</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.innerbannertwo}>
          <Image
            source={require('../../assests/fashionscreenmainbanner.jpg')}
            resizeMode="contain"
            style={styles.mainbannertwo}
          />
        </View>
      </View>
      {dataLoaded ? (
        <View>
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
              {products.slice(0, 4).map(product => (
                <View key={product.product_id} style={{margin: 5}}>
                  <TouchableOpacity style={styles.imagecontainer}>
                    <Image
                      source={{uri: product.images[0]}}
                      style={{
                        width: 150,
                        height: 150,
                        resizeMode: 'cover',
                      }}
                    />
                    <View style={styles.pricehorizontal}>
                      <Text style={styles.horizontalpricesmalltext}>
                        {product.name.slice(0, 16)}
                        {product.name.length > 3 ? '...' : ''}
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
          <View style={styles.horizontalcontainer}>
            <View style={styles.horizontalheadcontainer}>
              <Text style={styles.smallheading}>DISCOVER</Text>
              <Text style={styles.mediumheading}>
                Limited Time Offers to Grab Now!
              </Text>
            </View>
            <View>
              <FlatList
                horizontal
                data={displayedProducts2}
                keyExtractor={item => item.product_id.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity style={styles.horizontalcardcontainer}>
                    <Image
                      source={{uri: item.images[0]}}
                      style={styles.horizontalimage}
                      resizeMode="cover"
                    />
                    <View style={styles.pricehorizontal}>
                      <Text style={styles.horizontalpricesmalltext}>
                        {item.name.slice(0, 18)}
                        {item.name.length > 3 ? '...' : ''}
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

          <View style={styles.bannercontainersecond}>
            <View style={styles.bannersecondcontainerone}>
              <Text style={styles.bloomtext}>ETHNIC BLOOMS</Text>
              <Text style={styles.bannerKurtitext}>
                Kurti sets in the prettiest floral prints, perfect for summer
              </Text>
              <Text style={styles.percentbannertext}>
                UP TO 70% OFF (on selective products)
              </Text>
            </View>
            <View style={styles.bannersecondcontainertwo}>
              <Image
                source={require('../../assests/kurtilogothree.jpeg')}
                style={styles.secondbannerImage}
                resizeMode="contain"
              />
            </View>
          </View>
          <View style={styles.fashioncardcontainer}>
            <View style={styles.fashionproductdisplay}>
              {displayedProducts1.map(product => (
                <View key={product.product_id} style={{margin: 5}}>
                  <TouchableOpacity style={styles.imagecontainer}>
                    <Image
                      source={{uri: product.images[0]}}
                      style={{
                        width: 150,
                        height: 150,
                        resizeMode: 'cover',
                      }}
                    />
                    <View style={styles.pricehorizontal}>
                      <Text style={styles.horizontalpricesmalltext}>
                        {product.name.slice(0, 16)}
                        {product.name.length > 3 ? '...' : ''}
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
        </View>
      ) : (
        <ActivityIndicator size={100} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
  },
  bannerContainer: {
    marginBottom: 10,
    height: 250,
    flexDirection: 'row',
    backgroundColor: '#feb6a9',
    alignItems: 'center',
    padding: 5,
  },
  innerbannerone: {
    flex: 0.6,
    height: 200,
    marginLeft: 10,
  },
  innerbannertwo: {
    flex: 0.5,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainbannertwo: {
    width: 160,
    height: 220,
    borderRadius: 40,
  },
  textcontaineronebanner: {
    padding: 10,
  },
  bannertexto: {
    color: colors.White,
    fontSize: 16,
    fontWeight: 'bold',
  },
  bannertext: {
    color: colors.White,
    fontSize: 18,
    fontWeight: 'bold',
  },
  bannercontainersecond: {
    flexDirection: 'row',
    backgroundColor: '#FA6544',
    height: 300,
  },
  bannersecondcontainerone: {
    flex: 0.55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerbuttoncontainer: {
    backgroundColor: colors.White,
    padding: 5,
    borderRadius: 20,
    width: 130,
  },
  bannerbuttontext: {
    color: '#feb6a9',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bloomtext: {
    fontSize: 30,
    margin: 5,
    color: colors.White,
  },
  bannerKurtitext: {
    fontSize: 16,
    margin: 10,
    color: colors.White,
  },
  percentbannertext: {
    fontSize: 16,
    margin: 10,
    fontWeight: 'bold',
    color: colors.White,
  },
  bannersecondcontainertwo: {
    flex: 0.55,
    alignItems: 'center',
    margin: 10,
    justifyContent: 'center',
  },
  secondbannerImage: {
    height: 250,
    width: 250,
    borderRadius: 125,
  },
  horizontalheadcontainer: {
    marginLeft: 15,
  },
  horizontalcontainer: {
    backgroundColor: '#ffc107',

    padding: 10,
  },
  horizontalcardcontainer: {
    margin: 5,
    marginTop: 15,
    backgroundColor: 'white',
  },
  imagecontainerhorizontalslider: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalTouch: {},
  horizontalimage: {
    width: 180,
    height: 200,
  },
  pricehorizontal: {
    margin: 10,
    height: 60,
  },
  horizontalpricesmalltext: {
    color: colors.Black,
    fontSize: 14,
    fontWeight: 'bold',
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
  smallheading: {
    textAlign: 'center',
    color: colors.Black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  mediumheading: {
    color: colors.White,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  fashioncardcontainer: {
    marginBottom: 10,
    marginTop: 10,

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

  mainProductDisplay: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  imagecontainermainbanner: {
    width: 165,
    justifyContent: 'center',
    alignItems: 'center',
    height: 230,
  },
});

export default FashionScreen;
