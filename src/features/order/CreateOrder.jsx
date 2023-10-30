import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import Button from "../../ui/Button";
import EmptyCart from "../cart/EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddress } from "../user/userSlice";
import { formatCurrency } from "../../utils/helpers";
import { clearCart, getTotalPrice } from "../cart/cartSlice";
import { createOrder } from "../../services/apiRestaurant";
import store from "../../store";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const formErrors = useActionData();

  const {
    address: { position, address },
    status,
  } = useSelector((state) => state.user);

  const isLoading = status === "loading";
  const cart = useSelector((state) => state.cart.cart);
  const name = useSelector((state) => state.user.userName);
  const totalCartPrice = useSelector(getTotalPrice);

  const [withPriority, setWithPriority] = useState(false);
  const priority = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priority;
  const isSubmitting = navigation.state === "submitting";

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            defaultValue={name}
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-3  rounded-md bg-red-100 px-1 py-1.5  text-[8px] text-red-600">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              disabled={isLoading}
              className="input w-full"
              type="text"
              name="address"
              required
              defaultValue={address}
            />
          </div>
          {!address && (
            <div className="absolute right-0.5 top-9 sm:right-1 sm:top-1">
              <Button
                disabled={isLoading}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get Position
              </Button>
            </div>
          )}
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            className=" h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <input
            type="hidden"
            name="position"
            value={
              position?.longitude && position?.latitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
          />
          <input type="hidden" value={JSON.stringify(cart)} name="cart" />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting
              ? "Placing Order"
              : `Order now ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const datas = {
    ...data,
    priority: data.priority === "true",
    cart: JSON.parse(data.cart),
  };
  // Error Checking ---------
  const errors = {};
  if (!isValidPhone(datas.phone))
    errors.phone =
      "Please give us your correct Phone Number,We might need to contact you !!";
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(datas);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
