import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { EstadoCocherasComponent } from './pages/estado-cocheras/estado-cocheras.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DashboardContainerComponent } from './pages/dashboard-container/dashboard-container.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { PreciosComponent } from './pages/precios/precios.component'; // Importa el componente de precios
import { soloPublicoGuard } from './guards/solo-publico.guard';
import { soloAdminGuard } from './guards/solo-admin.guard';
import { soloLogueadoGuard } from './guards/solo-logueado.guard';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
    {
        path: "",
        component: DashboardContainerComponent,
        canActivate: [soloLogueadoGuard],
        children: [
            {
                path: "estado-cocheras",
                component: EstadoCocherasComponent
            },
            {
                path: "reportes",
                component: ReportesComponent,
                canActivate: [soloAdminGuard]
            },
            {
                path: "precios", 
                component: PreciosComponent,
                canActivate: [soloLogueadoGuard]
            }
        ]
    },
    {
        path: "register",
        component: RegisterComponent,
        canActivate: [soloPublicoGuard]
    },
    {
        path: "login",
        component: LoginComponent,
        canActivate: [soloPublicoGuard]
    },
    {
        path: "not-found",
        component: NotFoundComponent
    },
    {
        path: "**",
        redirectTo: "not-found",
        pathMatch: "full"
    },
];
