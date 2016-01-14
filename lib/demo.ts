'use strict';

interface Store {
  id:number,
  title:string
}

class ExpressionNode {
  private name:string;
  constructor(name:string) {
    this.name = name;
  }
}

var store:Store = { id: 1, title: "Malwee" }

function build<T>(value:T):T {
  for(var propt in value){
    value[propt] = new ExpressionNode(propt);
  }

  return value;
}

build(store);
console.log(store.id)
console.log(store.title)