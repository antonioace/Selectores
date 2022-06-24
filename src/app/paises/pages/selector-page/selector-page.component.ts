import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import { Pais } from '../../interfaces/paises.interfaces';

import { PaisServiceService } from '../../services/pais-service.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.css'],
})
export class SelectorPageComponent implements OnInit {
  regiones: string[] = [];

  paises: Pais[] = [];
  constructor(
    private fb: FormBuilder,
    private paisesService: PaisServiceService
  ) {}

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;

    // Cuando cambie la region

    this.miFormulario
      .get('region')
      ?.valueChanges.pipe(
        tap((_) => {
          this.miFormulario.get('pais')?.reset('');
        }),
        switchMap((region) => {
          return this.paisesService.getPaisesPorRegion(region);
        })
      )
      .subscribe((paises) => {
        this.paises = paises;
      });

    this.miFormulario.get('pais')?.valueChanges.subscribe((valor) => {
      console.log(valor);
    });
  }

  miFormulario: FormGroup = this.fb.group({
    region: ['', [Validators.required]],
    pais: ['', [Validators.required]],
    frontera: ['', [Validators.required]],
  });

  guardar() {}
}
