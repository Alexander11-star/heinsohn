import { RouterModule, Routes } from '@angular/router';
import { ComponentPedidosComponent } from './components/component-pedidos/component-pedidos.component';
import { ModificarPedidosComponent } from './components/modificar-pedidos/modificar-pedidos.component';


const APP_ROUTES: Routes =[
    { path: 'ComponentPedidosComponent', component: ComponentPedidosComponent},
    { path: 'modificar-pedidos/:id', component: ModificarPedidosComponent},
    { path: '**', pathMatch: 'full', redirectTo: 'ComponentPedidosComponent'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash:true});