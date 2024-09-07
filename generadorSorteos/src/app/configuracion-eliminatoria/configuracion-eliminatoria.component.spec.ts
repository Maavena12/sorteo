import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionEliminatoriaComponent } from './configuracion-eliminatoria.component';

describe('ConfiguracionEliminatoriaComponent', () => {
  let component: ConfiguracionEliminatoriaComponent;
  let fixture: ComponentFixture<ConfiguracionEliminatoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiguracionEliminatoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguracionEliminatoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
