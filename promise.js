function func(resolve, reject){
    let x = 10;
    if(x == 12){
        resolve(x);
    }
    else{
        reject(x);
    }
}

const promise = new Promise(func);

promise.then(data => {
    console.log("Then");
    console.log(data);
}).catch(data => {
    console.log("Catch");
    console.log(data);
})
