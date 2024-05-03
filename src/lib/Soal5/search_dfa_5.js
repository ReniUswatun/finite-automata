const string = "0010";

function stringToArray(string) {
  const array = string.split(""); // Memecah string menjadi array karakter
  return array;
}

export function addToObjectDFA(transisi, alphabet, startState, finalState) {
  const objectDFA = {};
  objectDFA.states = [];
  objectDFA.alphabet = stringToArray(alphabet);
  objectDFA.initial = startState;
  objectDFA.final = stringToArray(finalState);
  objectDFA.transitions = {};

  const line = transisi.split("\n");

  for (const lines of line) {
    const [state, transitions] = lines.split("|");
    if (!objectDFA.states.includes(state)) {
      objectDFA.states.push(state);
      objectDFA.transitions[state] = {};
    }
    const transitionList = transitions.split(",");
    let destinationState = 0;
    // Iterasi melalui setiap karakter dari string input
    for (const stringState of objectDFA.alphabet) {
      if (!objectDFA.transitions[state][stringState]) {
        objectDFA.transitions[state][stringState] = [];
      }
      objectDFA.transitions[state][stringState].push(
        transitionList[destinationState]
      );
      destinationState++;
    }
  }
  return objectDFA;
}

export function checkStringDFA(dfa, string) {
  let currentStates = [dfa.initial];
  const visitedTransitions = [];
  for (const char of string) {
    currentStates = search(
      dfa.transitions,
      currentStates,
      char,
      visitedTransitions
    );
  }
  console.log(currentStates);
  console.log("\nVisited transitions:");

  console.log(visitedTransitions.join("\n"));
  for (const state of currentStates) {
    if (dfa.final.includes(state)) {
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

// Contoh penggunaan
// Contoh penggunaan (fixed)
// const isAccepted = checkStringDFA(
//   addToObjectDFA(transisi, alphabet, startState, finalState),
//   string
// );
// console.log("String accepted:", isAccepted);
