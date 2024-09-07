import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionsLeagueFormatComponent } from './champions-league-format.component';

describe('ChampionsLeagueFormatComponent', () => {
  let component: ChampionsLeagueFormatComponent;
  let fixture: ComponentFixture<ChampionsLeagueFormatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChampionsLeagueFormatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChampionsLeagueFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
