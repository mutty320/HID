

//=========================================================================================
//                      globals
//=========================================================================================

const JOYSTICK = 1678;
// const MOUSE = 1267;
const MOUSE = 14648;



//==========================================================================================
//                      enum events
//==========================================================================================


const ACTION = {

    NOTHING: Symbol.for("NOTHING"),

    //====controlled by the 8th Bit====//
    RIGHT_BUTTON_ON_STICK: Symbol.for("RIGHT_JOY_STICK"),
    LEFT_BUTTON_ON_STICK: Symbol.for("LEFT_JOY_STICK"),
    BOTTOM_RIGHT: Symbol.for("TENTH"),
    BOTTOM_LEFT: Symbol.for("NINTH"),

    //====controlled by the 7th Bit====//
    FIRST: Symbol.for("FIRST"),
    SECOND: Symbol.for("SECOND"),
    THIRD: Symbol.for("THIRD"),
    FOURTH: Symbol.for("FOURTH"),
    FIFTH: Symbol.for("FIFTH"),
    SIXTH: Symbol.for("SIXTH"),
    SEVENTH: Symbol.for("SEVENTH"),
    EIGHTH: Symbol.for("EIGHTH"),

    //====controlled by the 6th Bit====//
    ROTATE_RIGHT: Symbol.for("ROTATE_RIGHT"),
    ROTATE_LEFT: Symbol.for("ROTATE_LEFT"),

    //====controlled by the 4th Bit====//
    FRONT: Symbol.for("PUSH_FRONT"),
    BACK: Symbol.for("PUSH_BACK"),

    //====controlled by the 2th Bit====//
    RIGHT: Symbol.for("PUSH_RIGHT"),
    LEFT: Symbol.for("PUSH_LEFT"),

}
Object.freeze(ACTION);



//=========================================================================================
//                      Mapper
//=========================================================================================


const Mapper = class {

    actions = {
        // [ACTION.NOTHING] : ()=>console.log("NOTHING"),
        // [ACTION.ROTATE_RIGHT] : ()=>console.log("ROTATE_RIGHT"),

    };
    prevAction = ACTION.NOTHING;


    on = function (action, func) {
        this.actions[action] = func;
    };

    execute = function (action) {
        if (action !== this.prevAction)
        {
            this.prevAction = action;
            if(this.actions[action] !== undefined)
                this.actions[action]();
        }
    }
};


//
// for (let k = 0; k < 10; k++) {
//     for (let i = 0; i < 1000 * 1000 * 1000; i++);

map = new Mapper();
// map.on(ACTION.NOTHING, ()=>{console.log("NOTHING")})
map.on(ACTION.FIRST, ()=> {console.log("FIRST")})
map.on(ACTION.SECOND, ()=>{console.log("SECOND")})
map.on(ACTION.THIRD, ()=>{console.log("THIRD")})
map.on(ACTION.FOURTH, ()=>{console.log("FOURTH")})
map.on(ACTION.FIFTH, ()=>{console.log("FIFTH")})
map.on(ACTION.SIXTH, ()=>{console.log("SIXTH")})
map.on(ACTION.SEVENTH, ()=>{console.log("SEVENTH")})
map.on(ACTION.EIGHTH, ()=>{console.log("EIGHTH")})
map.on(ACTION.RIGHT_BUTTON_ON_STICK, ()=>{console.log("RIGHT_BUTTON_ON_STICK")})
map.on(ACTION.LEFT_BUTTON_ON_STICK, ()=>{console.log("LEFT_BUTTON_ON_STICK")})
map.on(ACTION.BOTTOM_RIGHT, ()=>{console.log("BOTTOM_RIGHT")})
map.on(ACTION.BOTTOM_LEFT, ()=>{console.log("BOTTOM_LEFT")})
map.on(ACTION.ROTATE_RIGHT, ()=>{console.log("ROTATE_RIGHT")})
map.on(ACTION.ROTATE_LEFT, ()=>{console.log("ROTATE_LEFT")})
map.on(ACTION.FRONT, ()=>{console.log("PUSHED FRONT")})
map.on(ACTION.BACK, ()=>{console.log("PUSHED BACK")})
map.on(ACTION.RIGHT, ()=>{console.log("PUSHED RIGHT")})
map.on(ACTION.LEFT, ()=>{console.log("PUSHED LEFT")})

//
// for (let k of Object.keys(ACTION))
// {
//     console.log("k: " + k )
//     map.on(k, ()=>{console.log(k)})
//     map.execute(ACTION[k]);
// }
//

//=========================================================================================
//                  function findMyDeviceInList(devices)
//=========================================================================================

function findMyDeviceInList(devices){

    if(devices === undefined)
        return null;

    for(let device of devices) {
        if(device.vendorId === JOYSTICK)
            // if(device.vendorId === MOUSE)
            return device;
    }
    return null;
}

//=========================================================================================
//                  function addListeners()
//=========================================================================================
function addListeners() {

    navigator.hid.addEventListener('disconnect', ({device}) => {
        console.log(`HID disconnected: ${device.productName}`);
    });

    navigator.hid.addEventListener('connect', ({device}) => {
        console.log(`HID connected: ${device.productName}`);
    });

}

//=========================================================================================
//                          main()
// =========================================================================================

document.addEventListener('DOMContentLoaded', async () => {

    addListeners();

    var devices = await navigator.hid.getDevices();
    devices.forEach(device => {
        console.log(`HID: ${device.vendorId} ${device.productName} ${device.productId} ${device.opened}`);
    });

    var myDevice = findMyDeviceInList(devices);

    if(!myDevice) {
        let requestButton = document.getElementById("hid-device");
        requestButton.innerHTML = "click here to add a new device";
        requestButton.addEventListener("click", async () => {

            devices = await navigator.hid.requestDevice({filters: []});
            myDevice = findMyDeviceInList(devices);
            myDeviceDetails(myDevice);
        });
    }
    else
        myDeviceDetails(myDevice)

});



window.addEventListener("gamepadconnected", (event) => {

    const first = document.getElementById("firstCinnection").innerHTML;

        if(first === "true"){
            document.getElementById("firstCinnection").innerHTML = "false";
            return;
        }
    let requestButton = document.getElementById("hid-device");
    requestButton.innerHTML = "welcome back! click here to connecting the joystick";


    console.log("A gamepad connected. welcome back!");
    //console.log(event.gamepad);
});

//==========================================================================================
//                          function myDeviceDetails(myDevice)
//==========================================================================================


async function myDeviceDetails(myDevice) {

    if(myDevice === undefined)
        return;


    await myDevice.open();
    console.log(myDevice.vendorId + " is opened?- " + myDevice.opened);


    myDevice.addEventListener("inputreport", event => {
        const {data, device, reportId} = event;

        if (device.productId !== 28 && reportId !== 0) return;//?


        // console.log(new Uint8Array(event.data.buffer));


        // if (value === 0) return;

        //if(value===0)
        // console.log(data.buffer)
        //const someButtons = { 1: "22", 2: "23", 4: "25"};
        // console.log(`User pressed button ${value}.`);


        let action = get_action(data);
        map.execute(action);

    });
}


//==========================================================================================
//          get_event
//==========================================================================================

const get_action = (data) => {

    switch (data.getUint8(7)) {
        case 8:
            return ACTION.RIGHT_BUTTON_ON_STICK
        case 4:
            return ACTION.LEFT_BUTTON_ON_STICK
        case 2:
            return ACTION.BOTTOM_RIGHT
        case 1 :
            return ACTION.BOTTOM_LEFT
    }

    switch (data.getUint8(6)) {
        case 1:
            return ACTION.FIRST
        case 2:
            return ACTION.SECOND
        case 4:
            return ACTION.THIRD
        case 8:
            return ACTION.FOURTH
        case 16:
            return ACTION.FIFTH
        case 32:
            return ACTION.SIXTH
        case 64:
            return ACTION.SEVENTH
        case 128:
            return ACTION.EIGHTH
    }

    switch (data.getUint8(5)) {
        case 1:
            return ACTION.ROTATE_RIGHT
        case 3:
            return ACTION.ROTATE_LEFT
    }

    // switch (data.getUint8(3)) {
    //     case 1:
    //         // console.log(`joystick pushed forward`)
    //         if(data.getUint8(1) == 2 )
    //         return ACTION.FRONT
    //         break
    //     case 3:
    //         // console.log(`joystick pushed backward`)
    //         return ACTION.BACK
    // }
    switch (data.getUint8(3)) {
        case 0:
            return ACTION.FRONT
        case 3:
            return ACTION.BACK
    }

    switch (data.getUint8(1)) {
        case 0:
            return ACTION.LEFT
        case 3:
            return ACTION.RIGHT
        default:
            return ACTION.NOTHING
    }
}
