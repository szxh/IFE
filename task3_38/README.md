##**任务描述**

参考下方设计图，实现一个支持列排序的表格组件

提供生成表格的接口，表格中的数据，表格样式尽量低耦合
可以配置对哪些列支持排序功能，并在表头进行排序按钮的显示，图中的样式为示意参考，可自行设定样式及交互方式
提供点击排序按钮后的响应接口，并提供默认的排序方法，当提供的接口没有具体实现时，按默认的排序方法进行排序操作，并更新表格中的数据显示。

##**插件使用方法**
//配置表格的标题<br/>
var th = ['姓名', '语文', '数学', '英语', '总分'];<br/>

//配置表格的单元格数据，为二重数组<br/>
var td = [<br/>
			['小明', '820', '97', '744', '2487'],<br/>
			['小红', '904', '625', '978', '2414'],<br/>
			['小亮', '632', '114', '72024', '234'],<br/>
			['小蛤', '110', '150', '301', '101'],<br/>
			['小哈', '11', '1450', '31', '1'],<br/>
			['小明', '820', '97', '744', '2487'],<br/>
			['小红', '904', '625', '978', '2414'],<br/>
			['小亮', '632', '114', '72024', '234'],<br/>
			['小蛤', '110', '150', '301', '101'],<br/>
			['小哈', '11', '1450', '31', '1'],<br/>
			['小明', '820', '97', '744', '2487'],<br/>
			['小红', '904', '625', '978', '2414'],<br/>
			['小亮', '632', '114', '72024', '234'],<br/>
			['小蛤', '110', '150', '301', '101'],<br/>
			['小哈', '11', '1450', '31', '1'],<br/>
			['小明', '820', '97', '744', '2487'],<br/>
			['小红', '904', '625', '978', '2414'],<br/>
			['小亮', '632', '114', '72024', '234'],<br/>
			['小蛤', '110', '150', '301', '101'],<br/>
			['小哈', '11', '1450', '31', '1']<br/>
		];<br/>

//需要排序序列的标题名<br/>
var sortCol = ['语文', '数学', '英语', '总分'];<br/>

//排序的方式，可自定义，若无自定义，则使用默认方法。<br/>
//若参数为default，则使用默认排序函数，否则使用自定义排序函数<br/>
var sortFunc = 'default';<br/>

//在页面中留下的表格结构hook<br/>
var tableSort =  document.getElementById('table-sort');<br/>

//设置为true，则首行冻结，否则首行不冻结。<br/>
var isFixed = true;<br/>

var table = new createTable(th, td, sortCol, sortFunc, tableSort, isFixed);<br/>
##**任务注意事项**

请注意代码风格的整齐、优雅
代码中含有必要的注释
可以合理选择使用其它第三方类库，但不建议
##**任务协作建议**

如果是各自工作，可以按以下方式：
团队集中讨论，明确题目要求，保证队伍各自对题目要求认知一致
各自完成任务实践
交叉互相Review其他人的代码，建议每个人至少看一个同组队友的代码
相互讨论，最后合成一份组内最佳代码进行提交
如果是分工工作（推荐），可以按以下模块切分
实现表格逻辑
实现排序相关逻辑