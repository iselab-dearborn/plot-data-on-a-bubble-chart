function plotSplitPacked(series, settings){

    Highcharts.chart('container-split-packed', {
        chart: {
            type: 'packedbubble',
            borderWidth: settings.showChartBorder? 1 : 0,
            borderColor: "lightgray"
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
        plotOptions: {
            packedbubble: {
                minSize: settings.minSize || 10,
                maxSize: settings.maxSize || 100,
                zMin: settings.zMin || 0,
                zMax: settings.zMax || 100,
                layoutAlgorithm: {
                    gravitationalConstant: 0.05,
                    splitSeries: true,
                    seriesInteraction: false,
                    dragBetweenSeries: true,
                    parentNodeLimit: true
                },
                dataLabels: {
                    enabled: settings.showDataLabels? true : false,
                    format: settings.dataLabelsFormat == "name"? '{point.name}' : '{point.value}',
                    filter: {
                        property: 'y',
                        operator: '>',
                        value: settings.valueGreaterThan || 20
                    },
                    style: {
                        color: 'black',
                        textOutline: 'none',
                        fontWeight: 'normal'
                    }
                }
            }
        },
        series: series
    });
}
