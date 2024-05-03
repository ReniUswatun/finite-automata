"use client";
import Navbar from "@/components/navbar";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addToObjectDFA } from "@/lib/Soal5/search_dfa_5";
import { addToObjectNFA } from "@/lib/Soal5/search_nfa_5";
import { addToObjecteNFA } from "@/lib/Soal5/search_enfa_5";

function Soal5Page() {
  const [valueItem, setValueItem] = useState("");
  const [data, setData] = useState({
    alphabet: "01",
    initialState: "A",
    finalState: "DE",
    transition: `A|B,C\nB|B,D\nC|B,C\nD|B,E\nE|B,C`,
  });
  let object = {};

  const onButtonGeneratedClick = () => {
    console.log(valueItem);
    if (valueItem === "DFA") {
      object = addToObjectDFA(
        data.transition,
        data.alphabet,
        data.initialState,
        data.finalState
      );
      console.log(object);
    } else if (valueItem === "NFA") {
      object = addToObjectNFA(
        data.transition,
        data.alphabet,
        data.initialState,
        data.finalState
      );
      console.log(object);
    } else if (valueItem === "e-NFA") {
      object = addToObjecteNFA(
        data.transition,
        data.alphabet,
        data.initialState,
        data.finalState
      );
      console.log(object);
    } else if (valueItem === "Regex") {
    }
  };

  return (
    <>
      <nav>
        <Navbar></Navbar>
      </nav>
      <main className="flex flex-wrap flex-col justify-center mt-20 mx-20 px-20 ">
        <div className="flex flex-row gap-4 mb-7">
          <Select
            value={valueItem}
            onValueChange={(value) => setValueItem(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Jenis Graph" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DFA">DFA</SelectItem>
              <SelectItem value="NFA">NFA</SelectItem>
              <SelectItem value="e-NFA">e-NFA</SelectItem>
              <SelectItem value="Regex">Regex</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-7">
            <Label htmlFor="alphabet">Alphabet (gunakan spasi)</Label>
            <Input
              id="alphabet"
              placeholder="Simbol"
              value={data.alphabet}
              onChange={(e) => setData({ ...data, alphabet: e.target.value })}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-7">
            <Label htmlFor="initial_state">Initial State (hanya 1)</Label>
            <Input
              id="initial_state"
              placeholder="State Pertama"
              value={data.initialState}
              onChange={(e) =>
                setData({ ...data, initialState: e.target.value })
              }
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-7">
            <Label htmlFor="final_state">Final State (gunakan spasi)</Label>
            <Input
              id="final_state"
              placeholder="State yang diterima"
              value={data.finalState}
              onChange={(e) => setData({ ...data, finalState: e.target.value })}
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 mt-7">
            <Label htmlFor="trantition">
              Transisi Table (format : stateA:symbol{`>`}stateB,stateC){" "}
              <br></br>
              <br></br>
              Jika epsilon (gunakan $ karakter)
            </Label>
            <Textarea
              placeholder="Buat Transisi"
              id="trantition"
              style={{ width: "100%", minWidth: "300px", minHeight: "200px" }}
              value={data.transition}
              onChange={(e) => setData({ ...data, transition: e.target.value })}
            />
          </div>
          <div className="grid w-full max-w-md mt-7">
            <div className="mb-7 mt-2">
              <Button
                className="hover:bg-purple-800
            hover:text-white"
                variant="secondary"
                onClick={onButtonGeneratedClick}
              >
                Generate Random
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Soal5Page;
