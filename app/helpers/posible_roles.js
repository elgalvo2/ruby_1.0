function isValidRole(role){
    let roles = [
        'TECNICO','SUDO','ADMIN',''
    ]
    return (roles.includes(role))
    
}   

module.exports = isValidRole;