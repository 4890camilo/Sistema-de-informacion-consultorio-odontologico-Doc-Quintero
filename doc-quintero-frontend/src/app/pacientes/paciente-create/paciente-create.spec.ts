import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteCreate } from './paciente-create';

describe('PacienteCreate', () => {
  let component: PacienteCreate;
  let fixture: ComponentFixture<PacienteCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacienteCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(PacienteCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
