import { useDispatch } from "react-redux";
import {
  Award,
  listAwards,
  postProduct,
  ProductSend,
} from "services/Awards/awards.service";
import { MultipleElements } from "services/generical.service";
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

  const AddProduct = async (data: ProductSend): Promise<void> => {
    const res = await postProduct(data);
  };

  return { ListAwards };
};

export default AwardsFunction;
