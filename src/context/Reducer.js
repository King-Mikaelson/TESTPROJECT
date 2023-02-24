export const cartReducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE_CART":
      return action.payload;
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    case "INCREMENT_QTY":
      return {
        ...state,
        cart: state.cart.map((x) =>
          x.product === action.payload.product
            ? { ...x, quantity: x.quantity + 1 }
            : x
        ),
      };
    case "DECREMENT_QTY":
      return {
        ...state,
        cart: state.cart.map((x) =>
          x.product === action.payload.product
            ? {
                ...x,
                quantity: x.quantity > 1 ? x.quantity - 1 : (x.quantity = 1),
              }
            : x
        ),
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((c) => c.product !== action.payload.product),
      };

    case "CLEAR_ITEMS":
      return {
        ...state,
        items: [],
      };

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

export const orderReducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE_ORDER":
      return action.payload;
    case "DECREMENT_ORDER":
      return {
        ...state,
        changedOrders: state.changedOrders.map((x) =>
          x.item.product === action.payload.item.product
            ? {
                ...x,
                quantity: x.quantity > 1 ? x.quantity - 1 : (x.quantity = 1),
                returned: x.returned + 1,
              }
            : x
        ),
      };
    case "DECREMENT_BARMANORDER":
      return {
        ...state,
        barmanOrders: state.barmanOrders.map((x) =>
          x.item.product === action.payload.item.product
            ? {
                ...x,
                quantity: x.quantity > 1 ? x.quantity - 1 : (x.quantity = 1),
                returned: x.returned + 1,
              }
            : x
        ),
      };
    case "CLEAR_ORDER":
      return {
        ...state,
        changedOrders: [],
      };
    case "CLEAR_BARMANORDER":
      return {
        ...state,
        barmanOrders: [],
      };
    default:
      return state;
  }
};

export const deptReducer = (state, action) => {
  switch (action.type) {
    case "BAR":
      return {
        ...state,
        dept: "Bar",
      };

    case "LOUNGE":
      return {
        ...state,
        dept: "Lounge",
      };

    case "KITCHEN":
      return {
        ...state,
        dept: "Kitchen",
      };

    default:
      return state;
  }
};
