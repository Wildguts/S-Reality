import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ModalsModule, WidgetsModule } from '../../_metronic/partials';
import { SharedModule } from "../../_metronic/shared/shared.module";
import { DropdownMenusModule } from "../../_metronic/partials/content/dropdown-menus/dropdown-menus.module";
import { ImageCropperModule } from 'ngx-image-cropper';
import { imageImportModule } from '../image_import/image_import.module';
@NgModule({
    declarations: [DashboardComponent ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: DashboardComponent,
            },
        ]),
        WidgetsModule,
        ModalsModule,
        SharedModule,
        DropdownMenusModule,
        ImageCropperModule
    ]
})
export class DashboardModule {}
