import { useRef, useState } from "react";

function SlotMachine() {
  const [fruits, setFruits] = useState(["🍒", "🍉", "🍊", "🍓", "🍇", "🥝"]);
  const slotsRef = [useRef(null), useRef(null), useRef()];
  const prevOption = [useRef(0), useRef(0), useRef(0)];
  const [ifWin, setIfWin] = useState("hidden");
  let value = [0, 0, 0];
  function wait(time) {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  }
  const spin = async () => {
    setIfWin("hidden");
    slotsRef.map(async (slot, index) => {
      changeSlotPosition(slot.current, index);
      await wait(1000);
    });
    if (check(value)) {
      console.log("JACKPOT");
      await wait(500);
      setIfWin("visible");
    }
  };

  const check = (list) => {
    const setItem = new Set(list);
    return setItem.size <= 1;
  };

  const changeSlotPosition = (ref, index) => {
    let option = randomSlot();
    // zajištění, aby se nestalo, že bude stejná hodnota
    while (option === prevOption[index].current) {
      option = randomSlot();
    }
    prevOption[index].current = option;

    let childrens = ref.children;
    let chooseOption = childrens[option];
    ref.style.top = `-${chooseOption.offsetTop}px`;
    value[index] = option;
    console.log(value);
  };

  const randomSlot = () => {
    return Math.floor(Math.random() * fruits.length);
  };
  console.log(ifWin);
  return (
    <div className="slot-machine">
      <div className="container">
        <div className="headline">
          <div className="headline-wrapper">
            <h1> 💲 Good luck in your game 💲</h1>
          </div>
        </div>
        <div className="reels">
          <div className="reel">
            <div className="reel-container" ref={slotsRef[0]}>
              {fruits.map((item, index) => (
                <span key={index}>{item}</span>
              ))}
            </div>
          </div>
          <div className="reel">
            <div className="reel-container" ref={slotsRef[1]}>
              {fruits.map((item, index) => (
                <span key={index}>{item}</span>
              ))}
            </div>
          </div>
          <div className="reel">
            <div className="reel-container" ref={slotsRef[2]}>
              {fruits.map((item, index) => (
                <span key={index}>{item}</span>
              ))}
            </div>
          </div>
          <div className="winning-line" style={{visibility: `${ifWin}`}}></div>
        </div>

        <div className="button-container">
          <button className="button" onClick={() => spin()}>
            Roll
          </button>
        </div>
      </div>
    </div>
  );
}

export default SlotMachine;
