document.addEventListener('DOMContentLoaded', async () => {
    console.log("started");

    const devices = await navigator.hid.getDevices();

    console.log(devices)

    devices.forEach(device => {

        console.log(`HID: ${device.vendorId} ${device.productName} ${device.productId}`);
    });


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

        // let devic = HIDDevice;
        // devic.vendorId=1678;
        // devic.productId=28;
        // devic.productName ="AXIS 295 VIDEO SURVEILLANCE JOYSTICK";
        // devic.collections.pars
        // let hid = await navigator.hid.getDevices(devic);
        // console.log(`fff ${devic}`)
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


            const value = data.getUint8(7);

            // Bit8(data.getUint8(7))
            // Bit7(data.getUint8(6))
            // Bit6(data.getUint8(5))
            // Bit4(data.getUint8(3))
            // Bit2(data.getUint8(1))

           // console.log(new Uint8Array(event.data.buffer));

            // if (value === 0) return;

            //if(value===0)
            console.log(value)
            //  const someButtons = { 1: "22", 2: "23", 4: "25"};
            //  console.log(`User pressed button ${value}.`);
        });
        navigator.hid.addEventListener("disconnect", ({device}) => {
            console.log(`was disconnected`);
        });

        const Bit8 = (value) => {
            if (value === 8)
                console.log(`right button was pressed on joystick`)
            if (value === 4)
                console.log(`left button was pressed on joystick`)
            if (value === 2)
                console.log(`bottom right button was pressed`)
            if (value === 1)
                console.log(`bottom left button was pressed`)
        }

        const Bit7 = (value) => {
            if (value === 1)
                console.log(`top left button was pressed`)
            if (value === 2)
                console.log(`top right button was pressed`)
            if (value === 4)
                console.log(`3ed button was pressed`)
            if (value === 8)
                console.log(`4th button was pressed`)
            if (value === 16)
                console.log(`5th button was pressed`)
            if (value === 32)
                console.log(`6th button was pressed`)
            if (value === 64)
                console.log(`7th button was pressed`)
            if (value === 128)
                console.log(`8th button was pressed`)
        }
        const Bit6 = (value) => {
            if (value === 0)
                console.log(`joystick turned to the right`)
            if (value === 3)
                console.log(`joystick turned to the left`)

        }
        const Bit4 = (value) => {
            if (value === 0)
                console.log(`joystick pushed forward`)
            if (value === 3)
                console.log(`joystick pushed backward`)

        }
        const Bit2 = (value) => {
            if (value === 0)
                console.log(`joystick pushed left`)
            if (value === 3)
                console.log(`joystick pushed right`)

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
    });










    //
    //
    //
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































    //
    // let devices = await navigator.hid.requestDevice({filters: []});
    // // let devices = await navigator.hid.getDevices();
    // console.log("devices: ", devices);
    // if(!navigator.hid)
    //     console.log("hid = null");
    // devices.forEach(device => {
    //
    //     console.log(`HID: ${device.productName}`);
    // });
});

;
// let deviceFilter = { vendorId: 1678, productId: 28 };
// let requestParams = { filters: [deviceFilter] };
// let outputReportId = 0x01;
// let outputReport = new Uint8Array([42]);
//
//
//
//
//
//
// const filters = [
//     {
//         vendorId: 1678, // Nintendo Co., Ltd
//         productId: 28 // Joy-Con Left
//     },
//     {
//         vendorId: 1678, // Nintendo Co., Ltd
//         productId: 28 // Joy-Con Right
//     }
// ];
//
// // Prompt user to select a Joy-Con device.
// const foo = async()=> {
//     const [device] = await navigator.hid.requestDevice({filters});
//     consolw.log([device])
// }

/*
// hid_service.cc:131 HID device added: vendorId=1678, productId=28, name='AXIS 295 VIDEO SURVEILLANCE JOYSTICK', serial='', deviceIds=[\\?\hid#vid_068e&pid_001c#6&37d30c0&0&0000#{4d1e55b2-f16f-11cf-88cb-001111000030}']
//
// usb_service_win.cc:716 USB device added: path=\\?\usb#vid_068e&pid_001c#5&308245f6&0&2#{a5dcbf10-6530-11d2-901f-00c04fb951ed} vendor=1678 "CH PRODUCTS", product=28 "AXIS 295 VIDEO SURVEILLANCE JOYSTICK", serial="", driver="HidUsb", guid=574569c3-cf2a-475f-9af7-36b97cfa4639
//
// usb_service_win.cc:258 Failed to get device driver name: Element not found. (0x490)

function handleConnectedDevice(e) {
    console.log("Device connected: " + e.device.productName);
}

function handleDisconnectedDevice(e) {
    console.log("Device disconnected: " + e.device.productName);
}

function handleInputReport(e) {
    console.log(e.device.productName + ": got input report " + e.reportId);
    console.log(new Uint8Array(e.data.buffer));
}

navigator.hid.addEventListener("connect", handleConnectedDevice);
navigator.hid.addEventListener("disconnect", handleDisconnectedDevice);

navigator.hid.requestDevice(requestParams).then((devices) => {
    if (devices.length == 0) return;
    devices[0].open().then(() => {
        console.log("Opened device: " + device.productName);
        device.addEventListener("inputreport", handleInputReport);
        device.sendReport(outputReportId, outputReport).then(() => {
            console.log("Sent output report " + outputReportId);
        });
    });
});

partial
interface
Navigator
{
    readonly
    attribute
    HID
    hid;
};


interface
HID : EventTarget
{
    attribute
    EventHandler
    onconnect;
    attribute
    EventHandler
    ondisconnect;
    Promise<sequence<HIDDevice>> getDevices();
    Promise<sequence<HIDDevice>> requestDevice(HIDDeviceRequestOptions, options);
};

interface
HIDConnectionEvent : Event
{
    readonly
    attribute
    HIDDevice
    device;
}

interface
HIDInputReportEvent : Event
{
    readonly
    attribute
    HIDDevice
    device;
    readonly
    attribute
    octet
    reportId;
    readonly
    attribute
    DataView
    data;
};

dictionary
HIDDeviceRequestOptions
{
    required
    sequence<HIDDeviceFilter> filters;
};

dictionary
HIDDeviceFilter
{
    unsigned
    long
    vendorId;
    unsigned
    short
    productId;
    unsigned
    short
    usagePage;
    unsigned
    short
    usage;
};


interface
HIDDevice
{
    attribute
    EventHandler
    oninputreport;
    readonly
    attribute
    boolean
    opened;
    readonly
    attribute
    unsigned
    short
    vendorId;
    readonly
    attribute
    unsigned
    short
    productId;
    readonly
    attribute
    DOMString
    productName;
    readonly
    attribute
    FrozenArray<HIDCollectionInfo> collections;

    /!*Promise<void> open();
    Promise<void> close();
    Promise<void> sendReport([EnforceRange] octet reportId, BufferSource data);
    Promise<void> sendFeatureReport([EnforceRange] octet reportId, BufferSource data);*!/
    Promise<DataView> receiveFeatureReport([EnforceRange],octet,reportId);
};


interface
HIDCollectionInfo
{
    readonly
    attribute
    unsigned
    short
    usagePage;
    readonly
    attribute
    unsigned
    short
    usage;
    readonly
    attribute
    octet
    type;
    readonly
    attribute
    FrozenArray<HIDCollectionInfo> children;
    readonly
    attribute
    FrozenArray<HIDReportInfo> inputReports;
    readonly
    attribute
    FrozenArray<HIDReportInfo> outputReports;
    readonly
    attribute
    FrozenArray<HIDReportInfo> featureReports;
};

interface
HIDReportInfo
{
    readonly
    attribute
    octet
    reportId;
    readonly
    attribute
    FrozenArray <HIDReportItem> items;
};
// enum HIDUnitSystem
// {
//     // No unit system in use.
//     "none",
//         // Centimeter, gram, seconds, kelvin, ampere, candela.
//         "si-linear",
//         // Radians, gram, seconds, kelvin, ampere, candela.
//         "si-rotation",
//         // Inch, slug, seconds, Fahrenheit, ampere, candela.
//         "english-linear",
//         // Degrees, slug, seconds, Fahrenheit, ampere, candela.
//         "english-rotation",
//         "vendor-defined",
//         "reserved"
// };
//
// interface
// HIDReportItem
// {
//     readonly
//     attribute
//     boolean
//     isAbsolute;
//     readonly
//     attribute
//     boolean
//     isArray;
//     readonly
//     attribute
//     boolean
//     isBufferedBytes;
//     readonly
//     attribute
//     boolean
//     isConstant;
//     readonly
//     attribute
//     boolean
//     isLinear;
//     readonly
//     attribute
//     boolean
//     isRange;
//     readonly
//     attribute
//     boolean
//     isVolatile;
//     readonly
//     attribute
//     boolean
//     hasNull;
//     readonly
//     attribute
//     boolean
//     hasPreferredState;
//     readonly
//     attribute
//     boolean
//     wrap;
//     readonly
//     attribute
//     FrozenArray<unsignedlong> usages;
//     readonly
//     attribute
//     unsignedlong
//     usageMinimum;
//     readonly
//     attribute
//     unsignedlong
//     usageMaximum;
//     readonly
//     attribute
//     unsignedshort
//     reportSize;
//     readonly
//     attribute
//     unsignedshort
//     reportCount;
//     readonly
//     attribute
//     byte
//     unitExponent;
//     readonly
//     attribute
//     HIDUnitSystem
//     unitSystem;
//     readonly
//     attribute
//     byte
//     unitFactorLengthExponent;
//     readonly
//     attribute
//     byte
//     unitFactorMassExponent;
//     readonly
//     attribute
//     byte
//     unitFactorTimeExponent;
//     readonly
//     attribute
//     byte
//     unitFactorTemperatureExponent;
//     readonly
//     attribute
//     byte
//     unitFactorCurrentExponent;
//     readonly
//     attribute
//     byte
//     unitFactorLuminousIntensityExponent;
//     readonly
//     attribute
//     long
//     logicalMinimum;
//     readonly
//     attribute
//     long
//     logicalMaximum;
//     readonly
//     attribute
//     long
//     physicalMinimum;
//     readonly
//     attribute
//     long
//     physicalMaximum;
//     readonly
//     attribute
//     FrozenArray<DOMString> strings;
// };*/
