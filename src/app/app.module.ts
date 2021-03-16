import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

//Rutas
import { APP_ROUTING } from './app.routes';
import { AppRoutingModule } from './app-routing.module';

//servicios
import { ApiService } from './service/api.service';

//Components
import { AppComponent } from './app.component';
import { ComponentPedidosComponent } from './components/component-pedidos/component-pedidos.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModificarPedidosComponent } from './components/modificar-pedidos/modificar-pedidos.component';

@NgModule({
  declarations: [
    AppComponent,
    ComponentPedidosComponent,
    HeaderComponent,
    ModificarPedidosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    APP_ROUTING
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
