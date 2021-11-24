
cp= (function(x, y, color){
    function Point() {
    var obj = {};
    obj.move = function(dx, dy) {
        x += dx;
        y += dy;
    };
    obj.toString = function() {
        return "[Point with x=" + x + " and y=" + y + "]";
    }

    return obj;
}

function ColoredPoint() {
    let obj = Point(x, y);
    obj.darken = function(tint) {
        color += tint;
    };
    obj.toString = function() {
        return "[ColoredPoint with x=" + x + ",y=" + y + ",and color=" + color + "]";
    }

    return obj;
}
return{
    ColoredPoint: ColoredPoint,
    Point: Point
}
})(5,6, 55)

    console.log(cp.ColoredPoint().toString())
    cp.ColoredPoint().darken(2)
    console.log(cp.ColoredPoint().toString())
    cp.Point().move(2,2)
    console.log(cp.ColoredPoint().toString())

