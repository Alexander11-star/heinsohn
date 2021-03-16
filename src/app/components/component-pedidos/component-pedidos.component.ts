import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../service/api.service';
import { pedidoI, clienteI, productoI, categoriaI } from '../../models/pedido.model';
import { Router } from "@angular/router";
import { from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-component-pedidos',
  templateUrl: './component-pedidos.component.html'
})
export class ComponentPedidosComponent{
  
  nuevoForm = new FormGroup({
      idProducto: new FormControl('',Validators.required),
      idCategoria: new FormControl('',Validators.required),
      idCliente: new FormControl('',Validators.required),
      cantidad: new FormControl('',Validators.required),
      fechaPedido: new FormControl('',Validators.required),
      precio: new FormControl('',Validators.required),
      comentario: new FormControl('',Validators.required),

  });
   
  idUser?:number;
  categorias?: any[''];
  producto?: any[''];
  cliente?: any[''];
  clientes?: any[''];
  pedido?: any[''];
  pedidoData?: pedidoI;
  idproducto?: number;
  total?: number;

  constructor(private http: HttpClient, private api:ApiService, private router:Router) { 
    this.getproduct();
    this.getApiCategorias();
    this.getApiClientes();
    this.getApiProductos();
    this.getApiPedidos();
   }
    

  ngOnInit(): void {
    localStorage.removeItem('returnToItemPage');
  }

  getApiCategorias(){
    this.api.getCategoria().subscribe((data:categoriaI)=>{
      this.categorias = data;   
    });
  }

  getApiClientes(){
    this.api.getCliente().subscribe((data:clienteI)=>{
      this.cliente = data;   
    });
  }

  getApiProductos(){
    this.api.getProducto().subscribe((data:productoI)=>{
      this.producto = data;   
    });
  }

  getApiPedidos(){
    this.api.getPedido().subscribe((data:pedidoI)=>{
      this.pedido = data;   
    });
  }

  getproduct(){
   // this.idUser = parseInt(localStorage.getItem('idCategoria'));
  }

  viewform(form: pedidoI){
    console.log(form);
      this.pedidoData = ({
        idProducto: Number(form.idProducto),
        idCliente: Number(form.idCliente),
        fechaPedido: form.fechaPedido,
        cantidad: form.cantidad,
        precio: form.precio,
        idCategoria: Number(form.idCategoria),
        comentario: form.comentario,
      });
      let json = JSON.stringify(this.pedidoData);
      
      this.api.setPedido(this.pedidoData).subscribe((data:pedidoI)=>{
      alert('Registro ingresado correctamente');
      window.location.reload();       
    });  
  }

  DeletePedidos(txtTexto:number){
    this.api.deletePedido(txtTexto).subscribe((data:pedidoI)=>{
      window.location.reload();       
    });  
  }

  saverange(form: pedidoI) { 
  var idproducto = Number(form.idProducto); 
  var cant = Number(form.cantidad);
    this.api.getProductForId(idproducto).subscribe((data:pedidoI)=>{
    var precio = Number(data.precio);
    this.total = precio * cant;    
    });  
  }

  searchClientes(form: pedidoI){
    var idcliente = Number(form.idCliente); 
    this.api.getPedidoForclient(idcliente).subscribe((data:pedidoI)=>{
      this.clientes = data;  
      }); 
  }

  viewPedido(idx:number){
    Number(idx);
    this.router.navigate([ '/modificar-pedidos', idx]);
  }
}
