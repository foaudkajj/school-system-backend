import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AttachmentController} from './attachment/attachment.controller';
import {AttachmentService} from './attachment/attachment.service';
import {AuthService} from './auth/auth.service';
import {JwtStrategy} from './auth/strategies/jwt.strategy';
import {LocalStrategy} from './auth/strategies/local.strategy';
import {ClassController} from './class/class.controller';
import {ClassService} from './class/class.service';
import {GenericListItemController} from './generic-list-item/generic-list-item.controller';
import {GenericListItemService} from './generic-list-item/generic-list-item.service';
import {GenericListController} from './generic-list/generic-list.controller';
import {GenericListService} from './generic-list/generic-list.service';
import {InstallmentController} from './installment/installment.controller';
import {InstallmentService} from './installment/installment.service';
import {LessonController} from './lesson/lesson.controller';
import {LessonService} from './lesson/lesson.service';
import {SharedModule} from './shared.module';
import {StudentEvaluationController} from './student-evaluation/student-evaluation.controller';
import {StudentEvaluationService} from './student-evaluation/student-evaluation.service';
import {StudentController} from './student/student.controller';
import {StudentService} from './student/student.service';
import {TeacherController} from './teacher/teacher.controller';
import {TeacherService} from './teacher/teacher.service';
import {UserController} from './user/user.controller';
import {UserService} from './user/user.service';
import {CountryController} from './country/country.controller';
import {CountryService} from './country/country.service';
import {CourseController} from './course/course.controller';
import {CourseService} from './course/course.service';
import {AuthController} from './auth/auth.controller';
import {CourseParticipantService} from './course-participant/course-participant.service';
import {CourseParticipantController} from './course-participant/course-participant.controller';
import {RoleController} from './role/role.controller';
import {RoleService} from './role/role.service';
import {PermissionService} from './permission/permission.service';
import {RolePermissionService} from './role-permission/role-permission.service';
import {RolesGuard} from './auth/guards/roles.guard';
import {APP_GUARD} from '@nestjs/core';
import {JwtAuthGuard} from './auth/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number.parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: false,
      logging: false,
      extra: {
        decimalNumbers: true,
      },
      autoLoadEntities: true,
      keepConnectionAlive: true,
      migrationsRun: true,
      migrations: ['migration/*.js'],
    }),
    SharedModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: '15m'},
    }),
  ],
  controllers: [
    AppController,
    StudentController,
    StudentEvaluationController,
    InstallmentController,
    AttachmentController,
    TeacherController,
    GenericListController,
    GenericListItemController,
    ClassController,
    LessonController,
    UserController,
    CountryController,
    CourseController,
    AuthController,
    CourseParticipantController,
    RoleController,
  ],
  providers: [
    AppService,
    StudentService,
    StudentEvaluationService,
    InstallmentService,
    AttachmentService,
    TeacherService,
    GenericListService,
    GenericListItemService,
    ClassService,
    LessonService,
    UserService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    CountryService,
    CourseService,
    CourseParticipantService,
    RoleService,
    PermissionService,
    RolePermissionService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
