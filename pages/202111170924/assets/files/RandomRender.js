class RandomRender{
    constructor(width, height, resolution){
        this.width = 256;
        this.height = 256;

        this.update_size(width, height);

        this._animationFrame;

        this._lastCalledTime = Date.now();
        this.fps = 0;
        this.averageFps = 20;

        this.resolution = 0.4;

        this.onPixel = function(){return;};
        this.onRender = function(){return;};

        this.update_resolution(resolution);

        //this.init();
    }

    update_fps(){
        let delta = (Date.now() - this.lastCalledTime)/1000;
        this.lastCalledTime = Date.now();
        this.fps = 1/delta;

        let _resolution = this.resolution * 0.05;

        if(this.fps > this.averageFps){
            this.resolution += _resolution;
        }else if(this.fps < this.averageFps){
            this.resolution -= _resolution;
        }

        this.update_resolution(this.resolution);

        return this.fps;
    }

    update_size(width, height){
        this.width = typeof width === "number" ? width : 256;
        this.height = typeof height === "number" ? height : 256;
    }

    update_resolution(resolution){
        resolution = typeof resolution === "number" ? resolution : 0.4;
        this.resolution = Math.max(0.05, Math.min(1, resolution));
    }

    init(){
        window.cancelAnimationFrame(this._animationFrame);
        this.render();
    }

    render(){
        for(let i=0; i<(this.width*this.height)*this.resolution; i++){
            let [x, y] = this.random_pixel();
            if(typeof this.onPixel === "function"){
                this.onPixel(x, y, this.pixelToIndex(x, y));
            }
        }

        if(typeof this.onRender === "function"){
            this.onRender(this.fps, this.resolution);
        }

        this.update_fps();

        this._animationFrame = window.requestAnimationFrame(()=>{this.render();});
    }

    pixelToIndex(x, y){
        return y * (this.width * 4) + x * 4;
    }

    indexToPixel(i){
        var x = (i / 4) % this.width,
            y = Math.floor((i / 4) / this.width);
        return [x, y];
    }

    normalize_pixel(x, y){
        x = Math.round(x < 0 ? this.width+(x%this.width) : x > this.width ? x%this.width : x);
        y = Math.round(y < 0 ? this.height+(y%this.height) : y > this.height ? y%this.height : y);
        return [x, y];
    }

    random_pixel(){
        let angle = Math.random() * 360;

        let radian = angle * 0.0174532925;

        let radius = Math.random() * (Math.sqrt(this.width**2 + this.height**2));

        let x = (this.width/2)+(radius *  Math.cos(radian)),
            y = (this.height/2)+(radius *  Math.sin(radian));

        return this.normalize_pixel(x, y);
    }
}