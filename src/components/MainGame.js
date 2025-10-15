import React, { useState, useEffect } from "react";

// Imagens
const imageUri = [
  require("../assets/images/Rectangle 1583.png"),
  require("../assets/images/Rectangle 1602.png"),
  require("../assets/images/gorillaCoinGold.png"),
  require("../assets/images/Rectangle 1569-1.png"),
  require("../assets/images/gorillaCoin.png"),
];

// Possíveis linhas vencedoras
const winningLines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],    // linhas
  [0, 3, 6], [1, 4, 7], [2, 5, 8],    // colunas
  [0, 4, 8], [2, 4, 6]              // diagonais
];

export default function MainGame({ gamefinish, playnumber }) {
  const number = Array.from({ length: 9 }, (_, i) => i);

  const defaultCryptoState = number.map(() => false);  // todos fechados
  const [cryptoNumber, setCryptoNumber] = useState(number.map(() => -1)); // imagens
  const [cryptoState, setCryptoState] = useState(defaultCryptoState);    // abertos ou não
  const [gameOver, setGameOver] = useState(false);

  // Função para gerar tabuleiro com 3 iguais numa linha aleatória (prêmio garantido)
  const generateWinningNums = () => {
    const result = Array(9).fill(-1);

    // Escolhe uma linha vencedora aleatória
    const lineIndex = Math.floor(Math.random() * winningLines.length);
    const winningLine = winningLines[lineIndex];

    // Escolhe imagem prêmio entre 0 a 3
    const winningNumber = Math.floor(Math.random() * 4);

    // Coloca a imagem prêmio nas posições da linha vencedora
    winningLine.forEach(pos => {
      result[pos] = winningNumber;
    });

    // Preenche os demais espaços com imagens aleatórias (0 a 6), evitando 3 iguais em outra linha
    for (let i = 0; i < 9; i++) {
      if (result[i] === -1) {
        let selectedNumber;
        do {
          selectedNumber = Math.floor(Math.random() * 7);
          // Evitar que outra linha tenha 3 iguais (simplificado)
        } while (result.filter(num => num === selectedNumber).length >= 2 || selectedNumber === winningNumber);
        result[i] = selectedNumber;
      }
    }

    return result;
  };

  // Inicia novo jogo quando playnumber muda
  useEffect(() => {
    const nums = generateWinningNums();
    setCryptoNumber(nums);
    setCryptoState(defaultCryptoState);
    setGameOver(false);
  }, [playnumber]);

  // Lógica ao clicar em uma posição
  const clickCrypto = (index) => {
    if (cryptoState[index]) return;  // já aberto
    if (gameOver) return;            // jogo acabou

    const newCryptoState = [...cryptoState];
    newCryptoState[index] = true;
    setCryptoState(newCryptoState);

    // Verifica se alguma linha vencedora está completamente aberta e com as 3 imagens iguais
    for (const line of winningLines) {
      const [a, b, c] = line;
      if (newCryptoState[a] && newCryptoState[b] && newCryptoState[c]) {
        const numA = cryptoNumber[a];
        const numB = cryptoNumber[b];
        const numC = cryptoNumber[c];
        if (numA === numB && numB === numC && numA >= 0 && numA <= 3) {
          setGameOver(true);
          gamefinish(numA);  // ganhou com imagem numA
          return;
        }
      }
    }

    // Se abriu todas e não ganhou
    if (newCryptoState.filter(v => v).length === 9) {
      setGameOver(true);
      gamefinish(4);
    }
  };

  return (
    <div className="flex flex-wrap justify-center items-center w-[40%] h-[60%] absolute left-[30%] top-[20%] p-[1%]">
      {number.map((i) => (
        <div
          className="w-[30%] h-[30%] m-1 cursor-pointer"
          key={i}
          onClick={() => clickCrypto(i)}
        >
          {!cryptoState[i] ? (
            <img
              src={require("../assets/images/cryptoOasis.png")}
              alt="Crypto"
              className="w-full h-full object-contain"
            />
          ) : (
            <img
              src={imageUri[cryptoNumber[i]]}
              alt="Prize"
              className="w-full h-full object-contain"
            />
          )}
        </div>
      ))}
    </div>
  );
}
