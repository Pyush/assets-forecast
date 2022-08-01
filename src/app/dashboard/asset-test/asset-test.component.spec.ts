import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetTestComponent } from './asset-test.component';

describe('AssetTestComponent', () => {
  let component: AssetTestComponent;
  let fixture: ComponentFixture<AssetTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
