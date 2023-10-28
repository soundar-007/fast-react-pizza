import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

function Home() {
  const name = useSelector((store) => store.user.userName);
  return (
    <div className="my-10 px-5 text-center">
      <h1 className="mb-8  text-center text-xl font-semibold text-stone-700 md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {!name ? (
        <CreateUser />
      ) : (
        <Button to="/menu" type="primary">
          Continue Ordering , {name}
        </Button>
      )}
    </div>
  );
}

export default Home;
