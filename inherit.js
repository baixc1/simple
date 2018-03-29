// 定义一个动物类
function Animal (name) {
  // 属性
  this.name = name || 'Animal';
  // 实例方法
  this.sleep = function(){
    console.log(this.name + '正在睡觉！');
  }
  //不可枚举属性
  Object.defineProperty(this, 'sex', {
  	value: 'male',
  	enumerable: false
  })
}
// 原型方法
Animal.prototype.eat = function(food) {
  console.log(this.name + '正在吃：' + food);
};

//1、原型链继承
function fun1(){
	function Cat(){ 
	}
	Cat.prototype = new Animal();
	Cat.prototype.name = 'cat';
	
	//　Test Code
	var cat = new Cat();
	console.log(cat.name);
	console.log(cat.eat('fish'));
	console.log(cat.sleep());
	console.log(cat instanceof Animal); //true 
	console.log(cat instanceof Cat); //true
}

//2、构造继承
function fun2(){
	function Cat(name){
	  Animal.call(this);
	  this.name = name || 'Tom';
	}
	
	// Test Code
	var cat = new Cat();
	console.log(cat.name);
	console.log(cat.sleep());
	console.log(cat instanceof Animal); // false
	console.log(cat instanceof Cat); // true
}

//3、实例继承
function fun3(){
	function Cat(name){
	  var instance = new Animal();
	  instance.name = name || 'Tom';
	  return instance;
	}
	
	// Test Code
	var cat = new Cat();
	console.log(cat.name);
	console.log(cat.sleep());
	console.log(cat instanceof Animal); // true
	console.log(cat instanceof Cat); // false	
}

//4、拷贝继承
function fun4(){
	function Cat(name){
	  var animal = new Animal();
	  for(var p in animal){
	    Cat.prototype[p] = animal[p];
	  }
	  Cat.prototype.name = name || 'Tom';
	}
	
	// Test Code
	var cat = new Cat();
	console.log(cat.name);
	console.log(cat.sleep());
	console.log(cat instanceof Animal); // false
	console.log(cat instanceof Cat); // true
	
}
//5、组合继承
function fun5(){
	function Cat(name){
	  Animal.call(this);
	  this.name = name || 'Tom';
	}
	Cat.prototype = new Animal();
	Cat.prototype.constructor = Cat;
	
	// Test Code
	var cat = new Cat();
	console.log(cat.name);
	console.log(cat.sleep());
	console.log(cat instanceof Animal); // true
	console.log(cat instanceof Cat); // true
}
//6、寄生组合继承
function fun6(){
	function Cat(name){
	  Animal.call(this);
	  this.name = name || 'Tom';
	}
	(function(){
	  // 创建一个没有实例方法的类
	  var Super = function(){};
		  Super.prototype = Animal.prototype;
		  //将实例作为子类的原型
		  Cat.prototype = new Super();
		  Cat.prototype.constructor = Cat; // 需要修复下构造函数
	})();
	
	// Test Code
	var cat = new Cat();
	console.log(cat.name);
	console.log(cat.sleep());
	console.log(cat instanceof Animal); // true
	console.log(cat instanceof Cat); //true
}
function fun7(){
	function Animal (name) {
	  // 属性
	  this.name = name || 'Animal';
	  // 实例方法
	  this.sleep = function(){
	    console.log(this.name + '正在睡觉！');
	  }
	  //实例引用属性
	  this.features = [];
	}
	function Cat(name){
	}
	Cat.prototype = new Animal();
	
	var tom = new Cat('Tom');
	var kissy = new Cat('Kissy');
	
	console.log(tom.name); // "Animal"
	console.log(kissy.name); // "Animal"
	console.log(tom.features); // []
	console.log(kissy.features); // []
	
	tom.name = 'Tom-New Name';
	tom.features.push('eat');
	
	//针对父类实例值类型成员的更改，不影响
	console.log(tom.name); // "Tom-New Name"
	console.log(kissy.name); // "Animal"
	//针对父类实例引用类型成员的更改，会通过影响其他子类实例
	console.log(tom.features); // ['eat']
	console.log(kissy.features); // ['eat']
}
fun7();
