//
// cp= (function(x, y, color){
//     function Point() {
//     var obj = {};
//     obj.move = function(dx, dy) {
//         x += dx;
//         y += dy;
//     };
//     obj.toString = function() {
//         return "[Point with x=" + x + " and y=" + y + "]";
//     }
//
//     return obj;
// }
//
// function ColoredPoint() {
//     let obj = Point(x, y);
//     obj.darken = function(tint) {
//         color += tint;
//     };
//     obj.toString = function() {
//         return "[ColoredPoint with x=" + x + ",y=" + y + ",and color=" + color + "]";
//     }
//
//     return obj;
// }
// return{
//     ColoredPoint: ColoredPoint,
//     Point: Point
// }
// })(5,6, 55)
//
//     console.log(cp.ColoredPoint().toString())
//     cp.ColoredPoint().darken(2)
//     console.log(cp.ColoredPoint().toString())
//     cp.Point().move(2,2)
//     console.log(cp.ColoredPoint().toString())
//


const EventEnum = {
    NOTHING : Symbol("NOTHING"),
    ROTATE_RIGHT: Symbol("ROTATE_RIGHT"),
    ROTATE_LEFT:Symbol("ROTATE_LEFT"),
    FIRST: Symbol("FIRST"),
    SECOND :Symbol("SECOND")
}
Object.freeze(EventEnum);



var Mapper= class{
    // findDevice = findMyDeviceInList;
    // listeners = addListeners;
    // deviceDetails = myDeviceDetails;
    eventMap = {
        [EventEnum.NOTHING] : ()=>console.log("NOTHING"),
        [EventEnum.ROTATE_RIGHT] : ()=>console.log("ROTATE_RIGHT"),
        [EventEnum.SECOND] : ()=>console.log("NOT SPECIFIED YET"),
        [EventEnum.ROTATE_LEFT] : ()=>console.log("ROTATE_LEFT"),
        [EventEnum.FIRST] : ()=>console.log("FIRST")
    };

    on = function (eventName, func){
        this.eventMap[eventName] = func;
    };

    prevEvent = EventEnum.NOTHING;
    execute = function (event){

        if(event !== this.prevEvent && this.eventMap[event] !== undefined){
            // console.log("event " + event)

            this.prevEvent = event;
            this.eventMap[event]();
        }
    }
}

map = new Mapper();
map.on(EventEnum.SECOND, ()=>{console.log("SECOND")})
//
// for (let k in EventEnum)
//     if(EventEnum.hasOwnProperty(k))
//         map.execute(EventEnum[k]);


for (let k of Object.keys(EventEnum))
        map.execute(EventEnum[k]);


// Object.keys(EventEnum).forEach((k)=>{console.log("k: " + k); map.execute(k)})
console.log("Object.keys(EventEnum) " + Object.keys(EventEnum));

// map.execute(EventEnum.FIRST)
// map.execute("ROTATE_LEFT")
// map.execute("NOTHING")
// map.execute("SECOND")
// map.execute(EventEnum.SECOND)
// map.execute("ROTATE_RIGHT")


// Object.entries(EventEnum).map(entry => {
//     let key = entry[0];
//     let value = entry[1];
//     console.log(key, value);
// });