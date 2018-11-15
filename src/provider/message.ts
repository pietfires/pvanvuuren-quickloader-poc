import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import {salesOrderModel} from '../models/salesOrder'

@Injectable({ providedIn: 'root' })
export class MessageService {
    private subject = new Subject<salesOrderModel>();


    sendMessage(order:salesOrderModel) {
        this.subject.next(order);
    }

    clearMessage() {
        this.subject.next(new salesOrderModel('',0,0));
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable()
    }
}