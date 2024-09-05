import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {

  private _CategoriesService = inject(CategoriesService);

  brandsList:any[] = [];

  ngOnInit(): void {
    this._CategoriesService.getBrands().subscribe({
      next:(res)=>{
        // console.log(res);
        this.brandsList = res.data;
      }
    });
  }

}
