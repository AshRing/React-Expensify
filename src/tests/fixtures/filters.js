import moment from 'moment';

const filters = {
    startDate: undefined,
    endDate: undefined,
    text: '',
    sortBy: 'date'
}

const altFilters = {
    startDate: moment(0),
    endDate: moment(0).add(3, 'days'),
    text: 'rent',
    sortBy: 'amount'
}

export {filters, altFilters}; //shorthand way to export 2 things at the same time