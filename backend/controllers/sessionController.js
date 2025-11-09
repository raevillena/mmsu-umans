import {RefreshToken} from '../models/index.js'
import { logAction } from '../services/loggerService.js';

// get app list
// GET /api/sessions
export const getSessions = async (req, res, next) => {
    try {
        //get all if limit is not defined and show only the active ones
        const sessions = await RefreshToken.findAll();
        return res.json(sessions);
    } catch (error) {
        error.status = 400;
        return next(error);
    }
};

// PAGINATED
// get all sessions with pagination
// GET /api/sessions/paginated
export const getSessionsPaginated = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        if (!isNaN(limit) && limit > 0) {
            const { count, rows } = await RefreshToken.findAndCountAll({
                offset: offset,
                limit: limit,
                order: [['createdAt', 'DESC']],
            });
            return res.json({
                sessions: rows,
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



// Delete app by id
// PUT /api/apps/:id

export const deleteSession = async (req, res, next) => {
    try{
        const requestorID = req.headers['x-user-id'];

        const session = await RefreshToken.findByPk(req.params.id);
        if(!session){
            const error = new Error(`session with id ${req.params.id} not found`);
            error.status = 404;
            return next(error);
        }
        await session.destroy();

        await logAction({
            action: 'Delete Session',
            details: JSON.stringify(session),
            userId: requestorID,
            targetId: req.params.id,
            targetType: 'Session',
            ipAddress: req.ip,
          });

        res.status(200).json({msg: 'session deleted permanently'});
    }catch(error){
        error.status = 400;
        return next(error);
    }

}
