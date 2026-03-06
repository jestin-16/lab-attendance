"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function ScanPage() {

  const markAttendance = useMutation(api.attendance.markAttendance);
  const [barcode, setBarcode] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      const result = await markAttendance({ barcode });
      setMessage(result);
      setBarcode("");
    } catch (error:any) {
      setMessage(error.message);
    }
  };

  return (
    <div style={{padding:40}}>

      <h1>Lab Attendance Scanner</h1>

      <form onSubmit={handleSubmit}>
        <input
          autoFocus
          type="text"
          value={barcode}
          onChange={(e)=>setBarcode(e.target.value)}
          placeholder="Scan Student Barcode"
        />

        <button type="submit">Submit</button>
      </form>

      <h2>{message}</h2>

    </div>
  );
}