import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategories } from '../../core/interfaces/icategories';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{

  private _CategoriesService = inject(CategoriesService);
  categoriesList:Icategories[] = [];

  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.categoriesList = res.data;
        // console.log(res);
      }
    });
  }

  
}
