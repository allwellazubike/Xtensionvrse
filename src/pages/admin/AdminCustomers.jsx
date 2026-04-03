import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../components/admin/AdminLayout";

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = customers.filter((customer) => {
    const query = searchQuery.toLowerCase();
    return (
      (customer.full_name && customer.full_name.toLowerCase().includes(query)) ||
      (customer.email && customer.email.toLowerCase().includes(query)) ||
      (customer.id && String(customer.id).includes(query))
    );
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get((import.meta.env.VITE_API_URL || "http://localhost:3000") + "/api/user/all");
      setCustomers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex-1 flex items-center justify-center p-10 text-center text-[#181113] dark:text-white">
          <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex-1 overflow-auto p-6 md:p-8 relative">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#181113] dark:text-white">
                Customers
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Manage your registered users and their details.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-[#2d1b22] p-6 rounded-2xl shadow-sm border border-[#e6dbdf] dark:border-[#4a2e36] col-span-1">
              <div className="flex items-center justify-between mb-4">
                <div className="size-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined">group</span>
                </div>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">
                Total Customers
              </p>
              <h3 className="text-3xl font-bold text-[#181113] dark:text-white">
                {customers.length}
              </h3>
            </div>
          </div>

          <div className="bg-white dark:bg-[#2d1b22] rounded-2xl shadow-sm border border-[#e6dbdf] dark:border-[#4a2e36] overflow-hidden">
            <div className="p-4 border-b border-[#e6dbdf] dark:border-[#4a2e36] flex flex-wrap items-center justify-between gap-4">
              <div className="relative w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search customers by name, email, or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:max-w-md pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-[#e6dbdf] dark:border-[#4a2e36] rounded-xl text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none dark:text-white transition-all"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              {filteredCustomers.length === 0 ? (
                <div className="p-10 text-center text-gray-500">
                  {customers.length === 0 ? "No customers registered." : "No customers found matching your search."}
                </div>
              ) : (
                <table className="w-full text-left">
                  <thead className="bg-[#fcfbfb] dark:bg-white/5 border-b border-[#e6dbdf] dark:border-[#4a2e36]">
                    <tr>
                      <th className="p-4 font-bold text-xs text-[#89616f] dark:text-white/60 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="p-4 font-bold text-xs text-[#89616f] dark:text-white/60 uppercase tracking-wider">
                        User ID
                      </th>
                      <th className="p-4 font-bold text-xs text-[#89616f] dark:text-white/60 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="p-4 font-bold text-xs text-[#89616f] dark:text-white/60 uppercase tracking-wider">
                        Joined
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e6dbdf] dark:divide-[#4a2e36]">
                    {filteredCustomers.map((customer) => (
                      <tr
                        key={customer.id}
                        className="hover:bg-[#fbf9fa] dark:hover:bg-white/5 transition-colors"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg shrink-0">
                              {customer.full_name
                                ? customer.full_name.charAt(0).toUpperCase()
                                : "?"}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[#181113] dark:text-white">
                                {customer.full_name || "Unknown"}
                              </p>
                              <p className="text-xs text-[#89616f] dark:text-white/50">
                                {customer.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 font-mono font-medium text-sm text-[#5d4a51] dark:text-white/70">
                          {customer.id}
                        </td>
                        <td className="p-4 text-sm text-[#5d4a51] dark:text-white">
                          {customer.phone || "-"}
                        </td>
                        <td className="p-4 text-sm text-[#89616f] dark:text-white/70">
                          {customer.created_at
                            ? new Date(customer.created_at).toLocaleDateString()
                            : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Pagination Placeholder */}
            <div className="p-4 border-t border-[#e6dbdf] dark:border-[#4a2e36] flex items-center justify-between">
              <button className="px-4 py-2 border border-[#e6dbdf] dark:border-[#4a2e36] rounded-lg text-sm font-medium text-[#5d4a51] dark:text-white/70 hover:bg-[#f4f0f2] dark:hover:bg-white/5 disabled:opacity-50">
                Previous
              </button>
              <div className="flex gap-1">
                <button className="size-8 flex items-center justify-center rounded-lg bg-primary text-white text-sm font-medium">
                  1
                </button>
              </div>
              <button
                className="px-4 py-2 border border-[#e6dbdf] dark:border-[#4a2e36] rounded-lg text-sm font-medium text-[#5d4a51] dark:text-white/70 hover:bg-[#f4f0f2] dark:hover:bg-white/5"
                disabled
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCustomers;
