import { useEffect, useState } from "react";

const RandomEasterEggs = () => {
  const [typedCode, setTypedCode] = useState("");
  const listOfCodes = ["aezakmi", "baguvix", "hesoyam"];

  const showCredits = () => {
    alert(
      "Thanks for reviewing my code. Hope to work and grow together very soon!\nAldas"
    );
  };

  const showRandomEmoji = () => {
    const emojis = ["😀", "😂", "🔥", "✨", "💻", "🎉"];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    alert(`Here's your random emoji: ${randomEmoji}`);
  };

  const changeCursor = () => {
    const cursorShapes = [
      "help",
      "wait",
      "crosshair",
      "not-allowed",
      "zoom-in",
      "grab",
    ];
    const randomCursor =
      cursorShapes[Math.floor(Math.random() * cursorShapes.length)];
    document.body.style.cursor = randomCursor;
  };

  const showConsoleMessage = () => {
    console.log("You've unlocked a secret Easter egg!");
  };

  const shakeScreen = () => {
    const body = document.body;
    body.style.transition = "transform 0.1s ease-in-out";

    setTimeout(() => {
      body.style.transform = "translate(10px, 5px)";
    }, 50);
    setTimeout(() => {
      body.style.transform = "translate(-10px, -5px)";
    }, 100);
    setTimeout(() => {
      body.style.transform = "translate(10px, -5px)";
    }, 150);
    setTimeout(() => {
      body.style.transform = "translate(-10px, 5px)";
    }, 200);
    setTimeout(() => {
      body.style.transform = "translate(0, 0)";
    }, 250);
  };

  const changePageText = () => {
    document.body.innerHTML = "<h1>You found an Easter egg!</h1>";
  };

  const showPopup = () => {
    const popup = document.createElement("div");
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.backgroundColor = "#f0f0f0";
    popup.style.padding = "20px";
    popup.style.borderRadius = "10px";
    popup.innerText = "Congratulations! You found an Easter egg!";

    document.body.appendChild(popup);

    setTimeout(() => {
      document.body.removeChild(popup);
    }, 3000);
  };

  const bounceEffect = () => {
    document.body.style.animation = "bounce 0.5s infinite alternate";
    setTimeout(() => {
      document.body.style.animation = "none";
    }, 3000);
  };

  const randomFuncsList = [
    showCredits,
    showRandomEmoji,
    changeCursor,
    showConsoleMessage,
    shakeScreen,
    changePageText,
    showPopup,
    bounceEffect,
  ];

  const triggerRandomFunc = () => {
    const randomFuncIndex = Math.floor(Math.random() * randomFuncsList.length);
    const selectedFunc = randomFuncsList[randomFuncIndex];
    selectedFunc();
  };

  const handleKeyPresses = (e: KeyboardEvent) => {
    const pressedKey = e.key.toLowerCase();
    for (const code of listOfCodes) {
      if (code.includes(pressedKey)) {
        let updatedKey = typedCode + pressedKey;
        if (updatedKey === code) {
          triggerRandomFunc();
          setTypedCode("");
          return;
        } else {
          setTypedCode(updatedKey);
          return;
        }
      }
    }
    setTypedCode("");
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPresses);

    return () => {
      window.removeEventListener("keydown", handleKeyPresses);
    };
  }, [typedCode]);

  return <div></div>;
};

export default RandomEasterEggs;
