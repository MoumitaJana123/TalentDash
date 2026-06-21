

// 'use server';

// import { revalidatePath } from "next/cache";

// export async function submitSalary(prevState: any, formData: FormData) {
//   try {
//     const payload = {
//       companyName: formData.get("companyId"),
//       role: formData.get("role"),
//       level: formData.get("level"),
//       location: formData.get("location"),
//       experience_years: parseInt(formData.get("experience") as string) || 0,
//       currency: formData.get("currency") || "INR",
//       base_salary: parseInt(formData.get("salary") as string) || 0,
//       bonus: parseInt(formData.get("bonus") as string) || 0,
//       stock: parseInt(formData.get("stock") as string) || 0,
//     };

//     console.log("Submitting Payload:", payload); // DEBUG: See what is actually being sent

//     const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
//     const res = await fetch(`${baseUrl}/api/ingest-salary`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(payload),
//     });

//     const data = await res.json();
    
//     if (!res.ok) {
//       throw new Error(data.error || "Failed to save data.");
//     }

//     revalidatePath("/salaries");
//     return { success: true };
//   } catch (error: any) {
//     console.error("Action Error:", error.message);
//     return { success: false, error: error.message }; // This MUST return to the UI
//   }
// }

'use server';

import { revalidatePath } from "next/cache";

export async function submitSalary(prevState: any, formData: FormData) {
  try {
    const payload = {
      companyName: formData.get("companyId"),
      role: formData.get("role"),
      level: formData.get("level"),
      location: formData.get("location"),
      experience_years: parseInt(formData.get("experience") as string) || 0,
      currency: formData.get("currency") || "INR",
      base_salary: parseInt(formData.get("salary") as string) || 0,
      // These will default to 0 if the user leaves them blank
      bonus: parseInt(formData.get("bonus") as string) || 0,
      stock: parseInt(formData.get("stock") as string) || 0,
    };

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/ingest-salary`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    
    if (!res.ok) throw new Error(data.error || "Failed to save data.");

    revalidatePath("/salaries");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}