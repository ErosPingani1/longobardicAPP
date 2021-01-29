import { ArduinoInfo } from 'src/app/models/arduino-info';

export class Mail {
    arduinoInfo: ArduinoInfo;
    new: boolean;
    id: number;

    constructor(arduinoInfo: ArduinoInfo, id: number) {
        this.arduinoInfo = arduinoInfo;
        this.new = true;
        this.id = id;
    }
}
