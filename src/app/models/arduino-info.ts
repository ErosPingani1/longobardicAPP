export class ArduinoInfo {
    date: string;
    time: string;
    battery: string;

    constructor(date: string, time: string, battery: string) {
        this.date = date;
        this.time = time;
        this.battery = battery;
    }
}
