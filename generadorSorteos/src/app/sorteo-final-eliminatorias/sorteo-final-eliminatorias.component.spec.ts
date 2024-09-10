import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SorteoFinalEliminatoriasComponent } from './sorteo-final-eliminatorias.component';

describe('SorteoFinalEliminatoriasComponent', () => {
  let component: SorteoFinalEliminatoriasComponent;
  let fixture: ComponentFixture<SorteoFinalEliminatoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SorteoFinalEliminatoriasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SorteoFinalEliminatoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
