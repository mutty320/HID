

/*

 const get_event = (data/!*send the whole array*!/, the_event) =>{
    switch (the_event) {
        case EventEnum.Bit8 :
            return Bit8(data.getUint8(7)/!*the_event*!/)
        case EventEnum.Bit7 :
            return Bit7(data.getUint8(6)/!*the_event*!/)
        case EventEnum.Bit6 :
            return Bit6(data.getUint8(5)/!*the_event*!/)
        case EventEnum.Bit4 :
            return Bit4(data.getUint8(3)/!*the_event*!/)
        case EventEnum.Bit2 :
            return Bit2(data.getUint8(1)/!*the_event*!/)
    }
}
const Bit7 = (data) => {

     switch (data.getUint8(7)) {
           case EventEnum.Bit7.FIRST:
               return value === 1
           case EventEnum.Bit7.SECOND:
               return value === 2
           case EventEnum.Bit7.THIRD:
               return value === 4
           case EventEnum.Bit7.FOURTH:
               return value === 8
           case EventEnum.Bit7.FIFTH:
              return value === 16
           case EventEnum.Bit7.SIXTH:
              return value === 32
           case EventEnum.Bit7.SEVENTH:
              return value === 64
          case EventEnum.Bit7.EIGHTH:
             return value === 128

   }

*/

const EventEnum = {
    NOTHING: Symbol("NOTHING"),

    Bit2: {
        RIGHT: Symbol("PUSH_RIGHT"),
        LEFT: Symbol("PUSH_LEFT")
    },
    Bit4: {
        FRONT: Symbol("PUSH_FRONT"),
        BACK: Symbol("PUSH_BACK")
    },
}


switch (EventEnum.Bit2.RIGHT) {

    case  EventEnum.Bit2:
        console.log(EventEnum.Bit2.RIGHT);

    case  EventEnum.Bit2.RIGHT:
        console.log("how are u");
}