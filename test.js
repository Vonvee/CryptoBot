function A(cb) {
    var p = 2
    cb(p)
}

A(function(parsed) {
    parsed+=1
    console.log(parsed);
});