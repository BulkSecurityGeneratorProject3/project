import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ProjectSharedModule } from 'app/shared';
import {
    CollageEducationComponent,
    CollageEducationDetailComponent,
    CollageEducationUpdateComponent,
    CollageEducationDeletePopupComponent,
    CollageEducationDeleteDialogComponent,
    collageEducationRoute,
    collageEducationPopupRoute
} from './';

const ENTITY_STATES = [...collageEducationRoute, ...collageEducationPopupRoute];

@NgModule({
    imports: [ProjectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CollageEducationComponent,
        CollageEducationDetailComponent,
        CollageEducationUpdateComponent,
        CollageEducationDeleteDialogComponent,
        CollageEducationDeletePopupComponent
    ],
    entryComponents: [
        CollageEducationComponent,
        CollageEducationUpdateComponent,
        CollageEducationDeleteDialogComponent,
        CollageEducationDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectCollageEducationModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}