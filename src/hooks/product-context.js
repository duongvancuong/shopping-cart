import React, { useMemo, useContext, useReducer } from "react";

const ProductContext = React.createContext();

const productsFake = require('../db.json');

const handleActionItemAddToCart = (shoppingCart, item) => {
  if(shoppingCart.length === 0) {
    shoppingCart.push(item);
  } else {
    const itemFiltered = shoppingCart.filter((i) => i.id === item.id);

    if(itemFiltered.length === 0) {
      shoppingCart.push(item);
    } else {
      itemFiltered[0].number+= item.number;
    }
  }

  return [...shoppingCart];
};

const handleActionRemoveItem = (shoppingCart, item) => {
  const itemsRemain = shoppingCart.filter((i) => i.id !== item.id);

  return [...itemsRemain];
};

const handleActionDecreaseItemInCart = (shoppingCart, item) => {
  const itemFound = shoppingCart.find((i) => i.id === item.id);

  if (itemFound && itemFound.number > 1) {
    itemFound.number--;
  }

  return [...shoppingCart];
};


const handleActionIncreaseItemInCart = (shoppingCart, item) => {
  const itemFound = shoppingCart.find((i) => i.id === item.id);

  itemFound && itemFound.number++;

  return [...shoppingCart];
};

const handleProductAdded = (products, item) => {
  const itemFound = products.find((i) => i.id === item.id);

  itemFound.quantity-= item.number;

  return [...products];
};

const handleIncreaseProductInCart = (products, item) => {
  const itemFound = products.find((i) => i.id === item.id);

  itemFound.quantity--;

  return [...products];
};

const handleDecreaseProductInCart = (products, item) => {
  const itemFound = products.find((i) => i.id === item.id);

  itemFound.quantity++;

  return [...products];
};

const handleRemoveProductInCart = (products, item) => {
  const itemFound = products.find((i) => i.id === item.id);

  itemFound.quantity+= item.number;

  return [...products];
};

const discountBulkDrinks = (shoppingCart) => {
  const itemFiltered = shoppingCart.filter((i) => i.category === "Drinks");
  const numberOfItems = itemFiltered.reduce((n, {number}) => n + number, 0)
  const MINIMUM_DISCOUNT_RATE = 10;

  if(numberOfItems  >= MINIMUM_DISCOUNT_RATE) {
    return itemFiltered.reduce((n, {number, price }) => n + number*(price.current*0.1), 0);
  } else {
    return 0;
  }
};

const discountSpendingMore = (shoppingCart) => {
  const itemFiltered = shoppingCart.filter((i) => i.category === "Baking/Cooking Ingredients");
  const totalPrices = itemFiltered.reduce((n, {number, price }) => n + number*(price.current), 0);
  const MINIMUM_DISCOUNT_RATE = 50;
  const DISCOUNT_PRICE = 5;

  if(totalPrices >= MINIMUM_DISCOUNT_RATE){
    return DISCOUNT_PRICE;
  }

  return 0;
};

const handleDiscountWithVoucher = (totalBill, valid_voucher) => {
  const MINIMUM_DISCOUNT_RATE = 100;
  const DISCOUNT_PRICE = 20;

  if(totalBill >= MINIMUM_DISCOUNT_RATE && valid_voucher) {
    return DISCOUNT_PRICE;
  }

  return 0;
};

const shoppingCartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        shopping_cart: handleActionItemAddToCart(state.shopping_cart, action.payload),
        products: handleProductAdded(state.products, action.payload),
      };
    case "DECREASE_ITEM":
      return {
        ...state,
        shopping_cart: handleActionDecreaseItemInCart(state.shopping_cart, action.payload),
        products: handleDecreaseProductInCart(state.products, action.payload),
      };
    case "INCREASE_ITEM":
      return {
        ...state,
        shopping_cart: handleActionIncreaseItemInCart(state.shopping_cart, action.payload),
        products: handleIncreaseProductInCart(state.products, action.payload),
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        shopping_cart: handleActionRemoveItem(state.shopping_cart, action.payload),
        products: handleRemoveProductInCart(state.products, action.payload),
      };
    case "VERIFY_VOUCHER":
      return { ...state, valid_voucher: state.voucher === action.payload };
    default:
      throw new Error(`Unsupported action type ${action.type}`);
  }
};

const useShoppingCart = () => {
  const context = useContext(ProductContext);

  if (!context) throw new Error("useShoppingCart must be used within a ProductProvider");

  const [state, dispatch] = context;

  const addToCart = (item) => dispatch({ type: "ADD_TO_CART", payload: item });
  const decrementItem = (item) => dispatch({ type: "DECREASE_ITEM", payload: item });
  const incrementItem = (item) => dispatch({ type: "INCREASE_ITEM", payload: item });
  const removeItem = (item) => dispatch({ type: "REMOVE_ITEM", payload: item });
  const verifyVoucher = (voucherCode) => dispatch({ type: "VERIFY_VOUCHER", payload: voucherCode });

  return {
    state,
    dispatch,
    addToCart,
    decrementItem,
    incrementItem,
    removeItem,
    verifyVoucher,
  };
}

const useSelector = (key) => {
  const context = useContext(ProductContext);

  if (!context) throw new Error("useSelector must be used within a ProductProvider");

  const [state] = context;

  return useMemo(() => state[key], [key, state]);
}

const useOrderSummary = () => {
  const context = useContext(ProductContext);

  if (!context) throw new Error("useOrderSummary must be used within a ProductProvider");

  const [state] = context;
  const { shopping_cart, valid_voucher } = state;

  const orderSubtotal = parseFloat(shopping_cart.reduce((n, {number, price }) => n + number*(price.current), 0).toFixed(2));
  const discountBulkDrinksPrices = parseFloat(discountBulkDrinks(shopping_cart).toFixed(2));
  const discountSpendingMorePrices = parseFloat(discountSpendingMore(shopping_cart).toFixed(2));
  const discountVoucher = parseFloat(handleDiscountWithVoucher(orderSubtotal, valid_voucher).toFixed(2));
  const grandTotal = parseFloat(orderSubtotal - discountBulkDrinksPrices - discountSpendingMorePrices - discountVoucher);

  return {
    orderSubtotal,
    discountBulkDrinksPrices,
    discountSpendingMorePrices,
    grandTotal,
    discountVoucher
  }
}

const ProductProvider = (props) => {
  const [state, dispatch] = useReducer(shoppingCartReducer, {
    products: [...productsFake.products],
    voucher: productsFake.voucherCode,
    valid_voucher: false,
    shopping_cart: [],
  });

  const value = useMemo(() => [state, dispatch], [state]);

  return <ProductContext.Provider value={value} {...props} />;
}

export {
  useShoppingCart,
  ProductProvider,
  useSelector,
  useOrderSummary,
};
