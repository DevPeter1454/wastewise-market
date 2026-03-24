import { Routes, Route } from "react-router-dom";
import AppShell from "./components/layout/AppShell";
import BuyerFeedPage from "./pages/BuyerFeedPage";
import VendorListingPage from "./pages/VendorListingPage";
import DisposalGuidePage from "./pages/DisposalGuidePage";
import CleaningDayPage from "./pages/CleaningDayPage";
import RecyclablesPage from "./pages/RecyclablesPage";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<BuyerFeedPage />} />
        <Route path="/sell" element={<VendorListingPage />} />
        <Route path="/guide" element={<DisposalGuidePage />} />
        <Route path="/cleaning" element={<CleaningDayPage />} />
        <Route path="/recyclables" element={<RecyclablesPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </AppShell>
  );
}
