import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import ProductListBuyer from '../screens/buyer/ProductListBuyer';

describe("ProductListBuyer", () => {
  test("should show the product list", () => {
    const { getAllByText } = render(<ProductListBuyer />);
    const {productList} = getAllByText("Precio: $");
    expect(productList).toHaveLength(11);
  });
});