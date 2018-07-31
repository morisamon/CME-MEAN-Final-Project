import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosekidComponent } from './choosekid.component';

describe('ChoosekidComponent', () => {
  let component: ChoosekidComponent;
  let fixture: ComponentFixture<ChoosekidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoosekidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosekidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
