var obj = [{
	item: {
		name: 'jhon',
		set: 'male',
		age: '12',
		skill: [{
			chinese: '3',
			english: '4'
		}]
	},
	deep: true
}];
function deepClone(obj){
 	var newObj = obj.constructor === Array ? []:{};
    if(typeof obj !== 'object'){
        return
    }else{
        for(var i in obj){
            if(obj.hasOwnProperty(i)){
                newObj[i] = typeof obj[i] === 'object'?deepClone(obj[i]):obj[i];
            }
        }
    }
    return newObj
}
console.log(deepClone(obj));