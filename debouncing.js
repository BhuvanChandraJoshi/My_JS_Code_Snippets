const debounceFunction = (func, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(()=>{
            return func.apply(this, args);
        }, delay)
    }
}
