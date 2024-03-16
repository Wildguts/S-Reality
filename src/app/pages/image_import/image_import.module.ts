import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalsModule, WidgetsModule } from '../../_metronic/partials';
import { SharedModule } from "../../_metronic/shared/shared.module";
import { DropdownMenusModule } from "../../_metronic/partials/content/dropdown-menus/dropdown-menus.module";
import { ImageCropperModule } from 'ngx-image-cropper';
import { imageImportComponent } from './image_import.component';
@NgModule({
    declarations: [imageImportComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: imageImportComponent,
            },
        ]),
        ModalsModule,
        SharedModule,
        DropdownMenusModule,

    ],
    exports: [
      imageImportComponent
      ]
})
export class imageImportModule {}
