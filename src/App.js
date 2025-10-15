import "./App.css";
import { useState, useEffect } from "react";
import MainGame from "./components/MainGame";
import History from "./components/History";
import Timer from "./components/Timer";
import GameEnd from "./components/GameEnd";

import Background from "./assets/images/monkey.png";
import Logo from "./assets/images/gorilla.png";
import GameBox from "./assets/images/game-box.png";
import IconBack from "./assets/images/other-icon-back.png";
import MetaMask from "./assets/images/metamask-icon.png";
import Sound from "./assets/images/sound-icon.png";
import Play from "./assets/images/play-icon.png";
import HistoryIcon from "./assets/images/history-icon.png";

const itemName = [
  "You get Legend NFT",
  "You get Rare NFT",
  "You get Common NFT",
  "You get T-shirt",
  "No earn",
];

// Função fake para simular axios.get
const fakeAxiosGet = async (url) => {
  if (url.startsWith("time/")) {
    return { data: { result: new Date().toISOString() } };
  }
  if (url.startsWith("history/")) {
    return {
      data: {
        history: [
          { earn: "Legend NFT", time: "2025-01-01" },
          { earn: "Common NFT", time: "2025-01-02" },
        ],
      },
    };
  }
  return { data: {} };
};

function App() {
  const [gameBoxStatus, setGameBoxStatus] = useState(3);
  const [historyList, setHistoryList] = useState([]);
  const [walletAddress] = useState("0xFAKEWALLET123");
  const [lastTime, setLastTime] = useState("");
  const [playNumber, setPlayNumber] = useState(4);
  const [earnResult, setEarnResult] = useState(4); // <-- resultado do jogo

  // Inicializa o jogo
  useEffect(() => {
    const asyncEffect = async () => {
      try {
        const response = await fakeAxiosGet(`time/${walletAddress}`);
        setLastTime(response.data.result);
        setGameBoxStatus(0); // mostra Timer
        setPlayNumber(Math.floor(Math.random() * 1000000)); // novo jogo
      } catch (error) {
        console.error("Error fetching time:", error);
        setGameBoxStatus(3);
      }
    };
    asyncEffect();
  }, [walletAddress]);

  // Botão History
  const _onPressHistoryButton = async () => {
    try {
      setGameBoxStatus(2); // mostra histórico
      const response = await fakeAxiosGet(`history/${walletAddress}`);
      setHistoryList(response.data.history);
    } catch (error) {
      console.log("error", error);
    }
  };

  // Botão Play
  const _onPressPlayButton = async () => {
    if (gameBoxStatus === 1) return; // já jogando
    try {
      const response = await fakeAxiosGet(`time/${walletAddress}`);
      console.log("Fake time:", response.data.result);
      setLastTime(response.data.result);
      setPlayNumber(Math.floor(Math.random() * 1000000));
      setGameBoxStatus(1); // inicia o jogo
    } catch (error) {
      console.error("Error fetching time:", error);
    }
  };

  // Final do jogo - recebe o resultado (0 a 4)
  const gamefinish = async (earnThing) => {
    setEarnResult(earnThing); // ← salva o resultado real do jogo
    setGameBoxStatus(3); // mostra tela final
    try {
      const fakeResponse = {
        address: walletAddress,
        earn: itemName[earnThing],
        playtime: new Date().toString(),
      };
      console.log("Você ganhou:", fakeResponse);
      localStorage.setItem("lastEarn", JSON.stringify(fakeResponse));
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center">
      <img src={Background} className="absolute w-full h-full" alt="Background" />
      <img src={Logo} className="absolute left-[3%] top-[2%] w-[12%] h-[13%]" alt="Logo" />
      <img src={GameBox} className="absolute w-[54%] h-[90%] left-[23%] top-[5%]" alt="Game Box" />

      {gameBoxStatus === 0 && <Timer finish={setGameBoxStatus} lasttime={lastTime} />}
      {gameBoxStatus === 1 && <MainGame gamefinish={gamefinish} playnumber={playNumber} />}
      {gameBoxStatus === 2 && <History list={historyList} />}
      {gameBoxStatus === 3 && <GameEnd getearn={earnResult} />}

      {/* Carteira */}
      <button className="absolute w-[15%] h-[15%] top-[50%] left-0">
        <img src={IconBack} className="w-full h-full" alt="Settings" />
        <img src={MetaMask} className="absolute left-[35%] top-[40%] w-[30%] h-[35%]" alt="MetaMask" />
        <p className="absolute left-[35%] top-[80%] text-white text-xs truncate w-[30%]">
          {walletAddress}
        </p>
      </button>

      {/* Som */}
      <button className="absolute w-[15%] h-[15%] top-[75%] left-0">
        <img src={IconBack} className="w-full h-full" alt="Sound" />
        <img src={Sound} className="absolute left-[35%] top-[40%] w-[30%] h-[35%]" alt="Sound Icon" />
      </button>

      {/* Play */}
      <button
        className="absolute w-[20%] h-[18%] top-[45%] right-[2%]"
        onClick={_onPressPlayButton}
      >
        <img src={Play} className="w-full h-full" alt="Play" />
      </button>

      {/* Histórico */}
      <button
        className="absolute w-[15%] h-[15%] top-[75%] right-0"
        onClick={_onPressHistoryButton}
      >
        <img src={IconBack} className="w-full h-full transform rotate-y-180" alt="History" />
        <img
          src={HistoryIcon}
          className="absolute left-[35%] top-[40%] w-[30%] h-[35%]"
          alt="History Icon"
        />
      </button>
    </div>
  );
}

export default App;
