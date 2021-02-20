import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Observable, of } from 'rxjs';
import '@capacitor-community/http';

@Injectable()

export class MailboxRepository {

    constructor() {}

    public getDeviceStatus(): Observable<any> {
        const { Http } = Plugins;
        return of(Http.request({
            method: 'GET',
            url: 'http://mansardadipatate.controlliamo.com:9292/getStatus',
            params: {
                date: '21-10-96',
                time: '12:42',
                battery: '25',
                hashkey: '992C1F951500665688AF264231D063A83B5B2C51'
            }
        }));
    }

}
