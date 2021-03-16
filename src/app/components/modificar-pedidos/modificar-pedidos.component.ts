import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pedidoI, clienteI, productoI, categoriaI } from '../../models/pedido.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../service/api.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-modificar-pedidos',
  templateUrl: './modificar-pedidos.component.html',
  styleUrls: ['./modificar-pedidos.component.css']
})
export class ModificarPedidosComponent implements OnInit {

  nuevoForm = new FormGroup({
    idPedido: new FormControl('',Validators.required),
    idProducto: new FormControl('',Validators.required),
    idCategoria: new FormControl('',Validators.required),
    idCliente: new FormControl('',Validators.required),
    cantidad: new FormControl('',Validators.required),
    fechaPedido: new FormControl('',Validators.required),
    precio: new FormControl('',Validators.required),
    comentario: new FormControl('',Validators.required),
    pedidoFilterOne:new FormControl('',Validators.required)

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
pedidoFilter:any = {};
pedidoFilterOne?: any;

  constructor(private http: HttpClient, private api:ApiService, private ActivatedRoute:ActivatedRoute) { 
    this.getApiCategorias();
    this.getApiClientes();
    this.getApiProductos();
    this.getApiPedidos();

        this.ActivatedRoute.params.subscribe( params =>{
          var ipedido = params['id'];
          var idpedido = Number(ipedido);
        this.pedidoFilter = this.api.getPedidoModify(ipedido).subscribe((data:pedidoI)=>{
        this.pedidoFilterOne = Number(data.idPedido);  
        this.getApiPedidosfor(this.pedidoFilterOne)
          }); 
        console.log(this.pedidoFilter);
    })

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

  getApiPedidosfor(id: number){
    this.pedidoFilterOne = id;  
  }

  viewform(form: pedidoI){
    console.log(form);
      this.pedidoData = ({
        idPedido:Number(form.idPedido),
        idProducto: Number(form.idProducto),
        idCliente: Number(form.idCliente),
        fechaPedido: form.fechaPedido,
        cantidad: form.cantidad,
        precio: form.precio,
        idCategoria: Number(form.idCategoria),
        comentario: form.comentario,
      });
      let json = JSON.stringify(this.pedidoData);
      
      this.api.setModPedido(this.pedidoData).subscribe((data:pedidoI)=>{
      alert("registro Modificado con Exito!!");
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

}
