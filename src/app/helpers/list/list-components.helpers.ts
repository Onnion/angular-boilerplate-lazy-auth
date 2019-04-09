import { MatPaginator, PageEvent } from '@angular/material';
import { ViewChild, EventEmitter } from '@angular/core';

export class ListComponent {

    @ViewChild(MatPaginator) pagination: MatPaginator;

    protected service;
    protected notify;
    protected options;
    public methodLoad = 'getData';
    public safe_pagination;
    public status_form = {loading: false};
    public doneLoad: EventEmitter<any> = new EventEmitter<any>();

    // Data
    public componentData: any;

    // Pagination
    public status: string;
    public length: number;
    public pageSize = 5;
    public page = 1;
    public pageSizeOptions: number[] = [5, 12, 25, 50, 100, 1000, 10000];
    public searchableFields: string[];
    public pageEvent: PageEvent;

    public constructor() { }


    public getSearchableFields(): string {
        return `Pesquisa pode ser realizada pelos campos ${this.searchableFields.map(( field ) => field ).join(', ')}`;
    }


    /**
     * Adicionar comentário
     */
    loadData() {
        this.status_form.loading = true;

        let options = {...this.options};

        if (!this.safe_pagination) {
            options = {
                ...this.options,
                'page': this.page,
                'pageSize': this.pageSize,
            };
        }

        this.service[this.methodLoad](options).subscribe(
            (data) => {
                if (!this.safe_pagination) {
                    const pagination = data.meta.pagination;
                    this.setPagination(pagination['total'], pagination['current_page'], pagination['per_page']);
                }

                this.componentData = data.data;
                this.status_form.loading = false;

                this.doneLoad.emit(true);

            },
            (err) => {
                this.status_form.loading = false;

             });

    }


    /**
     * Adicionar comentário
     *
     * @param length (number)
     * @param startIndex (number)
     * @param pageSize (number)
     */
    setPagination(length: number, startIndex: number, pageSize: number) {
        this.length = length;
        this.page = startIndex;
        this.pageSize = pageSize;

    }


    /**
     * Adicionar comentário
     *
     * @param event (event)
     */
    onPaginateChange(event) {
        this.page = event.pageIndex + 1;
        this.pageSize = event.pageSize;
        this.loadData();

    }
}
