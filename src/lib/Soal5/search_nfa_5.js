const transisi = `
A|[B C],C
B|[A B],empty
C|empty,D
D|B,[E D]
E|B,empty
`.trim();
const alphabet = "01";
const startState = "A";
const finalState = "DE";
const string = "0011";

function stringToArray(string) {
  return string.split(""); // Memecah string menjadi array karakter
}

export function addToObjectNFA(transisi, alphabet, startState, finalState) {
  const objectNFA = {};
  objectNFA.states = [];
  objectNFA.alphabet = stringToArray(alphabet);
  objectNFA.initial = startState;
  objectNFA.final = stringToArray(finalState);
  objectNFA.transitions = {};

  const lines = transisi.split("\n");

  for (const line of lines) {
    const [state, transition] = line.split("|");
    if (!objectNFA.states.includes(state)) {
      objectNFA.states.push(state);
      objectNFA.transitions[state] = {};
    }
    const transitionsTable = transition.split(",");
    for (let i = 0; i < objectNFA.alphabet.length; i++) {
      const stringState = objectNFA.alphabet[i];
      if (transitionsTable[i].includes("[")) {
        const array = transitionsTable[i].slice(1, -1).split(" ");
        objectNFA.transitions[state][stringState] = array;
      } else if (transitionsTable[i] === "empty") {
        objectNFA.transitions[state][stringState] = [];
      } else {
        if (!objectNFA.transitions[state][stringState]) {
          objectNFA.transitions[state][stringState] = [];
        }
        objectNFA.transitions[state][stringState].push(transitionsTable[i]);
      }
    }
  }

  return objectNFA;
}

export function checkStringNFA(nfa, string) {
  let currentStates = [nfa.initial];
  const visitedTransitions = [];

  for (const char of string) {
    currentStates = search(
      nfa.transitions,
      currentStates,
      char,
      visitedTransitions
    );
  }
  console.log(currentStates);
  console.log("\nVisited transitions:");

  console.log(visitedTransitions.join("\n"));
  for (const state of currentStates) {
    if (nfa.final.includes(state)) {
      return true; // Jika ada, kembalikan true
    }
  }

  return false;
}

function search(transition, currentState, string, visitedTransitions) {
  let possibleState = [];
  for (const i of currentState) {
    const transitionsFromState = transition[i][string] || [];
    possibleState = [...possibleState, ...transitionsFromState];
    if (transitionsFromState.length === 0) {
      visitedTransitions.push(`${i} --${string}--> empty`);
    } else {
      visitedTransitions.push(`${i} --${string}--> ${transitionsFromState}`);
    }
  }
  return possibleState;
}

// const isAccepted = checkStringNFA(
//   addToObjectNFA(transisi, alphabet, startState, finalState),
//   string
// );
// console.log("String accepted:", isAccepted);
