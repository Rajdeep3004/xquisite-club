import React, { Suspense, useState, useEffect } from "react";
import Fallback from "../../components/Resuable/Fallback";
import bottomMen from "../../json/men/bottomMen.json";
import bottomWomen from "../../json/women/bottomWomen.json";
import { useSelector } from "react-redux";
const RenderList = React.lazy(() =>
  import("../../components/Resuable/RenderList")
);

const Bottomwear = () => {
  const price = useSelector((state) => state.toggle.price);
  const genderType = useSelector((state) => state.toggle.genderType);
  const finalGender = genderType === "men" ? bottomMen : bottomWomen;
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
  }, [genderType, finalGender, price]);

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
        sizeType={"bottom"}
      />
    </Suspense>
  );
};

export default Bottomwear;
