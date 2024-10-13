import React, { useState, useEffect } from "react";

interface Item {
  id: number;
  isActive: boolean;
}

const initialArray: Item[] = [
  { id: 1, isActive: true },
  { id: 2, isActive: false },
  { id: 3, isActive: false },
];

const App: React.FC = () => {
  const [array, setArray] = useState(initialArray);
  const [currentIndex, setCurrentIndex] = useState(0);

  function handle1() {
    console.log("one");
  }

  const actions: Record<number, Record<string, (item: Item) => void>> = {
    1: {
      true: (item: Item) => handle1(),
    },
    2: {
      true: (item: Item) =>
        console.log(`Action for id 2 when true: ${item.id}`),
    },
    3: {
      true: (item: Item) =>
        console.log(`Action for id 3 when true: ${item.id}`),
    },
  };

  useEffect(() => {
    // console.log(currentIndex, "currentindex");
  }, [currentIndex]);

  const handleNext = () => {
    const index = currentIndex;
    let nextIndex: number = currentIndex;

    if (array[nextIndex].isActive) {
      const newArray: Item[] = array.map((item: Item, index: number) => {
        if (index === nextIndex) {
          // console.log("equals next");
          return { ...item, isActive: true };
        }
        return item;
      });

      setArray(newArray);
      actions[newArray[nextIndex].id][String(newArray[nextIndex].isActive)](
        newArray[nextIndex]
      );
    }

    if (index < array.length - 1) {
      nextIndex += 1;
      array[nextIndex].isActive = true;
      array[currentIndex].isActive = false;
    } else if (index >= array.length - 1) {
      nextIndex = 0;
      array[nextIndex].isActive = true;
      array[currentIndex].isActive = false;
    }

    setCurrentIndex(nextIndex);
  };

  return (
    <div>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default App;
