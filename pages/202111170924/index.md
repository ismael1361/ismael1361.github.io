<div markdown="1" class="capa" style="background-image: url(%PUBLIC_URL%/assets/images/001.jpg);">
#[Projeção de mapa ortográfico](./?page=archive&id=202111170924)
</div>

*17 - Nov, 2021*

Pense no seguinte, você está mexendo com mapeamento geográfico e pretende projetar em um ambiente esférico, mas, você não tem habilidades com WebGL para modelagem 3D e pretende trabalhar em um ambiente 2D dando um resultado ilusório 3D. Será que isso seria possível fazer? E a resposta é SIM, com ajuda de [cálculos matemáticos](https://en.wikipedia.org/wiki/List_of_map_projections) que lidam com mapeamento geográfico em um ambiente 2D, como a própria Google faz no [Maps](https://www.google.com/maps):

![Orthographic map projection](%PUBLIC_URL%/assets/images/003.gif)

<br/>
<br/>
<br/>

##Trabalhando nisso ainda 👨🏽‍💻

<br/>
<br/>
<br/>

```js
class Mercator{
    constructor(mapWidth, mapHeight){
        this.mapWidth = typeof mapWidth === "number" ? mapWidth : 256;
        this.mapHeight = typeof mapHeight === "number" ? mapHeight : 256;

        this.TILE_SIZE = 256;
        this._pixelOrigin = {x: (TILE_SIZE/2.0), y: (TILE_SIZE/2.0)};
        this._pixelsPerLonDegree = TILE_SIZE / 360.0;
        this._pixelsPerLonRadian = TILE_SIZE / (2 * Math.PI);
    }

    static bound(val, valMin, valMax){
        return Math.min(Math.max(val, valMin), valMax);
    }

    static degreesToRadians(deg){
        return deg * (Math.PI / 180);
    }

    static radiansToDegrees(rad){
        return rad / (Math.PI / 180);
    }

    fromLatLngToPoint(lat, lng){
        var point = {x: 0, y: 0};
        point.x = this._pixelOrigin.x + lng * this._pixelsPerLonDegree;

        var siny = Mercator.bound(Math.sin(Mercator.degreesToRadians(lat)), -0.9999,0.9999);

        point.y = this._pixelOrigin.y + 0.5 * Math.log((1 + siny) / (1 - siny)) *- this._pixelsPerLonRadian;

        point.x = (point.x / this.TILE_SIZE) * this.mapWidth;
        point.y = (point.y / this.TILE_SIZE) * this.mapHeight;

        return point;
    }

    fromPointToLatLng(point){
        point.x = (point.x / this.mapWidth) * this.TILE_SIZE;
        point.y = (point.y / this.mapHeight) * this.TILE_SIZE;

        var lng = (point.x - this._pixelOrigin.x) / this._pixelsPerLonDegree;

        var latRadians = (point.y - this._pixelOrigin.y) / - this._pixelsPerLonRadian;

        var lat = Mercator.radiansToDegrees(2 * Math.atan(Math.exp(latRadians)) - Math.PI / 2);

        return {latitude: lat, longitude: lng};
    }
}
```

####Referências e fontes:

* ["List of map projections", Wikipedia](https://en.wikipedia.org/wiki/List_of_map_projections)
* ["Orthographic map projection", Wikipedia](https://en.wikipedia.org/wiki/Orthographic_map_projection)
* ["Orthographic Projection", Manifold Software Limited - 01 Set 2017](https://manifold.net/doc/radian/orthographic_projection.htm)
* ["Orthographic Projection", at kartoweb@itc.nl, 2021](https://kartoweb.itc.nl/geometrics/Map%20projections/body.htm)
* ["How to convert latitude and longitude coordinates into pixel offsets", Dmitriy Suverov, 24 Abr 2020](https://medium.com/@suverov.dmitriy/how-to-convert-latitude-and-longitude-coordinates-into-pixel-offsets-8461093cb9f5)
* ["Convert latitude/longitude point to a pixels (x,y) on mercator projection", stackoverflow, 27 Jan 2022](https://stackoverflow.com/questions/14329691/convert-latitude-longitude-point-to-a-pixels-x-y-on-mercator-projection)