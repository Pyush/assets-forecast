import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetForecastComponent } from './asset-forecast.component';

describe('AssetForecastComponent', () => {
  let component: AssetForecastComponent;
  let fixture: ComponentFixture<AssetForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetForecastComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
