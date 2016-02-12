function Pair(left, right) {
  this.left = left;
  this.right = right;
}
Pair.prototype = {
  map: function(f) {
    if(this.right == null) return this.left; // Fix
    return f(this.left.map(f), this.right.map(f));
  }
}
function p(l, r) { return new Pair(l, r); }
function fp(v) { return new Pair(v, null); }


function catamorph(operation, functor) {
  return functor.map(operation);
}


function sum(a, b) {
  return a + b;
}
var list = p(fp(1), p(fp(2), p(fp(3), fp(4))));
console.log(JSON.stringify(list, null, 2));
var ret = catamorph(sum, list);
console.log(ret);


var btree = p(
  p(
    p(fp(1), fp(2)),
    p(fp(3), fp(4))
  ),
  p(
    p(fp(5), fp(6)),
    p(
      p(fp(7), fp(8)),
      p(fp(9), fp(0))
    )
  )  
);
console.log(JSON.stringify(btree, null, 2));
ret = catamorph(sum, btree);
console.log(ret);
// 10


function concat(a, b) {
  return a.toUpperCase() + " " + b.toUpperCase();
}
var sentence = p(fp("yvan"), p(fp("eht"), fp("nioj")));
console.log(JSON.stringify(sentence, null, 2));
ret = catamorph(concat, sentence);
console.log(ret);
// YVAN EHT NIOJ


function product(a, b) { return a * b; }
var ret = catamorph(product, p(
    fp(catamorph(sum, p(
        fp(1),
        fp(2)
    ))),
    fp(catamorph(sum, p(
        fp(3),
        fp(4)
    )))
));
console.log(ret);
// 21