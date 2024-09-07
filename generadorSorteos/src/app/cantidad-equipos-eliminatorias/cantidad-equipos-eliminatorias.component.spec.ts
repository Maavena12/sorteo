import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CantidadEquiposEliminatoriasComponent } from './cantidad-equipos-eliminatorias.component';

describe('CantidadEquiposEliminatoriasComponent', () => {
  let component: CantidadEquiposEliminatoriasComponent;
  let fixture: ComponentFixture<CantidadEquiposEliminatoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CantidadEquiposEliminatoriasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CantidadEquiposEliminatoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
