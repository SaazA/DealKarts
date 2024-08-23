import axios from 'axios';
import {
  BASE_URL,
  GET_PRODUCTS,
  GET_PRODUCTS_BY_CATEGORY,
  LOGIN_API,
} from './staticUrls';

export const LoginApi = (mobile, password) => {
  return new Promise((resolve, reject) => {
    const Body = {
      mobile: mobile ,
      password: password,
    };
    console.log(Body);
    console.log(`${BASE_URL}${LOGIN_API}`);
    // console.log(`${BASE_URL}${LOGIN_API}`); https://uat-api.socialbharat.org/api/login-by-password
    axios
      .post(` https://uat-api.socialbharat.org/api/login-by-password`, Body, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

export const getProductsByCategories = id => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}${GET_PRODUCTS_BY_CATEGORY}/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

export const getProducts = () => {
  return new Promise((resolve, reject) => {
    console.log(`${BASE_URL}${GET_PRODUCTS}`);
    axios
      .get(`${BASE_URL}${GET_PRODUCTS}`)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        reject(error);
      });
  });
};

