import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  capabilityForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.http.get('/assets/data.json').subscribe((data: any[]) => {
      this.capabilityForm = this.fb.group({
        capabilities: this.fb.array(
          data.map((datum) => this.generateDatumFormGroup(datum))
        ),
      });
    });
  }

  enableSection(index, disabled) {
    const capabilityFormGroup = (<FormArray>(
      this.capabilityForm.get('capabilities')
    )).at(index);
    disabled ? capabilityFormGroup.enable() : capabilityFormGroup.disable();
  }

  private generateDatumFormGroup(datum) {
    return this.fb.group({
      insulation: this.fb.control({ value: datum.insulation, disabled: true }),
      gate_size: this.fb.control({
        value: datum.gate_size,
        disabled: true,
      }),
      capacity_uom: this.fb.control({
        value: datum.capacity_uom,
        disabled: true,
      }),
      description_stcc: this.fb.control({
        value: datum.description_stcc,
        disabled: true,
      }),
    });
  }
}
