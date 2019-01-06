// 基于准备好的dom，初始化echarts实例
$( function(){
    var myChart = echarts.init(document.getElementById('echarts_1'));
 // 指定图表的配置项和数据
 var option = {
    title: {
        text: '2019年注册人数'
    },
    // 提示框组件
    tooltip: {},
    // 图例
    legend: {
        data:['人数','销量']
    },
    // x轴对应的数据
    xAxis: {
        data: ["1月","2月","3月","4月","5月","6月"]
    },
    // y轴对应的数据,空对象表示没有配置,根据数据动态生成
    yAxis: {},
    series: [{
        name: '人数',
        type: 'bar',
        // 柱状图bar 折线图line 饼图pie 
        data: [1000,1500,1800,1200,1000,500]
    },{
        name: '销量',
        type: 'bar',
        // 柱状图
        data: [1000,1500,1800,1200,1000,500]
    }]
};
//  设置option
 myChart.setOption(option);

});
$( function(){
    var myChart = echarts.init(document.getElementById('echarts_2'));
    option = {
        // 主标题
        title : {
            text: '热门品牌',
            subtext: '2019年1月',
            x:'center'
        },
        // 提示框组件
        tooltip : {
            trigger: 'item',
            // 格式化文本
           // {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
            formatter: "{a}<br/>{b} : {c} {d}%"
        },
        // 图例
        legend: {
            orient: 'vertical',//horizontal 水平的
            left: 'left',
            data: ['耐克','阿迪','新百伦','李宁','亚瑟士']
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '50%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'耐克'},
                    {value:310, name:'阿迪'},
                    {value:234, name:'新百伦'},
                    {value:135, name:'李宁'},
                    {value:1548, name:'亚瑟士'}
                ],
                // 额外的样式效果
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    myChart.setOption(option);
});

