import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CantidadEquiposChampionsComponent } from './cantidad-equipos-champions.component';

describe('CantidadEquiposChampionsComponent', () => {
  let component: CantidadEquiposChampionsComponent;
  let fixture: ComponentFixture<CantidadEquiposChampionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CantidadEquiposChampionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CantidadEquiposChampionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
