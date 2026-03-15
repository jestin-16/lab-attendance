"use client";

import { useState, type FormEvent } from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

export default function AttendancePage() {
  const markAttendance = useMutation(api.attendance.markAttendance);
  const [barcode, setBarcode] = useState("");
  const [message, setMessage] = useState("");
  const now = new Date().toLocaleString();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await markAttendance({ barcode: barcode.trim() });
      setMessage(result);
      setBarcode("");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      setMessage(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-[#eceef2] text-slate-700">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
        <p className="text-sm text-slate-400">{now}</p>
        <button
          type="button"
          className="rounded-md border border-blue-500 px-5 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
        >
          Admin Login
        </button>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-col items-center px-4 pb-24 pt-10 sm:px-6">
        <section className="text-center">
          <h1 className="font-[Georgia,Times_New_Roman,serif] text-4xl font-bold text-slate-800 sm:text-5xl">
            XXX College XXXXXXXXXX
          </h1>
          <p className="mt-3 font-[Georgia,Times_New_Roman,serif] text-2xl text-slate-700 sm:text-3xl">
            Department Of Computer Applications
          </p>
          <p className="mt-2 text-xl text-slate-700 sm:text-2xl">
            Lab Attendance Data Management System
          </p>
        </section>

        <section className="mt-12 w-full max-w-md text-center">
          <h2 className="mb-4 font-[Georgia,Times_New_Roman,serif] text-2xl text-slate-800">
            Enter Barcode Manually
          </h2>

          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-slate-200 bg-white p-2 shadow-sm"
          >
            <div className="flex gap-2">
              <input
                autoFocus
                type="text"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                placeholder="Enter barcode"
                className="w-full rounded-md border border-slate-200 px-4 py-2 text-base outline-none ring-blue-300 transition placeholder:text-slate-400 focus:ring-2"
              />
              <button
                type="submit"
                className="rounded-md bg-blue-300 px-6 py-2 text-base font-semibold text-white transition hover:bg-blue-400"
              >
                Submit
              </button>
            </div>
          </form>

          <p className="mt-8 text-lg text-slate-600">
            {message}
          </p>
        </section>

        <section className="mt-12 grid w-full gap-6 md:grid-cols-3">
          <article className="rounded-xl border-l-4 border-l-blue-500 bg-white p-6 shadow-md">
            <p className="text-2xl font-semibold text-slate-700">Marked In Today</p>
            <p className="mt-6 text-5xl font-bold text-emerald-500">0</p>
          </article>

          <article className="rounded-xl border-l-4 border-l-rose-500 bg-white p-6 shadow-md">
            <p className="text-2xl font-semibold text-slate-700">Marked Out Today</p>
            <p className="mt-6 text-5xl font-bold text-rose-500">0</p>
          </article>

          <article className="rounded-xl border-l-4 border-l-emerald-500 bg-white p-6 shadow-md">
            <p className="text-2xl font-semibold text-slate-700">Currently Signed In</p>
            <p className="mt-6 text-5xl font-bold text-blue-500">0</p>
          </article>
        </section>
      </main>

      <footer className="fixed inset-x-0 bottom-0 border-t border-slate-200 bg-white py-4">
        <div className="mx-auto flex w-full max-w-5xl justify-center px-4 sm:px-6">
          <button
            type="button"
            className="rounded-lg bg-blue-600 px-10 py-3 text-lg font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Register a Complaint
          </button>
        </div>
      </footer>
    </div>
  );
}