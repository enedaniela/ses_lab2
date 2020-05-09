import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergyIntolerancesComponent } from './allergy-intolerances.component';

describe('AllergyIntolerancesComponent', () => {
  let component: AllergyIntolerancesComponent;
  let fixture: ComponentFixture<AllergyIntolerancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllergyIntolerancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllergyIntolerancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
