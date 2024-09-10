import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionSorteoComponent } from './configuracion-sorteo.component';

describe('ConfiguracionSorteoComponent', () => {
  let component: ConfiguracionSorteoComponent;
  let fixture: ComponentFixture<ConfiguracionSorteoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiguracionSorteoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguracionSorteoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
