export interface ListAction {

    fabOptions: any;
    loading: boolean;
    confirm: {show: boolean};

    actions($event): void;
    openConfirm(data: any): void;
    closeConfirm(): void;
    done(): void;

}
