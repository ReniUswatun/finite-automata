"use client";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import React from "react";

function Soal4Page() {
  //bisa masukkin js
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
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="many_state">States (gunakan spasi)</Label>
          <Input id="many_state" placeholder="Banyak State" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mt-7">
          <Label htmlFor="alphabet">Alphabet (gunakan spasi)</Label>
          <Input id="alphabet" placeholder="Simbol" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mt-7">
          <Label htmlFor="initial_state">Initial State (hanya 1)</Label>
          <Input id="initial_state" placeholder="State Pertama" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mt-7">
          <Label htmlFor="final_state">Final State (gunakan spasi)</Label>
          <Input id="final_state" placeholder="State yang diterima" />
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
