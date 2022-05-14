import { ElasticsearchService } from './service/elasticsearch.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  myForm: FormGroup;
  response: any;
  sub: Subscription;
  indexes: Array<any> = [
    { name: 'Abandoned Mines', value: 'abandoned-mine' },
    { name: 'Drill Hole', value: 'drill-hole' }
  ];

  constructor(private elasticsearchService: ElasticsearchService,
              private fb: FormBuilder){
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      indexCheckArray: this.fb.array([], [Validators.required]),
      terms: ['', Validators.required]
    });
  }

  search(){
    if (!this.myForm.valid) {
      return;
    }
    this.response = [];
    const request = {
      indexNames: this.indexCheckArray.value,
      terms: this.terms.value
    }

    this.sub = this.elasticsearchService.search(request).subscribe({
      next: (res) => {
        const docs = res.hits.map(v => {
          v._source.id = v._id;
          return v._source;
        });
        this.response.push(docs);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  onCheckboxChange(e: any) {
    this.indexCheckArray.markAllAsTouched();
    const checkArray: FormArray = this.indexCheckArray as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  ngOnDestroy(): void {
      if (this.sub) {
        this.sub.unsubscribe();
      }
  }

  get indexCheckArray() {
    return this.myForm.get('indexCheckArray');
  }

  get terms() {
    return this.myForm.get('terms');
  }

}
