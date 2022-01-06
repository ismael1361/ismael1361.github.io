/*
https://help.openstreetmap.org/questions/75611/transform-xy-pixel-values-into-lat-and-long

def LatLontoXY(lat_center,lon_center,zoom):
    C =(256/(2*pi) )* 2**zoom

    x=C*(Math.radians(lon_center)+pi)
    y=C*(pi-Math.log( Math.tan(  (pi/4) + Math.radians(lat_center)/2    )  ))

    return x,y

def xy2LatLon(lat_center,lon_center,zoom,width_internal,height_internal,pxX_internal,pxY_internal):

    xcenter,ycenter=LatLontoXY(lat_center,lon_center,zoom)

    xPoint=xcenter- (width_internal/2-pxX_internal)
    ypoint=ycenter -(height_internal/2-pxY_internal)


    C = (256 / (2 * pi)) * 2 ** zoom
    M = (xPoint/C)-pi
    N =-(ypoint/C) + pi

    lon_Point =Math.degrees(M)
    lat_Point =Math.degrees( (Math.atan( Math.e**N)-(pi/4))*2 )

    return lat_Point,lon_Point*/

Math.radians = function(degrees) {
	return degrees * Math.PI / 180;
}

Math.degrees = function(radians) {
	return radians * 180 / Math.PI;
}

var LatLontoXY = (lat_center, lon_center, zoom)=>{
    zoom = typeof zoom !== "number" ? 0 : zoom;
    let C = (256/(2*Math.pi))* 2**zoom;

    let x = C*(Math.radians(lon_center)+Math.pi);
    let y = C*(Math.pi-Math.log(Math.tan((Math.pi/4) + Math.radians(lat_center)/2)));

    return [x, y];
}

var xy2LatLon = (pxX_internal, pxY_internal, width_internal, height_internal, zoom, lat_center, lon_center)=>{
    zoom = typeof zoom !== "number" ? 0 : zoom;
    lat_center = typeof lat_center !== "number" ? 0 : lat_center;
    lon_center = typeof lon_center !== "number" ? 0 : lon_center;

    let [xcenter, ycenter] = LatLontoXY(lat_center, lon_center, zoom);

    let xPoint = xcenter - (width_internal/2-pxX_internal),
        ypoint = ycenter - (height_internal/2-pxY_internal);

    let C = (256 / (2 * Math.pi)) * 2 ** zoom,
        M = (xPoint/C)-Math.pi,
        N = -(ypoint/C) + Math.pi;

    let lon_Point = Math.degrees(M);
    let lat_Point = Math.degrees( (Math.atan( Math.e**N)-(Math.pi/4))*2 );

    return [lat_Point, lon_Point];
}

var [x, y] = LatLontoXY(41.145556, -73.995);
console.log(x, y);

var [lat, lon] = xy2LatLon();
console.log(lat, lon);