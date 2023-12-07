class VisionChecker{
    constructor(config) {
        this.ctx = config.ctx;
        this.width = 352;
	    this.height = 198;
        this.polygons = [];
        this.changed = true;
        this.segments = [];
        this.observer_x = 0;
        this.observer_y = 0;
    }
      setup(){
            this.polygons.push([[-1,-1],[this.width+1,-1],[this.width+1,this.height+1],[-1,this.height+1]]);
            this.polygons.push([[240,240],[260,240],[260,260],[240,260]]);
            this.polygons.push([[240,260],[260,260],[260,280],[240,280]]);
            this.polygons.push([[250,100],[260,140],[240,140]]);
            this.polygons.push([[280,100],[290,60],[270,60]]);
            this.polygons.push([[310,100],[320,140],[300,140]]);
            this.polygons.push([[50,450],[60,370],[70,450]]);
            this.polygons.push([[450,450],[460,370],[470,450]]);
            this.polygons.push([[450,50],[460,30],[470,50]]);
            this.polygons.push([[140,340],[160,240],[180,340],[360,340],[360,360],[250,390],[140,360]]);
            this.polygons.push([[140,140],[150,130],[150,145],[165,150],[160,160],[140,160]]);
            for (var i = 0; i < 20; ++i) {
                this.polygons.push([[240,410+i*4],[245,410+i*4],[245,411+i*4],[240,411+i*4]]);
            }
            this.segments = VisibilityPolygon.convertToSegments(this.polygons);
            this.segments.push([[100, 150],[100, 100]]);
            this.segments.push([[50, 125],[100, 125]]); // intersects
            this.segments.push([[450, 100],[400, 150]]);
            this.segments.push([[450, 150],[400, 100]]); // intersects
            this.segments.push([[50, 250],[100, 250]]);
            this.segments.push([[50, 250],[100, 250]]); // duplicate
            this.segments.push([[140,40],[140,60]]);
            this.segments.push([[140,60],[160,60]]);
            this.segments.push([[160,60],[160,40]]);
            this.segments.push([[160,40],[140,40]]);
            this.segments = VisibilityPolygon.breakIntersections(this.segments);
        };
    
      
      update() {
            if (this.changed) {
                this.ctx.clearRect(0, 0, this.width, this.height);
                this.ctx.beginPath();
                this.ctx.rect(0, 0, this.width, this.height);
                this.ctx.fillStyle = '#666';
                this.ctx.fill();
    
                this.draw(this.ctx);
                this.changed = false;
            }
            requestAnimationFrame(() => {
                this.update();
            });
        };
    
        draw(ctx) {
            var poly = VisibilityPolygon.compute([this.observer_x, this.observer_y], this.segments);
    
            for (var i = 1; i < this.polygons.length; ++i) {
                ctx.beginPath();
                ctx.moveTo(this.polygons[i][0][0], this.polygons[i][0][1]);
                for (var j = 1; j < this.polygons[i].length; ++j) {
                    ctx.lineTo(this.polygons[i][j][0], this.polygons[i][j][1]);
                }
                ctx.fillStyle = "orange";
                ctx.fill();
            }
    
            ctx.beginPath();
            ctx.moveTo(poly[0][0], poly[0][1]);
            for (var i = 1; i < poly.length; ++i) {
                ctx.lineTo(poly[i][0], poly[i][1]);
            }
            ctx.fillStyle = "#aaa";
            ctx.fill();
    
            for (var i = 0; i < this.segments.length; ++i) {
                ctx.beginPath();
                ctx.moveTo(this.segments[i][0][0], this.segments[i][0][1]);
                ctx.lineTo(this.segments[i][1][0], this.segments[i][1][1]);
                ctx.strokeStyle = "black";
                ctx.lineWidth = 2;
                ctx.stroke();
            }
    
            ctx.beginPath();
            ctx.arc(this.observer_x, this.observer_y, 5, 0, Math.PI*2, true);
            ctx.fillStyle = "yellow";
            ctx.fill();
            ctx.strokeStyle = "black";
            ctx.stroke();
        };
      init(){
      }
}