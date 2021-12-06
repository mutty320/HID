document.addEventListener('DOMContentLoaded', async () => {
    console.log("started");


    navigator.hid.addEventListener("connect", ({device}) => {
        console.log(`was connected`);
    });

    // const devices = await navigator.hid.getDevices();
    //
    // console.log(devices)
    //
    // devices.forEach(device => {
    //
    //     console.log(`HID: ${device.vendorId} ${device.productName} ${device.productId}`);
    //
    // });


    let requestButton = document.getElementById("hid-device");
    requestButton.addEventListener("click", async () => {

        let device = await navigator.hid.requestDevice({filters: [{vendorId: 1678, productId: 28}]});
        if (!device) {
            console.log("No device was selected.");
        } else {
            // console.log(`HID: ${device[0].vendorId}`);
            // console.log("HID:", device[0].productName);
        }


//=========================================================================================

        //navigator.hid
        // device[0].addEventListener("connect", event => {
        //     // Automatically open event.device or warn user a device is available.
        //     console.log(`the: ${device[0].productName}  was conected`);
        // });

        // navigator.hid.addEventListener("disconnect", event => {
        //     // Remove |event.device| from the UI.
        // });
//==========================================================================================


        device[0].addEventListener('connect', () => {
            console.log(`HID connected: ${devic.productName}`);
        });
        // function handleConnectedDevice(e) {
        //     console.log("Device connected: " + e.device.productName);
        // }
        // navigator.hid.addEventListener("connect", handleConnectedDevice);

        await device[0].open();


        for (let collection of device[0].collections) {
            // A HID collection includes usage, usage page, reports, and subcollections.
            console.log(`Usage: ${collection.usage}`);
            console.log(`Usage page: ${collection.usagePage}`);

            for (let inputReport of collection.inputReports) {

                console.log(`Input report: ${inputReport.reportId}`);
                // Loop through inputReport.items
            }
        }


        device[0].addEventListener("inputreport", event => {
            const {data, device, reportId} = event;

            if (device.productId !== 28 && reportId !== 0) return;

            console.log(data.getUint8(0));

            //console.log(new Uint8Array(event.data.buffer));
            //=================================================================
            let x = get_event(event)
            console.log("retuend value = " + x.toString())
            //=================================================================

        });
        // navigator.hid.addEventListener("disconnect", ({device}) => {
        //     console.log(`was disconnected`);
        // });


        const get_event = (event/*send the whole array*/) => {

            const {data, device, reportId} = event

            switch (data.getUint8(7)) {
                case 8:
                    console.log(`right button was pressed on joystick`)
                    return EventEnum.RIGHT_BUTTON_ON_STICK
                case 4:
                    console.log(`left button was pressed on joystick`)
                    return EventEnum.LEFT_BUTTON_ON_STICK
                case 2:
                    console.log(`bottom right button was pressed`)
                    return EventEnum.BOTTOM_RIGHT
                case 1 :
                    console.log(`bottom left button was pressed`)
                    return EventEnum.BOTTOM_LEFT
            }

            switch (data.getUint8(6)) {
                case 1:
                    console.log(`top left button was pressed`)
                    return EventEnum.FIRST
                case 2:
                    console.log(`top right button was pressed`)
                    return EventEnum.SECOND
                case 4:
                    console.log(`3ed button was pressed`)
                    return EventEnum.THIRD
                case 8:
                    console.log(`4th button was pressed`)
                    return EventEnum.FOURTH
                case 16:
                    console.log(`5th button was pressed`)
                    return EventEnum.FIFTH
                case 32:
                    console.log(`6th button was pressed`)
                    return EventEnum.SIXTH
                case 64:
                    console.log(`7th button was pressed`)
                    return EventEnum.SEVENTH
                case 128:
                    console.log(`8th button was pressed`)
                    return EventEnum.EIGHTH

            }

                 switch (data.getUint8(5)) {
                     case 0:
                         console.log(`joystick turned to the right`)
                         return EventEnum.ROTATE_RIGHT
                     case 3:
                         console.log(`joystick turned to the left`)
                         return EventEnum.ROTATE_LEFT
                 }

                  switch (data.getUint8(3)) {
                      case 0:
                          console.log(`joystick pushed forward`)
                          return EventEnum.FRONT
                      case 3:
                          console.log(`joystick pushed backward`)
                          return EventEnum.BACK
                  }

               switch (data.getUint8(1)) {
                   case 0:
                       console.log(`joystick pushed left`)
                       return EventEnum.LEFT
                   case 3:
                       console.log(`joystick pushed right`)
                       return EventEnum.RIGHT
               }
            //======================================================================================
            // device.oninputreport = ({device, reportId, data}) => {
            //     console.log(`Input report ${reportId} from ${device.productName}:`,
            //         new Uint8Array(data.buffer));
            // };
            // }


//}


            // let devices = await navigator.hid.getDevices();
            // devices.forEach(device => {
            //     console.log(`HID: ${device.productName}`);
            // });

            // devices[0].oninputreport = ({device, reportId, data}) => {
            //     console.log(`Input report ${reportId} from ${device.productName}:`,
            //         new Uint8Array(data.buffer));
            // };

        }
   });



});

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

    // static Summer = new Season("summer")
    // let season = Season.Summer


    // /*let deviceFilter = { vendorId: 1678, productId: 28 };
    // let requestParams = { filters: [deviceFilter] };
    // let outputReportId = 0x01;
    // let outputReport = new Uint8Array([42]);
    //
    // function handleConnectedDevice(e) {
    //     console.log("Device connected: " + e.device.productName);
    // }
    //
    // function handleDisconnectedDevice(e) {
    //     console.log("Device disconnected: " + e.device.productName);
    // }
    //
    // function handleInputReport(e) {
    //     console.log(e.device.productName + ": got input report " + e.reportId);
    //     console.log(new Uint8Array(e.data.buffer));
    // }
    //
    // navigator.hid.addEventListener("connect", handleConnectedDevice);
    // navigator.hid.addEventListener("disconnect", handleDisconnectedDevice);
    //
    // navigator.hid.requestDevice(requestParams).then((devices) => {
    //     if (devices.length == 0) return;
    //     devices[0].open().then(() => {
    //         console.log("Opened device: " + device.productName);
    //         device.addEventListener("inputreport", handleInputReport);
    //         device.sendReport(outputReportId, outputReport).then(() => {
    //             console.log("Sent output report " + outputReportId);
    //         });
    //     });*/
    //































