import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/service/producto.service';
import { Producto } from 'src/app/model/producto.model';

declare const $: any;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit,AfterViewInit {
  tabla:any;
  constructor(private router:Router,private serviceProducto:ProductoService) { }

  ngOnInit(): void {
  }

  //Muestra la tabla con los productos
  ngAfterViewInit(): void {


    setTimeout(()=>{
      console.log("Entre ngAfter");
      this.tabla= $('#datatables').DataTable({
        pagingType: "full_numbers",
        lengthMenu: [
          [10, 25, 50, -1],
          [10, 25, 50, "Todos"]
        ],
        data:[],
        dom: '<"top"f>rt<"bottom"lp><"clear">',
        columns:[
                {title:'Imagen',data:'imagen',
                render: (item,data,key)=> {
                    return `<img src="../../../assets/img/${item}"  width='80px' height='80px'>`;
                }},
                 {title:'Nombre',data:'nombre',width:'85%'},
                 {title:'Precio',data:'precio',
                 render: (item,data,key)=> {
                  return item
                  }},
                 { title:'Ver',data:'edit',orderable:false,
                    render: (item,data,key)=> {
                        return `<a class="btn btn-link btn-warning btn-just-icon edit"  data-item='Ver'><i class="material-icons">dvr</i></a>`
                  }}
                ],
        paging: true,
        language: {
        search: "_INPUT_",
        searchPlaceholder: "Buscar",
        lengthMenu: "Mostar _MENU_ registros por página",
        zeroRecords: "No hay datos",
        info: "Mostrando _PAGE_ de _PAGES_",
        infoEmpty: "Mostrando 0 a 0 de 0 registros",
        infoFiltered: "(filtered from _MAX_ total registros)",
        paginate: {
          first:      "Primero",
          last:       "Último",
          next:       "Próximo",
          previous:   "Anterior"
        },
      },
          rowCallback: (row: Node, data: any | Object, index: number) => {
            const self = this;
            $('td', row).off('click');
            $('td', row).on('click', (evt) => {
              const  accion=$(evt.target).closest('td').find('a').attr("data-item");
                if (accion) {
                  switch (accion) {
                    case 'Ver':
                      self.onSeleccionar(data);
                      break;
                    default:
                      break;
                  }
                }
            });

          }

        });
        //Obtiene del servicio los productos
        this.serviceProducto.getAll().subscribe({
          next:(resp:Producto[]) =>{
            console.log("Datos",resp);
            $('#datatables').DataTable().clear();
            $('#datatables').DataTable().rows.add(resp);

            $('#datatables').DataTable().draw();

          }
        });



      });

    }


    //Muestra el producto en la vista ver-producto
    onSeleccionar(producto:any) {
      this.router.navigateByUrl(`/ver-producto/${producto.id}`);
    }

}
