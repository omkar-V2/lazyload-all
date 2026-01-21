import { ResolveFn, Routes } from '@angular/router';

import { NewTaskComponent, canLeaveEditPage } from '../tasks/new-task/new-task.component';
import { NoTaskComponent } from '../tasks/no-task/no-task.component';
import { UserTasksComponent } from './user-tasks/user-tasks.component';
import { Task } from '../tasks/task/task.model';
import { TasksService } from '../tasks/tasks.service';
import { inject } from '@angular/core';
import { resolveUserTasks, TasksComponent } from '../tasks/tasks.component';
// import { TasksComponent, resolveUserTasks } from '../tasks/tasks.component';

//moved here from tasks.component for lazy loading
// again moving it back to taskscomponent as lazy loading is handled in app.route.ts file
// export const resolveUserTasks: ResolveFn<Task[]> = (activatedRouteSnapshot, routerState) => {
//   const order = activatedRouteSnapshot.queryParams['order'];
//   const tasksService = inject(TasksService);
//   const tasks = tasksService
//     .allTasks()
//     .filter((task) => task.userId === activatedRouteSnapshot.paramMap.get('userId'));

//   if (order && order === 'asc') {
//     tasks.sort((a, b) => (a.id > b.id ? 1 : -1));
//   } else {
//     tasks.sort((a, b) => (a.id > b.id ? -1 : 1));
//   }

//   return tasks.length ? tasks : [];
// };

//Lazy loading Service TasksService. we passed it in providers here instead in TaskService with injectable decorators providedIn:root
export const userRoutes: Routes = [
  {
    path: '',
    providers: [TasksService],
    children: [
      {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full',
      },
      {
        path: 'tasks', // <your-domain>/users/<uid>/tasks
        component: TasksComponent, //commented for lazyloading. loadcomponent do the lazyloading
        //commented loadComponent as we are already lazyloading in app.routes.ts
        // loadComponent: () => import('../tasks/tasks.component').then((mod) => mod.TasksComponent),
        runGuardsAndResolvers: 'always',
        resolve: {
          userTasks: resolveUserTasks, // still this resolve we using which is eager loading so we move it from task component to here.
        },
      },
      {
        path: 'tasks/new',
        component: NewTaskComponent,
        canDeactivate: [canLeaveEditPage],
      },
    ],
  },
];
// below code is without the lazy loading service
// export const userRoutes: Routes = [
//   {
//     path: '',
//     redirectTo: 'tasks',
//     pathMatch: 'full',
//   },
//   {
//     path: 'tasks', // <your-domain>/users/<uid>/tasks
//     component: TasksComponent, //commented for lazyloading. loadcomponent do the lazyloading
//     //commented loadComponent as we are already lazyloading in app.routes.ts
//     // loadComponent: () => import('../tasks/tasks.component').then((mod) => mod.TasksComponent),
//     runGuardsAndResolvers: 'always',
//     resolve: {
//       userTasks: resolveUserTasks, // still this resolve we using which is eager loading so we move it from task component to here.
//     },
//   },
//   {
//     path: 'tasks/new',
//     component: NewTaskComponent,
//     canDeactivate: [canLeaveEditPage],
//   },
// ];
