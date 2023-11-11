import { View, Button, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { ShoppingCartContext } from '../../App'
import { ListItem, Avatar, Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";


export default function ShoppingCart(props) {
  const cart = useContext(ShoppingCartContext);
  let subtotal = 0;
  let shipping = "Gratis";
  let total = 0;

  return (
    <ShoppingCartContext.Consumer>
      {cart => (

        <View style={{ flex: 1 }}>

          <ScrollView>

            {cart.cart?.map((ItemCart, index) => {
              subtotal += parseInt(ItemCart.amountBuyer) * parseInt(ItemCart.product.price);
              total += parseInt(ItemCart.amountBuyer) * parseInt(ItemCart.product.price);
              return (
                <ListItem
                  key={ItemCart.product.id}
                  bottomDivider
                  onPress={() => {
                    props.navigation.navigate("ProductDetailBuyer", {
                      productId: ItemCart.product.id,
                    });
                  }}
                >
                  <Avatar
                    source={{
                      uri: ItemCart.product.image,
                    }}
                    rounded
                    size="medium"
                  />
                  <ListItem.Content >
                    <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => { }} activeOpacity={0.5}>
                      <Text style={{ fontSize: 20, color: "#2510a3", fontWeight: 'bold', textAlign: 'right' }}>X</Text>
                    </TouchableOpacity>
                    <ListItem.Title style={[{ color: "#2510a3", fontWeight: 'bold', fontSize: 20 }]}>
                      {ItemCart.product.name}
                    </ListItem.Title>
                    <ListItem.Subtitle style={[{ color: "#2510a3", fontSize: 15 }]}>
                      Precio: ${ItemCart.product.price}
                    </ListItem.Subtitle>
                    <ListItem.Subtitle style={[{ color: "#2510a3", fontSize: 15 }]}>
                      Cantidad: {ItemCart.amountBuyer}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              );
            })}
          </ScrollView>
          {cart?.cart.length < 1 ? (<View style={{ textAlign: 'center', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 25, color: "#2510a3", textAlign: 'center', fontWeight: 'bold' }}>Carrito Vacío</Text>
            <Icon type='material' name='help' size={50} color='#2510a3' /></View>) : (
            <View style={{ position: "relative", padding: 35 }}>
              <Text style={{ fontSize: 20, color: "black", textAlign: 'right' }}>Subtotal: ${subtotal}</Text>
              <Text style={{ fontSize: 20, color: "black", textAlign: 'right' }}>Envío: {shipping}</Text>
              <Text style={{ fontSize: 20, color: "black", textAlign: 'right', fontWeight: 'bold', }}>Total: ${total}</Text>
              <View style={{ marginTop: 10 }}>
                <Button title="Continuar Compra" onPress={() => { }} color="#2510a3" />
              </View>
            </View>
          )}
        </View >
      )}
    </ShoppingCartContext.Consumer >
  )
}