import React, { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Calendar } from "./components/ui/calendar";     //I added this one
import { Select, SelectItem } from "./components/ui/select";
import { SelectContent, SelectTrigger, SelectValue } from "@radix-ui/react-select";
//import axios from 'axios';

const sports = ["Football", "Basketball", "Tennis", "Badminton", "Swimming"];
const timeslots = ["08:00 - 10:00", "10:00 - 12:00", "14:00 - 16:00", "16:00 - 18:00", "18:00 - 20:00"];

export default function BookingApp() {
  const [name, setName] = useState("");
  const [sport, setSport] = useState("");
  const [date, setDate] = useState(new Date());     //I edited this one
  const [time, setTime] = useState("");
  const [bookings, setBookings] = useState([]);

  const handleBooking = () => {
    if (name && sport && time) {
      setBookings([...bookings, { name, sport, time, date}]);
      setName("");
      setSport("");
      setTime("");
      setDate("");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Sports Center Booking</h1>
      <Card>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-10 justify-center items-center">
          <Input placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />

          <Select onValueChange={setSport}>
            <SelectTrigger className="w-40 h-20">
              <SelectValue placeholder="sport" />
            </SelectTrigger>
            <SelectContent>
            {sports.map(
              (sport) => {
              console.log(`${sport}`)
              return(<SelectItem key={sport} value={sport}>{sport}</SelectItem>)
              }
            )}
            </SelectContent>
          </Select>
          
          <div>
            <Calendar mode="single" selected={date} onSelect={setDate} />
            <p>Selected Date: {date ? date.toLocaleDateString() : "None"}</p>
          </div>
          <Select onValueChange={setTime}>
          <SelectTrigger className="w-40 h-20">
              <SelectValue placeholder="slot" />
            </SelectTrigger>
            <SelectContent>
            {timeslots.map((slot) => {
              console.log(`${slot}`)
              return (<SelectItem key={slot} value={slot}>{slot}</SelectItem>)
            })}
            </SelectContent>
          </Select>
          <Button onClick={handleBooking}>Book Now</Button>
          </div>
        </CardContent>
      </Card>
      <div className="mt-6 min-w-20 min-h-20 border border-b-2">
        <h2 className="text-lg font-semibold mb-2">Bookings</h2>
        {bookings.map((booking, index) => (
          <Card key={index} className="mb-2">
            <CardContent>
              <p><strong>Name:</strong> {booking.name}</p>
              <p><strong>Sport:</strong> {booking.sport}</p>
              <p><strong>Time:</strong> {booking.time}</p>
              <p><strong>Date:</strong>{booking.date.toLocaleDateString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
