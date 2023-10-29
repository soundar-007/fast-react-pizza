import { useLoaderData, useNavigate } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function Menu() {
  const navigate = useNavigate();
  const menu = useLoaderData();
  const name = useSelector((state) => state.user.userName);

  useEffect(() => {
    if (!name) {
      navigate("/");
    }
  }, []);

  return (
    <ul className=" divide-y divide-stone-400 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}
export default Menu;
