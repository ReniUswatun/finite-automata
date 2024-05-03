const transisi = `
A|eps(B),[B C],C
B|neps,[A B],empty
C|eps(E D),[C B],D
D|neps,B,[E D]
E|eps(C),B,empty
`.trim();
const alphabet = "01";
const startState = "A";
const finalState = "D E";
const string = "1";

function stringToArray(string) {
  return string.split("");
}

export function addToObjecteNFA(transisi, alphabet, startState, finalState) {
  const objecteNFA = {};
  objecteNFA.states = [];
  objecteNFA.alphabet = stringToArray(alphabet);
  objecteNFA.initial = startState;
  objecteNFA.final = stringToArray(finalState);
  objecteNFA.closure = {};
  objecteNFA.transitions = {};

  const lines = transisi.split("\n");

  for (const line of lines) {
    const [state, transition] = line.split("|");
    if (!objecteNFA.states.includes(state)) {
      objecteNFA.states.push(state);
      objecteNFA.transitions[state] = {};
    }
    const transitionsTable = transition.split(",");
    addToClosure(objecteNFA, transitionsTable[0], state);
    transitionsTable.shift();
    for (let i = 0; i < objecteNFA.alphabet.length; i++) {
      const stringState = objecteNFA.alphabet[i];
      if (transitionsTable[i].includes("[")) {
        const array = transitionsTable[i].slice(1, -1).split(" ");
        objecteNFA.transitions[state][stringState] = array;
      } else if (transitionsTable[i] === "empty") {
        objecteNFA.transitions[state][stringState] = [];
      } else {
        if (!objecteNFA.transitions[state][stringState]) {
          objecteNFA.transitions[state][stringState] = [];
        }
        objecteNFA.transitions[state][stringState].push(transitionsTable[i]);
      }
    }
  }
  return objecteNFA;
}

function addToClosure(eNFA, firstLineTransition, state) {
  let array = [];
  if (firstLineTransition[0] === "e") {
    let string = firstLineTransition.replace("eps(", "").replace(")", "");

    array = string.split(" ");
  }

  if (array.length > 0) {
    if (!eNFA.closure[state]) {
      eNFA.closure[state] = {}; // Menginisialisasi sebagai array, bukan objek
    }
    eNFA.closure[state] = array; //
  }
}

export function checkStringeNFA(eNfa, string) {
  console.log(JSON.stringify(eNfa, null, 2));
  let currentStates = [eNfa.initial];
  const visitedTransitions = [];
  for (const char of string) {
    console.log(currentStates);
    let nextStates = [];
    for (const state of currentStates) {
      if (eNfa.closure[state]) {
        nextStates = nextStates.concat(eNfa.closure[state]);
      }
    }
    currentStates = currentStates.concat(nextStates);
    console.log(currentStates);
    currentStates = search(
      eNfa.transitions,
      currentStates,
      char,
      visitedTransitions
    );
  }

  let newState = [];
  for (const state of currentStates) {
    if (eNfa.closure[state]) {
      newState = newState.concat(eNfa.closure[state]);
      visitedTransitions.push(
        `${state} --eps--> ${eNfa.closure[state].join(", ")}`
      );
    }
  }
  currentStates = currentStates.concat(newState);

  console.log(currentStates);
  console.log("\nVisited transitions:");

  console.log(visitedTransitions.join("\n"));
  for (const state of currentStates) {
    if (eNfa.final.includes(state)) {
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

// const isAccepted = checkStringeNFA(
//   addToObjecteNFA(transisi, alphabet, startState, finalState),
//   string
// );
// console.log("String accepted:", isAccepted);
