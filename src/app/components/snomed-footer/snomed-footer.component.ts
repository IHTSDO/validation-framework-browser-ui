import { Component, OnInit } from '@angular/core';
import {ModalService} from '../../services/modal/modal.service';

@Component({
    selector: 'app-snomed-footer',
    templateUrl: './snomed-footer.component.html',
    styleUrls: ['./snomed-footer.component.scss']
})
export class SnomedFooterComponent implements OnInit {

    year: number = new Date().getFullYear();
    constructor(public modalService: ModalService) {
    }

    ngOnInit() {
    }

}
