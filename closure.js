function f1(){
    let count = 0;
    return function(){
        count++;
        console.log(count);
    }
}

let f2 = f();

f2();

f2();
