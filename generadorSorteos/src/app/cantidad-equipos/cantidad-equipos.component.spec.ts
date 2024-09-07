import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CantidadEquiposComponent } from './cantidad-equipos.component';

describe('CantidadEquiposComponent', () => {
  let component: CantidadEquiposComponent;
  let fixture: ComponentFixture<CantidadEquiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CantidadEquiposComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CantidadEquiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
