import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../components/admin/AdminLayout";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

const ALL_NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa",
  "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti",
  "Enugu", "FCT (Abuja)", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano",
  "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger",
  "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto",
  "Taraba", "Yobe", "Zamfara",
];

const AdminSettings = () => {
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(null); // zoneId being saved
  const [deleting, setDeleting] = useState(null);

  // New zone form
  const [newState, setNewState] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [addError, setAddError] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchZones();
  }, []);

  const fetchZones = async () => {
    try {
      const { data } = await axios.get(`${API}/api/shipping/all`);
      setZones(data);
    } catch (err) {
      console.error("Failed to load shipping zones:", err);
    } finally {
      setLoading(false);
    }
  };

  // States not yet added
  const availableStates = ALL_NIGERIAN_STATES.filter(
    (s) => !zones.some((z) => z.state.toLowerCase() === s.toLowerCase())
  );


  const handlePriceChange = (id, value) => {
    setZones((prev) =>
      prev.map((z) => (z.id === id ? { ...z, price: value } : z))
    );
  };

  const handleSavePrice = async (zone) => {
    setSaving(zone.id);
    try {
      await axios.put(`${API}/api/shipping/${zone.id}`, {
        price: parseFloat(zone.price),
      });
    } catch (err) {
      alert("Failed to update price");
    } finally {
      setSaving(null);
    }
  };

  const handleToggleActive = async (zone) => {
    try {
      const { data } = await axios.put(`${API}/api/shipping/${zone.id}`, {
        is_active: !zone.is_active,
      });
      setZones((prev) => prev.map((z) => (z.id === zone.id ? data : z)));
    } catch (err) {
      alert("Failed to update zone");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this shipping zone?")) return;
    setDeleting(id);
    try {
      await axios.delete(`${API}/api/shipping/${id}`);
      setZones((prev) => prev.filter((z) => z.id !== id));
    } catch (err) {
      alert("Failed to delete zone");
    } finally {
      setDeleting(null);
    }
  };

  const handleAddZone = async (e) => {
    e.preventDefault();
    setAddError("");
    if (!newState.trim() || !newPrice) {
      setAddError("Both state and price are required.");
      return;
    }
    setAdding(true);
    try {
      const { data } = await axios.post(`${API}/api/shipping`, {
        state: newState.trim(),
        price: parseFloat(newPrice),
      });
      setZones((prev) => [...prev, data].sort((a, b) => a.state.localeCompare(b.state)));
      setNewState("");
      setNewPrice("");
    } catch (err) {
      setAddError(err.response?.data?.error || "Failed to add zone.");
    } finally {
      setAdding(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex-1 overflow-auto p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[#181113] dark:text-white mb-2">
            Settings
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
            Manage your store's operational settings without touching any code.
          </p>

          {/* ── Shipping Zones ─────────────────────────────────────────── */}
          <div className="bg-white dark:bg-background-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden mb-8">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <span className="material-symbols-outlined text-primary">local_shipping</span>
              </div>
              <div>
                <h2 className="font-bold text-[#181113] dark:text-white">Shipping Zones</h2>
                <p className="text-xs text-gray-400">
                  Set delivery prices per state. Toggle off to hide a state from checkout.
                </p>
              </div>
            </div>

            {/* Zone list */}
            {loading ? (
              <div className="p-8 flex justify-center">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="divide-y divide-gray-50 dark:divide-gray-800">
                {zones.map((zone) => (
                  <div
                    key={zone.id}
                    className={`flex items-center gap-4 px-6 py-4 transition-colors ${
                      !zone.is_active ? "opacity-50" : ""
                    }`}
                  >
                    {/* Active toggle */}
                    <button
                      onClick={() => handleToggleActive(zone)}
                      title={zone.is_active ? "Disable zone" : "Enable zone"}
                      className={`w-10 h-5 rounded-full transition-colors flex-shrink-0 relative ${
                        zone.is_active ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                          zone.is_active ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>

                    {/* State name */}
                    <span className="flex-1 font-medium text-[#181113] dark:text-white text-sm">
                      {zone.state}
                    </span>

                    {/* Price input */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">₦</span>
                      <input
                        type="number"
                        value={zone.price}
                        onChange={(e) => handlePriceChange(zone.id, e.target.value)}
                        className="w-24 text-sm text-right border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1.5 bg-gray-50 dark:bg-gray-800 text-[#181113] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                      <button
                        onClick={() => handleSavePrice(zone)}
                        disabled={saving === zone.id}
                        className="text-xs font-semibold px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg transition-colors disabled:opacity-50"
                      >
                        {saving === zone.id ? "Saving..." : "Save"}
                      </button>
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(zone.id)}
                      disabled={deleting === zone.id}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Remove state"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                ))}

                {zones.length === 0 && (
                  <p className="p-8 text-center text-gray-400 text-sm">
                    No shipping zones yet. Add one below.
                  </p>
                )}
              </div>
            )}

            {/* Add new zone form */}
            <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30">
              <h3 className="text-sm font-bold text-[#181113] dark:text-white mb-3">
                Add New State
              </h3>
              <form onSubmit={handleAddZone} className="flex flex-col sm:flex-row gap-3">
                <select
                  value={newState}
                  onChange={(e) => setNewState(e.target.value)}
                  className="flex-1 text-sm border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 bg-white dark:bg-gray-800 text-[#181113] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="">Select a state...</option>
                  {availableStates.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">₦</span>
                  <input
                    type="number"
                    placeholder="Price"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-28 text-sm border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 bg-white dark:bg-gray-800 text-[#181113] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <button
                  type="submit"
                  disabled={adding}
                  className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {adding ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <span className="material-symbols-outlined text-[18px]">add</span>
                  )}
                  Add State
                </button>
              </form>
              {addError && (
                <p className="text-red-500 text-xs mt-2">{addError}</p>
              )}
            </div>
          </div>

          {/* Placeholder for future settings sections */}
          <div className="bg-white dark:bg-background-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 opacity-50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
                <span className="material-symbols-outlined text-gray-400">settings</span>
              </div>
              <div>
                <h2 className="font-bold text-[#181113] dark:text-white">More Settings</h2>
                <p className="text-xs text-gray-400">Additional store settings coming soon.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
