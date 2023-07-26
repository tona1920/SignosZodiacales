import { HttpClient } from '@angular/common/http';
import { Component,  Injectable,  OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})

@Injectable()
export class FormularioComponent implements OnInit {
  tuFormulario: FormGroup;
  //emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  selected = '';
  meses: any[] = [
    { nombre: 'Marzo', dias: 31 },
    { nombre: 'Abril', dias: 30 },
    { nombre: 'Mayo', dias: 31 },
    { nombre: 'Junio', dias: 30 },
    { nombre: 'Julio', dias: 31 },
    { nombre: 'Agosto', dias: 22 },
  ];

  mesSeleccionado: string ;
  diaSeleccionado: number;
  dias: number[] = [];

  getDias(): number[] {
    const mes = this.meses.find(m => m.nombre === this.mesSeleccionado);
    if (mes) {
      if (mes.nombre === 'Marzo') {
        // Agregar los días adicionales después del día 20 para marzo
        return Array.from({ length: mes.dias - 20 }, (_, i) => i + 21);
      }
      return Array.from({ length: mes.dias }, (_, i) => i + 1);
    }
    return [];
  }

  constructor(private formBuilder: FormBuilder, private http: HttpClient,private db: AngularFireDatabase) {}

  ngOnInit(): void {
    this.tuFormulario = this.formBuilder.group({
      mes: ['', Validators.required],
      dia: ['', Validators.required],
      //Aries
      energico: ['', Validators.required],
      aventurero: ['', Validators.required],
      libre: ['', Validators.required],
      noble: ['', Validators.required],
      //Tauro
      confort: ['', Validators.required],
      persistente: ['', Validators.required],
      leal1:['', Validators.required],
      //Geminis
      adaptable:['', Validators.required],
      intelectual:['', Validators.required],
      versatil: ['', Validators.required],
      //Cancer
      emocional:['', Validators.required],
      protector:['', Validators.required],
      //Leo
      leal2:['', Validators.required],
      ambicioso:['', Validators.required],
      carismatico:['', Validators.required],
    });
  }
   // Función para enviar el formulario
  enviarFormulario() {
    if (this.tuFormulario.valid) {
      const data = {
        mes: parseInt(this.tuFormulario.get('mes').value),
        dia: parseInt(this.tuFormulario.get('dia').value),
        energico : this.tuFormulario.get('energico').value=="1" || this.tuFormulario.get('energico').value=="3"?1:0,
        entusismo : this.tuFormulario.get('energico').value=="2" || this.tuFormulario.get('energico').value=="3"?1:0,
        aventura: parseInt(this.tuFormulario.get('aventurero').value),
        libre:parseInt( this.tuFormulario.get('libre').value),
        noble:parseInt(this.tuFormulario.get('noble').value),
        confort:this.tuFormulario.get('confort').value=="1" || this.tuFormulario.get('confort').value=="3"?1:0,
        placer:this.tuFormulario.get('confort').value=="2" || this.tuFormulario.get('confort').value=="3"?1:0,
        persistencia: parseInt(this.tuFormulario.get('persistente').value),
        adaptable:this.tuFormulario.get('adaptable').value=="1" || this.tuFormulario.get('adaptable').value=="3"?1:0 ,
        curioso:this.tuFormulario.get('adaptable').value=="2" || this.tuFormulario.get('adaptable').value=="3"?1:0 + parseInt(this.tuFormulario.get('versatil').value),
        intelectual:parseInt(this.tuFormulario.get('intelectual').value),
        versatil:parseInt(this.tuFormulario.get('versatil').value),
        emocional:parseInt(this.tuFormulario.get('emocional').value),
        empatico:parseInt(this.tuFormulario.get('emocional').value),
        cariñoso:parseInt(this.tuFormulario.get('protector').value),
        protector:parseInt( this.tuFormulario.get('protector').value )+ parseInt(this.tuFormulario.get('leal1').value),
        carismatico:  parseInt(this.tuFormulario.get('carismatico').value),
        ambicioso:parseInt(this.tuFormulario.get('ambicioso').value),
        creativo:parseInt(this.tuFormulario.get('leal2').value),
        leal: parseInt(this.tuFormulario.get('leal1').value )+ parseInt(this.tuFormulario.get('leal2').value),
      };



      console.log(data);

      // this.db.list('/respuestas').push(data)
      // .then(() => {
      //   console.log('Datos guardados correctamente en Firebase.');
      //   Swal.fire({
      //     position: 'top-end',
      //     icon: 'success',
      //     title: 'Datos guardados correctamente',
      //     showConfirmButton: false,
      //     timer: 1500
      //   });
      //   this.tuFormulario.reset();
      // })
      // .catch(error => {
      //   Swal.fire({
      //     position: 'top-end',
      //     icon: 'error',
      //     title: 'Error al guardar datos en Firebase',
      //     showConfirmButton: false,
      //     timer: 1500
      //   })
      //   console.error('Error al guardar datos en Firebase:', error);
      // });
    }
  }


}
