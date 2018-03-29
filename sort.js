var util = {
	//冒泡排序
	bubbleSort: function(array) {
		var i = 0,
			len = array.length,
			j, d;
		for(; i < len - 1; i++) {
			for(j = 0; j < len - 1 - i; j++) {
				if(array[j] > array[j + 1]) {
					d = array[j];
					array[j] = array[j + 1];
					array[j + 1] = d;
				}
			}
		}
		return array;
	},
	//sort
	systemSort(arr) {
		return arr.sort(function(a, b) {
			return a - b > 0
		})
	},
	//插入排序
	insertSort(array){
		var i = 1, j, temp, key, len = array.length; 
		for(; i < len; i++){ 
			temp = j = i; key = array[j]; 
			while(--j > -1){
				if(array[j] > key){ 
					array[j+1] = array[j]; 
				}else{ 
					break;
				} 
			}
			array[j+1] = key; 
		} 
		return array;
	}	

}
var quickSort1 = function(arr) {
	if(arr.length <= 1) {
		return arr;
	}
	var left = [];
	var right = [];
	　　
	for(var i = 1; i < arr.length; i++) {
		if(arr[i] < arr[0]) {
			left.push(arr[i]);
		} else {
			right.push(arr[i]);　
		}
	}
	return quickSort(left).concat(arr[0], quickSort(right));

};
var quickSort2 = function(arr){
	function fun(left,right){
		if(left >= right) return;
		var i=left,j=right,temp=arr[left];
		while(i != j){
			while(arr[j]>=temp && j>i)j--;
			while(arr[i]<=temp && j>i)i++;
			if(j>i){
				arr[i] += arr[j];
				arr[j] = arr[i] - arr[j];
				arr[i] = arr[i] - arr[j];
			}
		}
		
		arr[left] = arr[i];
		arr[i] = temp;
		fun(left,i-1);
		fun(i+1,right);
	}
	fun(0,arr.length-1);
}
var arr = [0,1,2,44,4,324,5,65,6,6,34,4,5,6,2,43,5,6,62,43,5,1,4,51,56,76,7,7,2,1,45,4,6,7]; 
console.log(util.insertSort(arr));