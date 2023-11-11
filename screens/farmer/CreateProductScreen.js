import React, { useState } from "react";
import { Input } from "react-native-elements";
import {
  ActivityIndicator,
  Button,
  View,
  StyleSheet,
  ScrollView
} from "react-native";

import firebase from "../../database/firebase";

const AddProductScreen = (props) => {
  const initalState = {
    name: "",
    description: "",
    image: "",
    idFarmer: "",
    price: "",
    amount: "",
  };

  const [state, setState] = useState(initalState);
  const [loading, setLoading] = useState(false);

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const saveNewProduct = async () => {
    if (state.name === "" || state.description === "" || state.price === "" || state.amount === "") {
      alert("Faltan campos por llenar!");
    } else {
      setLoading(true);
      try {
        await firebase.db.collection("products").add({
          name: state.name,
          description: state.description,
          image: `https://source.unsplash.com/random/300×400/?fruit-${state.name}`,
          idFarmer: "1",
          price: state.price,
          amount: state.amount,
        });
        setLoading(false)
        props.navigation.navigate("ProductsList");
      } catch (error) {

      }
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#2510a3" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Name Input */}
      <View style={{ marginTop: 5 }}>
        <Input
          label="Nombre"
          placeholder="Ingresar Nombre"
          inputStyle={{ fontSize: 15 }}
          inputContainerStyle={{ borderColor: '#2510a3' }}
          labelStyle={{ color: "#2510a3" }}
          onChangeText={(value) => handleChangeText(value, "name")}
          value={state.name}
        />
      </View>

      {/* Description Input */}
      <View style={{ marginTop: 5 }}>
        <Input
          label="Descripción"
          placeholder="Ingresar Descripción"
          inputStyle={{ fontSize: 15 }}
          inputContainerStyle={{ borderColor: '#2510a3' }}
          labelStyle={{ color: "#2510a3" }}
          multiline={true}
          scrollEnabled={true}
          numberOfLines={3}
          onChangeText={(value) => handleChangeText(value, "description")}
          value={state.description}
        />
      </View>

      {/* amount Input */}
      <View style={{ marginTop: 5 }}>
        <Input
          label="Cantidad"
          placeholder="Ingresar Cantidad"
          inputStyle={{ fontSize: 15 }}
          inputContainerStyle={{ borderColor: '#2510a3' }}
          labelStyle={{ color: "#2510a3" }}
          keyboardType="numeric"
          onChangeText={(value) => handleChangeText(value, "amount")}
          value={state.amount}
        />
      </View>

      {/* price Input */}
      <View style={styles.inputGroup}>
        <Input
          label="Precio"
          placeholder="Ingresar Precio"
          keyboardType="numeric"
          inputStyle={{ fontSize: 15 }}
          labelStyle={{ color: "#2510a3" }}
          inputContainerStyle={{ borderColor: '#2510a3' }}
          onChangeText={(value) => handleChangeText(value, "price")}
          value={state.price}
        />
      </View>

      <View style={styles.button}>
        <Button title="Guardar" onPress={() => saveNewProduct()} color="#2510a3" />
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
  button: {
    marginBottom: 7,
    margin: 20,
  },
});

export default AddProductScreen;