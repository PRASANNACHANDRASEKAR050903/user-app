import { Component, OnInit } from '@angular/core';
import { Userservice } from '../services/userservice';
import { Usermodel } from '../models/user';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.html'
})
export class UserListComponent implements OnInit {

  users: Usermodel[] = [];   

  constructor(
    public router: Router,  
    private service: Userservice
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.service.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error("Error:", err);
      }
    });
  }

  goToAddUser() {
    this.router.navigate(['/user']);
  }

  editUser(id: number) {  
    this.router.navigate(['/user'], { queryParams: { id: id } });
  }

  deleteUser(id: number) {  
    if (confirm("Are you sure?")) {
      this.service.deleteUser(id).subscribe(() => {
        alert("Deleted successfully");
        this.loadUsers();
      });
    }
  }
}