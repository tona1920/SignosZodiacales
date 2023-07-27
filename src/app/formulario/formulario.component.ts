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

  constructor(private formBuilder: FormBuilder, private db: AngularFireDatabase) {}

  ngOnInit(): void {
    this.tuFormulario = this.formBuilder.group({
      p1: ['', Validators.required],
      p2: ['', Validators.required],
      p3: ['', Validators.required],
      p4: ['', Validators.required],
      p5: ['', Validators.required],
      p6: ['', Validators.required],
      p7:['', Validators.required],
      p8:['', Validators.required],
      p9:['', Validators.required],
      p10: ['', Validators.required],
      p11:['', Validators.required],
      p12:['', Validators.required],
      p13:['', Validators.required]
    });
  }
   // Función para enviar el formulario
  enviarFormulario() {
    if (this.tuFormulario.valid) {
      const data = {
        //Aries
        energico : parseInt(this.tuFormulario.get('p1').value),
        entusismo : this.tuFormulario.get('p2').value=='2'?1:0 + this.tuFormulario.get('p8').value=='4'?1:0,
        aventura:  parseInt(this.tuFormulario.get('p2').value),
        libre: this.tuFormulario.get('p3').value=='2'?1:0,
        noble:this.tuFormulario.get('p11').value=='1'?1:0+this.tuFormulario.get('p4').value=='4'?1:0,
        //Tauro
        confort: this.tuFormulario.get('p2').value=='0'?1:0 ,
        placer:this.tuFormulario.get('p11').value=='0'?1:0,
        persistencia: parseInt(this.tuFormulario.get('p13').value),
        leal: this.tuFormulario.get('p4').value=='2'?1:0,
        //Geminis
        adaptable:parseInt(this.tuFormulario.get('p5').value),
        curioso:parseInt(this.tuFormulario.get('p7').value),
        intelectual:this.tuFormulario.get('p3').value=='0'?1:0+ this.tuFormulario.get('p11').value=='4'?1:0,
        versatil:parseInt(this.tuFormulario.get('p9').value)+this.tuFormulario.get('p8').value=='3'?1:0,
        comunicativo:parseInt(this.tuFormulario.get('p6').value)+this.tuFormulario.get('p4').value=='3'?1:0,
        //Cancer
        emocional:parseInt(this.tuFormulario.get('p10').value)+this.tuFormulario.get('p11').value=='3'?1:0,
        empatico:this.tuFormulario.get('p4').value=='1'?1:0 + this.tuFormulario.get('p8').value=='2'?1:0,
        cariñoso:this.tuFormulario.get('p4').value=='1'?1:0,
        protector:this.tuFormulario.get('p8').value=='0'?1:0,
        //Leo
        carismatico: this.tuFormulario.get('p4').value=='0'?1:0,
        ambicioso:this.tuFormulario.get('p8').value=='1'?1:0,
        creativo:this.tuFormulario.get('p4').value=='0'?1:0 + this.tuFormulario.get('p11').value=='2'?1:0,
        dominante:parseInt(this.tuFormulario.get('p12').value), 
      };



      console.log(data);
      Swal.fire({
        title: 'Deseas enviar tus respuestas?',
        showCancelButton: true,
        confirmButtonText: 'Enviar',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.db.list('/respuestas').push(data)
            .then(() => {
              console.log('Datos guardados correctamente en Firebase.');
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Datos guardados correctamente',
                showConfirmButton: false,
                timer: 1500
              });
              this.tuFormulario.reset();
            })
            .catch(error => {
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Error al guardar datos en Firebase',
                showConfirmButton: false,
                timer: 1500
              })
              console.error('Error al guardar datos en Firebase:', error);
            });
        } else if (result.isDenied) {
          Swal.fire('Formulario no enviado', '', 'info')
        }
      });
      
    }
  }


}
