import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Account, AccountService, LoginModalService } from 'app/core';
import { ProjectService } from 'app/entities/project';
import { Project } from 'app/shared/model/project.model';
import { FinancialProjectService } from 'app/entities/financial-project';
import { FinancialProjectType } from 'app/shared/model/financial-project.model';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.css']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    projects: Project[] = [];
    FinancialProjectType = FinancialProjectType;
    _data = [
        {
            pID: 1,
            pName: 'Define Chart API',
            pStart: '',
            pEnd: '',
            pPlanStart: '',
            pPlanEnd: '',
            pClass: 'ggroupblack',
            pLink: '',
            pMile: 0,
            pRes: 'Mario',
            pComp: 0,
            pGroup: 1,
            pParent: 0,
            pOpen: 1,
            pDepend: '',
            pCaption: '',
            pNotes: 'Some Notes text',
            category: 'Planning',
            sector: 'CMO'
        },
        {
            pID: 11,
            pName: 'Chart Object',
            pStart: '2019-06-20',
            pEnd: '2019-07-20',
            pClass: 'gmilestone',
            pLink: '',
            pMile: 1,
            pRes: 'Henrique',
            pComp: 100,
            pGroup: 0,
            pParent: 1,
            pOpen: 1,
            pDepend: '',
            pCaption: '',
            pNotes: '',
            category: 'Executive',
            sector: 'CEO'
        },
        {
            pID: 12,
            pName: 'Task Objects',
            pStart: '',
            pEnd: '',
            pClass: 'ggroupblack',
            pLink: '',
            pMile: 0,
            pRes: 'Henrique',
            pComp: 40,
            pGroup: 1,
            pParent: 1,
            pOpen: 1,
            pDepend: '',
            pCaption: '',
            pNotes: ''
        },
        {
            pID: 121,
            pName: '<a href=yahoo.com>Constructor Proc #1234 of February 2019</a>',
            pStart: '2019-06-21',
            pEnd: '',
            pClass: 'gtaskblue',
            pLink: '',
            pMile: 0,
            pRes: 'Pedro',
            pComp: 60,
            pGroup: 0,
            pParent: 12,
            pOpen: 1,
            pDepend: '',
            pCaption: '',
            pNotes: '',
            pDuration: '3 days',
            deadline: '2019-07-01'
        },
        {
            pID: 122,
            pName: 'Task Variables',
            pStart: '2019-07-06',
            pEnd: '2019-07-11',
            pPlanStart: '2019-07-03',
            pPlanEnd: '2019-07-09',
            pClass: 'gtaskred',
            pLink: '',
            pMile: 0,
            pRes: 'Mario John Silva',
            pComp: 60,
            pGroup: 0,
            pParent: 12,
            pOpen: 1,
            pDepend: 121,
            pCaption: '',
            pNotes: '',
            deadline: '2019-07-10'
        },
        {
            pID: 123,
            pName: 'Task by Minute/Hour',
            pStart: '2019-07-01',
            pEnd: '2019-07-15 12:00',
            pClass: 'gtaskyellow',
            pLink: '',
            pMile: 0,
            pRes: 'Mario',
            pComp: 60,
            pGroup: 0,
            pParent: 12,
            pOpen: 1,
            pDepend: '',
            pCaption: '',
            pNotes: '',
            pCost: 1000
        },
        {
            pID: 124,
            pName: 'Test Plan End',
            pStart: '2019-07-09',
            pEnd: '2019-07-29',
            pPlanStart: '2019-07-09',
            pPlanEnd: '2019-09-29',
            pClass: 'gtaskred',
            pLink: '',
            pMile: 0,
            pRes: 'Anyone',
            pComp: 60,
            pGroup: 0,
            pParent: 12,
            pOpen: 1,
            pDepend: '123SS',
            pCaption: 'This is a caption',
            pNotes: null,
            pCost: 34,
            deadline: '2019-09-05'
        },
        {
            pID: 2,
            pName: 'Create HTML Shell',
            pStart: '2019-07-24',
            pEnd: '2019-07-24',
            pClass: 'gtaskyellow',
            pLink: '',
            pMile: 0,
            pRes: 'Mario',
            pComp: 20,
            pGroup: 0,
            pParent: 0,
            pOpen: 1,
            pDepend: 122,
            pCaption: '',
            pNotes: ''
        },
        {
            pID: 3,
            pName: 'Code Javascript',
            pStart: '',
            pEnd: '',
            pClass: 'ggroupblack',
            pLink: '',
            pMile: 0,
            pRes: 'Mario',
            pComp: 0,
            pGroup: 1,
            pParent: 0,
            pOpen: 1,
            pDepend: '',
            pCaption: '',
            pNotes: ''
        },
        {
            pID: 31,
            pName: 'Define Variables',
            pStart: '2019-06-25',
            pEnd: '2019-07-17',
            pPlanStart: '2019-06-24',
            pPlanEnd: '2019-07-15 12:00',
            pClass: 'gtaskpurple',
            pLink: '',
            pMile: 0,
            pRes: 'Mario',
            pComp: 30,
            pGroup: 0,
            pParent: 3,
            pOpen: 1,
            pDepend: '',
            pCaption: '',
            pNotes: ''
        },
        {
            pID: 32,
            pName: 'Calculate One Day',
            pStart: '2019-07-15 00:00',
            pEnd: '2019-07-16 00:00',
            pClass: 'gtaskgreen',
            pLink: '',
            pMile: 0,
            pRes: 'Henrique',
            pComp: 40,
            pGroup: 0,
            pParent: 3,
            pOpen: 1,
            pDepend: '',
            pCaption: '',
            pNotes: ''
        },
        {
            pID: 33,
            pName: 'Draw Task Items',
            pStart: '',
            pEnd: '',
            pClass: 'ggroupblack',
            pLink: '',
            pMile: 0,
            pRes: 'Someone',
            pComp: 40,
            pGroup: 2,
            pParent: 3,
            pOpen: 1,
            pDepend: '',
            pCaption: '',
            pNotes: ''
        },
        {
            pID: 332,
            pName: 'Task Label Table',
            pStart: '2019-07-06',
            pEnd: '2019-07-09',
            pClass: 'gtaskblue',
            pLink: '',
            pMile: 0,
            pRes: 'Mario',
            pComp: 60,
            pGroup: 0,
            pParent: 33,
            pOpen: 1,
            pDepend: '',
            pCaption: '',
            pNotes: ''
        },
        {
            pID: 333,
            pName: 'Task Scrolling Grid',
            pStart: '2019-07-11',
            pEnd: '2019-07-20',
            pClass: 'gtaskblue',
            pLink: '',
            pMile: 0,
            pRes: 'Mario',
            pComp: 0,
            pGroup: 0,
            pParent: 33,
            pOpen: 1,
            pDepend: '332',
            pCaption: '',
            pNotes: ''
        },
        {
            pID: 34,
            pName: 'Draw Task <i>Bars</i>',
            pStart: '',
            pEnd: '',
            pClass: 'ggroupblack',
            pLink: '',
            pMile: 0,
            pRes: 'Anybody',
            pComp: 67,
            pGroup: 1,
            pParent: 3,
            pOpen: 0,
            pDepend: '',
            pCaption: '',
            pNotes: ''
        },
        {
            pID: 341,
            pName: 'Loop each Task',
            pStart: '2019-03-26',
            pEnd: '2019-04-11',
            pClass: 'gtaskred',
            pLink: '',
            pMile: 0,
            pRes: 'Mario',
            pComp: 60,
            pGroup: 0,
            pParent: 34,
            pOpen: 1,
            pDepend: '',
            pCaption: '',
            pNotes: ''
        },
        {
            pID: 'A342',
            pName: 'Calculate Start/Stop',
            pStart: '2019-04-12',
            pEnd: '2019-05-18',
            pClass: 'gtaskpink',
            pLink: '',
            pMile: 0,
            pRes: 'Mario',
            pComp: 60,
            pGroup: 0,
            pParent: 34,
            pOpen: 1,
            pDepend: '',
            pCaption: '',
            pNotes: ''
        },
        {
            pID: 343,
            pName: 'Draw Task Div',
            pStart: '2019-05-13',
            pEnd: '2019-05-17',
            pClass: 'gtaskred',
            pLink: '',
            pMile: 0,
            pRes: 'Mario',
            pComp: 60,
            pGroup: 0,
            pParent: 34,
            pOpen: 1,
            pDepend: '',
            pCaption: '',
            pNotes: ''
        },
        {
            pID: 344,
            pName: 'Draw Completion Div',
            pStart: '2019-05-17',
            pEnd: '2019-06-04',
            pClass: 'gtaskred',
            pLink: '',
            pMile: 0,
            pRes: 'Mario',
            pComp: 60,
            pGroup: 0,
            pParent: 34,
            pOpen: 1,
            pDepend: 'A342,343',
            pCaption: '',
            pNotes: ''
        },
        {
            pID: 35,
            pName: 'Just plan dates',
            pPlanStart: '2019-07-17',
            pPlanEnd: '2019-09-15',
            pClass: 'gtaskpurple',
            pLink: '',
            pMile: 0,
            pRes: 'Mario',
            pComp: 0,
            pGroup: 0,
            pParent: 3,
            pOpen: 1,
            pDepend: '333',
            pCaption: '',
            pNotes: ''
        }
    ];
    constructor(
        private accountService: AccountService,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private projectService: ProjectService,
        private financialProjectService: FinancialProjectService
    ) {}

    ngOnInit() {
        this.accountService.identity().then((account: Account) => {
            this.account = account;
            this.loadProject();
        });
        this.registerAuthenticationSuccess();
    }

    loadProject() {
        this.projectService.query().subscribe(value => {
            this.projects = value.body;
            this.projects.forEach(project => {
                project.details = [];
                this.financialProjectService
                    .findByProjectAndType(project.id, this.FinancialProjectType[this.FinancialProjectType.AMOUNT_CONFIRMED])
                    .subscribe(financialProject => {
                        project.amountConfirmed = financialProject.body && financialProject.body.amount ? financialProject.body.amount : 0;
                        project.details.push(`مبلغ قرارداد : ${project.amountConfirmed}`);
                    });

                this.financialProjectService.getCostOfProject(project.id).subscribe(financialProject => {
                    project.totalCost = financialProject.body ? financialProject.body : 0;
                    project.details.push(`مبلغ هزینه شده : ${project.totalCost}`);
                });
            });
        });
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.accountService.identity().then(account => {
                this.account = account;
                this.loadProject();
            });
        });
    }

    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
}
