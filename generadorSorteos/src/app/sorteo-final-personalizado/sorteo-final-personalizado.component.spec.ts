import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SorteoFinalPersonalizadoComponent } from './sorteo-final-personalizado.component';

describe('SorteoFinalPersonalizadoComponent', () => {
  let component: SorteoFinalPersonalizadoComponent;
  let fixture: ComponentFixture<SorteoFinalPersonalizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SorteoFinalPersonalizadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SorteoFinalPersonalizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
