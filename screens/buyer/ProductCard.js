import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import React from 'react'

const ProductCard = ({ props, item }) => {
  const tail = useTailwind();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        props.navigation.navigate("ProductDetailBuyer", {
          productId: item.id,
        });
      }}
    >
      <View style={tail('items-center')}>
        <View
          style={tail('items-center bg-orange-600 rounded-xl w-8 xs:h-40 sm:h-40 md:h-48 lg:h-52 w-48 xl:h-56 w-32')}>
          <Image source={{ uri: `${item.image}` }} style={{width: '100%', height: '55%'}} />
          <View style={tail('items-center')}>
            <View>
              <Text style={tail("items-center self-center text-xl md:text-xl text-gray-50 pl-3 text-center")}> {item.name} </Text>
            </View>
            <View>
              <Text style={tail("items-center self-center text-sm md:text-lg font-light text-gray-50 pt-2 pb-5")}>Precio:  ${item.price} </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback >
  )
}

export default ProductCard;