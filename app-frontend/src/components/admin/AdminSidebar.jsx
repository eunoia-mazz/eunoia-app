// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   BarChart,
//   Users,
//   MessageSquare,
//   UserPlus,
//   DollarSign,
//   Layout,
//   Activity,
//   Settings,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";

// const navItems = [
//   { title: "Dashboard", href: "/admin/dashboard", icon: BarChart },
//   { title: "Users", href: "/admin/users", icon: Users },
//   { title: "Feedback", href: "/admin/feedback", icon: MessageSquare },
//   { title: "Therapists", href: "/admin/therapists", icon: UserPlus },
//   { title: "Finances", href: "/admin/financial-summary", icon: DollarSign },
//   { title: "Modules", href: "/admin/modules", icon: Layout },
//   { title: "Activities", href: "/admin/activities", icon: Activity },
//   { title: "Settings", href: "/admin/settings", icon: Settings },
// ];

// export default function AdminSidebar() {
//   const { pathname } = useLocation();

//   return (
//     <div className="flex flex-col w-64 bg-gray-800 text-white h-full">
//       <div className="flex items-center justify-start p-4 bg-gray-700">
//         <Link to="/admin/dashboard" className="flex items-center space-x-2">
//           <BarChart className="h-6 w-6 text-primary" />
//           <span className="text-2xl font-bold">Admin Panel</span>
//         </Link>
//       </div>
//       <div className="flex-1 px-4">
//         <div>
//           {navItems.map((item) => (
//             <div key={item.href} className="mb-2">
//               <Link
//                 to={item.href}
//                 className={`flex items-center space-x-3 rounded-lg px-3 py-2 transition-all hover:bg-accent ${
//                   pathname === item.href
//                     ? "bg-accent text-accent-foreground"
//                     : "text-muted-foreground"
//                 }`}
//               >
//                 <item.icon className="h-5 w-5" />
//                 <span>{item.title}</span>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="p-4">
//         <Button variant="outline" className="w-full">
//           Logout
//         </Button>
//         {/* <button>Logout</button> */}
//       </div>
//     </div>
//   );
// }
