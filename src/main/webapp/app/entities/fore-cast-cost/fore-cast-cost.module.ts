import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ProjectSharedModule } from 'app/shared';
import {
    ForeCastCostComponent,
    ForeCastCostDetailComponent,
    ForeCastCostUpdateComponent,
    ForeCastCostDeletePopupComponent,
    ForeCastCostDeleteDialogComponent,
    foreCastCostRoute,
    foreCastCostPopupRoute
} from './';

const ENTITY_STATES = [...foreCastCostRoute, ...foreCastCostPopupRoute];

@NgModule({
    imports: [ProjectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ForeCastCostComponent,
        ForeCastCostDetailComponent,
        ForeCastCostUpdateComponent,
        ForeCastCostDeleteDialogComponent,
        ForeCastCostDeletePopupComponent
    ],
    entryComponents: [
        ForeCastCostComponent,
        ForeCastCostUpdateComponent,
        ForeCastCostDeleteDialogComponent,
        ForeCastCostDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectForeCastCostModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
