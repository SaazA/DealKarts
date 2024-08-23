import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const ProductDisplayScreen = ({route}) => {
  // Destructure the parameters from route.params
  const {id, images, name, originalprice, sellingprice} = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
      {images && images.length > 0 && (
        <Image source={{uri: images[0]}} style={styles.image} />
      )}
      <Text style={styles.text}>Product ID: {id}</Text>
      <Text style={styles.otext}>Original Price: ₹{originalprice}</Text>
      <Text style={styles.text}>Selling Price: ₹{sellingprice}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: colors.Black,
  },
  textDecorationLine: 'line-through',
  otext: {
    textDecorationLine: 'line-through',
    fontSize: 18,
    color: colors.Black,
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});

export default ProductDisplayScreen;
