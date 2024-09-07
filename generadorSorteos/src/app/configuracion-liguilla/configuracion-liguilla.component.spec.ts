import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionLiguillaComponent } from './configuracion-liguilla.component';

describe('ConfiguracionLiguillaComponent', () => {
  let component: ConfiguracionLiguillaComponent;
  let fixture: ComponentFixture<ConfiguracionLiguillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiguracionLiguillaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguracionLiguillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
