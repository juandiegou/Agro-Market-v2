import React, { useEffect, useState, useContext } from "react";
import { Avatar, Input } from "react-native-elements";
import {
    Text,
    ScrollView,
    Button,
    View,
    ActivityIndicator,
    StyleSheet,
} from "react-native";
import { ShoppingCartContext } from '../../App';
import firebase from "../../database/firebase";


const ProductDetails = (props) => {
    const initialState = {
        id: "",
        name: "",
        description: "",
        image: "",
        idFarmer: "",
        price: "",
        amount: "",
    };

    let amountBuyerInt = 0;
    let amountProduct = 0;
    const [product, setProduct] = useState(initialState);
    const [farmer, setFarmer] = useState(initialState);
    const [loading, setLoading] = useState(true);
    const [amountBuyer, setAmountBuyer] = useState();
    const { cart } = useContext(ShoppingCartContext);

    const getProductById = async (id) => {
        const dbRef = firebase.db.collection("products").doc(id);
        const doc = await dbRef.get();
        const productId = doc.data();
        setProduct({ ...productId, id: doc.id });
        const dbRef2 = firebase.db.collection("farmers").doc(productId.idFarmer);
        const doc2 = await dbRef2.get();
        const farmerId = doc2.data();
        setFarmer({ ...farmerId, idFarmer: doc2.id });
        setLoading(false);
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


    const addShoppingCart = () => {

        amountBuyerInt = parseInt(amountBuyer);
        amountProduct = parseInt(product.amount);

        if (amountBuyerInt > amountProduct || amountBuyer === undefined || amountBuyerInt < 1) {
            alert("Cantidad Incorrecta o mayor a la disponible");
        } else {
            setLoading(true);
            cart.push({ product: product, amountBuyer: amountBuyer });
            props.navigation.navigate("CARRITO", { cart: cart, props: props });
            setLoading(false);
        }
    };


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

                <View style={{ display: "flex", marginBottom: 30 }}>
                    <Text style={{ fontSize: 15, color: "black" }}>{product.description}</Text>
                </View>
                <View style={{ display: "flex", marginBottom: 5 }}>
                    <Text style={{ fontSize: 15, color: "#2510a3", fontWeight: 'bold' }}>Precio
                        <Text style={{ fontSize: 15, color: "black" }}>: ${product.price}
                        </Text>
                    </Text>
                </View>
                <View style={{ display: "flex", marginBottom: 5 }}>
                    <Text style={{ fontSize: 15, color: "#2510a3", fontWeight: 'bold' }}>Cantidad disponible
                        <Text style={{ fontSize: 15, color: "black" }}>: {product.amount}
                        </Text>
                    </Text>
                </View>
                <View style={{ display: "flex", marginBottom: 30 }}>
                    <Text style={{ fontSize: 15, color: "#2510a3", fontWeight: 'bold' }}>Vendedor
                        <Text style={{ fontSize: 15, color: "black" }}>: {farmer.name}
                        </Text>
                    </Text>
                </View>

                <View >
                    <Input
                        label="Cantidad a comprar"
                        placeholder="Ingrese la cantidad deseada"
                        inputStyle={{ fontSize: 15 }}
                        inputContainerStyle={{ borderColor: '#2510a3' }}
                        labelStyle={{ color: "#2510a3" }}
                        keyboardType="numeric"
                        value={amountBuyer ? amountBuyer : ""}
                        onChangeText={(value) => setAmountBuyer(value)}
                    />
                </View>
                <View style={styles.btn}>
                    <Button
                        title="Agregar al Carrito" onPress={() => addShoppingCart()} color="#2510a3" />
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
        margin: 20,
        borderRadius: 10
    },
});

export default ProductDetails;