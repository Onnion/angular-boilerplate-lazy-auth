import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {LoadingComponent} from './loading.component';
import {MaterialModule} from '../../../mat.module';

@NgModule({
    imports: [RouterModule, CommonModule, MaterialModule],
    declarations: [LoadingComponent],
    exports: [LoadingComponent]
})

export class LoadingModule {
}
