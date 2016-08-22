var dateObj = new datePicker();

var min = {
	year: 2013,
	month: 5,
	date: 15
};
var max = {
	year: 2018,
	month: 7,
	date: 8
};
dateObj.init({
	container: $('.container'),
	//是否可以选择时间段
	isRange: true,
	//选择时间段的时间跨度
	rangeLimit: [3, 100],
	//日期的最大值和最小值，以对象形式传递
	dateMin: min,
	dateMax: max,
	//选择日期后的回调函数
	selectCall: function() {
		alert('选择日期成功');
	},
	//不满足时间跨度时的回调函数
	rangeCall: function() {
		alert('不满足时间跨度');
	}
});

//设定日期的接口
dateObj.setDate(2015, 6, 8);

//获取选中日期的接口，若无选中的日期，则返回null；
var selectedDate = dateObj.getDate();