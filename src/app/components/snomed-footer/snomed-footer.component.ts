import { Component, OnInit } from '@angular/core';
import {ModalService} from '../../services/modal/modal.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
    selector: 'app-snomed-footer',
    templateUrl: './snomed-footer.component.html',
    styleUrls: ['./snomed-footer.component.scss'],
    imports: [ModalComponent]
})
export class SnomedFooterComponent implements OnInit {

    year: number = new Date().getFullYear();
    constructor(public modalService: ModalService) {
    }

    ngOnInit() {
    }

}
