class Mercator{
    constructor(mapURL, resolve, reject){
        this.mapWidth = 256;
        this.mapHeight = 256;

        this.TILE_SIZE = 256;
        this._pixelOrigin = {x: (this.TILE_SIZE/2.0), y: (this.TILE_SIZE/2.0)};
        this._pixelsPerLonDegree = this.TILE_SIZE / 360.0;
        this._pixelsPerLonRadian = this.TILE_SIZE / (2 * Math.PI);

        this.imageData = [];

        if(mapURL && typeof mapURL === "string"){
            this.updateMap(mapURL).then(resolve).catch(reject);
        }else if(typeof resolve === "function"){
            resolve(this);
        }
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

    updateMap(mapURL){
        return new Promise((resolve, reject)=>{
            this.mapURL = mapURL;

            let img = new Image();

            img.onload = ()=>{
                let can = document.createElement("canvas"),
                    ctx = can.getContext("2d");
                can.width = this.mapWidth = img.width;
                can.height = this.mapHeight = img.height;

                ctx.drawImage(img, 0, 0);

                let img_data = ctx.getImageData(0, 0, can.width, can.height);
                this.imageData = img_data.data;
                resolve(this);
            }

            img.onerror = reject;
         
            img.crossOrigin = "Anonymous";
            img.src = mapURL;
        });
    }

    fromLatLngToPoint(lat, lng){
        var point = {x: 0, y: 0};
        point.x = this._pixelOrigin.x + lng * this._pixelsPerLonDegree;

        var siny = Mercator.bound(Math.sin(Mercator.degreesToRadians(lat)), -0.9999,0.9999);

        point.y = this._pixelOrigin.y + 0.5 * Math.log((1 + siny) / (1 - siny)) *- this._pixelsPerLonRadian;

        point.x = (point.x / this.TILE_SIZE) * this.mapWidth;
        point.y = (point.y / this.TILE_SIZE) * this.mapHeight;

        return [point.x, point.y];
    }

    fromPointToLatLng(x, y){
        x = ((x % this.mapWidth) / this.mapWidth) * this.TILE_SIZE;
        y = ((y % this.mapHeight) / this.mapHeight) * this.TILE_SIZE;

        var lng = (x - this._pixelOrigin.x) / this._pixelsPerLonDegree;

        var latRadians = (y - this._pixelOrigin.y) / - this._pixelsPerLonRadian;

        var lat = Mercator.radiansToDegrees(2 * Math.atan(Math.exp(latRadians)) - Math.PI / 2);

        return [lat, lng];
    }

    getPickerPoint(x, y){
        let index = (Math.floor(y) * this.mapWidth + Math.floor(x)) * 4,
            r = this.imageData[index + 0],
            g = this.imageData[index + 1],
            b = this.imageData[index + 2],
            a = this.imageData[index + 3];
        return [r, g, b, a];
    }

    getPicker(lat, lng){
        return this.getPickerPoint.apply(this, this.fromLatLngToPoint(lat, lng));
    }
}

/*var m = new Mercator();

var [x, y] = m.fromLatLngToPoint(41.145556, -73.995);
console.log(x, y);

var [lat, lon] = m.fromPointToLatLng();
console.log(lat, lon);*/