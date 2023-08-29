function debounce(func, delay) {
    let timer;
    return function(...args){
        clearTimeout(timer);
        timer = setTimeout(()=>{
            return func.apply(this, args);
        }, delay)
    }
}

function heavyFunction() {
    console.log("Heavy Task");
}

const debouncedHeavyFunction = debounce(heavyFunction, 500);
