import { useSelector } from "react-redux";

import SlideShow from "../components/HomePage/SlideShow/SlideShow";
import HotSaleBlock from "../components/HomePage/HotSaleBlock/HotSaleBlock";
import CategoriesBlock from "../components/HomePage/CategoriesBlock/CategoriesBlock";

const HomePage = () => {
    const items = useSelector((state) => state.prod.items);

    return (
        <>
        <SlideShow items={items} />
        <HotSaleBlock items={items} />
        <CategoriesBlock />
        </>
    );
};

export default HomePage;