export const ROLES = {
    root: ['root_content'],
    administrative: ['root_content'],
    client: ['client_content']
};

export const ROLES_ACL = {
    '1': { role: 'root', path: 'dashboard' },
    '2': { role: 'administrative', path: 'dashboard' },
    '3': { role: 'client', path: 'cliente' }
};
