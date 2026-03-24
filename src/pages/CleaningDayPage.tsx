import { useState, useCallback } from "react";
import Icon from "../components/shared/Icon";
import Toast from "../components/shared/Toast";
import { useCleaningDay } from "../hooks/useCleaningDay";

const GALLERY_IMAGES = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEL3SxSYm9ik9okYOYwzG0ciGJwbyBwq_5x72cnAAau4LMz7MVL6QdSRZFQEZOcid--RNfIYmTJxFZ6KrdiT558DY4nmZHTkN-6zmIYOnGmkyPB-nwcby8MmVVvNfuXg-kAMKwGD6Kzyn7PKvmfK5EGDsKIcZ9o8YO_I0Tf1NtuvpIDnRFKk_ExwdMSHlf9HrKcy-nqVgemCJbgPSekD2ccR7SIR2G_9EeAPQRq8l9G71J4Ijyqr2jGy2W8mkpFB9Ic-T8vtsX648",
    alt: "Market view",
    label: "Last Month's Success",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1--2hnpqz0LfbazFW71uvTEjDXY05YiQC4MW6KM55-naDta4VEP4T1GBTEgWPb6veZauA9hfmtKz4ftduqfrx5F7e_6zSoSyxx6Bklzl-yPOBPS_yRum2ebdSr_eO-jUhC1B0g-U17JmlnP0wiBfKRS3ermxKorxa3vnbn-4faWOT3vkOhgj5jVJYhkhXifKf5X2m13MOJ5fkuNzqJHHb1cyYPOibvnTsSk9ei62V3hLprjNq8JpCYzkgtNo20_H_G1PwlByvvas",
    alt: "Recycling effort",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6Mr30dznXBaT4p499nntQSCyFPvAW1aFjPfwKW5oe55EFYpYk_IXfUJMRupD8h__yJ_ZCy_RE5EV4IpHbMspP1xYnMVZjUfUquhHBG4pT5-43WCAmDXCzUr5Jj1YJ-nvAet-Y37e8XAVJ9wBuzwdhy5Y-FmT4Jpe_YAAQXCRB-M_7CsBUpHfB0u8Xh2sO5FWTP0RAWJP-cPUaSxrM0rbF2XoZnVP16ZKiIOOYqYVItrvE11g9g-9UqUFYYurFgGM17f6BqkJ6Ubs",
    alt: "Community gathering",
  },
];

const AVATAR_URLS = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCRJvRnzgy_W7cjCoReYVxggqr67E8iVdrw3FvIVZQuTpDt7s-I5sbuAdGEJYppHD_duKKX6WqYJGBSXoJAdjN72M82RJs7fw1jdcyzlreUdfrbyATRK7b7TWYdVfG_WhF6ZJDhZ17qpn4pt5IkLN2_bLgodhkJ9oDtrmamWvd2eFvCrlaDIhta3vTemX5hj1D5bN49Y8Ld952t-3awPh2QL0MtlNi49_Hlyaf34n_v7Iks_bKGEZw7VUsLPywwhhaQJYKpwVqstyo",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBkXaFJu5pnlkZmLTFNQE_p1xSum4wgRBEkO2hTrfOQAWtZHCH1aXYPnEY-yznEAkfEEuBU6IoCG6ZQ63MjBRWpTL372ToEp5UupLNzY2-Uzu3M3vTelXs6KO3YGptjY64Ypv8F5gNDbn3f4dkCtfQSVW9g6s8dDMMfhAIiDBU4R8inEkkXWFSJ_PM0EwQdHfFr0REyRVqSlwjDmaFn_9mO8GetFb8PNCQ8wGbLs-sy1FHiWSLFGoL058DFYYxNX9r5sB5eOGBk7Y4",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuABVt8qsmgS43y3SGi4enIm83dURPugzu0WtqrJtqluTNsZb35qDtVIGf5PfX2RTojZMWe59KbTXo2YiSib8D36nin_SZRrfHEwX2FLLoguNsIncHCrb1VsYM4ppUUbeoTSr6iR0rMfpF4vmgqlBD5dkTCn_PzuiPj4Rg3NVqNKv6_gEYk5TU_VEowz8POAxsCkVeNKQqsW_IpkuoNRsKtkwilNYNJ8IZRe_koRRUrVKF21qI62KVEs_IGOMWN_-qjd3mfvEhZ1HLs",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDiXl5_if3hCpXDSJscDl1V9aTNwyfj3famsxWk-uXXnoEO6Gsle3f91DzDy5zJbNpNTkVOOVubzya-Z8IGJfrZO7afzKIoPIXDi-gDmGzRdUYN5MDUe4WmGn9QZA8iBWsEDAJdZD7-T_HY9Qzxsxytpnbauhd76Ppm01f1OEQpQ2e5g42dcwQz2H0kxkhHyk8veS6DmWH-oqc7tUu7HrVAM8vlA4U_l0_-PLvzvpj9hfTAI9otz7ikKh1Vio5xcLA7z8KoV_qEAts",
];

export default function CleaningDayPage() {
  const { event, loading, joinCleaningDay } = useCleaningDay();
  const [name, setName] = useState("");
  const [stallNumber, setStallNumber] = useState("");
  const [joined, setJoined] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const hideToast = useCallback(() => setToastVisible(false), []);

  const handleJoin = async () => {
    if (!name.trim() || !stallNumber.trim()) return;
    const vendorName = name.trim();
    await joinCleaningDay(vendorName, stallNumber);
    setName("");
    setStallNumber("");
    setJoined(true);
    setToastMessage(`Welcome aboard, ${vendorName}! See you on cleaning day`);
    setToastVisible(true);
    setTimeout(() => setJoined(false), 3000);
  };

  if (loading || !event) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  const progressPercent = Math.round(
    (event.currentParticipants / event.targetParticipants) * 100
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-on-surface">
            Cleaning Day Tracker
          </h1>
          <p className="text-secondary mt-2 max-w-2xl text-lg">
            Join our community effort to keep the market sustainable and
            pristine for everyone.
          </p>
        </div>
        <div className="hidden lg:flex items-center bg-tertiary-fixed text-on-tertiary-fixed px-6 py-3 rounded-full font-bold shadow-sm">
          <Icon name="stars" filled className="mr-2" />
          Earn 50 Eco-Points
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Event & Signup */}
        <div className="lg:col-span-7 space-y-8">
          {/* Event Card */}
          <section className="bg-surface-container-lowest p-6 lg:p-8 rounded-xl shadow-[0px_10px_40px_rgba(19,27,46,0.04)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
            <div className="flex items-start justify-between relative z-10">
              <div className="space-y-4">
                <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Upcoming Event
                </span>
                <h2 className="text-2xl lg:text-3xl font-bold">{event.date}</h2>
                <div className="flex flex-col gap-2 text-secondary">
                  <div className="flex items-center gap-2">
                    <Icon name="schedule" className="text-primary" />
                    <span className="font-medium">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="location_on" className="text-primary" />
                    <span className="font-medium">{event.location}</span>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block bg-surface-container-low p-6 rounded-[1rem] text-primary">
                <Icon
                  name="calendar_today"
                  filled
                  className="!text-6xl"
                />
              </div>
              <div className="lg:hidden bg-primary/10 p-3 rounded-[1rem]">
                <Icon name="calendar_today" className="text-primary" />
              </div>
            </div>
          </section>

          {/* Participation Progress */}
          <section className="bg-surface-container-low lg:bg-surface-container p-6 lg:p-8 rounded-xl">
            <div className="flex justify-between items-end mb-4">
              <h3 className="text-lg lg:text-xl font-bold">
                {event.currentParticipants} vendors have joined so far!
              </h3>
              <span className="hidden lg:inline text-primary font-bold">
                {event.currentParticipants} / {event.targetParticipants} Vendors
              </span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-3 lg:h-4 bg-primary-fixed rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex -space-x-3">
                {AVATAR_URLS.map((url, i) => (
                  <img
                    key={i}
                    alt={`Vendor ${i + 1}`}
                    className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border-4 border-surface-container-low object-cover"
                    src={url}
                  />
                ))}
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border-4 border-surface-container-low bg-surface-container-high flex items-center justify-center text-xs font-bold text-on-surface-variant">
                  +{event.currentParticipants - 4}
                </div>
              </div>
              <p className="hidden lg:block text-sm text-on-surface-variant font-medium">
                Join {event.currentParticipants} others in making an impact!
              </p>
              <div className="lg:hidden flex text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60 gap-4">
                <span>0 joined</span>
                <span>{event.targetParticipants} Target</span>
              </div>
            </div>
          </section>

          {/* Signup Form */}
          <section className="bg-surface-container-lowest p-6 lg:p-8 rounded-xl shadow-[0px_10px_40px_rgba(19,27,46,0.04)]">
            <h3 className="text-xl font-bold mb-6">Count Me In</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-on-surface-variant px-1">
                  Your Name
                </label>
                <input
                  className="w-full bg-surface-container-highest border-none rounded-[1rem] px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none"
                  placeholder="e.g. Alex Green"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-on-surface-variant px-1">
                  Stall Number
                </label>
                <input
                  className="w-full bg-surface-container-highest border-none rounded-[1rem] px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none"
                  placeholder="e.g. B-12"
                  type="text"
                  value={stallNumber}
                  onChange={(e) => setStallNumber(e.target.value)}
                />
              </div>
              <button
                onClick={handleJoin}
                disabled={!name.trim() || !stallNumber.trim()}
                className="lg:col-span-2 w-full h-14 lg:h-16 bg-gradient-to-r from-primary to-primary-container text-white py-5 rounded-full font-extrabold text-lg shadow-lg hover:shadow-xl active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {joined ? (
                  <>
                    <Icon name="check_circle" />
                    You're In!
                  </>
                ) : (
                  <>
                    Join Cleaning Day
                    <Icon name="auto_awesome" />
                  </>
                )}
              </button>
            </div>
          </section>

          {/* Mobile: Eco-Points Badge */}
          <div className="lg:hidden flex justify-center">
            <div className="inline-flex items-center gap-2 bg-tertiary-fixed px-4 py-2 rounded-full shadow-sm">
              <Icon
                name="eco"
                filled
                className="text-on-tertiary-fixed-variant text-sm"
              />
              <span className="text-xs font-bold text-on-tertiary-fixed-variant">
                Earn 50 Eco-Points for participating
              </span>
            </div>
          </div>

          {/* Mobile: Community Image */}
          <div className="lg:hidden pt-4 pb-12">
            <div className="h-48 w-full rounded-xl overflow-hidden relative">
              <img
                className="w-full h-full object-cover"
                alt="Community marketplace"
                src={GALLERY_IMAGES[0].src}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Right Column: Impact Gallery (Desktop only) */}
        <div className="hidden lg:block lg:col-span-5 space-y-8">
          <section className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Impact Gallery</h3>
              <button className="text-primary font-bold text-sm hover:underline">
                View All
              </button>
            </div>
            {/* Bento Grid Gallery */}
            <div className="grid grid-cols-2 gap-4 flex-grow">
              <div className="col-span-2 relative aspect-video rounded-[1rem] overflow-hidden group">
                <img
                  alt={GALLERY_IMAGES[0].alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  src={GALLERY_IMAGES[0].src}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <span className="text-white font-bold">
                    {GALLERY_IMAGES[0].label}
                  </span>
                </div>
              </div>
              {GALLERY_IMAGES.slice(1).map((img) => (
                <div
                  key={img.alt}
                  className="aspect-square rounded-[1rem] overflow-hidden group"
                >
                  <img
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    src={img.src}
                  />
                </div>
              ))}
              <div className="col-span-2 bg-surface-container-low p-6 rounded-[1rem] flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                    <Icon name="eco" filled />
                  </div>
                  <div>
                    <div className="text-lg font-bold">2.4 Tons Collected</div>
                    <div className="text-sm text-secondary">
                      Recyclables diverted since Jan
                    </div>
                  </div>
                </div>
                <Icon name="chevron_right" className="text-secondary" />
              </div>
            </div>
          </section>
        </div>
      </div>

      <Toast
        message={toastMessage}
        icon="celebration"
        visible={toastVisible}
        onClose={hideToast}
      />
    </div>
  );
}
