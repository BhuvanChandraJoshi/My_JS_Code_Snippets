function throttle(func, interval) { 
    let flag = true;
    return function(...args){
        if(flag){
            func.apply(this, args);
            flag = false;
            setTimeout(() => {
                flag = true;
            }, interval);
        }
    }
}

function heavyFunction() {
    console.log("Heavy Task");
}

const throttledHeavyFunction = throttle(heavyFunction, 500);
