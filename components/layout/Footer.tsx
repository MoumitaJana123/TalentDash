

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-center items-center">
        
        {/* w-full forces it to span the container, text-center centers the content inside */}
        <p className="text-sm text-center w-full">
          © 2026 TalentDash. All rights reserved.
        </p>

      </div>
    </footer>
  );
}