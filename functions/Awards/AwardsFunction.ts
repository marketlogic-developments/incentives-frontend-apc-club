import { useDispatch } from "react-redux";
import {
  Award,
  deleteProduct,
  getShoppingCar,
  listAwards,
  postProduct,
  ProductSend,
  sendOrder,
  ShoppingCar,
} from "services/Awards/awards.service";
import { GenericalPromise, MultipleElements } from "services/generical.service";
import { awardsPush } from "store/reducers/awards.reducer";

const AwardsFunction = () => {
  const dispatch = useDispatch();

  const ListAwards = async (
    params: string
  ): Promise<MultipleElements<Award>> => {
    try {
      const res = await listAwards(params);

      dispatch(awardsPush(res.content));

      return res;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const AddProduct = async (data: ProductSend): Promise<ProductSend> => {
    try {
      const res = await postProduct(data);
      return res;
    } catch (err) {
      console.error(err);
      throw err;
    }

  };

  const DeleteProduct = async (id: string): Promise<Award> => {
    try {
      const res = await deleteProduct(id);

      return res;
    } catch (err) {
      console.error(err);
      throw err;
    }

  };


  const ShoppingCar= async ():Promise<ShoppingCar>=>{
    try {
      const res = await getShoppingCar();

      return res;
    } catch (err) {
      console.error(err);
      throw err;
    }

  }
  const CreateOrder= async (order_id:string):Promise<ShoppingCar>=>{
    try {
      const res = await sendOrder(order_id);

      console.log(res)
      return res;
    } catch (err) {
      console.error(err);
      throw err;
    }

  }

  return { ListAwards, AddProduct,ShoppingCar, DeleteProduct, CreateOrder};
};

export default AwardsFunction;
