import {
  BookOpen,
  Users,
  Calendar,
  BarChart3,
  Shield,
  Zap,
} from "lucide-react";

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 border border-slate-200">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
};

const Section1 = () => {
  return (
    <div>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Users className="w-10 h-10 text-blue-600" />}
            title="Student Management"
            description="Efficiently manage student records, attendance, grades, and performance tracking in one unified system."
          />
          <FeatureCard
            icon={<Calendar className="w-10 h-10 text-blue-600" />}
            title="Smart Scheduling"
            description="Create and manage class schedules, events, and timetables with intelligent conflict detection."
          />
          <FeatureCard
            icon={<BarChart3 className="w-10 h-10 text-blue-600" />}
            title="Analytics & Reports"
            description="Get detailed insights with comprehensive analytics and customizable reporting tools."
          />
          <FeatureCard
            icon={<BookOpen className="w-10 h-10 text-blue-600" />}
            title="Course Management"
            description="Organize courses, curriculum, assignments, and learning materials with ease."
          />
          <FeatureCard
            icon={<Shield className="w-10 h-10 text-blue-600" />}
            title="Secure & Compliant"
            description="Enterprise-grade security with role-based access control and data protection."
          />
          <FeatureCard
            icon={<Zap className="w-10 h-10 text-blue-600" />}
            title="Lightning Fast"
            description="Built for performance with real-time updates and instant synchronization."
          />
        </div>
      </section>

      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your School?
          </h2>
          <p className="text-xl mb-10 text-blue-100 max-w-2xl mx-auto">
            Join thousands of educational institutions already using EduManage
            to improve efficiency and student outcomes.
          </p>
          <button
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all shadow-lg"
          >
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );
};

export default Section1;
