function isValidRole(role){
    let roles = [
        'TECNICO','SUDO','ADMIN','OPERADOR',
    ]
    return (roles.includes(role))
    
}   

module.exports = isValidRole;