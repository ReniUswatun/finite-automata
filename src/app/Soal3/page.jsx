"use client";
import dynamic from "next/dynamic";
const MermaidComponent = dynamic(
  () => import("@/components/mermaidComponent"),
  { ssr: false }
);

import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

function Soal3Page() {
  // Soal 3

  const exampleDfa = `A|B,C,start
B|B,D
C|B,C
D|B,E
E|B,C,end`;

  // state management
  const [counter, setCounter] = React.useState(9); // dalam kurung = default value counter
  const [inputDFA, setInputDFA] = React.useState(exampleDfa); // bisa dikosongin bang
  const onButtonCekClick = () => {
    console.log(inputDFA);
    go(inputDFA);
  };

  // mermaid
  const [mermaidCode, setMermaidCode] = React.useState(`
    flowchart LR
    start --> idA(( A ))
  `);

  // key
  const [mermaidKey, setMermaidKey] = React.useState(0);

  React.useEffect(() => {
    console.log(mermaidCode);
  }, [mermaidCode]);
  3;

  // function convert dfa type from input
  function convertInputToDFA(input) {
    const dfaMap = {};
    const lines = input.split("\n");

    lines.forEach((line) => {
      const [currentState, transitions] = line.split("|");
      const transitionStates = transitions.split(",");
      dfaMap[currentState] = transitionStates;
    });
    return dfaMap;
  }

  function simplifyDFA(dfa) {
    const simplified = { 0: [], 1: [] };

    for (const state in dfa) {
      if (dfa[state].includes("end")) {
        simplified[0].push(state);
      } else {
        simplified[1].push(state);
      }
    }

    return simplified;
  }

  function reconstructDFA(simplified, dfa) {
    for (let index of Object.keys(simplified)) {
      let mixKey = "";
      let newList = dfa[simplified[index][0]];

      for (let node of simplified[index]) {
        mixKey += node;
      }

      dfa[mixKey] = newList;

      if (simplified[index].length > 1) {
        for (let node of simplified[index]) {
          delete dfa[node];
        }
      }
    }

    return dfa;
  }

  function reReConsctructDFA(hasil, transitions) {
    const equivalences = [];
    const states = [];
    const resultTransitions = {};

    for (const [_, value] of Object.entries(hasil)) {
      const state = value[0];
      states.push(state);
      equivalences[state] = [];
      equivalences[state].push(...value.filter((item) => item !== state));
    }
    console.log({ states, equivalences });

    for (const [key, value] of Object.entries(transitions)) {
      const state = key[0];
      resultTransitions[state] = [];
      let index = 0;
      for (const a of value) {
        if (index < 2) {
          if (states.includes(a)) {
            // tidak perlu cari pengganti
            resultTransitions[state].push(a);
          } else {
            // perlu cari pengganti yg ekuivalen
            for (const [b, c] of Object.entries(equivalences)) {
              if (c.includes(a)) {
                resultTransitions[state].push(b);
                break;
              }
            }
          }
        } else {
          // end, start
          resultTransitions[state].push(a);
        }
        index++;
      }
    }

    // console.log({ resultTransitions });
    return resultTransitions;
  }

  function doSimplify(simplified, dfa, loop) {
    // menyimpan dfa lama sebagai pembanding

    const prevSimplified = { ...simplified };

    // cek elemen dalam dfa yang lebih dari 1 => equivalent pada saat itu
    for (const index in simplified) {
      if (simplified[index].length > 1) {
        const test1 = simplified[index][0];
        const i0 = simplified[index].includes(dfa[test1][0]);
        const i1 = simplified[index].includes(dfa[test1][1]);
        let delOneNodeAfter = false;
        let delTwoNodeAfter = false;

        for (let i = 1; i < simplified[index].length; i++) {
          const currentNode = simplified[index][i];
          const currentNodeTransitions = dfa[currentNode];

          if (
            simplified[index].includes(currentNodeTransitions[0]) !== i0 &&
            simplified[index].includes(currentNodeTransitions[1]) !== i1
          ) {
            if (!simplified[index + 1]) {
              simplified[index + 1] = [currentNode];
            } else {
              simplified[index + 1].push(currentNode);
            }

            delOneNodeAfter = true;
          } else {
            if (simplified[index].includes(currentNodeTransitions[0]) !== i0) {
              if (!simplified[index + 1]) {
                simplified[index + 1] = [currentNode];
              } else {
                simplified[index + 1].push(currentNode);
              }

              delOneNodeAfter = true;
            }

            if (simplified[index].includes(currentNodeTransitions[1]) !== i1) {
              if (!simplified[index + 2]) {
                simplified[index + 2] = [currentNode];
              } else {
                simplified[index + 2].push(currentNode);
              }

              delTwoNodeAfter = true;
            }
          }
        }

        if (delOneNodeAfter) {
          const index1Nodes = simplified[index + 1];
          simplified[index] = simplified[index].filter(
            (node) => !index1Nodes.includes(node)
          );
        }
        if (delTwoNodeAfter) {
          const index2Nodes = simplified[index + 2];
          simplified[index] = simplified[index].filter(
            (node) => !index2Nodes.includes(node)
          );
        }

        if (delOneNodeAfter || delTwoNodeAfter) {
          simplified[index + 3] = simplified[index];
          delete simplified[index];
        }
      }
    }

    if (JSON.stringify(prevSimplified) === JSON.stringify(simplified)) {
      return simplified;
    } else {
      console.log("E" + loop + ": " + JSON.stringify(simplified));
      return doSimplify(simplified, dfa, loop + 1);
    }
  }

  function checkReachable(dfa) {
    let keyset = [];

    // Iterasi melalui setiap kunci dalam dfa
    for (let key of Object.keys(dfa)) {
      // Jika kunci saat ini berisi "start", tambahkan ke keyset
      if (dfa[key].includes("start")) {
        keyset.push(key);
      }
      // Iterasi melalui setiap node dalam nilai yang terkait dengan kunci saat ini
      for (let node of dfa[key]) {
        // Jika node belum ada dalam keyset, bukan "start" atau "end", dan tidak sama dengan kunci saat ini
        if (
          !keyset.includes(node) &&
          node !== "start" &&
          node !== "end" &&
          node !== key
        ) {
          keyset.push(node);
        }
      }
    }

    // Filter dfa berdasarkan kunci yang ada dalam keyset
    let filteredDFA = {};
    for (let key of Object.keys(dfa)) {
      if (keyset.includes(key)) {
        filteredDFA[key] = dfa[key];
      }
    }

    return filteredDFA;
  }

  function checkString(dfa, string) {
    let node = "";
    let result = false;

    for (let index in dfa) {
      if (dfa[index].includes("start")) {
        node = index;
        break;
      }
    }

    process.stdout.write(node + " -> ");

    for (let i = 0; i < string.length; i++) {
      for (let key in dfa) {
        if (key.includes(node)) {
          if (string.charAt(i) === "0") {
            node = dfa[key][0];
          } else {
            node = dfa[key][1];
          }
          break;
        }
      }

      if (i < string.length - 1) {
        process.stdout.write(node + " -> ");
      } else {
        console.log(node);
      }
    }

    for (let key in dfa) {
      if (key.includes(node) && dfa[key].includes("end")) {
        result = true;
        break;
      }
    }

    return result;
  }

  function generateMermaidFile(dfa) {
    const outputPath = "mermaid/output.md";

    // Make sure the mermaid directory exists
    const mermaidDir = path.dirname(outputPath);
    if (!fs.existsSync(mermaidDir)) {
      fs.mkdirSync(mermaidDir, { recursive: true });
    }

    // Write content to output.md file
    fs.writeFile(outputPath, generateMermaidContent(dfa), (err) => {
      if (err) throw err;
      // console.log("File created with Mermaid content!");
    });
  }

  function generateMermaidContent(dfa) {
    // let mermaidContent = "```mermaid\n";
    let mermaidContent = "flowchart LR\n";

    // Generate flowchart nodes and transitions
    Object.keys(dfa).forEach((state) => {
      // Flag untuk menandai apakah state sudah memiliki "start"
      let hasStart = false;

      // Flag untuk menandai apakah state adalah accepting state "E"
      let isEndState = false;

      // looping dfa
      dfa[state].forEach((transition, index) => {
        if (transition.includes("start")) {
          // Jika state memiliki "start", tambahkan node "start" dan tandai state
          mermaidContent += `start --> id${state}(( ${state} ))\n`;
          hasStart = true;
        } else if (transition.includes("end")) {
          // Jika ditemukan transisi ke "end", tandai state sebagai accepting state "E"
          isEndState = true;
        } else {
          // Jika state belum memiliki "start" dan bukan "end", tambahkan transisi normal
          if (!hasStart) {
            // Jika belum ada "start", tambahkan transisi dengan indeks transisi
            mermaidContent += `id${state}(( ${state} )) --> |${index}| id${transition}(( ${transition} ))\n`;
          } else {
            // Jika sudah ada "start", tambahkan transisi dengan indeks transisi + 1
            mermaidContent += `id${state}(( ${state} )) --> |${
              index + 1
            }| id${transition}(( ${transition} ))\n`;
          }
        }
      });

      // Tambahkan node untuk accepting state "E" dengan tiga kurung
      if (isEndState) {
        mermaidContent += `id${state}((( ${state} )))\n`;
      }
    });

    // mermaidContent += "```\n";
    setMermaidCode(mermaidContent);
    setMermaidKey((prevKey) => prevKey + 1);
    console.log(mermaidCode);
    // console.log(mermaidContent);
    // return mermaidContent;
  }

  function processInput(dfa) {
    generateMermaidFile(dfa);
    rl.question("Masukkan String: ", (inputString) => {
      if (inputString.toLowerCase() === "stop") {
        rl.close();
      } else {
        console.log(checkString(dfa, inputString));
        processInput(dfa); // Menjalankan rekursi untuk membaca input berikutnya
      }
    });
  }

  function go(input) {
    // const dfaFile = "dfa3.txt";
    // console.log(`DFA Source File is ${dfaFile}\n`);

    // let dfa = loadDFA(dfaFile);

    let dfa = convertInputToDFA(input);
    console.log(dfa);

    dfa = checkReachable(dfa);
    console.log(dfa);
    let simplified = simplifyDFA(dfa);

    // console.log("Data DFA :\n", dfa);
    console.log("\nE0 =", simplified);

    let finalSimplified = doSimplify(simplified, dfa, 1);
    finalSimplified = doSimplify(simplified, dfa, 1);
    console.log("\nhasil", finalSimplified);

    dfa = reconstructDFA(finalSimplified, dfa);
    console.log("rekonstruksi DFA :\n", dfa);

    let dfa_final = reReConsctructDFA(finalSimplified, dfa);
    console.log(dfa_final);
    generateMermaidContent(dfa_final);
    // dfa_to_compile = dfa_final;
    // // cek string
    // processInput(dfa_final);
  }

  return (
    <>
      {/* <h1>DFA Minimize {counter}</h1> */}
      <Textarea
        value={inputDFA}
        onChange={(e) => setInputDFA(e.target.value)}
      ></Textarea>
      <Button
        className={"bg-green-400 mt-8"}
        onClick={onButtonCekClick}
        variant={"secondary"}
      >
        Cek bos
      </Button>
      {/* <Button
        onClick={() => {
          setCounter(counter + 9);
        }}
      >
        increment
      </Button> */}
      <MermaidComponent
        className={"t-8"}
        key={mermaidKey}
        code={mermaidCode}
      ></MermaidComponent>
    </>
  );
}

export default Soal3Page;
