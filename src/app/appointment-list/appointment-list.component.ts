import { Component } from '@angular/core';
import { Appointment, Service } from '../models/appointment';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  newAppointmentTitle: string = "";
  newAppointmentDate: Date = new Date();
  selectedService: Service | null = null;

  appointments: Appointment[] = [];

  services: Service[] = [
    {
      name: "Classic Haircut",
      price: 25,
      duration: "30 min",
      image: "https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg"
    },
    {
      name: "Beard Trim",
      price: 15,
      duration: "20 min",
      image: "https://images.pexels.com/photos/1319461/pexels-photo-1319461.jpeg"
    },
    {
      name: "Hot Shave",
      price: 30,
      duration: "45 min",
      image: "https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg"
    },
    {
      name: "Hair + Beard Combo",
      price: 35,
      duration: "50 min",
      image: "https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg"
    }
  ];

  ngOnInit(): void {
    let savedAppointments = localStorage.getItem("appointments");
    this.appointments = savedAppointments ? JSON.parse(savedAppointments) : [];
  }

  selectService(service: Service) {
    this.selectedService = service;
    this.newAppointmentTitle = service.name;
  }

  addAppointment() {
    if (this.newAppointmentTitle.trim().length && this.newAppointmentDate && this.selectedService) {
      let newAppointment: Appointment = {
        id: Date.now(),
        title: this.newAppointmentTitle,
        service: this.selectedService.name,
        price: this.selectedService.price,
        date: this.newAppointmentDate
      };

      this.appointments.push(newAppointment);
      this.newAppointmentTitle = "";
      this.newAppointmentDate = new Date();
      this.selectedService = null;

      localStorage.setItem("appointments", JSON.stringify(this.appointments));
    }
  }

  deleteAppointment(index: number) {
    this.appointments.splice(index, 1);
    localStorage.setItem("appointments", JSON.stringify(this.appointments));
  }
}