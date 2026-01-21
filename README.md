🎓 University Advisor Booking System (Frontend)

This is the frontend for a university advisor booking system built with React and React Bootstrap.

🎯 Description

The application allows students to book appointments with university advisors, and allows advisors to manage their available slots and student appointments.

The system supports two main user roles:

👨‍🎓 Students:
- Browse available advisor time slots
- Filter appointments by advisor and date
- Book an appointment
- Receive a confirmation email after booking

👩‍🏫 Advisors:
- Create and manage available time slots
- View appointments booked by students
- Mark appointments as completed

This project is currently frontend-focused, with mock data used for appointments. Email notifications are sent using **EmailJS**.

🧑‍💻 User Requirements

Students:
- View available advisor appointments
- Filter appointments by advisor and date
- Book an appointment
- Receive a confirmation email after booking

Advisors:
- Add new time slots (date, time, location)
- View all created time slots
- View student appointments
- Mark booked appointments as completed

General:
- Role-based navigation (Student / Advisor)
- Clean and responsive UI
- No backend required for core functionality

🛠️ Technologies

- React 18
- React Router
- React Bootstrap
- React Icons
- EmailJS (for booking confirmation emails)
- CSS (custom styling)
- Mock data (frontend only)

🚀 Getting Started

```bash
cd advisor-booking-frontend
npm install
npm run dev
