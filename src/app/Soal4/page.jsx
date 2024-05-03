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

function Soal4Page() {

  const dfa1 = {
    states: ['q0', 'q1', 'q2'],
    letters: ['0', '1'],
    initialState: 'q0',
    finalStates: ['q0'],
    transitions: {
        'q0': { '0': 'q0', '1': 'q1' },
        'q1': { '0': 'q2', '1': 'q0' },
        'q2': { '0': 'q1', '1': 'q2' }
    }
  };
  const dfa2 = {
      states: ['q0', 'q1', 'q2', 'q3'],
      letters: ['0', '1'],
      initialState: 'q0',
      finalStates: ['q1'],
      transitions: {
          'q0': { '0': 'q0', '1': 'q1' },
          'q1': { '0': 'q2', '1': 'q0' },
          'q2': { '0': 'q3', '1': 'q2' },
          'q3': { '0': 'q2', '1': 'q0' } 
      }
  };
  
  
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
        if (dfa1.finalStates.includes(state1) !== dfa2.finalStates.includes(state2)) {
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
  
  generateMermaid(dfa1)
  generateMermaid(dfa2)
  
  function generateMermaid(data) {
      console.log('flowchart LR')
      for (const state of data.states) {
          const isFinalState = data.finalStates.includes(state)
          console.log(state + (isFinalState ? "(((" + state + ")))" : "((" + state+ "))"))
      }
      
      // connect start state
      console.log("start --> " + data.initialState)
      
      // generate transitions
      for (const [key, value] of Object.entries(data.transitions)) {
          for (const letter of data.letters) {
              console.log(key + " -- " + letter + " --> " + value[letter])
          }
      }
  }
  
  const equivalent = equivalenceDFA(dfa1, dfa2);
  if (equivalent) {
  console.log('DFA ekivalen.');
  } else {
  console.log('DFA tidak ekivalen.');
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
          >Generate Random DFA</Button>
          <Button
            className="
            hover:bg-purple-100"
            variant="secondary"
          >Generate Random NFA</Button>
          <Button
            className="
            hover:bg-purple-100"
            variant="secondary"
          >Generate Random eNFA</Button>
        </div>
        <div className="grid w-full max-w-md mt-7">
          <Button
            className="bg-purple-500 text-white 
            hover:bg-purple-800"
            variant="secondary"
          >
            Make Graph
          </Button>
          
        </div>
      </main>
    </>
  );
}

export default Soal4Page;
