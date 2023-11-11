import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import FloatingActionButton from "react-native-floating-action-button";
import firebase from "../../database/firebase";

const ProductScreen = (props) => {
  const [products, setProducts] = useState([]);

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

    <View style={{ flex: 1 }}>

      <ScrollView>
        {products.map((product) => {
          return (
            <ListItem
              key={product.id}
              bottomDivider
              onPress={() => {
                props.navigation.navigate("ProductDetailScreen", {
                  productId: product.id,
                });
              }}
            >

              <Avatar
                source={{
                  uri: product.image,
                }}
                rounded
                size="medium"
              />
              <ListItem.Content >
                <ListItem.Title style={[{ color: "#2510a3", fontWeight: 'bold' }]}>
                  {product.name}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={2}>
                  {product.description}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          );
        })}
      </ScrollView>

      <TouchableOpacity activeOpacity={0.5} style={styles.TouchableOpacityStyle} >

        <FloatingActionButton
          iconName="md-add"
          iconType="Ionicons"
          iconColor="white"
          shadowColor="#2510a3"
          rippleColor="#2510a3"
          backgroundColor="#2510a3"
          size={60}
          iconSize={40}
          onPress={() => props.navigation.navigate("CreateProductScreen")}
        />
      </TouchableOpacity>
    </View >
  );
};

const styles = StyleSheet.create({

  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
});

export default ProductScreen;