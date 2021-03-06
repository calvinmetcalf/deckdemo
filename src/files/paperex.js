// Code ported to Paper.js from http://the389.com/9/1/
// with permission.
//I grabed it from paperjs.org

var values = {
    friction: 0.8,
    timeStep: 0.01,
    amount: 15,
    mass: 2,
    count: 0
};
values.invMass = 1 / values.mass;

var path;
var size = view.size * [1.2, 1];

var Spring = Base.extend({
    initialize: function(a, b, param) {
        if (!param)
            param = {};
        this.a = a;
        this.b = b;
        this.restLength = param.restLength || 80;
        this.strength = param.strength ? param.strength : 0.55;
        this.mamb = values.invMass * values.invMass;
    },
    
    update: function() {
        var delta = this.b - this.a;
        var dist = delta.length;
        var normDistStrength = (dist - this.restLength) /
                (dist * (this.mamb)) * this.strength;
        delta.y *= (normDistStrength * values.invMass) / 5;
        if (!this.a.fixed)
            this.a.y += delta.y;
        if (!this.b.fixed)
            this.b.y -= delta.y;
    }
});

onResize();

function createPath(strength) {
    var path = new Path();
    path.data = {};
    path.data.springs = [];
    path.fillColor = 'blue';
    segments = path.segments;
    var previous;
    for (var i = 0; i <= values.amount; i++) {
        var segment = path.add(new Point(i / values.amount, 0.5) * size);
        var point = segment.point;
        point.px = point.x;
        point.py = point.y;
        point.fixed = i === 0 || i == values.amount;
        if (previous) {
            var spring = new Spring(previous, point, {
                strength: strength
            });
            path.data.springs.push(spring);
        }
        previous = point;
    }
    path.position.x -= size.width / 4;
    return path;
}

function onResize() {
    values.count = 0;
    if (path) {
        path.remove();
    }
    size = view.bounds.size * [2, 1];
    path = createPath(0.1);
}

function onMouseMove(event) {
    var segments = path.segments;
    var index = Math.floor((event.point.x + size.width / 4) * segments.length / size.width);
    var y = event.point.y;
    var range = size.height / 4;
    var segment = segments[index];
    var point = segment.point;
    var prev, next;
    if (segment.previous)
        prev = segment.previous.point;
    if (segment.next)
        next = segment.next.point;

    if (!point.fixed && y + range > point.y && y - range < point.y) {
        point.y += (y - point.y) / 6;
        if (prev && !prev.fixed) prev.y += (y - prev.y) / 12;
        if (next && !next.fixed) next.y += (y - next.y) / 12;
    }
}

function onFrame(event) {
    if (values.count != 0) {
        path.firstSegment.remove();
        path.lastSegment.remove();
    }
    updateWave(path);
    values.count++;
}

function updateWave(path) {
    var segments = path.segments;
    var force = 1 - values.friction * values.timeStep * values.timeStep;
    for (var i = 0, l = segments.length; i < l; i++) {
        var point = segments[i].point;
        var ty = point.y;
        var dy = (point.y - point.py) * force;
        point.y += dy;
        point.py = ty;
        point.y = Math.max(0, point.y);
    }

    for (var j = 0, l = path.data.springs.length; j < l; j++) {
        path.data.springs[j].update(true);
    }
    path.smooth();
    path.insert(0, new Point(0, size.height));
    path.add(new Point(size));
}

function onKeyDown(event) {
    if (event.key == 'space')
        path.fullySelected = !path.fullySelected;
}
