import Profile from './Profile.js';
import Contract from './Contract.js';
import Job from './Job.js';

// Define relationships
Contract.belongsTo(Profile, { as: 'Contractor', foreignKey: 'ContractorId' });
Contract.belongsTo(Profile, { as: 'Client', foreignKey: 'ClientId' });
Contract.hasMany(Job);
Job.belongsTo(Contract);

Profile.hasMany(Contract, { as: 'Contractor', foreignKey: 'ContractorId' });
Profile.hasMany(Contract, { as: 'Client', foreignKey: 'ClientId' });

export { Profile, Contract, Job }; 