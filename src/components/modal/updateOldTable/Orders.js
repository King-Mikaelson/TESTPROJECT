import "../Modal.css";

const Orders = ({ order }) => {
  const { item, quantity } = order;
  return (
    <tr>
      <td className="td">{item.product}</td>
      <td className="td">₦{item.price}</td>
      <td className="td">{quantity}</td>
      <td className="td">₦{quantity * item.price}</td>
    </tr>
  );
};

export default Orders;
