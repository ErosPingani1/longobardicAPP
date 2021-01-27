export class ArduinoInfo {
    date: string;
    time: string;
    battery: string;
    location: string;

    constructor(date: string, time: string, battery: string, location: string) {
        this.date = date;
        this.time = time;
        this.battery = battery;
        this.location = location;
    }
}
