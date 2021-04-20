class HighchartsUtils {

    static toBubbleSeries(series){

        let mappingX = new Mapping();
        let mappingY = new Mapping();

        let data = [];

        series.forEach((serie) => {

            mappingX.addIfNotFind(serie.name);

            let x = mappingX.searchByName(serie.name);

            serie.data.forEach((el) => {

                mappingY.addIfNotFind(el.name);

                let y = mappingY.searchByName(el.name);

                data.push({
                    x: x,
                    y: y,
                    z: el.value,
                    name: el.name
                });
            });
        });

        return {
            mappingX, mappingY, data
        }
    }

}
