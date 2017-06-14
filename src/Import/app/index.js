import Chains from './Chain.info';
import { CreateImportCSV } from './Import';
import DomainApi from './DomainApi';
import ImportResource from './ImportResource';

const initChains = () => {
    new CreateImportCSV();
    new DomainApi();
}

module.exports = { initChains, ImportResource, Chains };

