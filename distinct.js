Array.prototype.distinct = {
	fun1(){
		var arr = this;
		var newArr = [arr[0]];
		for(var i=1; i<arr.length; i++){
			var flag = true;
			for(var j=0; j<newArr.length; j++){
				if(arr[i] == newArr[j]){
					flag = false;
					break;
				}
			}
			if(flag){
				newArr.push(arr[i]);
			}
		}
		return newArr;
	},
	fun2(){
		var arr = this;
		for(var i=0; i<arr.length; i++){
			for(var j=0; j<i; j++){
				if(arr[i] == arr[j]){
					arr.splice(i--,1);
					continue;
				}
			}
		}
	},
	fun3(){
		var arr = this,obj = {},result=[];
		for(var i=0; i<arr.length; i++){
			var v = arr[i];
			if(!obj[v]){
				obj[v] = 1;
				result.push(v);
			}
		}
		console.log(result);
		return result;
	},
	fun4(){
		var arr = this.sort(function(a,b){return a-b}),n=0;
		function fn(){
			if(n < arr.length){
				if(arr[n] == arr[n+1]){
					arr.splice(n--+1,1);
				}
				fn(n++);
			}
		}
		fn();
		console.log(arr);
	}
}

var a= [1,2,3,4,5,6,5,3,2,4,56,4,1,2,1,1,1,1,1,1,];
a.distinct.fun4.call(a);
