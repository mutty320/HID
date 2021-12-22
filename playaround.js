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

//
// for (let k in EventEnum)
//     if(EventEnum.hasOwnProperty(k))
//         map.execute(EventEnum[k]);


// Object.keys(EventEnum).forEach((k)=>{console.log("k: " + k); map.execute(k)})
// console.log("Object.keys(EventEnum) " + Object.keys(EventEnum));

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





const EventEnum = {

    NOTHING: Symbol("NOTHING"),

    //====controlled by the 8th Bit====//
    RIGHT_BUTTON_ON_STICK: Symbol("RIGHT_JOY_STICK"),
    LEFT_BUTTON_ON_STICK: Symbol("LEFT_JOY_STICK"),
    BOTTOM_RIGHT: Symbol("TENTH"),
    BOTTOM_LEFT: Symbol("NINTH"),

    //====controlled by the 7th Bit====//
    FIRST: Symbol("FIRST"),
    SECOND: Symbol("SECOND"),
    THIRD: Symbol("THIRD"),
    FOURTH: Symbol("FOURTH"),
    FIFTH: Symbol("FIFTH"),
    SIXTH: Symbol("SIXTH"),
    SEVENTH: Symbol("SEVENTH"),
    EIGHTH: Symbol("EIGHTH"),

    //====controlled by the 6th Bit====//
    ROTATE_RIGHT: Symbol("ROTATE_RIGHT"),
    ROTATE_LEFT: Symbol("ROTATE_LEFT"),

    //====controlled by the 4th Bit====//
    FRONT: Symbol("PUSH_FRONT"),
    BACK: Symbol("PUSH_BACK"),

    //====controlled by the 2th Bit====//
    RIGHT: Symbol("PUSH_RIGHT"),
    LEFT: Symbol("PUSH_LEFT"),

}
Object.freeze(EventEnum);



//=========================================================================================
//                      Mapper
//=========================================================================================


const Mapper = class {

    eventMap = {
        // [EventEnum.NOTHING] : ()=>console.log("NOTHING"),
        // [EventEnum.ROTATE_RIGHT] : ()=>console.log("ROTATE_RIGHT"),
        // [EventEnum.ROTATE_LEFT] : ()=>console.log("ROTATE_LEFT"),
        // [EventEnum.UP] : ()=>console.log("UP"),
        // [EventEnum.DOWN] : ()=>console.log("DOWN"),
        // [EventEnum.RIGHT] : ()=>console.log("RIGHT"),
        // [EventEnum.LEFT] : ()=>console.log("LEFT"),

    };

    on = function (eventName, func) {
        this.eventMap[eventName] = func;
    };

    prevEvent = EventEnum.NOTHING;
    execute = function (event) {
        console.log("event: " + event.toString() + " prevEvent: " );

        if (event !== this.prevEvent && this.eventMap[event] !== undefined) {
            this.prevEvent = event;
            this.eventMap[event]();
        }
    }
};


map = new Mapper();
map.on(EventEnum.FIRST, ()=>{console.log("FIRST")})
map.on(EventEnum.SECOND, ()=>{console.log("SECOND")})
map.on(EventEnum.THIRD, ()=>{console.log("THIRD")})
map.on(EventEnum.FOURTH, ()=>{console.log("FOURTH")})
map.on(EventEnum.FIFTH, ()=>{console.log("FIFTH")})
map.on(EventEnum.SIXTH, ()=>{console.log("SIXTH")})
map.on(EventEnum.SEVENTH, ()=>{console.log("SEVENTH")})
map.on(EventEnum.EIGHTH, ()=>{console.log("EIGHTH")})

for (let k of Object.keys(EventEnum))
{
    // console.log("k: " + EventEnum[k].toString())
    map.execute(EventEnum[k]);
    map.execute(EventEnum[k]);
}
t= function (){ return Symbol.for("a") === Symbol("a")}
console.log("test " + t())
