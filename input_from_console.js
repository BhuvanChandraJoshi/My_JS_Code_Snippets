const readline = require("readline");

async function readInput(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(query, (input) => {
      resolve(input);
      rl.close();
    });
  });
}

async function getInput(query){
    console.log("Enter input: ");
    let userInput = await readInput(query);
    console.log("Input: " + userInput);
}

getInput("name: ");
