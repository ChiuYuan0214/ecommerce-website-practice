import { useSelector, useDispatch } from "react-redux";
import { prodActions } from '../store/products';

import SlideShow from "../components/HomePage/SlideShow/SlideShow";
import HotSaleBlock from "../components/HomePage/HotSaleBlock/HotSaleBlock";
import CategoriesBlock from "../components/HomePage/CategoriesBlock/CategoriesBlock";

const HomePage = () => {
    const items = useSelector((state) => state.prod.items);
    const dispatch = useDispatch();

    const isFavHandler = (prodId) => {
      dispatch(prodActions.setIsFav(prodId));
    };

    return (
        <>
        <SlideShow setIsFav={isFavHandler} items={items} />
        <HotSaleBlock items={items} />
        <CategoriesBlock />
        </>
    );
};

export default HomePage;