import React, { useState, useEffect } from "react";

const imageUri = [
  require("../assets/images/legend.png"),
  require("../assets/images/rare.png"),
  require("../assets/images/common.png"),
  require("../assets/images/Rectangle 1569-1.png"),
  require("../assets/images/empty.png"),
];
const itemName = [
  "You get Legend NFT",
  "You get Rare NFT",
  "You get Common NFT",
  "You get T-shirt",
  "Ooops.. Try again",
];

/* export default function GameEnd({ getearn }) {
  const [earnNumber, setEarnNumber] = useState(4); // default “Ooops.. Try again”

  useEffect(() => {
    const determineEarn = () => {
      if (getearn === 3) setEarnNumber(0);
      else if (getearn % 100000 === 0) setEarnNumber(1);
      else if (getearn % 10000 === 1) setEarnNumber(2);
      else if (getearn % 1000 === 2) setEarnNumber(3);
      else setEarnNumber(4);
    };
    determineEarn();
  }, [getearn]); */
export default function GameEnd({ getearn }) {
  const earnNumber = (getearn >= 0 && getearn <= 4) ? getearn : 4;


  return (
    <div className="flex flex-col items-center justify-center absolute w-[45%] h-[45%] left-[27.5%] top-[27.5%] p-2">
      <div className="w-full h-full">
        <img
          src={imageUri[earnNumber]}
          alt={itemName[earnNumber]}
          className="w-full h-full object-contain"
        />
      </div>
      {itemName[earnNumber] && (
        <p className="text-white text-xl mt-4 text-center">{itemName[earnNumber]}</p>
      )}
      <p className="text-green-400 text-base mt-2 text-center">
        Good luck for the next time.
      </p>
    </div>
  );
}
