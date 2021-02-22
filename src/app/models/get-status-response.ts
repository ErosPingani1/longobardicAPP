import { ArduinoInfo } from './arduino-info';

export class GetStatusResponse {
    status: string;
    message: string;
    arduinoInfo: ArduinoInfo;
}