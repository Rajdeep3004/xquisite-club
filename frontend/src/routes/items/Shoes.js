import React, { Suspense, useState, useEffect } from "react";
import Fallback from "../../components/Resuable/Fallback";
import shoesMen from "../../json/men/shoesMen.json";
import shoesWomen from "../../json/women/shoesWomen.json";
import { useSelector } from "react-redux";
const RenderList = React.lazy(() =>
  import("../../components/Resuable/RenderList")
);

const Shoes = () => {
  const price = useSelector((state) => state.toggle.price);
  const gender = useSelector((state) => state.toggle.genderType);
  const finalGender = gender === "men" ? shoesMen : shoesWomen;

  const [input, setInput] = useState("");
  const [sortedList, setSortedList] = useState(finalGender || []);

  useEffect(() => {
    // copy of finalGender
    const newSortedList = [...finalGender];
    if (price) {
      newSortedList.sort((a, b) => a.price - b.price);
    } else {
      newSortedList.sort((a, b) => b.price - a.price);
    }
    setSortedList(newSortedList);
  }, [gender, finalGender, price]);

  const changeHandler = (e) => {
    setInput(e.target.value);
  };

  const finalList = sortedList.filter((item) => {
    return (
      input === "" || item.name.toLowerCase().includes(input.toLowerCase())
    );
  });

  return (
    <Suspense fallback={<Fallback />}>
      <RenderList
        input={input}
        changeHandler={changeHandler}
        finalList={finalList}
        sizeType={"shoes"}
      />
    </Suspense>
  );
};

export default Shoes;
