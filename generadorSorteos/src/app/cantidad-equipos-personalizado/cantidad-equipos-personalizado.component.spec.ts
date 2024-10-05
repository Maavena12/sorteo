import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CantidadEquiposPersonalizadoComponent } from './cantidad-equipos-personalizado.component';

describe('CantidadEquiposPersonalizadoComponent', () => {
  let component: CantidadEquiposPersonalizadoComponent;
  let fixture: ComponentFixture<CantidadEquiposPersonalizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CantidadEquiposPersonalizadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CantidadEquiposPersonalizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
