import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionTorneoPersonalizadoComponent } from './configuracion-torneo-personalizado.component';

describe('ConfiguracionTorneoPersonalizadoComponent', () => {
  let component: ConfiguracionTorneoPersonalizadoComponent;
  let fixture: ComponentFixture<ConfiguracionTorneoPersonalizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiguracionTorneoPersonalizadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguracionTorneoPersonalizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
