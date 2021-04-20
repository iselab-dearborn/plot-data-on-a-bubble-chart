function plotBubble(series, settings){

    const data = HighchartsUtils.toBubbleSeries(series);

    Highcharts.chart('container-bubble', {
        chart: {
            type: 'bubble',
            borderWidth: settings.showChartBorder? 1 : 0,
            borderColor: "lightgray",
            zoomType: 'xy'
        },
        title: {
            text: settings.chartTitle || null
        },
        subtitle: {
            text: settings.chartSubtitle || null
        },
        exporting: {
            sourceWidth: settings.exportingSourceWidth || 1200,
            sourceHeight: settings.exportingSourceHeight || 500
        },
        credits: {
            enabled: settings.showWatermark || false,
        },
        legend: {
            enabled: settings.showLegend || false,
        },
        xAxis: {
            step: 1,
            min: 0,
            max: data.mappingX.size()+1,
            title: {
                text: settings.xAxisTitle || null
            },
            labels: {
                formatter: function() {
                    return `${data.mappingX.searchByValue(this.value)}`;
                }
            },
        },
        yAxis: {
            step: 1,
            min: 0,
            max: data.mappingY.size()+1,
            title: {
                text: settings.yAxisTitle || null
            },
            labels: {
                formatter: function() {
                    return `${data.mappingY.searchByValue(this.value)}`;
                }
            },
        },
        plotOptions: {
            series: {
                color: settings.seriesColor || "#7cb5ec",
                dataLabels: {
                    enabled: settings.showDataLabels? true : false,
                    format: settings.dataLabelsFormat == "name"? '{point.name}' : '{point.z}'
                }
            }
        },
        series: [{
            data: data.data
        }]
    });
}
