import {Roles} from '../models/index.js';
import {User, Apps, GoogleUser, UserTypes} from '../models/index.js';
import { logAction } from '../services/loggerService.js';

// get app list
// GET /api/apps
export const getRoles = async (req, res, next) => {
    try {
        const role = await Roles.findAll({
            where:{isActive: true},
        });
        return res.json(role);
    } catch (error) {
        error.status = 400;
        return next(error);
    }
};

// PAGINATED
// get all roles with pagination
// GET /api/roles/paginated
export const getRolesPaginated = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        if (!isNaN(limit) && limit > 0) {
            const { count, rows } = await Roles.findAndCountAll({
                where: { isActive: true },
                offset: offset,
                limit: limit,
                order: [['createdAt', 'DESC']],
            });
            return res.json({
                roles: rows,
                total: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            });
        }

        res.status(400).send('Invalid limit');
    } catch (error) {
        error.status = 400;
        return next(error);
    }
};

// create new app registry
// POST /api/roles
export const addRole = async (req, res, next) => {
    if(!req.body.userId){
        const error = new Error('Please select properly');
        error.status = 400;
        return next(error);
    }

    try {
        const requestorID = req.headers['x-user-id'];
        const role = await Roles.create(req.body);
        // Log the action
        await logAction({
            action: 'Add Role',
            details: JSON.stringify(role),
            userId: requestorID, //needs to be existing user id in the users table
            targetId: req.body.userId,
            targetType: 'Role',
            ipAddress: req.ip,
        });
        res.status(201).json(role);
    } catch (error) {
        //const error2 = new Error('creating a user failed');
        error.status = 400;
        return next(error);
    }
}

// update role by id
// PUT /api/roles/:id

export const updateRole = async (req, res, next) => {
    try{
        const role = await Roles.findByPk(req.params.id);
        const requestorID = req.headers['x-user-id'];
        if(!role){
            const error = new Error(`role with id ${req.params.id} not found`);
            error.status = 404;
            return next(error);
        }
        await role.update(req.body);

        // Log the action
        await logAction({
            action: 'Update Role',
            details: JSON.stringify(req.body),
            userId: requestorID, //needs to be existing user id in the users table
            targetId: req.params.id,
            targetType: 'Role', 
            ipAddress: req.ip,
        });

        res.status(200).json(role);
    }catch(error){
        error.status = 400;
        return next(error);
    }
}

// Delete app by id
// PUT /api/roles/:id
export const deleteRole = async (req, res, next) => {
    try{
        const role = await Roles.findByPk(req.params.id);
        if(!role){
            const error = new Error(`role with id ${req.params.id} not found`);
            error.status = 404;
            return next(error);
        }
        await role.destroy();
        
        // Log the action
        await logAction({
            action: 'Update App',
            details: JSON.stringify(req.body),
            userId: requestorID,
            targetId: req.params.id,
            targetType: 'App',
            ipAddress: req.ip,
        });
        
        res.status(200).json({msg:'role deleted permanently'});
    }catch(error){
        error.status = 400;
        return next(error);
    }

}
