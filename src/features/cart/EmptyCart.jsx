import LinkButton from "../../ui/LinkButton";

function EmptyCart() {
  return (
    <div className="py-4">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <p className=" py-2 font-bold">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
