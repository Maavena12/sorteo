import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionFinalLiguillaComponent } from './configuracion-final-liguilla.component';

describe('ConfiguracionFinalLiguillaComponent', () => {
  let component: ConfiguracionFinalLiguillaComponent;
  let fixture: ComponentFixture<ConfiguracionFinalLiguillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiguracionFinalLiguillaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguracionFinalLiguillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
