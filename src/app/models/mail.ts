import { ArduinoInfo } from 'src/app/models/arduino-info';

export class Mail {
    arduinoInfo: ArduinoInfo;
    new: boolean;

    constructor(arduinoInfo: ArduinoInfo) {
        this.arduinoInfo = arduinoInfo;
        this.new = true;
    }
}
