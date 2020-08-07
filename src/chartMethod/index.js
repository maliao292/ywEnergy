import echarts from 'echarts'
let install = function (Vue) {
    Object.defineProperties(Vue.prototype, {
        $chart: {
            get() {
                return {
                    screenBacLine(id) {
                        var myChart = echarts.init(document.getElementById(id))
                        let option = {
                            title: {
                                text: '堆叠区域图'
                            },
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'cross',
                                    label: {
                                        backgroundColor: '#6a7985'
                                    }
                                }
                            },
                            legend: {
                                data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
                            },
                            toolbox: {
                                feature: {
                                    saveAsImage: {}
                                }
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis: [
                                {
                                    type: 'category',
                                    boundaryGap: false,
                                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                                }
                            ],
                            yAxis: [
                                {
                                    type: 'value'
                                }
                            ],
                            series: [
                                {
                                    name: '邮件营销',
                                    type: 'line',
                                    stack: '总量',
                                    areaStyle: {},
                                    data: [120, 132, 101, 134, 90, 230, 210]
                                },
                                {
                                    name: '联盟广告',
                                    type: 'line',
                                    stack: '总量',
                                    areaStyle: {},
                                    data: [220, 182, 191, 234, 290, 330, 310]
                                },
                                {
                                    name: '视频广告',
                                    type: 'line',
                                    stack: '总量',
                                    areaStyle: {},
                                    data: [150, 232, 201, 154, 190, 330, 410]
                                },
                                {
                                    name: '直接访问',
                                    type: 'line',
                                    stack: '总量',
                                    areaStyle: {},
                                    data: [320, 332, 301, 334, 390, 330, 320]
                                },
                                {
                                    name: '搜索引擎',
                                    type: 'line',
                                    stack: '总量',
                                    label: {
                                        normal: {
                                            show: true,
                                            position: 'top'
                                        }
                                    },
                                    areaStyle: {},
                                    data: [820, 932, 901, 934, 1290, 1330, 1320]
                                }
                            ]
                        };
                        myChart.setOption(option);
                    },
                    hzPie(id) {
                        var myChart = echarts.init(document.getElementById(id))
                        var data = [{
                            value: 100,
                            name: 'Chrome移动版',
                            label: {
                                color: '#fff'
                            },
                            itemStyle: {

                            },
                            emphasis: {
                                itemStyle: {

                                }
                            }
                        },
                        {
                            value: 80,
                            name: 'Google Chrome',
                            label: {
                                color: '#fff'
                            },
                            itemStyle: {

                            },
                            emphasis: {
                                itemStyle: {

                                }
                            }
                        },
                        {
                            value: 65,
                            name: '微信浏览器',
                            label: {
                                color: '#fff'
                            },
                            itemStyle: {

                            },
                            emphasis: {
                                itemStyle: {

                                }
                            }
                        },
                        {
                            value: 65,
                            name: '手机百度',
                            label: {
                                color: '#fff'
                            },
                            itemStyle: {

                            },
                            emphasis: {
                                itemStyle: {

                                }
                            }
                        },
                        {
                            value: 60,
                            name: 'UC浏览器（其他）',
                            label: {
                                color: '#fff'
                            },
                            itemStyle: {

                            },
                            emphasis: {
                                itemStyle: {

                                }
                            }
                        },
                        {
                            value: 60,
                            name: 'QQ手机浏览器',
                            label: {
                                color: '#fff'
                            },
                            itemStyle: {

                            },
                            emphasis: {
                                itemStyle: {

                                }
                            }
                        },
                        {
                            value: 50,
                            name: 'Safari移动版',
                            label: {
                                color: '#fff'
                            },
                            itemStyle: {

                            },
                            emphasis: {
                                itemStyle: {

                                }
                            }
                        },
                        {
                            value: 90,
                            name: '其它',
                            label: {
                                color: '#fff'
                            },
                            itemStyle: {

                            },
                            emphasis: {
                                itemStyle: {

                                }
                            }
                        }
                        ];

                        function angleText(i, num) {
                            //每个元素的角度
                            var everyAngle = 360 / num;
                            //文字现在所在的角度
                            var currentAngle = i * everyAngle + everyAngle / 2;
                            //文字所在模块的所占角度
                            var currentArea = (i + 1) * everyAngle;

                            if (currentAngle <= 90) {
                                return -currentAngle;
                            } else if (currentAngle <= 180 && currentAngle > 90) {
                                return 180 - currentAngle;
                            } else if (currentAngle < 270 && currentAngle > 180) {
                                return 180 - currentAngle;
                            } else if (currentAngle < 360 && currentAngle >= 270) {
                                return 360 - currentAngle;
                            }
                        }

                        //有值的色图的正切处理
                        var data3 = [];
                        data3 = JSON.parse(JSON.stringify(data));
                        for (var i = 0; i < data3.length; i++) {
                            if (i === 0) {
                                data3[i]['label']['color'] = '#333';
                                data3[i]['itemStyle']['color'] = 'rgba(25, 255, 224)';
                                data3[i]['emphasis']['itemStyle']['color'] = 'rgba(25, 255, 224)';
                                data3[i]['label']['rotate'] = angleText(i, data3.length) + 'reg';
                            } else {
                                data3[i]['label']['color'] = '#fff';
                                data3[i]['itemStyle']['color'] = '#4169E1';
                                data3[i]['emphasis']['itemStyle']['color'] = '#6A5ACD';
                                data3[i]['label']['rotate'] = angleText(i, data3.length) + 'reg';;
                            }
                        }

                        console.log(data3);
                        //最外层大圈的数据
                        var data1 = [];

                        data1 = JSON.parse(JSON.stringify(data));
                        for (var i = 0; i < data1.length; i++) {
                            data1[i].value = 1;
                            data1[i]['label']['rotate'] = angleText(i, data1.length);
                            if (i === 0) {
                                data1[i]['label']['color'] = 'rgba(25, 255, 224)';
                            }
                        }

                        //透明饼图的数据
                        var data2 = [];

                        for (var i = 0; i < data.length; i++) {
                            if (i === 0) {
                                data2.push({
                                    value: 1,
                                    itemStyle: {
                                        color: 'rgba(25, 255, 224,0.05)',
                                    }
                                });
                            } else {
                                data2.push({
                                    value: 1,
                                    itemStyle: {
                                        color: 'transparent',
                                    }
                                });
                            }
                        }





                        var option = {
                            backgroundColor: 'rgba(0, 0, 0,0)',
                            grid: {},
                            polar: {},
                            angleAxis: {
                                show: false,
                                interval: 1,
                                type: 'category',
                                data: [],


                            },
                            //中间画圈圈的坐标轴
                            radiusAxis: {
                                show: false
                            },
                            series: [{
                                type: 'pie',
                                radius: ["68%", "90%"],
                                hoverAnimation: false,
                                itemStyle: {
                                    color: 'transparent'
                                },
                                labelLine: {
                                    normal: {
                                        show: false,
                                        length: 30,
                                        length2: 55
                                    },
                                },
                                label: {
                                    normal: {
                                        position: 'inside',
                                        align: 'right'
                                    }
                                },
                                name: "",
                                data: data1
                            }, {
                                stack: 'a',
                                type: 'pie',
                                radius: ['75%', '42%'],
                                roseType: 'area',
                                zlevel: 10,
                                itemStyle: {
                                    color: '#4169E1',
                                },
                                emphasis: {
                                    itemStyle: {
                                        color: '#6A5ACD'
                                    }
                                },
                                label: {
                                    normal: {
                                        show: true,
                                        textStyle: {
                                            fontSize: 18,
                                            color: '#fff'
                                        },
                                        position: 'inside',
                                        rotate: 30,
                                        align: 'right',
                                        fontWeight: 'bold',
                                        formatter: '{c}%'
                                    },
                                    emphasis: {
                                        show: true
                                    }
                                },
                                animation: false,
                                data: data3
                            }, {
                                type: 'pie',
                                zlevel: 99,
                                radius: ["15%", "90%"],
                                selectedOffset: 0,
                                animation: false,
                                hoverAnimation: false,
                                label: {
                                    normal: {
                                        show: false,
                                    }
                                },
                                data: data2
                            }]
                        };

                        myChart.setOption(option);


                        myChart.on('click', function (a) {
                            //最外层的字体颜色重置变色
                            for (var da1 = 0; da1 < option.series[0].data.length; da1++) {
                                option.series[0].data[da1].label.color = '#fff';
                            }

                            //色圈的字体颜色和选中颜色重置
                            for (var da2 = 0; da2 < option.series[1].data.length; da2++) {
                                option.series[1].data[da2].itemStyle.color = '#4169E1';
                                option.series[1].data[da2].label.color = '#fff';
                                //hover颜色重置
                                option.series[1].data[da2].emphasis.itemStyle.color = '#6A5ACD';

                            }

                            //背景的透明饼图的重置
                            for (var da3 = 0; da3 < option.series[2].data.length; da3++) {
                                option.series[2].data[da3].itemStyle.color = 'transparent';
                            }

                            option.series[1].data[a.dataIndex].itemStyle.color = 'rgba(25, 255, 224)';
                            option.series[1].data[a.dataIndex].label.color = '#333';
                            //hover 颜色改变
                            option.series[1].data[a.dataIndex].emphasis.itemStyle.color = 'rgba(25, 255, 224)';
                            option.series[0].data[a.dataIndex].label.color = 'rgba(25, 255, 224)';
                            option.series[2].data[a.dataIndex].itemStyle.color = 'rgba(25, 255, 224,0.1)';
                            //console.log(option)
                            myChart.setOption(option);
                        });

                        myChart.on('mouseover', function (a) {
                            myChart.dispatchAction({
                                type: 'highlight',
                                seriesIndex: 1,
                                dataIndex: a.dataIndex
                            });
                        });

                        myChart.on('mouseout', function (a) {
                            myChart.dispatchAction({
                                type: 'downplay',
                                seriesIndex: 1,
                                dataIndex: a.dataIndex
                            });
                        });
                    },
                    screenBar(id) {
                        var myChart = echarts.init(document.getElementById(id))
                        var option = {
                            backgroundColor: 'rgba(0, 0, 0,0)',
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            grid: {
                                left: '2%',
                                right: '4%',
                                bottom: '14%',
                                top: '16%',
                                containLabel: true
                            },
                    
                            xAxis: {
                                type: 'category',
                                data: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
                                axisLine: {
                                    lineStyle: {
                                        color: 'white'

                                    }
                                },
                                axisLabel: {
                                    // interval: 0,
                                    // rotate: 40,
                                    textStyle: {
                                        fontFamily: 'Microsoft YaHei'
                                    }
                                },
                            },

                            yAxis: {
                                type: 'value',
                                max: '1200',
                                axisLine: {
                                    show: false,
                                    lineStyle: {
                                        color: 'white'
                                    }
                                },
                                splitLine: {
                                    show: true,
                                    lineStyle: {
                                        color: 'rgba(255,255,255,0.3)'
                                    }
                                },
                                axisLabel: {}
                            },

                            series: [{
                                name: '1',
                                type: 'bar',
                                barWidth: '15%',
                                itemStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: '#096cc5'
                                        }, {
                                            offset: 1,
                                            color: '#3b9dc4'
                                        }]),
                                        barBorderRadius: 12,
                                    },
                                },
                                data: [400, 400, 300, 300, 300, 400, 400, 400, 300]
                            },
                            {
                                name: '2',
                                type: 'bar',
                                barWidth: '15%',
                                itemStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: '#43ec7f'
                                        }, {
                                            offset: 1,
                                            color: '#44f7d8'
                                        }]),
                                        barBorderRadius: 11,
                                    }

                                },
                                data: [400, 500, 500, 500, 500, 400, 400, 500, 500]
                            }]
                        };
                        myChart.setOption(option);
                    }

                }
            }
        }
    })
}
export default { install }