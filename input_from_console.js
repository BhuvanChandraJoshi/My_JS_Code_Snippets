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

async function main(){
    let name = await readInput("name: ");
    console.log(name);
    
    let age = await readInput("age: ");
    console.log(age);

    let gender = await readInput("gender: ");
    console.log(gender);
}

main();
