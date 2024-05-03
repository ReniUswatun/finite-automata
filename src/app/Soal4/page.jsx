"use client";
import dynamic from "next/dynamic";
const MermaidComponent = dynamic(
  () => import("@/components/mermaidComponent"),
  { ssr: false }
);

import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import React from "react";

function Soal4Page() {
  const dfa1 = {
    states: ["q0", "q1", "q2"],
    letters: ["0", "1"],
    initialState: "q0",
    finalStates: ["q0"],
    transitions: {
      q0: { 0: "q0", 1: "q1" },
      q1: { 0: "q2", 1: "q0" },
      q2: { 0: "q1", 1: "q2" },
    },
  };
  const dfa2 = {
    states: ["q0", "q1", "q2", "q3"],
    letters: ["0", "1"],
    initialState: "q0",
    finalStates: ["q1"],
    transitions: {
      q0: { 0: "q0", 1: "q1" },
      q1: { 0: "q2", 1: "q0" },
      q2: { 0: "q3", 1: "q2" },
      q3: { 0: "q2", 1: "q0" },
    },
  };

  let ekiv = "tidak tau";

  // mermaid
  const [mermaidCode, setMermaidCode] = React.useState(`flowchart LR
    start -->  A
`);

  const [mermaidCode2, setMermaidCode2] = React.useState(`flowchart LR
    start -->  B
  `);

  let [ekivalen, setEkivalen] = React.useState(ekiv);

  const onButtonCekClick = () => {
    generateMermaid(dfa1, dfa2);
  };

  // key
  const [mermaidKey, setMermaidKey] = React.useState(0);
  const [mermaidKey2, setMermaidKey2] = React.useState(0);
  const [ekivalenKey, setEkivalenKey] = React.useState(0);

  // React.useEffect(() => {
  //   console.log(mermaidCode);
  // }, [mermaidCode]);

  3;

  function equivalenceDFA(dfa1, dfa2) {
    if (dfa1.letters.length !== dfa2.letters.length) {
      return false; // Jika alfabetnya tidak sama
    }

    // Lakukan pencarian untuk state yang tidak ekivalen
    const visitedPairs = new Set();
    const stack = [[dfa1.initialState, dfa2.initialState]];

    while (stack.length > 0) {
      const [state1, state2] = stack.pop();

      // Cek apakah pasangan state sudah pernah dikunjungi
      if (visitedPairs.has(`${state1}-${state2}`)) {
        continue;
      }
      visitedPairs.add(`${state1}-${state2}`);

      // Cek apakah kedua state adalah state akhir atau tidak
      if (
        dfa1.finalStates.includes(state1) !== dfa2.finalStates.includes(state2)
      ) {
        return false;
      }

      // Cek transisi untuk setiap simbol dalam alfabet
      for (const symbol of dfa1.alphabet) {
        const nextState1 = dfa1.transition(state1, symbol);
        const nextState2 = dfa2.transition(state2, symbol);

        if (!nextState1 || !nextState2) {
          if (nextState1 !== nextState2) {
            return false; // Jika transisi tidak ada atau tidak sama
          }
        } else {
          stack.push([nextState1, nextState2]);
        }
      }
    }

    return true; // Jika tidak ditemukan perbedaan dalam transisi
  }

  // generateMermaid(dfa1);
  // generateMermaid(dfa2);

  function generateMermaid(data, data2) {
    let mermaidContent = "flowchart LR\n";
    let mermaidContent2 = "flowchart LR\n";

    // console.log("flowchart LR");
    for (const state of data.states) {
      const isFinalState = data.finalStates.includes(state);

      if (isFinalState) {
        mermaidContent += `${state}\n`;
      } else {
        `${state}`;
      }
    }

    let dataPertama = data.initialState;
    mermaidContent += `start --> ${dataPertama}\n`;

    // generate transitions
    for (const [key, value] of Object.entries(data.transitions)) {
      for (const letter of data.letters) {
        // let valueLetter = value[letter];
        console.log(key + " -- " + letter + " --> " + value[letter]);
        mermaidContent += `${key} --  ${letter} -->  ${value[letter]}\n`;
      }
    }

    // data 2
    for (const state of data2.states) {
      const isFinalState = data2.finalStates.includes(state);

      if (isFinalState) {
        mermaidContent2 += `${state}\n`;
      } else {
        `${state}`;
      }
    }

    let dataKedua = data2.initialState;
    mermaidContent2 += `start --> ${dataKedua}\n`;

    // // generate transitions
    for (const [key, value] of Object.entries(data2.transitions)) {
      for (const letter of data2.letters) {
        // let valueLetter = value[letter];
        console.log(key + " -- " + letter + " --> " + value[letter]);
        mermaidContent2 += `${key} --  ${letter} -->  ${value[letter]}\n`;
      }
    }

    console.log(mermaidContent);
    setMermaidCode(mermaidContent);
    setMermaidCode2(mermaidContent2);
    setMermaidKey((prevKey) => prevKey + 1);
    setMermaidKey2((prevKey) => prevKey + 1);
  }

  const equivalent = equivalenceDFA(dfa1, dfa2);
  console.log(equivalent);
  if (equivalent) {
    console.log("DFA ekivalen.");
    setEkivalen = "DFA Ekivalen";
    // setMermaidKey((prevKey) => prevKey + 1);
  } else {
    setEkivalen = "DFA Ekivalen";
    // setMermaidKey((prevKey) => prevKey + 1);
  }

  return (
    <>
      <nav>
        <Navbar></Navbar>
      </nav>
      <main className="flex flex-wrap justify-center mt-20 mx-10 ">
        <div className="flex flex-row gap-4 mb-7">
          <Button
            className="
            hover:bg-purple-100"
            variant="secondary"
          >
            Generate Random DFA
          </Button>
          <Button
            className="
            hover:bg-purple-100"
            variant="secondary"
          >
            Generate Random NFA
          </Button>
          <Button
            className="
            hover:bg-purple-100"
            variant="secondary"
          >
            Generate Random eNFA
          </Button>
        </div>
        <div className="grid w-full max-w-md mt-7">
          <Button
            className="bg-purple-500 text-white 
            hover:bg-purple-800"
            variant="secondary"
            onClick={onButtonCekClick}
          >
            Make Graph
          </Button>
          <MermaidComponent
            className={"t-8"}
            key={mermaidKey}
            code={mermaidCode}
          ></MermaidComponent>
          <MermaidComponent
            className={"t-16"}
            key={mermaidKey2}
            code={mermaidCode2}
          ></MermaidComponent>
          <Label key={ekivalenKey}>{ekivalen}</Label>
        </div>
      </main>
    </>
  );
}

export default Soal4Page;
