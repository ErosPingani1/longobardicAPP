import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { GetStatusResponse } from '../models/get-status-response';
import { formatDate } from '@angular/common';
import '@capacitor-community/http';
import 'sha1';

@Injectable()

export class MailboxRepository {

    constructor() {}

    public async getDeviceStatus(): Promise<GetStatusResponse> {
        const KEY = '196B5815CDE73CAE5CD7018359B851BBA754F80BB36FB7D50C1650F012496F70';
        const params = [
            formatDate(new Date(), 'dd-MM-yy', 'en-US'),
            new Date().toLocaleTimeString('it-IT', {hour12: false, hour: 'numeric', minute: 'numeric'}),
            ''
        ];
        const sha1 = require('sha1');
        const { Http } = Plugins;
        const response =  await Http.request({
            method: 'GET',
            url: 'http://mansardadipatate.controlliamo.com:9292/getStatus',
            params: {
                date: params[0],
                time: params[1],
                battery: params[2],
                hashkey: sha1(KEY + params[0] + params[1] + params[2])
            }
        });
        return response.data;
    }

}
