
function parseData(data, settings){

    const rows = data.split("\n");

    let numberOfColumns = -1;
    const entries = [];

    rows.forEach((el, i) => {

        el = $.trim(el);

        if (el.length == 0) {
            return;
        }

        let columns = el.split(settings.separator).map(el => $.trim(el));

        if(numberOfColumns == -1){
            numberOfColumns = columns.length;
        }

        if(columns.length != numberOfColumns){
            throw new Error(`The number of columns at line ${i+1} is invalid. Expected ${numberOfColumns} columns`);
        }

        entries.push(columns);
    });

    return entries;
}

function parse(rows, settings){

    let header;

    const series = [];

    rows.forEach((row, i) => {

        if (i == 0) {
            header = row;
            return;
        }

        var serie = {
            name: row[0],
            data: []
        }

        for (let j = 1; j < header.length; j++) {

            row[j] = row[j] || 0;

            let value = parseFloat(row[j]);

            if (value == 0 && settings.ignoreZeros){
                continue;
            }

            serie.data.push({
                name: header[j],
                value: value,
            });
        }

        series.push(serie);
    });

    return series;
}

function getParsedData(settings){
    return parseData($("#input-data").val(), settings);
}

function getSettings(){
    return {
        ignoreZeros: $('#ignore-zeros').prop('checked'),
        separator: $('#separator').val() == "tab"? "\t" : $('#separator').val(),
        chartTitle: $('#chart-title').val(),
        chartSubtitle: $('#chart-subtitle').val(),
        xAxisTitle: $('#x-axis-title').val(),
        yAxisTitle: $('#y-axis-title').val(),
        minSize: $('#min-size').val(),
        maxSize: $('#max-size').val(),
        zMin: $('#z-min').val(),
        zMax: $('#z-max').val(),
        showLegend: $('#show-legend').prop('checked'),
        showWatermark: $('#show-watermark').prop('checked'),
        showChartBorder: $('#show-chart-border').prop('checked'),
        showDataLabels: $('#show-data-labels').prop('checked'),
        dataLabelsFormat: $('#data-labels-format').val(),
        valueGreaterThan: $('#value-greater-than').val(),
        seriesColor: $('#series-color').val(),
        exportingSourceWidth: $('#exporting-source-width').val(),
        exportingSourceHeight: $('#exporting-source-height').val()
    };
}

function transpose() {

    let settings = getSettings();
    let data = getParsedData(settings);

    let transposed = math.transpose(data);

    let str = "";

    transposed.forEach(el => {
        str += el.reduce((acc, el) => acc + settings.separator + el) + "\n";
    });

    $("#input-data").val(str);
}

function plot(){

    let settings = getSettings();
    let data = getParsedData(settings);
    let series = parse(data, settings);

    plotBubble(series, settings);
    plotPacked(series, settings);
    plotSplitPacked(series, settings);
}

function loadExample(){

    $.get("data/example.csv", function (response) {
        $("#input-data").val(response);
        plot();
    });
}

function exportToGnuplot(){

    let settings = getSettings();
    let data = getParsedData(settings);
    let series = parse(data, settings);

    GnuplotUtils.export(series);
}

$(function(){

    const documentHeight = $(document).height();
    const position = $(".map-container").offset();

    $(".map-container").height(documentHeight - position.top-20) ;

    loadExample();

    $("#btn-plot").click(() => {
        plot();
    });

    $("#btn-transpose").click(() => {
        transpose();
    });

    $("#btn-export-gnuplot").click(() => {
        exportToGnuplot();
    });
});
