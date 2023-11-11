import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { FlatGrid } from 'react-native-super-grid';
import ProductCard from './ProductCard';
import firebase from "../../database/firebase";
import { useTailwind } from 'tailwind-rn';

const ProductListBuyer = (props) => {
  const [products, setProducts] = useState([]);
  const tail = useTailwind();

  useEffect(() => {
    firebase.db.collection("products").onSnapshot((querySnapshot) => {
      const listProducts = [];
      querySnapshot.docs.forEach((doc) => {
        const { name, description, image, idFarmer, price, amount } = doc.data();
        listProducts.push({
          id: doc.id,
          name,
          description,
          image,
          idFarmer,
          price,
          amount,
        });
      });
      setProducts(listProducts);
    });
  }, []);

  return (
    <ScrollView>
      <View>
        <FlatGrid
          // scrollEnabled={false}
          itemDimension={120}
          data={products}
          style={styles.gridView}
          // staticDimension={300}
          // fixed
          spacing={10}
          renderItem={({ item }) => (
            <ProductCard props={props} item={item} />
          )}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 180,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});

export default ProductListBuyer;  
