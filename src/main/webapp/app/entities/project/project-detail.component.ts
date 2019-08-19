import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProject } from 'app/shared/model/project.model';
import { FinancialProjectService } from 'app/entities/financial-project';
import { FinancialProjectType } from 'app/shared/model/financial-project.model';

@Component({
    selector: 'jhi-project-detail',
    templateUrl: './project-detail.component.html'
})
export class ProjectDetailComponent implements OnInit {
    project: IProject;

    FinancialProjectType = FinancialProjectType;
    constructor(protected activatedRoute: ActivatedRoute, private financialProjectService: FinancialProjectService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ project }) => {
            this.project = project;
            this.project.details = [];
            this.financialProjectService
                .findByProjectAndType(project.id, this.FinancialProjectType[this.FinancialProjectType.AMOUNT_CONFIRMED])
                .subscribe(financialProject => {
                    project.amountConfirmed = financialProject.body && financialProject.body.amount ? financialProject.body.amount : 0;
                });
            this.financialProjectService
                .findByProjectAndType(project.id, this.FinancialProjectType[this.FinancialProjectType.CREDIT_ESTIMATES])
                .subscribe(financialProject => {
                    project.creditEstimates = financialProject.body && financialProject.body.amount ? financialProject.body.amount : 0;
                    this.project.details.push(`مبلغ مصوب : ${this.project.creditEstimates}`);
                });
            this.financialProjectService
                .findByProjectAndType(project.id, this.FinancialProjectType[this.FinancialProjectType.SELL_CONTRACT_AMOUNT])
                .subscribe(financialProject => {
                    project.sellContractAmount = financialProject.body && financialProject.body.amount ? financialProject.body.amount : 0;
                    this.project.details.push(`مبلغ قرارداد : ${this.project.sellContractAmount}`);
                });
            this.financialProjectService
                .findByProjectAndType(project.id, this.FinancialProjectType[this.FinancialProjectType.CREDIT_APPLY])
                .subscribe(financialProject => {
                    project.creditApply = financialProject.body && financialProject.body.amount ? financialProject.body.amount : 0;
                    this.project.details.push(`مبلغ دریافتی : ${this.project.creditApply}`);
                });

            this.financialProjectService.getCostOfProject(project.id).subscribe(financialProject => {
                project.totalCost = financialProject.body ? financialProject.body : 0;
                this.project.details.push(`هزینه شده : ${this.project.totalCost}`);
            });
        });
    }

    previousState() {
        window.history.back();
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
