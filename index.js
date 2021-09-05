var dateCurrent = new Date();
var correction = dateCurrent.getTimezoneOffset() * 60 * 1000;
// var now = Date.now();
// var corrected_now = correction + now;
// var from = corrected_now - 3600;

var from = Number(localStorage.getItem('time'));
console.log(localStorage.getItem("tree_dict_arr"));
var edge = JSON.parse(localStorage.getItem("tree_dict_arr"));
console.log(edge);
var nodes = new vis.DataSet();
id_list = [];
for (var i of edge) {
    console.log(i);
    if(i["favicon"]!=undefined){
        var node = { id: i["to"], label: i["title"], url: i["to"] ,image: i["favicon"], shape:"image"};
    }else{
        var node = { id: i["to"], label: i["title"], url: i["to"] ,image: "https://www.google.co.jp/favicon.ico", shape:"image"};
    } 
    console.log(node); 
    if(!id_list.includes(node["id"])){
        nodes.add(node);
        id_list.push(node["id"]);
    }
    
}



//var nodes = new vis.DataSet([
//
//    {id: 1, label: 'URL',url: "https://visjs.github.io/vis-data/data/index.html"},
//    { id: 2, label: 'B', url: "https://miro.com/app/board/o9J_l0feEak=/"},
//    {id: 3, label: 'C' },
//    {id: 4, label: 'D' },
//    {id: 5, label: 'E' },
//    {id: 6, label: 'F' },
//    {id: 7, label: 'G' },
//    {id: 8, label: 'H' },
//]);

// var edges = new vis.DataSet([
//    {from: 1, to: 2, arrows: 'to' },
//    {from: 1, to: 3, arrows: 'to' },
//    {from: 3, to: 4, arrows: 'to' },
//    {from: 6, to: 1, arrows: 'to' },
//    {from: 7, to: 8, arrows: 'to' },
//    {from: 8, to: 7, arrows: 'to' },
// ]);
var edges = new vis.DataSet(edge);
var container = $('#network')[0];
var data = {
    nodes: nodes,
    edges: edges
};
var options = {
    //physics: false,
    size: 20,
    edges: {
        length: 500,
        shadow: true,
    }

};
var network = new vis.Network(container, data, options);

network.on("click", function (params) {
    if (params.nodes.length == 1) {
        var nodeId = params.nodes[0];
        var node = nodes.get(nodeId);
        window.open(node.url, '_blank');
    }
});

var Canvas = document.getElementById('canvas');
var ctx = Canvas.getContext('2d');

var resize = function() {
    Canvas.width = Canvas.clientWidth;
    Canvas.height = Canvas.clientHeight;
};
window.addEventListener('resize', resize);
resize();

var elements = [];
var presets = {};

presets.o = function (x, y, s, dx, dy) {
    return {
        x: x,
        y: y,
        r: 12 * s,
        w: 5 * s,
        dx: dx,
        dy: dy,
        draw: function(ctx, t) {
            this.x += this.dx;
            this.y += this.dy;
            
            ctx.beginPath();
            ctx.arc(this.x + + Math.sin((50 + x + (t / 10)) / 100) * 3, this.y + + Math.sin((45 + x + (t / 10)) / 100) * 4, this.r, 0, 2 * Math.PI, false);
            ctx.lineWidth = this.w;
            ctx.strokeStyle = '#fff';
            ctx.stroke();
        }
    }
};

presets.x = function (x, y, s, dx, dy, dr, r) {
    r = r || 0;
    return {
        x: x,
        y: y,
        s: 20 * s,
        w: 5 * s,
        r: r,
        dx: dx,
        dy: dy,
        dr: dr,
        draw: function(ctx, t) {
            this.x += this.dx;
            this.y += this.dy;
            this.r += this.dr;
            
            var _this = this;
            var line = function(x, y, tx, ty, c, o) {
                o = o || 0;
                ctx.beginPath();
                ctx.moveTo(-o + ((_this.s / 2) * x), o + ((_this.s / 2) * y));
                ctx.lineTo(-o + ((_this.s / 2) * tx), o + ((_this.s / 2) * ty));
                ctx.lineWidth = _this.w;
                ctx.strokeStyle = c;
                ctx.stroke();
            };
            
            ctx.save();
            
            ctx.translate(this.x + Math.sin((x + (t / 10)) / 100) * 5, this.y + Math.sin((10 + x + (t / 10)) / 100) * 2);
            ctx.rotate(this.r * Math.PI / 180);
            
            line(-1, -1, 1, 1, '#fff');
            line(1, -1, -1, 1, '#fff');
            
            ctx.restore();
        }
    }
};

for(var x = 0; x < Canvas.width; x++) {
    for(var y = 0; y < Canvas.height; y++) {
        if(Math.round(Math.random() * 8000) == 1) {
            var s = ((Math.random() * 5) + 1) / 10;
            if(Math.round(Math.random()) == 1)
                elements.push(presets.o(x, y, s, 0, 0));
            else
                elements.push(presets.x(x, y, s, 0, 0, ((Math.random() * 3) - 1) / 10, (Math.random() * 360)));
        }
    }
}

setInterval(function() {
    ctx.clearRect(0, 0, Canvas.width, Canvas.height);

    var time = new Date().getTime();
    for (var e in elements)
    elements[e].draw(ctx, time);
}, 10);