import { Component, OnInit } from '@angular/core';
import { Appointment } from '../models/appointment';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  appointments: Appointment[] = [];
  username: string = '';
  password: string = '';
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  login() {
    if (this.authService.login(this.username, this.password)) {
      this.isLoggedIn = true;
      this.loadAppointments();
    } else {
      alert('Invalid credentials');
    }
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
  }

  loadAppointments() {
    const savedAppointments = localStorage.getItem("appointments");
    this.appointments = savedAppointments ? JSON.parse(savedAppointments) : [];
  }

  deleteAppointment(index: number) {
    this.appointments.splice(index, 1);
    localStorage.setItem("appointments", JSON.stringify(this.appointments));
  }
}