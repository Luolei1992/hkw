function ratingRead(number,size,obj){
	// console.log(number);
	// console.log(size);
	number = parseInt(number);
	size = parseInt(size);
	// var newRedChild = document.createElement("div");
	// newRedChild.setAttribute("class", "red-start");
	// newRedChild.style.width = size + "px";
	// newRedChild.style.height = size + "px";
	var dom = "<div class='red-start'></div>";
	var dom2 = "<div class='black-start'></div>";
	var endDom = "";
	for (var i = 0; i < number; i++) {
		endDom += dom;
	}
	for (var i = 0; i < 5 - number; i++) {
		endDom += dom2;
	}
	$(obj).append(endDom);
	var RedChildWidth = size + "px";
	var RedChildHeight = size + "px";
	$(obj).children().css({
		"width": RedChildWidth,
		"height": RedChildHeight
	});
	// var newBlackChild = document.createElement("div");
	// newBlackChild.setAttribute("class", "black-start");
	// newBlackChild.style.width = size + "px";
	// newBlackChild.style.height = size + "px";
	// for (var i = 0; i < 5 - number; i++) {
	// 	// obj.appendChild(newBlackChild);
	// }
}