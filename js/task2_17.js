function addEventHandler(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on"+event, hanlder);
    } else  {
        ele["on" + event] = hanlder;
    }
}
function getEvent(event) {
        return event ? event : window.event;
}
function getTarget(event){
        return event.target || event.srcElement;
}
// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}

var graTime = document.getElementById('form-gra-time');
var citySelect = document.getElementById('city-select');
var aqiChart = document.getElementsByClassName('aqi-chart-wrap')[0];
/**
 * 渲染图表
 */
function renderChart() {
	var color = '';
	var text = '';
	for (var dat in chartData) {
		color = randomColor();
		text += '<div style="height:' + chartData[dat] + ';background-color:' + color + ';"></div>';
	}
	aqiChart.innerHTML = text;
}

//随机生成颜色
function randomColor() {
	var numColor = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
	var color = '#';
	for (var i = 0; i < 6; i++) {
		var index = Math.floor(Math.random() * 16);
		color += numColor[index];
	}
	return color;
}
/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(event) {
  // 确定是否选项发生了变化 
  var event = getEvent(event);
  var target = getTarget(event);
  if (pageState.nowGraTime == target.value) {
  	return;
  } else {
  	pageState.nowGraTime = target.value;
  }
  // 设置对应数据
	initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(event) {
  // 确定是否选项发生了变化 
  // 设置对应数据
  var event = getEvent(event);
  var target = getTarget(event);
  pageState.nowSelectCity = target.value;
	initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    addEventHandler(graTime,'click',graTimeChange);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var test = '';
  for (var i in aqiSourceData) {
  	test += '<option>' + i +'</option>';
  }
  citySelect.innerHTML = test;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  addEventHandler(citySelect,'change',citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var nowChart = aqiSourceData[pageState.nowSelectCity];
  
  if (pageState.nowGraTime == "day") {
  	chartData = {};
  	chartData = nowChart;
  } else if (pageState.nowGraTime == "week") {
  	chartData = {};
  	var weekData = 0, week = 0, datCount = 0;
  	for (var dat in nowChart) {
  		weekData += nowChart[dat];
  		datCount++;
  		var weekCount = "第" + week + "周";
  		if (new Date(dat).getDay() == 6) {
  			week++;
  			chartData[weekCount] = weekData / datCount;
  			weekData = 0;
  			datCount = 0;
  		}
  	}
  	if (datCount != 0) {
  		week++;
  		chartData[weekCount] = weekData / datCount;
  		weekData = 0;
  		datCount = 0;
  	}
  } else if (pageState.nowGraTime == "month") {
  	chartData = {};
  	var monthData = 0, month = 0, datCount = 0;
  	for (var dat in nowChart) {
  		monthData += nowChart[dat];
  		datCount++;
  		var monthCount = month + "月";
  		if (new Date(dat).getMonth() != month) {
  			month++;
  			chartData[monthCount] = monthData / datCount;
  			weekData = 0;
  			datCount = 0;
  		}
  	}
  	if (datCount != 0) {
  		month++;
  		chartData[monthCount] = monthData / datCount;
  		monthData = 0;
  		datCount = 0;
  	}
  }
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
  renderChart();
}

init();
