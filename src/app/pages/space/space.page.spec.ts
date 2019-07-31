import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacePage } from './space.page';

describe('SpacePage', () => {
  let component: SpacePage;
  let fixture: ComponentFixture<SpacePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpacePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
