class GnuplotUtils {

    static download(filename, text) {

        var element = document.createElement('a');

        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    static getTics(name, map){

        let str = `set ${name} ( \\\n`

        for(let el in map){
            str += `    "${el}" ${map[el]}, \\\n`;
        };

        str += ")"

        return str;
    }

    static exportData(output){

        let str = "";

        output.data.forEach(el => {
            str += `${el.x};${el.y};${el.z}\n`;
        });

        GnuplotUtils.download("data.txt", str);
    }

    static exportScript(output){

        let xTics = GnuplotUtils.getTics("xtics", output.mappingX.map);
        let yTics = GnuplotUtils.getTics("ytics", output.mappingY.map);

        let script = `
set terminal pdfcairo enhanced size 8in, 4in
set output 'out.pdf'

set datafile separator ";"
set grid
unset key

set lmargin 4
set rmargin 0
set tmargin 0
set bmargin 2

# Default Colors

COLOR_1="#9E77A1"
COLOR_2="#9A8FBB"
COLOR_3="#8AA9C0"
COLOR_4="#7BC1BF"
COLOR_5="#7ED9B1"
COLOR_6="#B2ED90"
COLOR_7="#FDF57A"

set xrange [0:${output.mappingX.size()+1}]
set yrange [0:${output.mappingY.size()+1}]

${xTics}
${yTics}

BUBBLE_SCALE = 0.01

#set xtics rotate by 45 offset 0,0 right

circleColor = COLOR_1
textColor = 'black'

set tics scale 0

plot 'data.txt' using 1:2:($3*BUBBLE_SCALE) with circles lt rgb circleColor fs solid border rgb circleColor fs transparent solid 0.4, \\
'' using 1:2:(sprintf("%d", $3)) with labels notitle
        `;

        GnuplotUtils.download("script.gnu", script);
    }

    static export(series){

        const output = HighchartsUtils.toBubbleSeries(series);

        GnuplotUtils.exportScript(output);
        GnuplotUtils.exportData(output);
    }
}
