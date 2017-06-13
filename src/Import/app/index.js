import Chains from './Chain.info';
import { CreateImportCSV } from './Import';
import DomainApi from './DomainApi';
import ImportResource from './ImportResource';

new CreateImportCSV();

module.exports = { DomainApi, ImportResource, Chains };

