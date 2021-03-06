import { Application } from 'express';

import { userRoutes } from './controllers/UserContoller';

// import LessonsCtrl from './controllers/LessonsCtrl';
// import { LessonValidator, lessonSchema } from './validators/lessonValidator';

export class Routes {
  public userCtrl = userRoutes;
  // lessonsCtrl = new LessonsCtrl();
  // coursesCtrl = new CoursesCtrl();

  // lessonValidator = new LessonValidator();

  constructor(app: Application) {
    // user routes
    app.route('/api/users/').get(this.userCtrl.getAllUsers, (req, res) => res.json({

      headers: req.headers,
      userAgent: req.get('user-agent'),
      "Content-Type": "application/json"
    }));
/*     app.route('/api/courses/').get(this.coursesCtrl.getAllCourses);
    app.route('/api/courses/:id').get(this.coursesCtrl.getCourseDetails);

    // lesson routes
    app.route('/api/lessons').get(this.lessonsCtrl.getAllLessons);
    app
      .route('/api/lessons/course/:id')
      .get(this.lessonsCtrl.getLessonByCourse);
    app.route('/api/lessons/:id').get(this.lessonsCtrl.getLessonById);
    app
      .route('/api/lessons')
      .post(
        this.lessonValidator.validateBody(lessonSchema),
        this.lessonsCtrl.createLesson
      );
    app
      .route('/api/lessons/:id')
      .put(
        this.lessonValidator.validateBody(lessonSchema),
        this.lessonsCtrl.updateLesson
      );
    app.route('/api/lessons/:id').delete(this.lessonsCtrl.deleteLesson); */
  }
}
