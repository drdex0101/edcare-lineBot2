import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPrice } from "../../features/properties/propertiesSlice";
const RangeSlider = ({ priceRange, setPriceRange }) => {
  const [price, setPrice] = useState("unlimited");
  const dispatch = useDispatch();

  const handleOnChange = (event) => {
    setPrice(event.target.value); // 更新本地 state
    let newPriceRange;
    switch (event.target.value) {
      case "unlimited":
        newPriceRange = { min: 0, max: 100000000 };
        break;
      case "900-":
        newPriceRange = { min: 0, max: 9000000 };
        break;
      case "900-1200":
        newPriceRange = { min: 9000000, max: 12000000 };
        break;
      case "1200-1500":
        newPriceRange = { min: 12000000, max: 15000000 };
        break;
      case "1500-2500":
        newPriceRange = { min: 15000000, max: 25000000 };
        break;
      case "2500-4000":
        newPriceRange = { min: 25000000, max: 40000000 };
        break;
      case "4000+":
        newPriceRange = { min: 40000000, max: Infinity };
        break;
      default:
        newPriceRange = { min: 0, max: Infinity }; // "unlimited"
    }

    // 调用从父组件传入的 onPriceRangeChange 函数来更新父组件的状态
    setPriceRange(newPriceRange);
    // 可能还需要将新的价格范围发送到 Redux store
    dispatch(addPrice(newPriceRange));
  };

  return (
    <div className="nft__filter-price tp-range-slider tp-range-slider-dark mb-20">
      <div className="nft__filter-price-inner d-flex align-items-center justify-content-between">
        <select
          value={price}
          onChange={handleOnChange}
          className="custom-select"
        >
          <option value="unlimited">總價不限</option>
          <option value="900-">900萬以下</option>
          <option value="900-1200">900-1200萬</option>
          <option value="1200-1500">1200-1500萬</option>
          <option value="1500-2500">1500-2500萬</option>
          <option value="2500-4000">2500-4000萬</option>
          <option value="4000+">4000萬以上</option>
        </select>
      </div>
    </div>
  );
};

export default RangeSlider;
