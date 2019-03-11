import { NextFunction, Request, Response, Router } from 'express';

import { apiErrorHandler } from '../handlers/errorHandler';
import { userRepo } from '../repositories/Users';

class UserRoutes {
  public getAllUsers(req: Request, res: Response, next: NextFunction) {
    userRepo
      .getAllUsers()
      .then(result => res.json(result))
      .catch(err => {
        apiErrorHandler(err, req, res, 'Fetch All Lessons failed.');
      });
  }

  /*   getLessonByCourse(req: Request, res: Response, next: NextFunction) {
    LessonRepo.getLessonByCourse(req.params.id)
      .then(result => res.json(result))
      .catch(err => {
        apiErrorHandler(
          err,
          req,
          res,
          `Lessons in course ${req.params.id} failed.`
        );
      });
  }

  getLessonById(req: Request, res: any, next: NextFunction) {
    LessonRepo.getLessonById(req.params.id)
      .then(result => {
        if (result) {
          return res.json(result);
        } else {
          res.status(404).send(`Lesson ${req.params.id} not found.`);
        }
      })
      .catch(err => {
        apiErrorHandler(err, req, res, `Lesson ${req.params.id} failed.`);
      });
  }

  createLesson(req: Request, res: Response, next: NextFunction) {
    LessonRepo.createLesson(req['value']['body'])
      .then(result => res.json(result))
      .catch(err => {
        apiErrorHandler(err, req, res, 'Creation of Lesson failed.');
      });
  }

  updateLesson(req: Request, res: Response, next: NextFunction) {
    LessonRepo.updateLesson(req.params.id, req['value']['body'])
      .then(result => res.json(result))
      .catch(err => {
        apiErrorHandler(
          err,
          req,
          res,
          `updation of Lesson ${req.params.id} is failed.`
        );
      });
  }

  deleteLesson(req: Request, res: Response, next: NextFunction) {
    LessonRepo.deleteLesson(req.params.id)
      .then(result => res.json(result))
      .catch(err => {
        apiErrorHandler(
          err,
          req,
          res,
          `deletion of Lesson ${req.params.id}  is failed.`
        );
      });
  } */
}

export const userRoutes = new UserRoutes();
