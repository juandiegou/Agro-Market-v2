import React, { useEffect, useState } from "react";
import { Avatar, Input } from "react-native-elements";
import {
  Text,
  ScrollView,
  Button,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import firebase from "../../database/firebase";

const ProductDetailScreen = (props) => {
  const initialState = {
    id: "",
    name: "",
    description: "",
    image: "",
    idFarmer: "",
    price: "",
    amount: "",
  };

  const [product, setProduct] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (value, prop) => {
    setProduct({ ...product, [prop]: value });
  };

  const getProductById = async (id) => {
    const dbRef = firebase.db.collection("products").doc(id);
    const doc = await dbRef.get();
    const productId = doc.data();
    setProduct({ ...productId, id: doc.id });
    setLoading(false);
  };

  const deleteProduct = async () => {
    setLoading(true)
    const dbRef = firebase.db
      .collection("products")
      .doc(props.route.params.productId);
    await dbRef.delete();
    setLoading(false)
    props.navigation.navigate("ProductsList");
  };

  const openConfirmationAlert = () => {
    Alert.alert(
      "Eliminar Producto",
      "¿Desea Eliminarlo?",
      [
        { text: "Si", onPress: () => deleteProduct() },
        { text: "No", onPress: () => { } },
      ],
      {
        cancelable: true,
      }
    );
  };

  const updateProduct = async () => {
    if (product.name === "" || product.description === "" || product.price === "" || product.amount === "") {
      alert("Faltan campos por llenar!");
    } else {
      setLoading(true)
      const productRef = firebase.db.collection("products").doc(product.id);
      await productRef.set({
        name: product.name,
        description: product.description,
        image: product.image,
        idFarmer: product.idFarmer,
        price: product.price,
        amount: product.amount,
      });
      setLoading(false)
      setProduct(initialState);
      props.navigation.navigate("ProductsList");
    }
  };

  useEffect(() => {
    getProductById(props.route.params.productId);
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#2510a3" />
      </View>
    );
  }

  return (

    <ScrollView>

      <View style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#E5E2E2", paddingVertical: 35 }}>
        <Avatar
          source={{
            uri: product.image,
          }}
          rounded
          size="xlarge"
        />
      </View>

      <View style={styles.container}>
        <View style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 20 }}>
          <Text style={{ fontSize: 25, color: "#2510a3", fontWeight: 'bold' }}>{product.name}</Text>
        </View>

        <View>
          <Input
            label="Descripción"
            placeholder="Ingresar Descripción"
            inputStyle={{ fontSize: 15 }}
            inputContainerStyle={{ borderColor: '#2510a3' }}
            labelStyle={{ color: "#2510a3" }}
            multiline={true}
            scrollEnabled={true}
            numberOfLines={3}
            value={product.description}
            onChangeText={(value) => handleTextChange(value, "description")}
          />
        </View>
        <View style={{ marginTop: 5 }}>
          <Input
            label="Cantidad"
            placeholder="Ingresar Cantidad"
            inputStyle={{ fontSize: 15 }}
            inputContainerStyle={{ borderColor: '#2510a3' }}
            labelStyle={{ color: "#2510a3" }}
            keyboardType="numeric"
            value={product.amount}
            onChangeText={(value) => handleTextChange(value, "amount")}
          />
        </View>
        <View style={{ marginTop: 5 }}>
          <Input
            label="Precio"
            placeholder="Ingresar Precio"
            keyboardType="numeric"
            inputStyle={{ fontSize: 15 }}
            labelStyle={{ color: "#2510a3" }}
            inputContainerStyle={{ borderColor: '#2510a3' }}
            value={product.price}
            onChangeText={(value) => handleTextChange(value, "price")}
          />
        </View>

        <View style={styles.btn}>
          <Button title="Actualizar" onPress={() => updateProduct()} color="#2510a3" />
        </View>

        <View style={styles.btn}>
          <Button
            title="Eliminar" onPress={() => openConfirmationAlert()} color="#CC2e1f" />
        </View>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },

  btn: {
    marginBottom: 7,
    margin: 15,
  },
});


export default ProductDetailScreen;