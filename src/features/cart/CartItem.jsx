import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import { getCurrentQuantity } from "./cartSlice";
import DeleteItem from "./DeleteItem";
import UpdateQuantity from "./UpdateQuantity";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currentQuantity = useSelector(getCurrentQuantity(pizzaId));

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between ">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between space-x-3 sm:gap-6 sm:space-x-0">
        <p className="grow text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <div>
          <UpdateQuantity pizzaId={pizzaId} currentQuantity={currentQuantity} />
        </div>
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
