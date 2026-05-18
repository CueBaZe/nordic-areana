export default function Footer() {
    return (
        <div>
            <footer className="w-full bg-[#0F172A] text-white px-6 py-10">
            
                <div className="max-w-6xl mx-auto grid grid-cols-2 gap-10">

                    <div className="flex flex-col space-y-1 max-w-md text-center">
                        <h1 className="text-md md:text-lg font-bold mb-2">Privacy Policy for Nordic Arena</h1>
                        <div className="text-xs md:text-sm">
                            <p className="text-slate-200">Nordic Arena kan registrere personoplysninger som for eksempel dit navn, din email-adresse, dit telefonnummer, samt oplysninger om dine bookinger og aktiviteter på platformen. Der kan også blive registreret tekniske oplysninger som IP-adresse og enhedsdata for at sikre funktionalitet og sikkerhed</p>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-1 text-center">
                        <h1 className="text-md md:text-xl font-bold mb-2">Kontakt</h1>

                        <div className="text-sm md:text-md">
                            <p className="text-slate-200">Email: hello@nordicarena.dev</p>
                            <p className="text-slate-200">Phone: +00 123 456 789</p>
                            <p className="text-slate-200">Address: Example Street 12, 1000 Copenhagen</p>
                            <p className="text-slate-200">Support hours: Mon–Fri 09:00–16:00</p>
                        </div>
                    </div>

                </div>
            </footer>
            <div className="bg-[#0F192A] border border-2 border-t-[#0F292A] text-center">
                <p className="text-white text-lg">Udviklet af <span className="text-[#60A5FA] font-bold">Que Production</span></p>
            </div>
        </div>
    );
}