import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagCloudPessoalComponent } from './tag-cloud-pessoal.component';

describe('TagCloudPessoalComponent', () => {
  let component: TagCloudPessoalComponent;
  let fixture: ComponentFixture<TagCloudPessoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagCloudPessoalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagCloudPessoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
