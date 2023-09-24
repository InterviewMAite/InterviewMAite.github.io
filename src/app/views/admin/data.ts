import { IStatus } from '@interfaces/candidate.interface';

export const status: IStatus[] = [
    {
        key: 'PENDING',
        value: 'Pending',
        class: 'btn-outline-primary',
    },
    {
        key: 'SHORTLISTED',
        value: 'Shortlisted',
        class: 'btn-outline-secondary',
    },
    {
        key: 'ON_HOLD',
        value: 'On Hold',
        class: 'btn btn-outline-warning',
    },
    {
        key: 'DELETED',
        value: 'Deleted',
        class: 'btn btn-outline-danger',
    },
    {
        key: 'REJECTED',
        value: 'Rejected',
        class: 'btn btn-outline-dark',
    },
    {
        key: 'SELECTED',
        value: 'Selected',
        class: 'btn-outline-success',
    },
];
