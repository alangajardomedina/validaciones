import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //variables.
  fecha_nacimiento: Date;
  edad: number;
  esValido: boolean;
  rut: string;

  edadMinima: number = 17;
  fechaMax: any;
  fechaHoy: any;

  constructor() {
    var timeDiff = Date.now() - (this.edadMinima)*365.25*24*3600*1000;
    var fecha = new Date();
    fecha.setTime(timeDiff);

    this.fechaMax = new DatePipe('en-US').transform(fecha, 'yyyy-MM-dd');

    //fecha hoy:
    this.fechaHoy = new DatePipe('en-US').transform(Date.now()+1, 'yyyy-MM-dd');
  }

  //calcula la edad en una variable
  calcularEdad() {
    var fn = new Date(this.fecha_nacimiento);
    var diferencia_fechas = Math.abs(Date.now() - fn.getTime());
    this.edad = Math.floor((diferencia_fechas / (1000 * 3600 * 24)) / 365.25);
  }

  //solo me entrega el número de la edad:
  calcularEdadRetorno() {
    var fn = new Date(this.fecha_nacimiento);
    var timeDiff = Math.abs(Date.now() - fn.getTime());
    var edadAlumno = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
    if (edadAlumno >= 17) {
      return true;
    } else {
      return false;
    }
  }


  //validar rut
  validarRut() {
    var rutSimple= this.rut.replace('.','').replace('.','').replace('-','');
    rutSimple = rutSimple.substring(0, rutSimple.length-1);
    var rutArreglo: any[] = rutSimple.split('').reverse();

    var acumulador: number = 0;
    var multiplo: number = 2;
    for(let digito of rutArreglo){
      acumulador = acumulador + digito * multiplo;
      multiplo++;
      if (multiplo>7) {
        multiplo = 2;
      }
    }
    var resto: number = acumulador%11;
    var dvCalculado: any = 11 - resto;
    if (dvCalculado >= 11) {
      dvCalculado = '0';
    }else if(dvCalculado == 10){
      dvCalculado = 'K';
    }
    
    var dvRut: string = this.rut.substring(this.rut.length-1).toUpperCase();
    if (dvRut == dvCalculado.toString()) {
      this.esValido = true;
    }else{
      this.esValido = false;
    }
  }
}
