import { Component, OnInit } from '@angular/core';
import { Usermodel } from '../models/user'; 
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Userservice } from '../services/userservice';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.html',
  styleUrls: ['./users.css']
})
export class UserComponent implements OnInit {

  user: Usermodel = new Usermodel();
  isEditMode = false;
  userId!: number;

  constructor(
    private service: Userservice,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];

      if (id) {
        this.isEditMode = true;
        this.userId = +id;

        this.service.getUserById(this.userId).subscribe(data => {
          this.user = data;

          if (this.user.dateOfBirth) {
            this.user.dateOfBirth = this.user.dateOfBirth.split('T')[0];
          }
        });
      }
    });
  }

  saveUser(form: any) {

    if (form.invalid) {
      return; 
    }

    
    if (this.user.dateOfBirth) {
      const dob = new Date(this.user.dateOfBirth);
      const today = new Date();

      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }

      this.user.age = age;
      this.user.dateOfBirth = dob.toISOString();
    }

    if (this.isEditMode) {
      this.service.updateUser(this.userId, this.user).subscribe({
        next: () => {
          alert("Updated successfully");
          this.router.navigate(['/user-list']);
        },
        error: () => alert("Update failed")
      });
    } else {
      this.service.addUser(this.user).subscribe({
        next: () => {
          alert("Added successfully");
          this.router.navigate(['/user-list']);
        },
        error: () => alert("Add failed")
      });
    }
  }

  cancel() {
    this.router.navigate(['/user-list']);
  }
}